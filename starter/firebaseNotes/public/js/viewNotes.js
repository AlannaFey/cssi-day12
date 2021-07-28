let googleUser

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    console.log('Logged in as User: ' + userId);
    // 1. Get access to all user's notes
    const dbRef = firebase.database().ref("users/" + userId);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    })
    // 2. Display them
}

const renderData = (data) => {
    const destination = document.querySelector("#app");
    destination.innerHTML = "";
    for (let key in data) {
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
}

const createCard = (note) => {
    return `<div class = "column is-one-quater">
              <div class = "card"> 
                <header class="card-header">
                  <p class="card-header-title"> ${note.title} </p>
                </header>
              <div class="card-content">
                ${note.text} 
              </div>
            </div>
        </div>`;

};