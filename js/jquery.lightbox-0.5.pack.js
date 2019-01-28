function OnloadFunction() {
  $.fn.lightBox = function(settings) {
    // alert("worck2");
    //alert('js/jquery.lightbox-0.5.pack.js');
    settings = jQuery.extend(
      {
        overlayBgColor: "#000",
        overlayOpacity: 0.8,
        fixedNavigation: false,
        imageLoading: "images/lightbox-ico-loading.gif",
        imageBtnPrev: "images/lightbox-btn-prev.gif",
        imageBtnNext: "images/lightbox-btn-next.gif",
        imageBtnClose: "images/lightbox-btn-close.gif",
        imageBlank: "images/lightbox-blank.gif",
        containerBorderSize: 10,
        containerResizeSpeed: 100,
        txtImage: "Image",
        txtOf: "of",
        keyToClose: "c",
        keyToPrev: "p",
        keyToNext: "n",
        imageArray: [],
        activeImage: 0
      },
      settings
    );
    var jQueryMatchedObj = this;
    function _initialize() {
      _start(this, jQueryMatchedObj);
      return false;
    }
    //zmiana rozmiaru przy zmianie rozmiaru okna
    //change size of picture when size of window is changed

    window.addEventListener("resize", _resize_container_image_box1);
    function _resize_container_image_box1() {
      //	alert('$.fn.lightBox=function(settings)');
      //	$.fn.lightBox=function(settings);
      //	_finish();
      _set_image_to_view();
      _resize_container_image_box(
        objImagePreloader.width,
        objImagePreloader.height
      );
      pictureResizing();
    }

    function _start(objClicked, jQueryMatchedObj) {
      $("embed, object, select").css({
        visibility: "hidden"
      });

      _set_interface();
      settings.imageArray.length = 0;
      settings.activeImage = 0;
      if (jQueryMatchedObj.length == 1) {
        settings.imageArray.push(
          new Array(
            objClicked.getAttribute("href"),
            objClicked.getAttribute("title")
          )
        );
      } else {
        for (var i = 0; i < jQueryMatchedObj.length; i++) {
          settings.imageArray.push(
            new Array(
              jQueryMatchedObj[i].getAttribute("href"),
              jQueryMatchedObj[i].getAttribute("title")
            )
          );
        }
      }
      while (
        settings.imageArray[settings.activeImage][0] !=
        objClicked.getAttribute("href")
      ) {
        settings.activeImage++;
      }
      _set_image_to_view();
    }

    function _set_interface() {
      $("body").append(
        '<div id="jquery-overlay"></div>' +
          '<div id="jquery-lightbox">' +
          '<div id="lightbox-container-image-box">' +
          '<div id="lightbox-container-image"><img id="lightbox-image">' +
          '<div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div>' +
          '<div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' +
          settings.imageLoading +
          '"></a></div>' +
          "</div>" +
          "</div>" +
          '<div id="lightbox-container-image-data-box">' +
          '<div id="lightbox-container-image-data">' +
          '<div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div>' +
          '<div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' +
          settings.imageBtnClose +
          '"></a></div>' +
          "</div>" +
          "</div>" +
          "</div>"
      );
      var arrPageSizes = ___getPageSize();
      $("#jquery-overlay")
        .css({
          backgroundColor: settings.overlayBgColor,
          opacity: settings.overlayOpacity,
          width: arrPageSizes[0],
          height: arrPageSizes[1]
        })
        .fadeIn();
      var arrPageScroll = ___getPageScroll();
      $("#jquery-lightbox")
        .css({
          top: arrPageScroll[1] + arrPageSizes[3] / 10,
          left: arrPageScroll[0]
        })
        .show();
      /*	$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').addEventListener("click", rot);
				function rot(){
					alert('sdfsd');
				}*/
      /*	$('#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext').click(function()
					{
					alert('sdfsd');
				}
			);*/
      $("#jquery-overlay,#jquery-lightbox").click(function() {
        _finish();
      });
      $("#lightbox-loading-link,#lightbox-secNav-btnClose").click(function() {
        _finish();
        return false;
      });
      $(window).resize(function() {
        var arrPageSizes = ___getPageSize();
        $("#jquery-overlay").css({
          width: arrPageSizes[0],
          height: arrPageSizes[1]
        });
        var arrPageScroll = ___getPageScroll();
        $("#jquery-lightbox").css({
          top: arrPageScroll[1] + arrPageSizes[3] / 10,
          left: arrPageScroll[0]
        });
      });
    }
    function _set_image_to_view() {
      $("#lightbox-loading").show();
      if (settings.fixedNavigation) {
        $(
          "#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber"
        ).hide();
      } else {
        $(
          "#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber"
        ).hide();
      }
      var objImagePreloader = new Image();

      objImagePreloader.onload = function() {
        $("#lightbox-image").attr(
          "src",
          settings.imageArray[settings.activeImage][0]
        );
        _resize_container_image_box(
          objImagePreloader.width,
          objImagePreloader.height
        );
        objImagePreloader.onload = function() {};
      };
      objImagePreloader.src = settings.imageArray[settings.activeImage][0];
    }

    ////////////////////////////////////////////////////////////////////////////////////
    /////////////           ///////////////           //////////////            ////////
    /////////////////////////////////////////////////////////////////////////////////////////
    function _resize_container_image_box(intImageWidth, intImageHeight) {
      var intCurrentWidth = $("#lightbox-container-image-box").width(); //ширина контейнера в якому є зображення і навігація
      var intCurrentWidth2 = $("#jquery-lightbox").width(); //ширина контейнера в якому є все (головний div)
      var intCurrentWidth3 = $("#lightbox-container-image").width(); //ширина контейнера в якому безпосередньо є зображення
      var intCurrentHeight = $("#lightbox-container-image-box").height();
      var intCurrentWidth4 = $("#lightbox-image").width(); //ширана для того щоб визначити форму зображення
      var intCurrentHeight2 = $("#lightbox-image").height();
      var intWidth = intImageWidth + settings.containerBorderSize * 2;
      //var intWidth=$('#jquery-lightbox').width();
      var intHeight = intImageHeight + settings.containerBorderSize * 2;
      var intDiffW = intCurrentWidth - intWidth;
      var intDiffH = intCurrentHeight - intHeight;

      $("#lightbox-container-image-box").animate(
        {
          width: intCurrentWidth2,
          height: intHeight
        },
        settings.containerResizeSpeed,
        function() {
          _show_image();
        }
      );

      /*	if(	intCurrentHeight2>intCurrentWidth4){
				alert("Hello! I am an alert box!!");
			$('#lightbox-container-image').addClass('rotIm');
			$(' #lightbox-image').css({
				'height':intCurrentHeight-40,
				'border':'3px yellow solid'
			});
		}else{
			$('#lightbox-container-image').removeClass('rotIm');
		}*/
      if ($(window).width() < 1200) {
        $("#lightbox-image")({
          bottom: "+=5",
          width: intCurrentWidth
        });
      }
      if ($(window).height() < 900 || $(window).width() < 900) {
        $("#lightbox-nav")({
          height: intCurrentHeight2
        });
        $("#lightbox-container-image-box")({
          height: intCurrentHeight2 - 40
        });

        //	#lightbox-container-image-data
        $("#lightbox-container-image-data").css({
          width: intCurrentWidth2 - 30
        });
      }
      if (intDiffW === 0 && intDiffH === 0) {
        if ($.browser.msie) {
          ___pause(250);
        } else {
          ___pause(100);
        }
      }
      $("#lightbox-container-image-data-box").css({
        width: intCurrentWidth2
      });
      $("#lightbox-nav-btnPrev,#lightbox-nav-btnNext").css({
        height: intCurrentHeight2
      });
    }

    ////////////////////////////////////////////////////////////////////////////////////
    /////////////           ///////////////           //////////////            ////////
    /////////////////////////////////////////////////////////////////////////////////////////
    function pictureResizing() {
      var intCurrentWidth4 = $("#lightbox-image").width();
      var intCurrentHeight2 = $("#lightbox-image").height();
      var intCurrentHeight = $("#lightbox-container-image-box").height();
      var intCurrentScreenWidth = window.innerWidth - 50;
      if (intCurrentScreenWidth < 400 && intCurrentHeight2 < intCurrentWidth4) {
        $("#lightbox-image").css({
          width: intCurrentScreenWidth + 20,
          height: "auto",
          "-ms-width": intCurrentScreenWidth + 20,
          "-ms-height": "auto",
          "-webkit-width": intCurrentScreenWidth + 20,
          "-webkit-height": "auto",
          "-o-width": intCurrentScreenWidth + 20,
          "-o-height": "auto",
          "-moz-width": intCurrentScreenWidth + 20,
          "-moz-height": "auto"
          //			'border':'3px red solid'
        });
      } else if (
        intCurrentScreenWidth < 900 &&
        intCurrentHeight2 < intCurrentWidth4
      ) {
        $("#lightbox-image").css({
          width: intCurrentScreenWidth - 40,
          height: "auto",
          "-ms-width": intCurrentScreenWidth - 40,
          "-ms-height": "auto",
          "-webkit-width": intCurrentScreenWidth - 40,
          "-webkit-height": "auto",
          "-o-width": intCurrentScreenWidth - 40,
          "-o-height": "auto",
          "-moz-width": intCurrentScreenWidth - 40,
          "-moz-height": "auto"
          //		'border':'3px red solid'
        });
      } else if (
        intCurrentHeight2 < intCurrentWidth4 &&
        intCurrentScreenWidth < intCurrentWidth4
      ) {
        //alert(intCurrentScreenWidth);
        /*	alert(intCurrentWidth4);
					alert(intCurrentScreenWidth);*/
        //	$('#lightbox-container-image').addClass('rotIm');
        $("#lightbox-image").css({
          width: intCurrentScreenWidth - 10,
          height: "auto",
          "-ms-width": intCurrentScreenWidth - 10,
          "-ms-height": "auto",
          "-webkit-width": intCurrentScreenWidth - 10,
          "-webkit-height": "auto",
          "-o-width": intCurrentScreenWidth - 10,
          "-o-height": "auto",
          "-moz-width": intCurrentScreenWidth - 10,
          "-moz-height": "auto"
          //		/*'border':'3px red solid'*/
        });
      } else {
        /*		alert(intCurrentWidth4);*/
        //	alert("tyt");
        //	$('#lightbox-container-image').removeClass('rotIm');
        $("#lightbox-image").css({
          width: "auto",
          height: intCurrentHeight - 40,
          "-ms-width": "auto",
          "-ms-height": intCurrentHeight - 40,
          "-webkit-width": "auto",
          "-webkit-height": intCurrentHeight - 40,
          "-o-width": "auto",
          "-o-height": intCurrentHeight - 40,
          "-moz-width": "auto",
          "-moz-height": intCurrentHeight - 40
          //	/*	'border':'3px yellow solid'*/
        });
        //}
      }
    }
    function sizePassing() {}
    function _show_image() {
      pictureResizing();
      $("#lightbox-loading").hide();
      $("#lightbox-image").fadeIn(function() {
        _show_image_data();
        _set_navigation();
      });
      _preload_neighbor_images();
    }
    function _show_image_data() {
      $("#lightbox-container-image-data-box").slideDown("fast");
      $("#lightbox-image-details-caption").hide();
      if (settings.imageArray[settings.activeImage][1]) {
        $("#lightbox-image-details-caption")
          .html(settings.imageArray[settings.activeImage][1])
          .show();
      }
      if (settings.imageArray.length > 1) {
        $("#lightbox-image-details-currentNumber")
          .html(
            settings.txtImage +
              " " +
              (settings.activeImage + 1) +
              " " +
              settings.txtOf +
              " " +
              settings.imageArray.length
          )
          .show();
      }
    }
    function _set_navigation() {
      $("#lightbox-nav").show();
      $("#lightbox-nav-btnPrev,#lightbox-nav-btnNext").css({
        background: "transparent url(" + settings.imageBlank + ") no-repeat"
      });
      if (settings.activeImage !== 0) {
        if (settings.fixedNavigation) {
          $("#lightbox-nav-btnPrev")
            .css({
              background:
                "url(" + settings.imageBtnPrev + ") left 15% no-repeat"
            })
            .unbind()
            .bind("click", function() {
              settings.activeImage = settings.activeImage - 1;
              _set_image_to_view();
              return false;
            });
        } else {
          $("#lightbox-nav-btnPrev")
            .unbind()
            .hover(
              function() {
                $(this).css({
                  background:
                    "url(" + settings.imageBtnPrev + ") left 15% no-repeat"
                });
              },
              function() {
                $(this).css({
                  background:
                    "transparent url(" + settings.imageBlank + ") no-repeat"
                });
              }
            )
            .show()
            .bind("click", function() {
              settings.activeImage = settings.activeImage - 1;
              _set_image_to_view();
              return false;
            });
        }
      }
      if (settings.activeImage != settings.imageArray.length - 1) {
        if (settings.fixedNavigation) {
          $("#lightbox-nav-btnNext")
            .css({
              background:
                "url(" + settings.imageBtnNext + ") right 15% no-repeat"
            })
            .unbind()
            .bind("click", function() {
              settings.activeImage = settings.activeImage + 1;
              _set_image_to_view();
              return false;
            });
        } else {
          $("#lightbox-nav-btnNext")
            .unbind()
            .hover(
              function() {
                $(this).css({
                  background:
                    "url(" + settings.imageBtnNext + ") right 15% no-repeat"
                });
              },
              function() {
                $(this).css({
                  background:
                    "transparent url(" + settings.imageBlank + ") no-repeat"
                });
              }
            )
            .show()
            .bind("click", function() {
              settings.activeImage = settings.activeImage + 1;
              _set_image_to_view();
              return false;
            });
        }
      }
      _enable_keyboard_navigation();
    }
    function _enable_keyboard_navigation() {
      $(document).keydown(function(objEvent) {
        _keyboard_action(objEvent);
      });
    }
    function _disable_keyboard_navigation() {
      $(document).unbind();
    }
    function _keyboard_action(objEvent) {
      if (objEvent === null) {
        keycode = event.keyCode;
        escapeKey = 27;
      } else {
        keycode = objEvent.keyCode;
        escapeKey = objEvent.DOM_VK_ESCAPE;
      }
      key = String.fromCharCode(keycode).toLowerCase();
      if (key == settings.keyToClose || key == "x" || keycode == escapeKey) {
        _finish();
      }
      if (key == settings.keyToPrev || keycode == 37) {
        if (settings.activeImage !== 0) {
          settings.activeImage = settings.activeImage - 1;
          _set_image_to_view();
          _disable_keyboard_navigation();
        }
      }
      if (key == settings.keyToNext || keycode == 39) {
        if (settings.activeImage != settings.imageArray.length - 1) {
          settings.activeImage = settings.activeImage + 1;
          _set_image_to_view();
          _disable_keyboard_navigation();
        }
      }
    }
    function _preload_neighbor_images() {
      if (settings.imageArray.length - 1 > settings.activeImage) {
        objNext = new Image();
        objNext.src = settings.imageArray[settings.activeImage + 1][0];
      }
      if (settings.activeImage > 0) {
        objPrev = new Image();
        objPrev.src = settings.imageArray[settings.activeImage - 1][0];
      }
    }
    function _finish() {
      $("#jquery-lightbox").remove();
      $("#jquery-overlay").fadeOut(function() {
        $("#jquery-overlay").remove();
      });
      $("embed, object, select").css({
        visibility: "visible"
      });
    }
    function ___getPageSize() {
      var xScroll, yScroll;
      if (window.innerHeight && window.scrollMaxY) {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY;
      } else if (document.body.scrollHeight > document.body.offsetHeight) {
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
      } else {
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
      }
      var windowWidth, windowHeight;
      if (self.innerHeight) {
        if (document.documentElement.clientWidth) {
          windowWidth = document.documentElement.clientWidth;
        } else {
          windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
      } else if (
        document.documentElement &&
        document.documentElement.clientHeight
      ) {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
      } else if (document.body) {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
      }
      if (yScroll < windowHeight) {
        pageHeight = windowHeight;
      } else {
        pageHeight = yScroll;
      }
      if (xScroll < windowWidth) {
        pageWidth = xScroll;
      } else {
        pageWidth = windowWidth;
      }
      arrayPageSize = new Array(
        pageWidth,
        pageHeight,
        windowWidth,
        windowHeight
      );
      return arrayPageSize;
    }
    function ___getPageScroll() {
      var xScroll, yScroll;
      if (self.pageYOffset) {
        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;
      } else if (
        document.documentElement &&
        document.documentElement.scrollTop
      ) {
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
      } else if (document.body) {
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
      }
      arrayPageScroll = new Array(xScroll, yScroll);
      return arrayPageScroll;
    }
    function ___pause(ms) {
      var date = new Date(),
        curDate = null;
      do {
        curDate = new Date();
      } while (curDate - date < ms);
    }
    return this.unbind("click").click(_initialize);
  };
}
$(document).ready(OnloadFunction);
