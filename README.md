# hao-backprop-test

A simple Hello World HTTP server implemented in Python/Flask.

## Description

This project provides a minimal Flask-based HTTP server that responds to all HTTP requests with "Hello, World!". The server binds to localhost (127.0.0.1) on port 3000.

## Features

- Responds to all HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE, CONNECT)
- Accepts all URL paths (/, /any/path, etc.)
- Returns 200 OK status code
- Returns `Hello, World!\n` with `text/plain` content type

## Requirements

- Python 3.9 or higher
- Flask 3.1.0+

## Setup

1. Create and activate a virtual environment (recommended):

```bash
python3 -m venv venv
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

## Testing the Server

Once running, you can test the server with curl:

```bash
curl http://127.0.0.1:3000/
```

Expected response:
```
Hello, World!
```

## License

MIT
