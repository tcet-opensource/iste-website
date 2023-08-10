(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
// Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

//NavBar Active Link
$(document).ready(function(){
    $('a').on('click',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })
})
// const activePage = window.location.href;
// const navLinks = document.querySelectorAll('nav a').forEach(link => {
//   if(link.href.includes(`${activePage}`)){
//     link.classList.add('active');
//   }
// })


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);
function changeToDarkMode(settings) {
    const element = document.body;
    element.classList.toggle("dark-mode");
    if (settings && settings.smooth_transition) {
        element.classList.toggle("smooth-transition");
    }
}
function toggleDarkMode(checkbox) {
    if (checkbox.checked) {
      // Enable dark mode
      document.body.classList.add('dark-mode');
    } else {
      // Disable dark mode
      document.body.classList.remove('dark-mode');
    }
  }
  // Function to toggle dark mode and save user preference
function toggleDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = darkModeToggle.checked;
    
    // Save the user's preference in Local Storage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Call a function to apply the dark mode styles
    applyDarkModeStyles(isDarkMode);
  }
  
  // Function to apply dark mode styles based on the user's preference
  function applyDarkModeStyles(isDarkMode) {
    // Add or remove the dark mode styles based on the user's preference
    if (isDarkMode) {
      // Apply dark mode styles
      document.body.classList.add('dark-mode');
    } else {
      // Remove dark mode styles
      document.body.classList.remove('dark-mode');
    }
  }
  
  // Check if the user's preference for dark mode is stored in Local Storage
  const isDarkModeStored = localStorage.getItem('darkMode');
  if (isDarkModeStored !== null) {
    // Apply dark mode styles based on the user's stored preference
    applyDarkModeStyles(isDarkModeStored === 'true');
  }
