# Import necessary libraries for Flask web application
from flask import Flask, request, jsonify
from flask_cors import CORS

# Create a Flask web application instance
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) for handling requests from different origins
CORS(app)

# Define a route for handling POST requests at '/submit'
@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Extract first name and last name from the JSON data
        firstName = data['firstName']
        lastName = data['lastName']

        # Validation: Check if inputs contain only alphabetical characters
        if not firstName.isalpha() or not lastName.isalpha():
            # Return a JSON response with an error message and a 400 status code (Bad Request)
            return jsonify({"error": "Please enter valid names (only alphabetical characters allowed)"}), 400

        # Process data (you can perform any backend processing here)
        response_message = f"Hello, {firstName} {lastName}! Your submission is successful."

        # Print the submitted names to the Python terminal for debugging purposes
        print("Submitted First Name:", firstName)
        print("Submitted Last Name:", lastName)

        # Return a JSON response with a success message and a 200 status code (OK)
        return jsonify({"message": response_message}), 200
    except Exception as e:
        # Return a JSON response with an error message and a 400 status code (Bad Request) in case of exceptions
        return jsonify({"error": str(e)}), 400

# Start the Flask application if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
