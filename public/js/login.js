var start = document.getElementById("startBtn")

const loginForm = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const userName = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (userName && password) {
      // Submit a username and password to the server
      const response = await fetch('/api/player/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/game');
      } else {
          //change alert to something less browser
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form') //add to page
    .addEventListener('submit', loginForm)
  