/*! github.com/gillescochez/gscrollbar */
(function($){
    
    function Scrollbar(root, options){

            // help minification a bit
            var min = Math.min;
            var max = Math.max;
            var $doc = $(document);

            var $Viewport = $('<div class="viewport" />').height(root.innerHeight());
            var $Content = $('<div class="overview" />').append(root.children());
            
            $Viewport.append($Content);

            var $Scrollbar = $('<div class="scrollbar"><div class="track"><div class="thumb"></div></div></div>'); 

            var oSelf = this;
            var oWrapper = root.addClass('gscrollbar').append($Scrollbar, $Viewport);
            var oViewport = { obj: $Viewport };
            var oContent = { obj: $Content };
            var oScrollbar = { obj: $Scrollbar };
            var oTrack = { obj: $('.track', $Scrollbar) };
            var oThumb = { obj: $('.thumb', $Scrollbar) };
            var sAxis = options.axis == 'x', sDirection = sAxis ? 'left' : 'top', sSize = sAxis ? 'Width' : 'Height';
            var iScroll, iPosition = { start: 0, now: 0 }, iMouse = {};
console.log(oTrack, oThumb);
            function initialize() {	
                oSelf.update();
                setEvents();
                return oSelf;
            }
            this.update = function(sScroll) {
                oViewport[options.axis] = oViewport.obj[0]['offset'+ sSize];
                oContent[options.axis] = oContent.obj[0]['scroll'+ sSize];
                oContent.ratio = oViewport[options.axis] / oContent[options.axis];
                oScrollbar.obj.toggleClass('disable', oContent.ratio >= 1);
                oTrack[options.axis] = options.size == 'auto' ? oViewport[options.axis] : options.size;
                oThumb[options.axis] = min(oTrack[options.axis], max(0, ( options.sizethumb == 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb )));
                oScrollbar.ratio = options.sizethumb == 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);
                iScroll = (sScroll == 'relative' && oContent.ratio <= 1) ? min((oContent[options.axis] - oViewport[options.axis]), max(0, iScroll)) : 0;
                iScroll = (sScroll == 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);
                setSize();
            };
            function setSize(){
                oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
                oContent.obj.css(sDirection, -iScroll);
                iMouse['start'] = oThumb.obj.offset()[sDirection];
                var sCssSize = sSize.toLowerCase(); 
                oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
                oTrack.obj.css(sCssSize, oTrack[options.axis]);
                oThumb.obj.css(sCssSize, oThumb[options.axis]);		
            };	

            function setEvents(){
                oThumb.obj.bind('mousedown', start);
                oThumb.obj[0].ontouchstart = function(oEvent){
                    oEvent.preventDefault();
                    oThumb.obj.unbind('mousedown');
                    start(oEvent.touches[0]);
                    return false;
                };	
                oTrack.obj.bind('mouseup', drag);
                if(options.scroll && this.addEventListener){
                    oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
                    oWrapper[0].addEventListener('mousewheel', wheel, false );
                }
                else if(options.scroll){oWrapper[0].onmousewheel = wheel;}
            };

            function start(oEvent){
                iMouse.start = sAxis ? oEvent.pageX : oEvent.pageY;
                var oThumbDir = parseInt(oThumb.obj.css(sDirection));
                iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
                $doc.bind('mousemove', drag);
                 $doc[0].ontouchmove = function(oEvent){
                    $doc.unbind('mousemove');
                    drag(oEvent.touches[0]);
                };
                $doc.bind('mouseup', end);
                oThumb.obj.bind('mouseup', end);
                 oThumb.obj[0].ontouchend = $doc[0].ontouchend = function(oEvent){
                    $doc.unbind('mouseup');
                    oThumb.obj.unbind('mouseup');
                    end(oEvent.touches[0]);
                };
                return false;
            };	

            function wheel(oEvent){
                if(!(oContent.ratio >= 1)){
                    var oEvent = oEvent || window.event;
                    var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta/120 : -oEvent.detail/3;
                    iScroll -= iDelta * options.wheel;
                    iScroll = min((oContent[options.axis] - oViewport[options.axis]), max(0, iScroll));
                    oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
                    oContent.obj.css(sDirection, -iScroll);
                    
                    oEvent = $.event.fix(oEvent);
                    oEvent.preventDefault();
                };
            };

            function end(oEvent){
                $doc.unbind('mousemove', drag);
                $doc.unbind('mouseup', end);
                oThumb.obj.unbind('mouseup', end);
                $doc[0].ontouchmove = oThumb.obj[0].ontouchend = $doc[0].ontouchend = null;
                return false;
            };

            function drag(oEvent){
                if(!(oContent.ratio >= 1)){
                    iPosition.now = min((oTrack[options.axis] - oThumb[options.axis]), max(0, (iPosition.start + ((sAxis ? oEvent.pageX : oEvent.pageY) - iMouse.start))));
                    iScroll = iPosition.now * oScrollbar.ratio;
                    oContent.obj.css(sDirection, -iScroll);
                    oThumb.obj.css(sDirection, iPosition.now);
                }
                return false;
            };
            
            return initialize();
    };

    $.fn.gscrollbar = function(options, sScroll) {
        
        if (options === 'update') {
            this.data('tsb').update(sScroll);
            return this;
        };

        return this.each(function() {
            $(this).data('tsb', new Scrollbar($(this), $.extend({}, $.fn.gscrollbar.defaults, options)));
        });
    };

    $.fn.gscrollbar.defaults = {
        axis: 'y', // vertical or horizontal scrollbar? ( x || y ).
        wheel: 40,  //how many pixels must the mouswheel scroll at a time.
        scroll: true, //enable or disable the mousewheel;
        size: 'auto', //set the size of the scrollbar to auto or a fixed number.
        sizethumb: 'auto' //set the size of the thumb to auto or a fixed number.
    };	

})(jQuery);
