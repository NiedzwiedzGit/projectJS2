$(document).ready(function() {
  $(".container .go").click(function() {
    $(".leftSideContent").load("pages/" + $(this).attr("name") + ".php");
  });
});
