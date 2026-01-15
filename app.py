"""
Flask HTTP Server Application

This module implements a Flask-based HTTP server that replicates the exact behavior
of the original Node.js server. It responds to ALL HTTP methods and ALL URL paths
with 'Hello, World!\n' and Content-Type: text/plain.

Server Configuration:
    - Host: 127.0.0.1 (localhost only)
    - Port: 3000
    - Response: 'Hello, World!\n'
    - Content-Type: text/plain
    - Status Code: 200 OK

This is a complete rewrite from Node.js to Python/Flask with 100% feature and
behavior parity with the original implementation.
"""

from flask import Flask, Response

# Server configuration constants (matching original Node.js server)
hostname = '127.0.0.1'
port = 3000

# Create Flask application instance
app = Flask(__name__)

# List of all standard HTTP methods that the server accepts
# This matches the original Node.js behavior which accepts all methods
ALL_HTTP_METHODS = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH'
]


@app.route('/', defaults={'path': ''}, methods=ALL_HTTP_METHODS)
@app.route('/<path:path>', methods=ALL_HTTP_METHODS)
def hello_world(path):
    """
    Catch-all route handler that responds to all HTTP methods and URL paths.
    
    This function replicates the exact behavior of the original Node.js server's
    request handler callback. It returns 'Hello, World!\n' with Content-Type
    text/plain for any request, regardless of the HTTP method or URL path.
    
    Args:
        path: The URL path requested by the client (captured by Flask routing).
              This parameter is accepted but not used, as the response is
              identical for all paths.
    
    Returns:
        Response: A Flask Response object containing:
            - Body: 'Hello, World!\n' (exactly matching the original)
            - Status Code: 200 OK (Flask default, matching res.statusCode = 200)
            - Content-Type: text/plain (matching res.setHeader('Content-Type', 'text/plain'))
    """
    return Response('Hello, World!\n', mimetype='text/plain')


if __name__ == '__main__':
    # Print startup message before starting the server
    # This matches the original Node.js console.log() in the server.listen() callback
    print(f'Server running at http://{hostname}:{port}/')
    
    # Start the Flask development server
    # This replaces the Node.js server.listen(port, hostname, callback) call
    # Note: debug=False and use_reloader=False to match original Node.js behavior
    # which doesn't have debug mode or auto-reload
    app.run(host=hostname, port=port, debug=False, use_reloader=False)
