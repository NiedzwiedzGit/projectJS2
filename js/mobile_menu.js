$(document).ready(function() {
  var touch = $("#resp-menu");
  var menu = $("#header");

  $(touch).on("click", function(e) {
    e.preventDefault();
    menu.slideToggle();
  });

  $(window).resize(function() {
    var w = $(window).width();
    if (w > 900 && menu.is(":hidden")) {
      menu.removeAttr("link");
    }
  });
});
