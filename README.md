# hao-backprop-test

Hello World Flask HTTP Server - Migrated from Node.js to Python/Flask.

## Description

A simple HTTP server that responds with "Hello, World!" to all HTTP requests on any path. This project was originally written in Node.js and has been completely rewritten as a Python/Flask application while maintaining 100% feature and behavior parity with the original implementation.

## Features

- Responds to ALL HTTP methods (GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH, TRACE, CONNECT)
- Accepts ALL URL paths (/, /any/path, /deeply/nested/path, etc.)
- Returns HTTP status 200 OK
- Returns Content-Type: text/plain
- Returns "Hello, World!\n" as response body
- Server binds to 127.0.0.1:3000

## Requirements

- Python 3.9 or higher
- Flask 3.1.0

## Setup

1. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

```bash
python app.py
```

The server will start and display:
```
Server running at http://127.0.0.1:3000/
```

## Testing

You can test the server using curl:

```bash
curl http://127.0.0.1:3000/
```

Expected output:
```
Hello, World!
```

## License

MIT

## Author

hxu
