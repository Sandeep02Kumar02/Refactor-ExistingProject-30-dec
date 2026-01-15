"""
Flask HTTP server application that replicates the exact behavior of the original Node.js server.

This module implements a catch-all route that responds to ALL HTTP methods and ALL URL paths
with 'Hello, World!\n' and Content-Type: text/plain. The server binds to 127.0.0.1:3000
and prints a startup message to console.

This is a 1:1 technology stack replacement from Node.js built-in http module to Python Flask,
preserving 100% feature and behavior parity with the original implementation.

Original Node.js server: server.js
Target Python/Flask server: app.py

Exports:
    app: Flask application instance
    hostname: Server hostname constant ('127.0.0.1')
    port: Server port constant (3000)
    hello_world: Route handler function
"""

from flask import Flask, Response

# Server configuration constants - preserving exact values from Node.js server
hostname = '127.0.0.1'
port = 3000

# Flask application instantiation - replaces http.createServer()
app = Flask(__name__)

# Define all HTTP methods to accept - matching Node.js behavior of accepting ALL methods
# Node.js http.createServer() callback receives all HTTP methods without filtering
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
    
    This function replicates the exact behavior of the Node.js server callback:
    - res.statusCode = 200 (Flask default, implicit)
    - res.setHeader('Content-Type', 'text/plain') -> mimetype='text/plain'
    - res.end('Hello, World!\\n') -> Response body
    
    Args:
        path: URL path captured by the route (ignored, as we return same response for all paths)
    
    Returns:
        Response: Flask Response object with 'Hello, World!\\n' body and text/plain mimetype
    """
    # Return Response with explicit mimetype to match Node.js Content-Type header
    # Status code 200 is Flask's default, matching res.statusCode = 200
    return Response('Hello, World!\n', mimetype='text/plain')


if __name__ == '__main__':
    # Print startup message before starting server
    # Replaces: console.log(`Server running at http://${hostname}:${port}/`)
    print(f'Server running at http://{hostname}:{port}/')
    
    # Start Flask development server
    # Replaces: server.listen(port, hostname, callback)
    # Note: debug mode and auto-reload are disabled to match Node.js server behavior
    app.run(host=hostname, port=port)
