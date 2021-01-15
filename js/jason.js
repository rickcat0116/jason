;(function($,window,document,undefined){

    var jason = {
        init:   function(){
            var that = this;
            that.heaerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.loginSection2Fn();
        },
        heaerFn:function(){
            var that     = null;
            var $window  = $(window);            
            var $heaer   = $('#header');
            var $nav     = $('#nav');
            var $menuBar = $('.menu-bar');
            var $mainBtn = $('.main-btn');
            var $sub     = $('.sub');
            var $scroll  = false;
            var t        = false;
            var m        = 0; //메뉴 클릭 안한 상태
            var s        = -1; //부호 기본값 양수 -1
            var topPos   = 124;

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
                            $('html,body').stop().animate({scrollTop:$('#section02').offset().top-headerH},600,'easeInOutExpo');
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

                $window.resize(function(){
                    resizeFn();        
                });

                //화면의 크기 변화에 따른 반응형 데스크톱, 태블릿, 모바일 메뉴
                function resizeFn(){

                    if( $window.innerWidth()>1024 ){ //1024초과 모두
                        topPos = 124;
                        $nav.stop().show(0).animate({top:(s*topPos)},300); //처음 로딩시 -1 
                    }
                    else if( $window.innerWidth()>780 ){//781~1024
                        topPos = 84;
                        $nav.stop().show(0).animate({top:(s*topPos)},300); //처음 로딩시 -1 
                    }
                    else{ //0~780이하
                        topPos = 0;
                        $sub.stop().slideDown(0);
                        $nav.stop().animate({top:(s*topPos)},0); //처음 로딩시 -1 
                        if(m==1){
                            $nav.stop().show(0);
                            $('html').addClass('addScroll');
                        }
                        else{
                            $nav.stop().hide(0);
                            $('html').removeClass('addScroll');
                        }
                    }    
                }
                $nav.hide(0);
                setTimeout(resizeFn,10);

                //NAV  네비게이션 이벤트
                //햄버거 메뉴 클릭하면 기억하는 변수 설정
                $menuBar.on({
                    click:  function(e){
                        e.preventDefault();
                        if(m==0){ //처음 클릭(토글)
                            m = 1;
                            s = 1; //부호(sign) + 양수                           
                        }  
                        else{ //두번째 클릭(토글)
                            m = 0;
                            s = -1; //부호(sign) - 음수
                        }        
                        resizeFn(); //버튼의 클릭시 변화를 주는 반응형 함수            
                        $(this).toggleClass('addBtn');
                    }
                });

                //메인버튼 이벤트
                $mainBtn.on({
                    mouseenter: function(){

                        if( $window.innerWidth() > 780 ){
                            $sub.stop().slideUp(100);
                            $(this).next('.sub').stop().slideDown(300);
                        }
                           
                    }
                });


                //서브메뉴 사라지는 효과 이벤트
                //#nav 를 떠나면 사라짐
                $nav.on({
                    mouseleave: function(){
                        $sub.stop().slideUp(300);
                    }
                });

        },
        section1Fn:function(){

            var cnt = 0;
            var n = $('#main #section01 .slide').length-2; //4
            var $slide = $('#main #section01 .slide');
            var $nextBtn = $('#main #section01 .next-btn');
            var $prevBtn = $('#main #section01 .prev-btn');
            var $slideWrap = $('#main #section01 .slide-wrap');
            var $pageBtn = $('#main #section01 .page-btn');
            var $smoothBtn = $('#main #section01 .smooth-btn');
            var setId = null;
            var setId2 = null;
            var $second = 5; //4초 간격
            var tCnt = 0; 

            /////////// slide ////////////////////////////////////////////////////////

            //메인 슬라이드 함수
            function mainSlideFn(){               
                $slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                    if(cnt>n-1){cnt=0;} //n개인경우 = n-1
                    if(cnt<0){cnt=n-1;} 
                    $slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                });
                //페이지버튼 함수 호출(매개변수)
                pageBtnFn(cnt);
            }

            //페이지 버튼(인디세이터 버튼) 이벤트 함수
            function pageBtnFn(z){
                z==n?z=0:z;     //n(4)
                z==-1?z=n-1:z;  //3=n(4)-1
                $pageBtn.removeClass('addCurrent');
                $pageBtn.eq(z).addClass('addCurrent');
            }

            //다음 슬라이드 카운트 함수
            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            //이전 슬라이드 카운트 함수
            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            //자동 플레이
            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*$second);
            }

            //버튼 이벤트 발생시 타이머 콘트롤 함수
            function timerFn(){
                tCnt=0;
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    tCnt++; //1초에 1씩증가 1 2 3 4 5
                    if(tCnt>$second){ //4초 후에
                        clearInterval(setId2);
                        nextCountFn();
                        autoTimerFn();
                    }
                },1000);
            }

            //페이지 버튼 이벤트
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
                
            //다음 슬라이드 버튼 클릭 이벤트
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

            //이전 슬라이드 버튼 클릭 이벤트
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

            //터치 스와이프 이벤트
            $('#main #section01').swipe({
                swipeLeft:  function(event){ //다음 슬라이드
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                },
                swipeRight:  function(event){ //이전 슬라이드
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });

            setTimeout(autoTimerFn,10);
            /////////// smooth button ////////////////////////////////////////////////
            $smoothBtn.on({
                click:  function(e){
                    e.preventDefault();
                    var headerH = $('#header').height();
                    var url = $(this).attr('href');
                        $('html,body').stop().animate({ scrollTop:$( url ).offset().top-headerH },600,'easeInOutExpo');
                }
            });
                      
            /////////// resize ////////////////////////////////////////////////
            var winW = $(window).width();
            var winH = $(window).height();
                
                //여기서부터 식사하고 진행...
                function resizeFn(){
                    winW = $(window).width(); //리얼하게 너비
                    winH = $(window).height();//리얼하게 높이                    
                    $('#main #section01, #login #section1').css({ height:winH }); //리얼하게 적용
                    $('#main #section02').css({ marginTop:winH }); //리얼하게 적용
                    $slide.css({ width:winW });  //리얼하게 적요
                }
                setTimeout(resizeFn,10);

                $(window).resize(function(){
                    resizeFn();
                });


        },
        section2Fn:function(){

            var $win = $(window);
            var $gal = $('#main .gallery li');
            var $galW = $('#main .gallery li').width();
            var $galH =  $galW * 0.832468967;

                function resizeFn(){
                    $galW = $('#main .gallery li').width(); //칸 너비
                    $galH =  $galW * 0.832468967; //칸 높이 비율계산                  
                    $gal.css({height:$galH});
                }

                setTimeout(resizeFn,10);

                $win.resize(function(){
                    resizeFn();
                });

        },
        section3Fn:function(){

            //박스높이 slide View Box 너비가 1360이하이면 높이 자동 설정 높이 설정  
            var $window    = $(window);
            var $winW      = $(window).innerWidth();
            var $slideView = $('#main #section03 .slide-view');
            var $pageBtnW  = $('#main #section03 .pageBtn').innerWidth();
            var $pageWrap  = $('#main #section03 .page-wrap');
            var $slideBg   = $('#main #section03 .slide-bg-image');
            var $slideBgW  = $('#main #section03 .slide-bg-image').innerWidth();

                function resizeFn(){
                    $winW = $(window).innerWidth();
                    $pageBtnW  = $('#main #section03 .pageBtn').innerWidth();
                    $slideBgW  = $('#main #section03 .slide-bg-image').innerWidth();

                    if($winW<=1360){
                        $slideView.css({height:$winW*0.419117647}); //570 = 1360 * 0.419117647
                        $pageWrap.css({height:$pageBtnW});
                        $slideBg.css({height:$slideBgW });
                    }
                    else{
                        $slideView.css({height:570}); //570 = 1360 * 0.419117647
                    }                
                }   
                
                setTimeout(resizeFn,10);

                $window.resize(function(){
                    resizeFn();
                });


                //페이드 인아웃 반응형 슬라이드 웹개발
                var cnt      = 0;
                var setId    = null;
                var n        = $('#main #section03 .slide').length-1; //2 = 3-1 = index number(0 1 2)
                var $nextBtn = $('#main #section03 .nextBtn');
                var $prevBtn = $('#main #section03 .prevBtn');
                var $slide   = $('#main #section03 .slide');
                var $pageBtn = $('#main #section03 .pageBtn');
                var a = [1,2]; 


                //1.메인 슬라이드 페이드인아웃 함수 //////////
                //1-1메인 다음 슬라이드 함수
                function mainNextSlideFn(){
                    $slide.css({zIndex:1}); //초기화 모든 슬라이드 zIndex:1
                    $slide.eq(cnt==0?n:cnt-1).css({zIndex:2}); //현재 이전 슬라이드
                    $slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); //현재 슬라이드
                    pageBtnFn();                    
                }
                //1-2메인 이전 슬라이드 함수
                function mainPrevSlideFn(){
                    $slide.css({zIndex:1,opacity:1}); //초기화 모든 슬라이드 zIndex:1 opacity:1
                    $slide.eq(cnt).css({zIndex:2}); //현재 이전 슬라이드
                    $slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1},0).animate({opacity:0},1000); //현재 슬라이드                    
                    pageBtnFn();                    
                }


                //2. 카운트 함수 이벤트 //////////
                //2-1메인 다음 카운트 슬라이드 함수
                function nextCountFn(){
                    cnt++;
                    if(cnt>n){cnt=0}
                    mainNextSlideFn();
                }
                //2-2메인 이전 카운트 슬라이드 함수
                function prevCountFn(){
                    cnt--;
                    if(cnt<0){cnt=n}
                    mainPrevSlideFn();
                }
                



                //3. 버튼 클릭 이벤트 //////////
                //3-1 다음 화살 버튼 클릭 이벤트
                $nextBtn.on({
                    click:  function(e){
                        e.preventDefault();
                        nextCountFn();
                    }
                });                
                //3-2 이전 화살 버튼 클릭 이벤트
                $prevBtn.on({
                    click:  function(e){
                        e.preventDefault();
                        prevCountFn();
                    }
                });


                //4. 페이지 버튼(인디게이터 버튼) 이벤트 함수 //////////
                //스토리 보드 : 현재 슬라이드가
                //첫번째 슬라이드 이면 페이지 버튼 1 : [1] 두번째 슬라이드 이미지 s3Slide1.jpg
                //첫번째 슬라이드 이면 페이지 버튼 2 : [2] 세번째 슬라이드 이미지 s3Slide2.jpg

                //두번째 슬라이드 이면 페이지 버튼 1 : [0] 첫번째 슬라이드 이미지 s3Slide0.jpg 
                //두번째 슬라이드 이면 페이지 버튼 2 : [2] 세번째 슬라이드 이미지 s3Slide2.jpg

                //세번째 슬라이드 이면 페이지 버튼 1 : [0] 첫번째 슬라이드 이미지 s3Slide0.jpg 
                //세번째 슬라이드 이면 페이지 버튼 2 : [1] 두번째 슬라이드 이미지 s3Slide1.jpg
                function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            //a[1,2]; //파일 번호 값 설정 설명하고, 배열값 넣지 않아서 실행 안됨.
                            a = [1,2]; //배열 값 설정 해 주세요
                            break;
                        case 1:
                            //a[0,2]; //파일 번호
                            a = [0,2]; //배열 값 설정 해 주세요
                            break;
                        case 2:
                            // a[0,1]; //파일 번호
                            a = [0,1]; //배열 값 설정 해 주세요
                    }  

                    // console.log(cnt);
                    // console.log(a);
                    // $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide'+ a[0] +'.jpg)'});
                    // $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide'+ a[1] +'.jpg)'});

                    for(var i=0;i<a.length;i++){
                        $pageBtn.eq(i).css({backgroundImage:'url(./img/s3Slide'+ a[i] +'.jpg)'});
                    }

                }
                /*
                function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            //case 0 첫번째 슬라이드인 경우
                            //Array arr a
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide1.jpg)'});  
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide2.jpg)'});
                            break;
                        case 1:
                            //case 1 두번째 슬라이드인 경우
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide0.jpg)'});  
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide2.jpg)'});
                            break;
                        case 2:
                            //case 3 세번째 슬라이드인 경우
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide0.jpg)'});  
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide1.jpg)'});                         
                    }    

                }
                */
                //5. 페이지 버튼(인디게이터 버튼) 클릭 이벤트 //////////
                $pageBtn.each(function(idx){
                    $(this).on({
                        click:  function(e){
                            e.preventDefault();
                            //바뀌기 이전 상태
                            //console.log('현재 슬라이드 번호',cnt); //현재 실행중인 슬라이드 번호
                            //console.log('클릭한 슬라이드 번호',a[idx]); //클릭한 슬라이드 번호

                            var imsi = cnt;  //현재 실행 중인 번호를 임시에 보관 그리고
                                cnt  = a[idx]; //a[1,2]배열 값(인수) 클릭한 인수에 해당된 배열값 a[1]=2

                                if(imsi < a[idx]){ //클릭한 번호가 더 크면 다음 슬라이드
                                    mainNextSlideFn(); //함수 실행 범위(스코프 scope)에 변수 cnt 가 할당
                                } 
                                else if(imsi > a[idx]){ //클릭한 번호가 더 작으면 이전 슬라이드
                                    mainPrevSlideFn();
                                }   
  
                                //결과 후 변수 값들                                    
                                //console.log('현재 슬라이드 번호',cnt); //현재 실행중인 슬라이드 번호
                                //console.log('클릭한 슬라이드 번호',a); //슬라이드 페이지 버튼의 배열 모두 출력

                        }
                    });    
                });
        },
        section4Fn:function(){
            var totN            = $('#main #section04 .slide').length; //10
            var slideN          = 3; //980초과 3, 980이하 2, 600 1
            var $slideContainer = $('#main #section04 .slide-container');
            var slideW          = $('#main #section04 .slide-container').innerWidth()/slideN;
            var $slideWrap      = $('#main #section04 .slide-wrap');
            var $slide          = $('#main #section04 .slide');
            var $pageBtn        = $('#main #section04 .pageBtn');
            var $window         = $(window);
            var cnt             = 0;
            var setId           = null;
            var setId2          = null;



                ////////////////////////////////////////////////////////////////
                ///////   메인 슬라이드  반응형 //////////////////////////////////
                ////////////////////////////////////////////////////////////////
                // 슬라이드 콘테이너 박스 너비에 따른 슬라이드 3개의 너비구하기
                // 1570-(20(마진값)*2)=1530
                // 슬라이드 너비는 1570/3=523.3333333 
                // 반응형으로 슬라이드 콘테이너('.slide-container') 박스 너비 변화에 
                // 따른 슬라이드 너비 계산 자동
                //////////////////////////////////////////////////////////////////
                
                
                function resizeFn(){
                    if($slideContainer.innerWidth()>1024){
                        slideN = 3;
                    }
                    else if($slideContainer.innerWidth()>680){
                        slideN = 2;
                    }
                    else{
                        slideN = 1;
                    }

                    slideW = $slideContainer.innerWidth()/slideN; //슬라이드 1개의 너비
                    $slideWrap.css({width:(slideW*totN), marginLeft:-(slideW*3)}); //3 4 3 고정값
                    $slide.css({width:slideW, height:slideW-40});
                    // $slideWrap.stop().animate({left: -(slideW*cnt) },1000);//동적으로 하고싶으면
                    $slideWrap.stop().animate({left: -(slideW*cnt) },0);   //정적으로 하고싶으면
                    
                }

                setTimeout(resizeFn,10); //처음 로딩 시 once 1번만 실행 또는 새로고침

                $window.resize(function(){ //크기가 변경될 때만 반응
                    resizeFn();
                });




                ////////////////////////////////////////////////////////////////
                ///////   메인 슬라이드 구현  ///////////////////////////////////
                ////////////////////////////////////////////////////////////////

                //1. 메인슬라이드 함수
                function mainSlideFn(){
                    $slideWrap.stop().animate({left: -(slideW*cnt) },600, 'easeOutExpo', function(){
                        if(cnt>3){cnt=0;} //0 ~ 3(4개의 슬라이드)
                        if(cnt<0){cnt=3;}
                        $slideWrap.stop().animate({left: -(slideW*cnt) },0);
                    });
                    pageBtnEventFn();
                }

                //2-1. 다음 카운트 슬라이드 함수
                function nextCountSlideFn(){
                    cnt++;
                    mainSlideFn();
                }
                //2-2. 이전 카운트 슬라이드 함수
                function prevCountSlideFn(){
                    cnt--;
                    mainSlideFn();
                }

                //3. 스와이프 다음/이전 터치 이벤트
                $slideContainer.swipe({
                    swipeLeft:  function(){
                        timerControlFn();
                        if(!$slideWrap.is(':animated')){
                            nextCountSlideFn();
                        }
                    },
                    swipeRight:  function(){
                        timerControlFn();
                        if(!$slideWrap.is(':animated')){
                            prevCountSlideFn();
                        }
                    }
                });

                //4. 페이지버튼 이벤트 함수 - 만들고 하기......
                function pageBtnEventFn(){
                    var z = cnt;
                    if(z>3){z=0}
                    if(z<0){z=3}
                    $pageBtn.removeClass('addPage');
                    $pageBtn.eq(z).addClass('addPage');
                }


                //5. 페이지버튼 클릭 이벤트 - 만들고 하기......
                //   직접 메인 함수연동
                $pageBtn.each(function(idx){
                    $(this)
                        .on('click', function(e){
                            e.preventDefault();
                            timerControlFn();
                            cnt=idx; //직접 선택한 슬라이드 번호를 이용 메인 슬라이드 함수 호출
                            mainSlideFn();
                        });
                });



                //6. 자동 실행 함수
                function autoPlayFn(){
                    setId = setInterval(nextCountSlideFn,6000);
                }

                autoPlayFn();


                //7. 타이머 콘트롤 함수
                function timerControlFn(){
                    var tcnt = 0 ;
                    clearInterval(setId);
                    clearInterval(setId2);
                    setId2 = setInterval(function(){
                        tcnt++;
                        if(tcnt>=6){
                            clearInterval(setId2);
                            nextCountSlideFn(); //6초 후 바로 실행
                            autoPlayFn(); //자동으로 6초 후에 실행
                        }
                    },1000);
                }

        },
        
        
        //로그인 페이지      
        loginSection2Fn:function(){

        }

    };

    jason.init();


})(jQuery,window,document);