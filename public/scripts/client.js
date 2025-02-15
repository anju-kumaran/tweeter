$(document).ready(function() {
  
  // To make a request to /tweets and receive the array of tweets as JSON
  const loadtweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        console.log("data:", tweets)
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  };

  const renderTweets = function(tweets) {
   
    // Loops through tweets
    for (const elment in tweets) {
      const tweetData = tweets[elment];
     
      // Calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetData);
        
      // Takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet); 
    }

  }

  // To create tweet elements.
  const createTweetElement = function(tweet) {

    let $tweet = `<article class="tweet">
    <header class="tweets-header">
      <div class="user-profile">
        <div class="img-name">
        <span class="user-photo-name">
        <img class="fas fa-user-ninja" src="${tweet.user.avatars}">
      </span>
      <span class="user-profile-name">
        ${tweet.user.name}
        </span>
        </div>
        <span class="user-id">${tweet.user.handle}</span>
      </div>
      <div class="tweets-content">
      ${tweet.content.text}
      </div>
    </header>
    <footer class="tweet-desc-footer">
      <div class="tweets-time">
        <span>${timeago.format(tweet.created_at)}</span>
        <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </div>
    </footer>
    </article>
    </section>`;

    return $tweet;

  }

  $("#new-tweet-form").on("submit", function(event) {

    event.preventDefault();
    console.log('Form Submit...');

    if ($('#tweet-text').val() === '') {
      
      $('#tweet-error-long').slideUp();
      $('#tweet-error-empty').slideDown();
    } else if ($('#tweet-text').val().length > 140) {
      
      $('#tweet-error-empty').slideUp();
      $('#tweet-error-long').slideDown();
    } else {
      $('#tweet-error-long').slideUp();
      $('#tweet-error-empty').slideUp();
    
      const serializedData = $(this).serialize();

      $.post("/tweets", serializedData, (response) => {
        console.log(response);
        loadtweets();
        $('#tweet-text').val('');
        $('.counter').text(140);
      });
    }
  });
});
