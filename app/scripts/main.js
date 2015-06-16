'use strict';
(function($) {
    $(document).ready(function() {
        //首页banner切换
        var currentIndex = $('.banner-image-wrap img.current').index();
        if(currentIndex === -1) {
            $('.banner-image-wrap img').eq(0).addClass('current');
        }
        var nextBanner = function() {
            var length = $('.banner-image-wrap img').length;

            if(length == 1) {
                return;
            }

            var currentIndex = $('.banner-image-wrap img.current').index();

            currentIndex = currentIndex === -1 ? 0 : currentIndex;

            $('.banner-image-wrap img').eq(currentIndex).animate({
                opacity: 0
            }, {
                duration: 800,
                complete: function() {
                    $('.banner-image-wrap img').removeClass('current');
                }
            });
            $('.banner-image-wrap img').eq((currentIndex + 1 ) % length).animate({
                opacity: 1
            },{
                duration: 800,
                complete: function(){
                    $('.banner-image-wrap img').eq((currentIndex + 1 ) % length).addClass('current');
                }
            });
        };
        var prevBanner = function() {
            var length = $('.banner-image-wrap img').length;
            if(length == 1) {
                return;
            }
            var currentIndex = $('.banner-image-wrap img.current').index();
            currentIndex = currentIndex === -1 ? 0 : currentIndex;

            $('.banner-image-wrap img').eq(currentIndex).animate({
                opacity: 0
            }, {
                duration: 800,
                complete: function() {
                    $('.banner-image-wrap img').removeClass('current');
                }
            });
            $('.banner-image-wrap img').eq((currentIndex - 1 ) % length).animate({
                opacity: 1
            },{
                duration: 800,
                complete: function(){
                    $('.banner-image-wrap img').eq((currentIndex - 1 ) % length).addClass('current');
                }
            });
        };
        var bannerSwitchHandler = window.setInterval(function(){
            nextBanner();
        }, 5000);
        $('.banner-image-wrap .controls .prev').on('click', function(){
            prevBanner();
        });
        $('.banner-image-wrap .controls .next').on('click', function(){
            nextBanner();
        });
        $('.banner-image-wrap .controls .prev, .banner-image-wrap .controls .next').hover(function(){
            clearInterval(bannerSwitchHandler);
        }, function(){
            bannerSwitchHandler = window.setInterval(function(){
                nextBanner();
            }, 5000);
        });

        //主导航底部的指示条效果，复杂
        $('.directive li').on('mouseenter.directive', function() {
            if ($(this).is('.directive-bar, .split')) {
                return;
            }
            var width = $(this).width();
            var pos = $(this).position();
            $('.directive .directive-bar').velocity({
                width: width,
                left: pos.left
            }, {
                duration: 500,
                queue: false
            });
        });
        $('.directive').on('mouseleave', function() {
            if ($(this).is('.directive-bar, .split')) {
                return;
            }
            var active = $(this).find('li.active');
            var width = active.width();
            var pos = active.position();
            $('.directive .directive-bar').velocity({
                width: width,
                left: pos.left
            }, {
                duration: 500,
                queue: false
            });
        });
        (function(){
            var active = $('.directive li.active');
            var width = active.width();
            var pos = active.position();
            $('.directive .directive-bar').find('.glyphicon').show();
            $('.directive .directive-bar').velocity({
                width: width,
                left: pos.left
            }, {
                duration: 0,
                queue: false
            });
        })();

        //banner处地区导航的，弹出层效果
        var areaDialog;
        var areaNode;
        $('.area-wrap .area').hover(function() {
            areaDialog = dialog.get('area-dialog');
            if (areaDialog === undefined) {
                areaDialog = dialog({
                    id: 'area-dialog',
                    align: 'top',
                    skin: 'area-dialog',
                    content: $(this).find('.popup-info').clone()
                });
            }

            if ($(this).find('.popup-info').length === 1) {
                areaDialog.width(320).show($(this).get(0)).focus();
            }
        }, function(e) {
            var node = $(this).get(0);
            var dialogBoundingRect = areaDialog.node.getBoundingClientRect();
            // console.log(dialogBoundingRect);
            // console.log(e.pageX);
            if (e.clientX >= dialogBoundingRect.left && e.clientX <= dialogBoundingRect.right && e.clientY <= dialogBoundingRect.bottom + 30 && e.clientY >= dialogBoundingRect.top) {
                $(areaDialog.node).on('mouseleave', function(e2) {
                    var nodeBoundingRect = node.getBoundingClientRect();
                    if (e2.clientX >= nodeBoundingRect.left && e2.clientX <= nodeBoundingRect.right && e2.clientY <= nodeBoundingRect.bottom + 10 && e2.clientY >= nodeBoundingRect.top) {

                    } else {
                        areaDialog.close().remove();
                    }
                });
            } else {
                areaDialog.close().remove();
            }

        });

        
        //切换城市
        // $('.switch-city').on('mouseenter', function(){
        //     var d = dialog({
        //         id: 'switch-city-dialog',
        //         quickClose: true,
        //         content: $(this).next('.other-cities').clone()
        //     });
        //     d.width(220).show($(this).get(0)).focus();
        // });
        

        //首页新闻切换
        var newsHandler;
        var buildNewsSlider = function() {
            var newsItemHeight = $('.news').find('.slide li').height();
            var newsItemCount = $('.news').find('.slide li').length;
            $('.news .slide').append($('.news').find('.slide li').clone());
            $('.news').find('.slide').height(newsItemHeight);
            $('.news .controls .next').on('click', function() {
                var $newsElement = $(this).closest('.news');
                var current = $newsElement.data('current') || 0;
                current++;
                current = current % newsItemCount;
                $newsElement.find('.slide li').css('top', -newsItemHeight * current + 'px');
                $newsElement.data('current', current);
            });
            $('.news .controls .prev').on('click', function() {
                var $newsElement = $(this).closest('.news');
                var current = $newsElement.data('current') || 0;
                current = current == 0 ? newsItemCount : current;
                current--;
                current = current % newsItemCount;
                $newsElement.find('.slide li').css('top', -newsItemHeight * current + 'px');
                $newsElement.data('current', current);
            });

            newsHandler = window.setInterval(function() {
                var $newsElement = $('.news');
                var current = $newsElement.data('current') || 0;
                current++;

                if(current == newsItemCount) {
                    console.log('linjie');
                    $newsElement.find('.slide li').css('top', -newsItemHeight * current + 'px');
                    window.setTimeout(function(){
                        $newsElement.find('.slide li').addClass('no-transition');
                        $newsElement.find('.slide li').css('top', '0px')
                        window.setTimeout(function(){
                            $newsElement.find('.slide li').removeClass('no-transition');
                        }, 500);
                    }, 500);
                    current = 0;
                } else {
                    $newsElement.find('.slide li').css('top', -newsItemHeight * current + 'px');
                }

                // current = current % newsItemCount;
                // $newsElement.find('.slide li').css('top', -newsItemHeight * current + 'px');
                $newsElement.data('current', current);
            }, 3000);
        };
        buildNewsSlider();

        //关于我们页面左侧导航
        $('.side-nav > li a').on('click', function(e){
            if($(this).next('.sub').length == 0) {
                return;
            } else {
                e.preventDefault();
                var subNav = $(this).next('.sub');
                $(this).find('.iconfont').toggleClass('icon-crmtubiao34 icon-jiantou');
                if(subNav.is(':visible')) {
                    subNav.velocity('slideUp');
                } else {
                    subNav.velocity('slideDown');
                }
            }
        });

        $(window).on('scroll', function(){
            if($(this).scrollTop() > $(window).height()/2) {
                $('.lift').show();
            } else {
                $('.lift').hide();
            }
        });

        $('.lift').on('click', function(e){
            e.preventDefault();
            $('body').velocity('scroll');
        });
    });
})(jQuery);