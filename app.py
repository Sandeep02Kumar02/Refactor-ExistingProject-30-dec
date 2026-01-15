"""
Flask HTTP Server Application

This module implements a Flask-based HTTP server that replicates the exact behavior
of the original Node.js server. It responds to ALL HTTP methods and ALL URL paths
with 'Hello, World!\n' and Content-Type: text/plain.

Features:
    - Binds to 127.0.0.1:3000
    - Accepts all HTTP methods (GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH)
    - Accepts all URL paths (/, /any/path, etc.)
    - Returns 200 OK status code
    - Returns 'Hello, World!\n' with text/plain content type
    - Prints startup message to console

This is a complete rewrite from Node.js to Python/Flask, maintaining 100% feature
and behavior parity with the original implementation.
"""

from flask import Flask, Response

# Server configuration constants - matching original Node.js server
hostname = '127.0.0.1'
port = 3000

# Flask application instance
app = Flask(__name__)

# List of all HTTP methods to accept (matching Node.js behavior of accepting all methods)
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
    request handler, which accepts any request and returns the same response.
    
    Args:
        path: The URL path requested (captured by Flask's path converter).
              This parameter is not used but is required to capture all paths.
    
    Returns:
        Response: A Flask Response object with:
            - Body: 'Hello, World!\n' (exactly matching original)
            - Status: 200 OK (Flask default)
            - Content-Type: text/plain
    """
    return Response('Hello, World!\n', mimetype='text/plain')


if __name__ == '__main__':
    # Print startup message before starting the server
    # This matches the original Node.js console.log() behavior
    print(f'Server running at http://{hostname}:{port}/')
    
    # Start the Flask development server
    # - host: binds to localhost only (127.0.0.1) for security
    # - port: uses port 3000 to match original Node.js server
    # Note: debug mode and auto-reload are disabled to match original behavior
    app.run(host=hostname, port=port)
