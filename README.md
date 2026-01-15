# hao-backprop-test

A Flask-based HTTP server that responds with "Hello, World!" to all requests.

test project for backprop integration. Do not touch!

## Technology Stack

- **Language**: Python 3.9+
- **Framework**: Flask 3.1.0
- **Server**: Flask development server

## Features

- Responds to ALL HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)
- Responds to ALL URL paths (/, /any/path, /deeply/nested/path, etc.)
- Returns `Hello, World!\n` with `Content-Type: text/plain`
- Binds to `127.0.0.1:3000` (localhost only)

## Setup

1. Create and activate a virtual environment (recommended):

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

Send a request to the server:

```bash
curl http://127.0.0.1:3000/
```

Expected response:
```
Hello, World!
```

## Project Structure

```
/
├── README.md           # This file
├── app.py              # Flask application entry point
├── pyproject.toml      # Python package configuration
└── requirements.txt    # Python dependencies
```

## License

MIT
