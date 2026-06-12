#!/usr/bin/env python3
"""puppybebe.com frontend mirror crawler (company-owned site recovery)."""
import os, re, sys, time
from urllib.parse import urljoin, urlparse, unquote
import requests
from bs4 import BeautifulSoup

BASE = "http://puppybebe.com/"
ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "site")
HOST = "puppybebe.com"

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36",
})

visited_pages = set()
saved_assets = set()
queue = []
failed = []

SEED_PAGES = [
    "", "index.html", "company.html", "service.html",
    "list_10.html", "list_20.html?area_code=20", "list_20.html",
    "delivery.html", "chain.html", "afternote.html", "map.html",
    "pop_privacy.html", "mobile/", "mobile/index.html",
]

def local_path(url):
    """Map a URL to a local file path under OUT, preserving query as filename."""
    p = urlparse(url)
    path = unquote(p.path)
    if path.endswith("/") or path == "":
        path = path + "index.html"
    rel = path.lstrip("/")
    if p.query:
        root, ext = os.path.splitext(rel)
        safe_q = re.sub(r'[^A-Za-z0-9_=&.-]', '_', p.query)
        rel = f"{root}__{safe_q}{ext or '.html'}"
    return os.path.join(OUT, rel)

def in_scope(url):
    p = urlparse(url)
    return p.netloc == "" or p.netloc == HOST or p.netloc == "www." + HOST

def save_bytes(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(data)

def fetch(url):
    try:
        r = session.get(url, timeout=25)
        if r.status_code != 200:
            failed.append((url, r.status_code))
            return None
        return r
    except Exception as e:
        failed.append((url, str(e)))
        return None

ASSET_ATTRS = {"img": "src", "script": "src", "link": "href",
               "source": "src", "video": "src", "audio": "src", "input": "src"}

def download_asset(url):
    if url in saved_assets:
        return
    saved_assets.add(url)
    if not in_scope(url):
        return
    full = urljoin(BASE, url)
    r = fetch(full)
    if not r:
        return
    path = local_path(full)
    save_bytes(path, r.content)
    # parse css for nested url()/imports
    if path.endswith(".css") or "text/css" in r.headers.get("content-type", ""):
        parse_css(r.text, full)

CSS_URL = re.compile(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)')
CSS_IMPORT = re.compile(r'@import\s+[\'"]([^\'"]+)[\'"]')

def parse_css(text, css_url):
    for m in CSS_URL.findall(text):
        if m.startswith("data:"):
            continue
        download_asset(urljoin(css_url, m))
    for m in CSS_IMPORT.findall(text):
        download_asset(urljoin(css_url, m))

def is_page_link(url):
    full = urljoin(BASE, url)
    if not in_scope(full):
        return False
    p = urlparse(full)
    path = p.path.lower()
    if any(path.endswith(ext) for ext in
           (".jpg",".jpeg",".png",".gif",".css",".js",".ico",".svg",
            ".webp",".pdf",".zip",".mp4",".woff",".woff2",".ttf",".eot")):
        return False
    if path.endswith(".html") or path.endswith("/") or path == "":
        return True
    return False

def process_page(url):
    full = urljoin(BASE, url)
    if full in visited_pages:
        return
    visited_pages.add(full)
    r = fetch(full)
    if not r:
        return
    ctype = r.headers.get("content-type", "")
    if "html" not in ctype and not full.endswith((".html", "/")):
        save_bytes(local_path(full), r.content)
        return
    html = r.content
    save_bytes(local_path(full), html)
    soup = BeautifulSoup(html, "html.parser")

    for tag, attr in ASSET_ATTRS.items():
        for el in soup.find_all(tag):
            v = el.get(attr)
            if not v or v.startswith(("data:", "javascript:", "#", "mailto:", "tel:")):
                continue
            download_asset(urljoin(full, v))
    # inline style url()
    for el in soup.find_all(style=True):
        parse_css(el["style"], full)
    for st in soup.find_all("style"):
        if st.string:
            parse_css(st.string, full)
    # background / usemap area hrefs are pages; collect anchors
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith(("javascript:", "#", "mailto:", "tel:")):
            continue
        nxt = urljoin(full, href)
        if is_page_link(nxt) and nxt not in visited_pages:
            queue.append(nxt)

def main():
    for s in SEED_PAGES:
        queue.append(urljoin(BASE, s))
    count = 0
    MAX_PAGES = 400
    while queue and count < MAX_PAGES:
        url = queue.pop(0)
        if url in visited_pages:
            continue
        process_page(url)
        count += 1
        time.sleep(0.05)
    print(f"pages visited: {len(visited_pages)}")
    print(f"assets saved : {len(saved_assets)}")
    print(f"failed       : {len(failed)}")
    for f in failed[:40]:
        print("  FAIL", f)

if __name__ == "__main__":
    main()
