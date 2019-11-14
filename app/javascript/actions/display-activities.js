const displayActivities = () => {
  $(document).ready(function(){
    $(".content").slice(0, 16).show();
    $("#loadMore").on("click", function(e){
      e.preventDefault();
      $(".content:hidden").slice(0, 16).slideDown();
      if($(".content:hidden").length == 0) {
        $("#loadMore").text("").addClass("noContent");
      }
    });
  });
}

export {displayActivities};
