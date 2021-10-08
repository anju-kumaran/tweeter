$(document).ready(function() {

  // To check the length of tweet text area is less than 140 limit
  $('#tweet-text').on('keyup', function(event) {
    
    const len = $(this).val().length;
    $('.counter').text(140 - len);

    if (len <= 140) {
      $('.counter').removeClass("exceed-limit");
    } else {
      $('.counter').addClass("exceed-limit");
    }
  });

});