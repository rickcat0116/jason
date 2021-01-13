;(function(window,document,$,undefined){

    var jason = {
        init: function(){
            this.headerFn();
            this.section01Fn();
            this.section02Fn();
            this.section03Fn();
            this.section04Fn();
            this.section05Fn();
        },
    
        headerFn:function(){
            var that = null;
            var $window = $(window);            
            var $heaer = $('#header');
            var $scroll = false;
            var t = false;
            var m = 0; //메뉴 클릭 안한 상태


                $heaer.on({                    
                    mouseenter:function(){
                        that = $(this);
                        that.addClass('addHeader'); 
                    },
                    mouseleave:function(){
                        that = $(this);
                        if( $scroll === false && m === 0 ){ //두조건 모두 만족시 헤더 배경 없어짐
                            that.removeClass('addHeader'); 
                        }
                    }
                });


                $window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        $scroll = true;  //스크롤 10px 이상인경우 true 변경
                        $heaer.addClass('addHeader');
                        if( t===false ){
                            t=true;
                            var headerH = $('#header').height();
                            $('html,body').stop().animate({scrollTop:$('#section2').offset().top-headerH},600,'easeInOutExpo');
                        }
                        
                    }
                    else{
                        t=false;
                        $scroll = false;  //스크롤 10px 이하인경우 false 변경
                        if( m===0 ){ //햄버거 메뉴 클릭안된상태만 헤더 배경없어짐
                            $heaer.removeClass('addHeader');
                        }
                        
                    }
                });

                

                //햄버거 메뉴 클릭하면 기억하는 변수 설정
                //NAV  네비게이션 이벤트
                $('.menu-bar').on({
                    click:  function(e){
                        e.preventDefault();
                        if(m==0){
                            m = 1;
                            $('#nav').stop().animate({top:124},300);
                        }  
                        else{
                            m = 0;
                            $('#nav').stop().animate({top:-124},300);
                        }                      
                        $(this).toggleClass('addBtn');
                    }
                });


                //메인버튼 이벤트
                $('.mainBtn').on({
                    mouseenter: function(){
                        $('.sub').stop().slideUp(100);
                        $(this).next('.sub').stop().slideDown(300);
                    }
                });

                //서브메뉴 사라지는 효과 이벤트
                //#nav 를 떠나면 사라짐
                $('#nav').on({
                    mouseleave: function(){
                        $('.sub').stop().slideUp(300);
                    }
                });


        },

    section01Fn:function(){
        var cnt = 0;
        var n = $('#section01 .slide').length-2;
        var $slide = $('#section01 .slide');
        var $nextBtn = $('#section01 .next-btn');
        var $prevBtn = $('#section01 .prev-btn');
        var $slideWrap = $('#section01 .s1-slide-wrap');
        var $pageBtn = $('#section01 .page-btn');
        var $smoothBtn = $('#section01 .smooth-btn');
        var setId = null;
        var setId2 = null;
        var $second = 5;
        var tCnt = 0;

        // Slide
        function mainSlideFn(){
            $slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                if(cnt>n-1){cnt=0;}
                if(cnt<0){cnt=n-1;}
                $slideWrap.stop().animate({left:-(100*cnt)+'%'}, 0);
            });

            //페이지버튼 함수
            pageBtnFn(cnt);
        }

        function pageBtnFn(z){
            z==n?z=0:z;
            z==-1?z=n-1:z;
            $pageBtn.removeClass('addCurrent');
            $pageBtn.eq(z).addClass('addCurrent');
        }

        function nextCountFn(){
            cnt++;
            mainSlideFn();
        }

        function prevCountFn(){
            cnt--;
            mainSlideFn();
        }

        function autoTimerFn(){
            setId = setInterval(nextCountFn, 1000*$second);
        }

        function timerFn(){
            tCnt=0;
            clearInterval(setId2);
            setId2 = setInterval(function(){
                tCnt++;
                if(tCnt>$second){
                    clearInterval(setId2);
                    nextCountFn();
                    autoTimerFn();
                }
            }, 1000);
        }

        $pageBtn.each(function(index){
            $(this).on({
                click:function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    cnt = index;
                    mainSlideFn();
                }
            });
        });

        $nextBtn.on({
            click:  function(event){
                event.preventDefault();
                clearInterval(setId);
                timerFn();
               if(!$slideWrap.is(':animated')){
                    nextCountFn();
               } 
            }
        });

        $prevBtn.on({
            click:  function(event){
                event.preventDefault();
                clearInterval(setId);
                timerFn();
                if(!$slideWrap.is(':animated')){                    
                    prevCountFn();
                }
            }
        });

        $('#section01').swipe({
            swipeLeft: function(event){
                event.preventDefault();
                clearInterval(setId);
                timerFn();
                if(!$slideWrap.is('animated')){
                    nextCountFn();
                }
            },
            swipeRight: function(event){
                event.preventDefault();
                clearInterval(setId);
                timerFn();
                if(!$slideWrap.is('animated')){
                    prevCountFn();
                }
            }
        })

        setTimeout(autoTimerFn, 10);



        // Smooth Button
        $smoothBtn.on({
            click: function(e){
                e.preventDefault();
                var headerH = $('#header').height();
                var url = $(this).attr('href');
                $('html, body').stop().animate({scrollTop:$( url ).offset().top-headerH }, 600, 'easeInOutExpo');
            }
        })

        // Resize
        var winW = $(window).width();
        var winH = $(window).height();

        function resizeFn(){
            winW = $(window).width();
            winH = $(window).height();
            $('#section01').css({ height:winH });
            $('#section02').css({ marginTop:winH });
            $slide.css({ width:winW });
        }

        setTimeout(resizeFn, 10);

        $(window).resize(function(){
            resizeFn();
        });
    },

    section02Fn:function(){

        var $win = $(window);
        var $gal = $('.gallery li');
        var $galW = $('.gallery li').width();
        var $galH = $galW * 0.832468967;

        function resizeFn(){
          $galW = $('.gallery li').width();
          $galH = $galW * 0.832468967;
          $gal.css({ height: $galH });
        }

        setTimeout(resizeFn, 10);

        $win.resize(function(){
            resizeFn();
        });

    },

    section03Fn:function(){
        //박스높이 slide View Box 너비가 1360이하이면 자동 높이 설정

        var $win = $(window);
        var $winW = $(window).innerWidth();
        var $slideView = $('#section03 .slide-view');
        var $pageBtnW = $('#section03 .pageBtn').innerWidth();
        var $pageWrap = $('#section03 .page-wrap');
        var $slideBg = $('#section03 .slide-bg-image');
        var $slideBgW = $('#section03 .slide-bg-image').innerWidth();

    
        function resizeFn(){
            $winW = $(window).innerWidth();
            $pageBtnW = $('#section03 .pageBtn').innerWidth();
            $slideBgW = $('#section03 .slide-bg-image').innerWidth();

            if($winW <= 1360){
                $slideView.css({ height:$winW*0.419117647 });
                $pageWrap.css({ height:$pageBtnW });
                $slideBg.css({ height:$slideBgW });

            } else {
                $slideView.css({height:570});
            }
        }

        setTimeout(resizeFn, 10);

        $win.resize(function(){
            resizeFn();
        });

        var cnt = 0;
        var setId = null;
        var n = $('#section03 .slide').length-1;
        var $s3Slide = $('#section03 .slide');
        var $nextBtn = $('#section03 .nextBtn');
        var $prevBtn = $('#section03 .prevBtn');
        var $pageBtn = $('#section03 .pageBtn');
        var a = [1,2];

        function mainNextSlideFn(){
            $s3Slide.css({zIndex:1});
            $s3Slide.eq(cnt==0?n:cnt-1).css({zIndex:2});
            $s3Slide.eq(cnt).css({zIndex:3}).animate({opacity:0}, 0).animate({opacity:1}, 1000);
            pageBtnFn();
        }

        function mainPrevSlideFn(){
            $s3Slide.css({zIndex:1,opacity:1});
            $s3Slide.eq(cnt).css({zIndex:2});
            $s3Slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:0}, 1000);
            pageBtnFn();
        }

        function nextCountFn(){
            cnt++;
            if(cnt>2){cnt=0}
            mainNextSlideFn();
        }

        function prevCountFn(){
            cnt--;
            if(cnt<0){cnt=2}
            mainPrevSlideFn();
        }

        $nextBtn.on({
            click: function(e){
                e.preventDefault();
                nextCountFn();
            }
        })

        $prevBtn.on({
            click: function(e){
                e.preventDefault();
                prevCountFn();
            }
        })

        function pageBtnFn(){

            switch(cnt){
                case 0:
                    a = [1,2];
                    break;

                case 1:
                    a = [0,2];
                    break;

                case 2:
                    a = [0,1];
            }
            // $pageBtn.eq(0).css({backgroundImage:'url(./img/s3-slide'+a[0]+'.jpg'});
            // $pageBtn.eq(1).css({backgroundImage:'url(./img/s3-slide'+a[1]+'.jpg'});
           
            for(var i=0; i<a.length; i++){
                $pageBtn.eq(i).css({backgroundImage:'url(./img/s3-slide'+a[i]+'.jpg'});
            }
        }

        $pageBtn.each(function(idx){
            $(this).on({
                click:function(e){
                    e.preventDefault();

                    var imsi = cnt;
                    cnt = a[idx];

                    if(imsi < a[idx]){
                         mainNextSlideFn();
                    } else if (imsi > a[idx]){
                        mainPrevSlideFn();
                    }

                    console.log('현재 슬라이드 :', cnt);
                    console.log('클릭한 슬라이드 :', a[idx]);
                }
            })
        });

        // $pageBtn.on({
        //     click: function(){
             
        //     }
        // });


    },

    section04Fn:function(){

         //슬라이드 콘테이너 박스 너비에 따른 슬라이드 3개의 너비
         /* 1570 - 마진(40) = 1530 */
         /* 슬라이드 너비 1570/3 =  */
        var totN = $('#section04 .slide').length;
        var slideN = 3; // 데스크톱 3, 태블릿 2, 모바일 1 1020 초과 / 1020 / 720
        var $slideC = $('#section04 .slide-container');
        var slideW = $slideC.innerWidth()/slideN;
        var $slideWrap = $('#section04 .slide-wrap');
        var $slide = $('#section04 .slide');
        var $pageBtn = $('#section04 .pageBtn');
        var $window = $(window);
        var cnt = 0;
        var setId = null;
        var setId2 = null;

            function resizeFn(){
                if($slideC.innerWidth() > 1024){
                    slideN = 3;
                } else if($slideC.innerWidth() > 720) {
                    slideN = 2;
                } else if($slideC.innerWidth() < 720) {
                    slideN = 1;
                }
                
                slideW = $slideC.innerWidth()/slideN;
                $slideWrap.css({ width:(slideW*totN ) , marginLeft: -(slideW*3) });
                $slide.css({ width:slideW , height:slideW-40 });
                $slideWrap.stop().animate({ left:-(slideW*cnt)}, 0);
            }   
            
            setTimeout(resizeFn, 10); /* 처음 로딩 시 한번만 실행 */

            $window.resize(function(){ // 크기가 변경될 때 반응
                resizeFn();
            });

            function mainSlideFn(){
                $slideWrap.stop().animate({ left:-(slideW*cnt)}, 600, 'easeOutExpo', function(){
                    if(cnt>3){cnt=0}
                    if(cnt<0){cnt=3}
                    $slideWrap.stop().animate({ left:-(slideW*cnt)}, 0)
                });
                pageBtnEventFn();
            }

            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            $slideC.swipe({
                swipeLeft: function(){
                    clearInterval(setId);
                    timerControlFn();
                    if(!$slideWrap.is('animated')){
                        nextCountFn();
                    }
                },

                swipeRight: function(){
                    clearInterval(setId);
                    timerControlFn();
                    if(!$slideWrap.is('animated')){
                        prevCountFn();
                    }
                }
            });

            function pageBtnEventFn(){
                var z = cnt;
                if(z>3){z=0}
                if(z<0){z=3}

                $pageBtn.removeClass('addPage')
                $pageBtn.eq(cnt).addClass('addPage')
            }

            $pageBtn.each(function(idx){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        timerControlFn();
                        cnt = idx;
                        mainSlideFn();  
                    }
                });
            });

            function autoPlayFn(){
                setId = setInterval(nextCountFn, 6000);
            }
            
            autoPlayFn();

            function timerControlFn(){
                var tcnt = 0;
                clearInterval(setId);   
                clearInterval(setId2);   
                setId2 = setInterval(function(){
                    tcnt++;
                    if(tcnt >= 6){
                        clearInterval(setId2);
                        nextCountFn();
                        autoPlayFn();
                    }
                }, 1000);
            }

    },
    

    section05Fn:function(){

    }

    };

    jason.init();

})(window,document,jQuery);
