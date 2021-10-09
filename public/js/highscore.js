router.get('/highscore', async (req, res) => {
    if (userName && password) {
        // Submit a username and password to the server
     const playerCheck = await fetch('/api/player/login', {
          method: 'GET',
          body: JSON.stringify({ userName, password }),
          headers: { 'Content-Type': 'application/json' },
         });
        req.session.user_id = userData.id, userData.userName, userData.playerScore    
        req.session.logged_in = true;
        document.location.replace('/highscore');
      };
      if (response.ok) {
        document.location.replace('/highscore');
      } else {
          //change alert to something less browser
        alert('You must be logged in to submit and view scores');
      }
    });