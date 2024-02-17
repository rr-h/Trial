const $ = require('jquery');


$(document).ready(function(){
  
  // Toggle cards
  
  $(".card__toggle-btn").click(function(e){
    
    e.preventDefault();
    
    $(this).parents(".card").toggleClass("is-expanded");
    
    var getChildren = $(this).parents(".card").children();
    
    var totalHeight = 0;
    
    $(getChildren).each(function() {
      
      var getHeight = $(this).outerHeight();
      
      totalHeight += getHeight;
      
      console.log(totalHeight);
      
    });
    
    if ( $(this).parents(".card").hasClass("is-expanded") == true ) {
      
      $(this).parents(".card").css("height", (totalHeight - 76));
      $(this).parents(".card").find(".card__toggle-btn").text("Less information");
      
    } else if ( $(this).parents(".card").hasClass("is-expanded") == false ) {
      
      $(this).parents(".card").css("height", "400px");
      $(this).parents(".card").find(".card__toggle-btn").text("More information");
      
    }
    
    
    
    //console.log(getChildren);

  });
  
  // Toggle expand and collapsed states from button
  
  $(".figure-list__btn").click(function(e){
    
    e.preventDefault();
    
    $(this).parents(".figure-list").toggleClass("is-collapsed");
    $(this).siblings(".figure-list__body").toggleClass("figure-list--preview");
    
    // Scroll to top of .figure-list on toggle

    var anchor = $(this).parents(".figure-list").attr("id");     
    var anchorOffset = $("#" + anchor).offset().top - 16;

    $(document).scrollTop(anchorOffset);  
    
    // Change button label on toggle
    
    var btnLabel = $(this).text();
    
    if ( btnLabel == "Shrink images" ) {
      var newLabel = "Expand images";
    } else if ( btnLabel == "Expand images" ) {
      var newLabel = "Shrink images";
    }
    
    $(this).text(newLabel);
      
  });
  
  // Toggle expand and collapsed states from image
  
  $(".figure-list__figure").click(function() {
    
    $(this).parents(".figure-list").toggleClass("is-collapsed");
    $(this).parents(".figure-list__body").toggleClass("figure-list--preview");
      
    if($(this).parents(".figure-list").hasClass("is-collapsed") == false) {
      
      // Scroll to top of clicked image on expand

      var anchor = $(this).attr("id");     
      var anchorOffset = $("#" + anchor).offset().top - 16;

      $(document).scrollTop(anchorOffset);  

    } else {
      
      // Scroll to top of .figure-list on collapse

      var anchor = $(this).parents(".figure-list").attr("id");     
      var anchorOffset = $("#" + anchor).offset().top - 16;

      $(document).scrollTop(anchorOffset);  

    }
    
    // Change button label on image click
    
    var btn = $(this).parents(".figure-list").find(".figure-list__btn");
    var btnLabel = $(btn).text();
    
    if ( btnLabel == "Shrink images" ) {
      var newLabel = "Expand images";
    } else if ( btnLabel == "Expand images" ) {
      var newLabel = "Shrink images";
    }
    
    $(btn).text(newLabel);
    
  });
  
  // Count and add numeric classes to each figure list and child figures

  $(".figure-list").each(function(i) {
    
    var figureLength = $(this).find("figure").length; 
    var figureListClass = "has-" + (figureLength);
    
    // Add .has-n to .figure-list
    
    $(this).addClass(figureListClass);
    
    // Find children and replace .figure-list__figure with .figure-list__figure-n
    
    $(this).find(".figure-list__figure").each(function(i) {

      //$(this).toggleClass("figure-list__figure");
      $(this).addClass("figure-" + (i+1));
      
    });
    
    // Get caption text
    
    var getCaptions = $(this).find(".figure-list__caption");

    // Make captions into list items

    var captionListItems = $(getCaptions).map(function(i) {

      var captionListItem = $("<li>").text($(this).text()).get();

      return captionListItem;

    });

    // Insert list before button

    var captionList = $("<ul>").html(captionListItems).addClass("figure-list__captions");

    $(this).find(".figure-list__btn").before(captionList);
    
    // Test
    
    // console.log("Figure list " + (i+1) + " has " + figureLength + " images");

  });
  
  // Style scrollable table container
  
  var countCol = $(".table__horizontal-scroll-container table").find(".col-label").length;
  var tableWidth = countCol * 250;
  
  console.log(countCol + " cols");
  
  // Set table width explicitly
  //$(".table__horizontal-scroll-container table").width(tableWidth);
  
  // Find the scroll depth
  
  var containerWidth = $(".table__horizontal-scroll-container").width();
  
  // Calculate visible columns
  
  var calcCols = containerWidth / 250;
  var visCols = Math.floor(calcCols);
  
  // Get current scroll position
  
  var initOffset = $(".table__horizontal-scroll-container table").offset().left;
  
  // Make labels sticky
  
  $(".table__horizontal-scroll-container .tr-label").offset({left: initOffset});
  
  // Reset sticky labels on window resize
  
  $(window).resize(function() {
    
    var initOffset = $(".table__horizontal-scroll-container table").offset().left;
    
    $(".table__horizontal-scroll-container .tr-label").offset({left: initOffset});
    
  });
  
  // Reset sticky labels on scroll
  
  $(".table__horizontal-scroll-container").scroll(function() {
    
    $(this).find(".tr-label").offset({left: initOffset});
    
  });

});

