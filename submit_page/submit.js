// This code runs when the DOM (Document Object Model) is fully loaded and ready
document.addEventListener("DOMContentLoaded", function () {
    // Get the HTML elements by their IDs
    const form = document.getElementById("submit-form"); // The form element
    const responseDiv = document.getElementById("response"); // The div where responses are displayed

    // Add an event listener for the form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior (page reload)

        // Get the values of the input fields by their IDs
        const firstName = document.getElementById("first-name").value; // First name input
        const lastName = document.getElementById("last-name").value; // Last name input

        // Send data to the backend without validation
        fetch("http://127.0.0.1:5000/submit", { // Make a POST request to the backend
            method: "POST", // Use the HTTP POST method
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify({ firstName, lastName }), // Convert data to JSON format and send it in the request body
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Check for error in the response
            if (data.error) {
                // Display the error message in the response div with red text
                responseDiv.innerHTML = `<p class="error-message">Error: ${data.error}</p>`;
            } else {
                // Display the success message in the response div with green text
                responseDiv.innerHTML = `<p class="success-message">${data.message}</p>`;
            }
        })
        .catch(error => {
            // Display any unexpected error in the response div with red text
            console.error("Error:", error);
            responseDiv.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
        });
    });
});
