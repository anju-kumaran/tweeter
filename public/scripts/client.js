$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
   
    // loops through tweets
    for (const elment in tweets) {
    
      const tweetData = tweets[elment];
     
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetData);
        
      // takes return value and appends it to the tweets container
      $('.tweets-section').append($tweet);
      
    }

  }

  const createTweetElement = function(tweet) {

  let $tweet = `<section class="tweets-container">
  <article class="tweet">
  <header class="tweets-header">
    <div class="user-profile">
    <div>
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
  </section>
  `;

  return $tweet;

  }

  renderTweets(data);

  $("#new-tweet-form").on("submit", function(event) {

    event.preventDefault();
    console.log('Form Submit...');

    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData, (response) => {
      console.log(response);
    });
  });

});