(function ($) {
  'use strict';
  var count = 0;
  var activityStatus = "Active";
  
  $('#ad').click(function(){
    count++;
    display();
  });
  
  function calculateAdVisibility() {
    var windowHeight = $(window).height(),  // REF: https://www.programering.com/a/MTM2QTNwATA.html
      windowWidth = $(window).width(),
      docScrollTop = $(document).scrollTop(),
      docScrollLeft = $(document).scrollLeft(),
      divOffsetTop =$('#ad').offset().top,
      divOffsetLeft =$('#ad').offset().left,
      divHeight = $('#ad').height(),
      divWidth = $('#ad').width(),
      hiddenBeforeTop = docScrollTop - divOffsetTop,
      hiddenBeforeLeft = docScrollLeft - divOffsetLeft,
      hiddenAfterTop = (divOffsetTop + divHeight) - (docScrollTop + windowHeight),
      hiddenAfterLeft = (divOffsetLeft + divWidth) - (docScrollLeft + windowWidth);
          
    if ((docScrollTop > divOffsetTop + divHeight) || 
        (divOffsetTop > docScrollTop + windowHeight) ||
        (docScrollLeft > divOffsetLeft + divWidth) ||
        (divOffsetLeft > docScrollLeft + windowWidth)) {
        return 0;
    }
    else {
      var result = 100;
      if (hiddenBeforeTop > 0) {
        result -= (hiddenBeforeTop * 100) / divHeight;
      }
      if (hiddenBeforeLeft > 0) {
          result -= (hiddenBeforeLeft * 100) / divWidth;
      }
      if (hiddenAfterTop > 0) {
        result -= (hiddenAfterTop * 100) / divHeight;
      }
      if (hiddenAfterLeft > 0) {
        result -= (hiddenAfterLeft * 100) / divWidth;
      }
      return result;
    }
  }

  function display() {
    let resultString = "Meetrics: \n Ad clicked: " +count+ " times \n Visibility:" +Math.round(calculateAdVisibility())+ "% \n " +activityStatus;
    $('p').text(resultString);
  }

  $(document).scroll(function () {
    display();
  });

  $(document).ready(function () {
    display();
  });

  if (typeof document.hidden === undefined) {   // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
    console.log("This test requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } 
  else {
    $(document).bind('visibilitychange', function() {
      if (document.hidden) {
        document.title = "Visibility Disable";
        // We can either reset the ad metrics counter here but I'm not sure if it makes sense! Please advise.
      }
      else {
        // document.title = $(document).find("title").text();
        document.title = "Ad Detection";
      }
    })
  }

  $(document).inactivity({    // https://github.com/afklondon/jquery.inactivity.git
    timeout: 12000,
    mouse: true, 
    keyboard: false,
    touch: false,
    customEvents: "customEventName",
    triggerAll: true,
  });

  $(document).on("activity", function() {
    activityStatus = "Active";
    display();
  });
  
  $(document).on("inactivity", function() {
    activityStatus = "Inactive";
    display();
  });
}(jQuery));