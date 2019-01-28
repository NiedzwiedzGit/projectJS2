$(document).ready(function() {
  $windoWidth = $(window).width();

  setInterval(function() {
    $(".leftSideContent").width($(window).width() - $(".container").width());
  }, 1000); // 1000 м.сек
  $(window).on("load resize", function() {
    $(".leftSideContent").width($(window).width() - $(".container").width());
    $windoWidth = $(window).width();
    if ($windoWidth <= 800) {
      $(".text").hide("slow");
      //$(".material-icons").show("slow");
    } else {
      $(".text").show("slow");
      // $(".material-icons").hide("slow");
    }
  });
});
