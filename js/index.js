window.onload = function(){
	topscroll();
	ms();
	lunbo();
}
// 滑动
function topscroll (){
	window.onscroll = function(){
		var opacity = document.body.scrollTop/document.querySelector('.lb').offsetHeight;
		if(document.body.scrollTop <= document.querySelector('.lb').offsetHeight){
			document.querySelector('.jd_box').style.background = "rgba(233,35,34,"+ (opacity*2)+ ")";
		}
	};
}
// 倒计时
function ms(){
	var time = 7201;
	var spans = document.querySelectorAll('.dj span');
	clock();
	var timeid = setInterval(function(){
		time--;
		clock();
		if(time == 0){
			clearInterval(timeid);
			return;
		}
	},1000);
	function clock(){
		var hour = Math.floor(time / 60 / 60);
		var minute = Math.floor(time / 60 % 60);
		var second = Math.floor(time % 60);
		spans[0].innerText = Math.floor(hour / 10);
		spans[1].innerText = Math.floor(hour % 10);
		spans[3].innerText = Math.floor(minute / 10);
		spans[4].innerText = Math.floor(minute % 10);
		spans[6].innerText = Math.floor(second / 10);
		spans[7].innerText = Math.floor(second % 10);
	}	
}
// lunbo
function lunbo (){
	//图片克隆开始
	var index = 1;
	var lb_width = document.querySelector('.lb').offsetWidth;
	var u_1 = document.querySelector('.lb ul:first-of-type');
	var u_2 = document.querySelector('.lb ul:last-of-type');
	var u_2spans = u_2.querySelectorAll('li');
	var first = u_1.querySelector('li:first-of-type');
	var last = u_1.querySelector('li:last-of-type');
	u_1.appendChild(first.cloneNode(true));
	u_1.insertBefore(last.cloneNode(true),first);
	var lis_length = u_1.querySelectorAll('li').length;
	u_1.style.width = lb_width* lis_length+'px';
	u_1.style.left = -lb_width*index+'px';
	for(var i =0; i<lis_length;i++){
		u_1.querySelectorAll('li')[i].style.width = lb_width+'px';
	}
	//图片克隆结束
	// 自动轮播开始
	var timeId;
	function starlb(){
			timeId = setInterval(function(){
			index++;

			//测试开始
			for(var i = 0;i <lis_length;i++){
				u_1.querySelectorAll('li')[i].removeAttribute('aa')
			}
			u_1.querySelectorAll('li')[index].setAttribute('aa',1)
			// 测试结束
			// 点标记开始
			for(var i = 0; i < u_2spans.length;i++){
				u_2spans[i].className = '';
			}
			if(index == lis_length-1){
				u_2spans[0].className = 'active';
			}else{
				u_2spans[index-1].className = 'active';
			}
			// 点标记结束
			u_1.style.transition = 'left 500ms linear';
			u_1.style.left = -(lb_width*index)+'px';
			if(index == lis_length-1){
				setTimeout(function(){
					index = 1;
				    u_1.style.transition = null;
				    u_1.style.left = -(lb_width*index)+'px';
				},500);
			}
		},2000)
	}
	starlb();
	// 结束
	  
	
	// 自动轮播结束
	// 手动轮播开始
	var flag = true;
	var CK;
	var x,y,x1,y1,cx;
	u_1.addEventListener('touchstart',function(e){
		clearInterval(timeId);
		x = e.targetTouches[0].clientX;	
	})
	u_1.addEventListener('touchmove',function(e){
		if(flag){
			x1 = e.targetTouches[0].clientX;
			y1 = e.targetTouches[0].clientY;
			cx = x1 - x;
			u_1.style.left = (-lb_width*index+cx)+'px';
			u_1.style.transition = null;

		}	
	})
	var flag2 = true;
	u_1.addEventListener('touchend',function(){
		flag = false;
		if(flag2){
				CK = setTimeout(function(){
				console.log('倒计时');
				flag = true;
				flag2 = true;
				clearTimeout(CK);
				clearInterval(timeId);
				starlb();
			},1000)
				flag2 = false;
		}
		
		if(Math.abs(cx)>=document.documentElement.offsetWidth/4){
			if(cx > 0){
				index--;
				u_1.style.transition = 'left 500ms linear';
				u_1.style.left = -(lb_width*index)+'px';
				if(index == 0){
					setTimeout(function(){
						index = lis_length-2;
						u_1.style.transition = null;
						u_1.style.left = -(lb_width*index)+'px';
					},500)
				}
			}else{
				index++;
				u_1.style.transition = 'left 500ms linear';
				u_1.style.left = -(lb_width*index)+'px';
				if(index == lis_length-1){
					setTimeout(function(){
						index = 1;
						u_1.style.transition = null;
						u_1.style.left = -(lb_width*index)+'px';
					},500)
				}
			}
		}else{
				u_1.style.transition = 'left 300ms linear';
				u_1.style.left = -(lb_width*index)+'px';
		}
		// 点击松开防止翻页
		cx = 0;
		// 点标记开始
		for(var i = 0; i < u_2spans.length;i++){
				u_2spans[i].className = '';
			}
			if(index == lis_length-1){
				u_2spans[0].className = 'active';
			}else if(index == 0){
				u_2spans[u_2spans.length-1].className = 'active';
			}else{
				u_2spans[index-1].className = 'active';
			}
		// 点标记结束

		
	})
	//webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，
	//当一个元素的过渡效果执行完毕的时候，会触发这个事件//
	// u_1.addEventListener('webkitTransitionEnd',function(){
	// 	setTimeout(function(){

	// 	})
	// })
	//手动轮播结束
}

