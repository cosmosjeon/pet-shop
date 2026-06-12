function maul_setting() {
	$(".blinder").css({"display":"none","opacity":"0","background":"#fff"});

		// 메인비쥬얼 제이쿼리
		var mv_cur = 0;
		var mv_prev = null;
		var img_ea = $(".main_visual .imgs > li").size()-1;
		var prev_li;
		var current_li;

		function blinder_set(){
			$(".main_visual .blinder").css({"display":"none"});
			barney_dalay = setInterval(barney_auto,4000);
		};
		
		$(".main_visual .mv_btns li a").on("click", function(e) {
			if($(this).parent().index() != mv_cur){
				$(".main_visual .blinder").css({"display":"block"});
				clearInterval(barney_dalay);
				mv_prev = mv_cur;
				mv_cur = $(this).parent().index();
				var prev_li = $(".main_visual .imgs > li").eq(mv_prev);
				var current_li = $(".main_visual .imgs > li").eq(mv_cur);
				$(".main_visual .mv_btns li").removeClass("on")
				$(".main_visual .mv_btns li").eq(mv_cur).addClass("on");
				TweenMax.fromTo(prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
				TweenMax.fromTo(current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":blinder_set});
			};
		});
		
		$(".main_visual .bn_left > a").on("click",function(e){
			$(".main_visual .blinder").css({"display":"block"});
			clearInterval(barney_dalay);
			mv_prev = mv_cur;
			mv_cur--;
			if(mv_cur < 0){
				mv_cur = img_ea;
				mv_prev = 0;
			};
			prev_li = $(".main_visual .imgs > li").eq(mv_prev);
			current_li = $(".main_visual .imgs > li").eq(mv_cur);
			$(".main_visual .mv_btns li").removeClass("on")
			$(".main_visual .mv_btns li").eq(mv_cur).addClass("on");
			TweenMax.fromTo(prev_li,0.8,{"left":"0"},{"left":"100%","ease":"Expo.easeInOut"});
			TweenMax.fromTo(current_li,0.8,{"left":"-100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":blinder_set});
		});

		$(".main_visual .bn_right > a").on("click",function(e){
			$(".main_visual .blinder").css({"display":"block"});
			clearInterval(barney_dalay);
			mv_prev = mv_cur;
			mv_cur++;
			if(mv_cur > img_ea){
				mv_cur = 0;
				mv_prev = img_ea;
			};
			prev_li = $(".main_visual .imgs > li").eq(mv_prev);
			current_li = $(".main_visual .imgs > li").eq(mv_cur);
			$(".main_visual .mv_btns li").removeClass("on")
			$(".main_visual .mv_btns li").eq(mv_cur).addClass("on");
			TweenMax.fromTo(prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
			TweenMax.fromTo(current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":blinder_set});
		});

		function barney_auto(){
			$(".main_visual .blinder").css({"display":"block"});
			clearInterval(barney_dalay);
			mv_prev = mv_cur;
			mv_cur++;
			if(mv_cur > img_ea){
				mv_cur = 0;
				mv_prev = img_ea;
			};
			prev_li = $(".main_visual .imgs > li").eq(mv_prev);
			current_li = $(".main_visual .imgs > li").eq(mv_cur);
			$(".main_visual .mv_btns li").removeClass("on")
			$(".main_visual .mv_btns li").eq(mv_cur).addClass("on");
			TweenMax.fromTo(prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
			TweenMax.fromTo(current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":blinder_set});
		};
		var barney_dalay = setInterval(barney_auto,4000);
	
	//메인 이벤트 롤링 제이쿼리	
	var ev_cur = 0;
	var ev_prev = null;
	var ev_img_ea = $(".con_slide .events li").size()-1;
	var ev_prev_li;
	var ev_current_li;
	var ev_tween_prev;
	var ev_tween_current;
	
	function ev_blinder_set(){
		$(".con_slide .indis .blinder").css({"display":"none"});
		ev_barney_dalay = setInterval(ev_barney_auto,4000);
	};

	$(".con_slide .indis .li_01 > a").on("click",function(e){
		$(".con_slide .indis .blinder").css({"display":"block"});
		clearInterval(ev_barney_dalay);
		ev_prev = ev_cur;
		ev_cur--;
		if(ev_cur < 0){
			ev_cur = ev_img_ea;
			ev_prev = 0;
		};
		ev_prev_li = $(".con_slide .events li").eq(ev_prev);
		ev_current_li = $(".con_slide .events li").eq(ev_cur);
		ev_tween_prev = TweenMax.fromTo(ev_prev_li,0.8,{"left":"0"},{"left":"100%","ease":"Expo.easeInOut"});
		ev_tween_current = TweenMax.fromTo(ev_current_li,0.8,{"left":"-100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":ev_blinder_set});
	});

	$(".con_slide .indis .li_03 > a").on("click",function(e){
		$(".con_slide .indis .blinder").css({"display":"block"});
		clearInterval(ev_barney_dalay);
		ev_prev = ev_cur;
		ev_cur++;
		if(ev_cur > ev_img_ea){
			ev_cur = 0;
			ev_prev = ev_img_ea;
		};
		ev_prev_li = $(".con_slide .events li").eq(ev_prev);
		ev_current_li = $(".con_slide .events li").eq(ev_cur);
		ev_tween_prev = TweenMax.fromTo(ev_prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
		ev_tween_current = TweenMax.fromTo(ev_current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":ev_blinder_set});
	});

	function ev_barney_auto(){
		$(".con_slide .blinder").css({"display":"block"});
		clearInterval(ev_barney_dalay);
		ev_prev = ev_cur;
		ev_cur++;
		if(ev_cur > ev_img_ea){
			ev_cur = 0;
			ev_prev = ev_img_ea;
		};
		ev_prev_li = $(".con_slide .events li").eq(ev_prev);
		ev_current_li = $(".con_slide .events li").eq(ev_cur);
		ev_tween_prev = TweenMax.fromTo(ev_prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
		ev_tween_current = TweenMax.fromTo(ev_current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":ev_blinder_set});
	};
	var ev_barney_dalay = setInterval(ev_barney_auto,4000);

	// 메인비쥬얼 재생/정지
	var ev_state = true;
	$(".con_slide .indis .li_02 > a").on("click",function(e){
		if(ev_state == true){
			$(".con_slide .indis .blinder").css({"display":"block"});
			$(".con_slide .indis .li_02 .blinder").css({"display":"none"});
			ev_state = false;
			$(this).children("img").attr({"src":"/img/con_play_btn.png","alt":"재생"});
			clearInterval(ev_barney_dalay);
			ev_tween_prev.pause();
			ev_tween_current.pause();
		}else if(ev_state == false){
			$(".con_slide .indis .blinder").css({"display":"none"});
			ev_state = true;
			$(this).children("img").attr({"src":"/img/con_stop_btn.png","alt":"일시정지"});
			ev_barney_dalay = setInterval(ev_barney_auto,4000);
			ev_tween_prev.resume();
			ev_tween_current.resume();
		};
	});
	
	// Heath Timeline 제이쿼리
		/*var tv_cur = 0;
		var tv_prev = null;
		var tv_img_ea = $(".heath_slide .imgs > li").size()-1;
		var tv_prev_li;
		var tv_current_li;
		

		function tv_blinder_set(){
			$(".heath_slide .blinder").css({"display":"none"});
			//tv_barney_dalay = setInterval(tv_barney_auto,5000);
		};
		
		//$(".heath_slide .indis .li_01").css('display','none');
		$(".heath_slide .indis").css('margin-top','-34px');

		$(".heath_slide .indis .li_01 > a").on("click",function(e){
			$(".heath_slide .blinder").css({"display":"block"});
			$(".heath_slide .indis .li_02").css('display','block');
			//clearInterval(tv_barney_dalay);
			tv_prev = tv_cur;
			tv_cur--;
			if(tv_cur < 0){
				tv_cur = tv_img_ea;
				tv_prev = 0;
			};
			tv_prev_li = $(".heath_slide .imgs > li").eq(tv_prev);
			tv_current_li = $(".heath_slide .imgs > li").eq(tv_cur);
			var np_btn = $(".heath_slide .imgs > li").eq(tv_cur).index();
			//console.log(np_btn);
			if($(".heath_slide .imgs > li").eq(tv_cur).index() == 0 ) {
				$(".heath_slide .indis .li_01").css('display','none');
				$(".heath_slide .indis").css('margin-top','-34px');
			} else  {
				$(".heath_slide .indis .li_01").css('display','block');
				$(".heath_slide .indis").css('margin-top','-68px');
				$(".heath_slide .indis .li_01").find("img").attr({"src":"/img/hv_prev_btn0"+(np_btn+1)+".png"});
				$(".heath_slide .indis .li_02").find("img").attr({"src":"/img/hv_next_btn0"+(np_btn+1)+".png"});
			};
			TweenMax.fromTo(tv_prev_li,0.8,{"left":"0"},{"left":"100%","ease":"Expo.easeInOut"});
			TweenMax.fromTo(tv_current_li,0.8,{"left":"-100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":tv_blinder_set});
		});

		$(".heath_slide .indis .li_02 > a").on("click",function(e){
			$(".heath_slide .blinder").css({"display":"block"});
			$(".heath_slide .indis .li_01").css('display','block');
			//clearInterval(tv_barney_dalay);
			tv_prev = tv_cur;
			tv_cur++;
			if(tv_cur > tv_img_ea){
				tv_cur = 0;
				tv_prev = tv_img_ea;
			};
			tv_prev_li = $(".heath_slide .imgs > li").eq(tv_prev);
			tv_current_li = $(".heath_slide .imgs > li").eq(tv_cur);
			var np_btn = $(".heath_slide .imgs > li").eq(tv_cur).index();
			//console.log(np_btn);
			if($(".heath_slide .imgs > li").eq(tv_cur).index() == 5 ) {
				$(".heath_slide .indis .li_02").css('display','none');
				$(".heath_slide .indis").css('margin-top','-34px');
			} else  {
				$(".heath_slide .indis .li_02").css('display','block');
				$(".heath_slide .indis").css('margin-top','-68px');
				$(".heath_slide .indis .li_01").find("img").attr({"src":"/img/hv_prev_btn0"+(np_btn+1)+".png"});
				$(".heath_slide .indis .li_02").find("img").attr({"src":"/img/hv_next_btn0"+(np_btn+1)+".png"});
			};
			
			TweenMax.fromTo(tv_prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
			TweenMax.fromTo(tv_current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":tv_blinder_set});
		});*/
		
		
		/*function tv_barney_auto(){
			$(".main_visual .blinder").css({"display":"block"});
			clearInterval(tv_barney_dalay);
			tv_prev = tv_cur;
			tv_cur++;
			if(tv_cur > tv_img_ea){
				tv_cur = 0;
				tv_prev = tv_img_ea;
			};
			tv_prev_li = $(".heath_slide .imgs > li").eq(tv_prev);
			tv_current_li = $(".heath_slide .imgs > li").eq(tv_cur);
			TweenMax.fromTo(tv_prev_li,0.8,{"left":"0"},{"left":"-100%","ease":"Expo.easeInOut"});
			TweenMax.fromTo(tv_current_li,0.8,{"left":"100%"},{"left":"0","ease":"Expo.easeInOut","onComplete":tv_blinder_set});
		};
		var tv_barney_dalay = setInterval(tv_barney_auto,5000);*/
		
};
