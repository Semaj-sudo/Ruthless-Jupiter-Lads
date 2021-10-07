const resgisterForm = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page

    const userName = document.querySelector('#user-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
  
    if ( userName && password) {
      // Submit a username and password to the server
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userName , password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
        session
      } else {
          //change alert to something less browser
          alert('This user already exists');
        go('game')
      }
    }
  };
  
  document
    .querySelector('.register-form')
    .addEventListener('submit', loginFormHandler);{
      router.get('/game', async (req, res) => {
       res.render('game');
        });
    };