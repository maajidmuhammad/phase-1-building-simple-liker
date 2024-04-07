document.addEventListener('DOMContentLoaded', function() {
  const EMPTY_HEART = '♡';
  const FULL_HEART = '♥';

  const hearts = document.querySelectorAll('.like');

  hearts.forEach(heart => {
    heart.addEventListener('click', function() {
      toggleHeart(heart);
    });
  });

  function toggleHeart(heart) {
    if (heart.classList.contains('activated')) {
      // Revert heart to empty 
      heart.textContent = EMPTY_HEART;
      heart.classList.remove('activated', 'activated-heart');
    } else {
      // Change heart to full 
      heart.textContent = FULL_HEART;
      heart.classList.add('activated', 'activated-heart');
    }

    mimicServerCall()
      .then(response => {
        console.log(response); // Log success message
      })
      .catch(error => {
        console.error(error);
        showErrorModal(error);
        // Revert heart state on error
        setTimeout(function() {
          if (heart.classList.contains('activated')) {
            heart.textContent = FULL_HEART;
            heart.classList.add('activated-heart');
          } else {
            heart.textContent = EMPTY_HEART;
          }
        }, 2000); // Reverts heart state after 2 seconds
      });
  }

  // Add event listener for full heart icons to toggle them back to empty heart
  const activatedHearts = document.querySelectorAll('.like.activated');
  activatedHearts.forEach(heart => {
    heart.addEventListener('click', function() {
      toggleHeart(heart);
    });
  });

  function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        let isRandomFailure = Math.random() < 0.2;
        if (isRandomFailure) {
          reject("Random server error. Try again.");
        } else {
          resolve("Pretend remote server notified of action!");
        }
      }, 300);
    });
  }

  function showErrorModal(errorMsg) {
    const modal = document.getElementById('error-modal');
    modal.textContent = errorMsg;
    modal.classList.remove('hidden'); // Remove hidden class to make it visible
    setTimeout(function() {
      modal.classList.add('hidden'); // Hide modal after 3 seconds
    }, 3000);
  }
});
