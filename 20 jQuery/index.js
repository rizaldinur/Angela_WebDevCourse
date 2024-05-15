$("h1").addClass("big-title");
$("p").addClass("big-text");
$("p:first").addClass("first-text");

$(".big-text:first").text("Im first paragraph");

$(".big-text:first").html("<em>Im first paragraph");

console.log($("script:last").attr("src"));

//event handling
$("input").keydown(function (e) {
  console.log(e.key);
  $(".big-title").text(e.key);
});

//add or remove element
$("h1").after("<button>New</button>");
$("button:first").remove();

//animate on event "click"
$("button:nth(2)").on("click", function () {
  $(".big-title").fadeToggle();
});

//custom animation
$("button:first, button:nth(1)").on("click", function () {
  $(".big-title").animate({
    opacity: 0.5,
  });
});

$("button:last").on("click", function () {
  $(".big-title").slideUp().slideDown().animate({
    opacity: 0.5,
  });
});
