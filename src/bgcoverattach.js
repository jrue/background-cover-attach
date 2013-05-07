/**
* bgCoverAttach.js -- By Jeremy Rue
*
* http://jeremyrue.com/
*
* Copyright (c) 2012 The Regents of the University of California
* Released under the GPL Version 2 license
* http://www.opensource.org/licenses/gpl-2.0.php
* This program is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/
;(function($) {
  $.bgCoverAttach = function(element, options) {

    var $element = $(element), 
      element = element,
      imgsize = {};

    var defaults = {
      parentelm : $(element).parent(),
      top       : $element.css('top'),
      left      : $element.css('left')
    }

    var plugin = this;
      plugin.settings = {};

    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      var tempurl = plugin.settings.parentelm.css('background-image').slice(4, -1);
      var tempimg = new Image();
      var console = console || { error: function() {} };

      if(plugin.settings.parentelm.css('background-size') != "cover"){
        console.error("This plugin only works with the containing element has background-size:cover");
        return false;
      }

      if(typeof tempurl !== "string"){
        console.error("No background image found on parent element");
        return false;
      }

      if(plugin.settings.top == "auto" || plugin.settings.left == "auto"){
        console.error("#" + $element.attr('id') + " needs CSS values for 'top' and 'left'");
        return false;
      }

      $(tempimg).on('load', function(){
        imgsize.width   = this.width;
        imgsize.height  = this.height;
        imageSizeDetected(imgsize.width, imgsize.height);
      });

      $(window).on('resize', function(){
          if('width' in imgsize && imgsize.width != 0){
            imageSizeDetected(imgsize.width, imgsize.height);
          }
      });
    
      tempimg.src = tempurl;
    }

    var imageSizeDetected = function(w, h) {
      var scale_h = plugin.settings.parentelm.width() / w,
          scale_v = plugin.settings.parentelm.height() / h,
          scale   = scale_h > scale_v ? scale_h : scale_v;

      $element.css({
        top   : parseInt(plugin.settings.top, 10) * scale,
        left  : parseInt(plugin.settings.left, 10) * scale
      });

    }

    plugin.init();
  }

  /**
   * later access the plugin properties like
   * element.data('bgCoverAttach').settings.propertyName
   *
   * @param {options} object Three optional properties are parentelm, top and left.
   */
  $.fn.bgCoverAttach = function(options) {
    return this.each(function() {
      if (undefined == $(this).data('bgCoverAttach')) {
        var plugin = new $.bgCoverAttach(this, options);
        $(this).data('bgCoverAttach', plugin);
      }
    });
  }
})(jQuery);