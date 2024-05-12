document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    if (loginButton) {
        loginButton.addEventListener('click', function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                console.log("Logged in as:", result.user.displayName);
                // Redirect to dashboard or wherever you want after login
                window.location.href = "dashboard.html";
            }).catch(function(error) {
                console.error("Authentication error:", error.message);
            });
        });
    }
});
