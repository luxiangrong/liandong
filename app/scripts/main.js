'use strict';
(function($) {
    $(document).ready(function() {


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
                areaDialog.width(320).show($(this).get(0));
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
        $('.switch-city').on('mouseenter', function(){
            var d = dialog({
                id: 'switch-city-dialog',
                quickClose: true,
                content: $(this).next('.other-cities').clone()
            });
            d.width(220).show($(this).get(0));
        });
        

        //首页新闻切换
        var newsHandler;
        var buildNewsSlider = function() {
            var newsItemHeight = $('.news').find('.slide li').height();
            var newsItemCount = $('.news').find('.slide li').length;
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
                current = current % newsItemCount;
                $newsElement.find('.slide li').css('top', -newsItemHeight * current + 'px');
                $newsElement.data('current', current);
            }, 3000);
        };
        buildNewsSlider();
    });
})(jQuery);