!(function ($) {
  "use strict";

  // Theme switch toggle
  $(".switch").on("click", function () {
    $("body").toggleClass("light");
    $(".switch").toggleClass("switched");
  });

  $(document).ready(function () {
    const path = document.querySelector(".progress-wrap path");
    const pathLength = path.getTotalLength();

    // Setup the path
    path.style.transition = path.style.WebkitTransition = "none";
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength;
    path.getBoundingClientRect(); // Force reflow
    path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 10ms linear";

    // Scroll progress function
    const updateProgress = function () {
      const scroll = $(window).scrollTop();
      const height = $(document).height() - $(window).height();
      const progress = pathLength - (scroll * pathLength) / height;
      path.style.strokeDashoffset = progress;
    };

    updateProgress();
    $(window).scroll(updateProgress);

    // Show/hide scroll-to-top button
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 50) {
        $(".progress-wrap").addClass("active-progress");
      } else {
        $(".progress-wrap").removeClass("active-progress");
      }
    });

    // Scroll to top on click
    $(".progress-wrap").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 550);
      return false;
    });
  });
})(jQuery);
