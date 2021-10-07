$(document).ready(function() {
  /*const data = [
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
  ];*/

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
   
    // loops through tweets
    for (const elment in tweets) {
      const tweetData = tweets[elment];
     
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweetData);
        
      // takes return value and appends it to the tweets container
      $('.tweets-section').append($tweet); 
    }

  }

  // To create tweet elements.
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

  //renderTweets(data);

  $("#new-tweet-form").on("submit", function(event) {

    event.preventDefault();
    console.log('Form Submit...');

    if ($('#tweet-text').val() === '') {
      alert("Tweet content is empty!!!");
    } else if ($('#tweet-text').val().length > 140) {
      alert("Your tweet content is too long!!!");
    } else {
      const serializedData = $(this).serialize();
      
      $.post("/tweets", serializedData, (response) => {
        console.log(response);
        loadtweets();
      });
    }

  });

});