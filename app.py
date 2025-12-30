"""
Flask HTTP server application that replicates the exact behavior of the original Node.js server.

This module implements a catch-all route that responds to ALL HTTP methods and ALL URL paths
with 'Hello, World!\n' and Content-Type: text/plain. The server binds to 127.0.0.1:3000
and prints a startup message to the console.

This is a complete rewrite from Node.js to Python/Flask, maintaining 100% feature and
behavior parity with the original implementation.
"""

from flask import Flask, Response

# Server configuration constants (matching original Node.js server)
hostname = '127.0.0.1'
port = 3000

# Create Flask application instance
app = Flask(__name__)

# List of all standard HTTP methods to accept (matching Node.js behavior of accepting all methods)
ALL_HTTP_METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']


@app.route('/', defaults={'path': ''}, methods=ALL_HTTP_METHODS)
@app.route('/<path:path>', methods=ALL_HTTP_METHODS)
def hello_world(path):
    """
    Catch-all route handler that responds to all HTTP methods and all URL paths.
    
    This function replicates the exact behavior of the original Node.js server:
    - Accepts any HTTP method (GET, POST, PUT, DELETE, etc.)
    - Accepts any URL path (/, /any/path, /deeply/nested/path, etc.)
    - Returns HTTP status 200 OK
    - Returns Content-Type: text/plain header
    - Returns 'Hello, World!\n' as the response body
    
    Args:
        path: The URL path captured by the catch-all route (unused but required by Flask)
    
    Returns:
        Response: Flask Response object with 'Hello, World!\n' body and text/plain mimetype
    """
    return Response('Hello, World!\n', mimetype='text/plain')


if __name__ == '__main__':
    # Print startup message to console (matching Node.js console.log behavior)
    print(f'Server running at http://{hostname}:{port}/')
    # Start Flask development server on configured host and port
    app.run(host=hostname, port=port)
