// Step 1: Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxVQaU5dn8a5KfyM9GJserGbanMpDlzMo",
    authDomain: "portfolio-324e3.firebaseapp.com",
    databaseURL: "https://portfolio-324e3-default-rtdb.firebaseio.com",
    projectId: "portfolio-324e3",
    storageBucket: "portfolio-324e3.firebasestorage.app",
    messagingSenderId: "939764065541",
    appId: "1:939764065541:web:f7a6d41b26e883e846036c"
};

// Step 2: Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Step 3: Reference to your database (Realtime Database)
const contactDB = firebase.database().ref("contacts");

// Step 4: Form submit handler
document.getElementById("contactform").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault(); // Prevent page reload
    
    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    // Optional: Simple form validation (example)
    if (!name || !email || !subject || !message) {
        document.getElementById("form-status").textContent = "Please fill all fields!";
        document.getElementById("form-status").style.color = "red";
        return;
    }

    // Save to Firebase
    contactDB.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toISOString()
    }).then(() => {
        document.getElementById("form-status").textContent = "Message sent!";
        document.getElementById("form-status").style.color = "green";
        // Optionally reset form
        document.getElementById("contactform").reset();
    }).catch((error) => {
        document.getElementById("form-status").textContent = "Error: " + error.message;
        document.getElementById("form-status").style.color = "red";
    });
}
