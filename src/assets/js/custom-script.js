/* Font size change functionality */

$(document).ready(function() {
  var $affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, h1 small");

  $affectedElements.each(function(){
    var $this = $(this);
    $this.data("orig-size", $this.css("font-size"));
  });

  var increaseCounter = 0;
  var decreaseCounter = 0;

  $("#btn-increase").click(function(){
    if (increaseCounter < 5) {
      changeFontSize(1);
      increaseCounter++;
    }
    if (increaseCounter >= 5) {
      $(this).prop('disabled', true);
    }
  });

  $("#btn-decrease").click(function(){
    if (decreaseCounter < 5) {
      changeFontSize(-1);
      decreaseCounter++;
    }
    if (decreaseCounter >= 5) {
      $(this).prop('disabled', true);
    }
  });

  $("#btn-orig").click(function(){
    $affectedElements.each(function(){
      var $this = $(this);
      $this.css("font-size", $this.data("orig-size"));
    });
    increaseCounter = 0;
    decreaseCounter = 0;
    $("#btn-increase").prop('disabled', false);
    $("#btn-decrease").prop('disabled', false);
  });

  function changeFontSize(direction){
    $affectedElements.each(function(){
      var $this = $(this);
      var currentFontSize = parseInt($this.css("font-size"));
      $this.css("font-size", (currentFontSize + direction) + "px");
    });
  }
});
/* Ends Font size JS */
