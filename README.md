# hao-backprop-test

A simple Hello World HTTP server implemented in Python/Flask.

This project was migrated from Node.js to Python/Flask while preserving 100% feature and behavior parity with the original implementation.

## Features

- HTTP server binding to `127.0.0.1:3000`
- Responds to ALL HTTP methods (GET, POST, PUT, DELETE, etc.)
- Responds to ALL URL paths (`/`, `/any/path`, etc.)
- Returns `Hello, World!` with `Content-Type: text/plain`

## Requirements

- Python 3.9 or higher
- pip (Python package manager)

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

Start the server with:
```bash
python app.py
```

The server will start and display:
```
Server running at http://127.0.0.1:3000/
```

## Testing

Access the server using curl or your browser:
```bash
curl http://127.0.0.1:3000/
```

Expected response:
```
Hello, World!
```

## License

MIT

## Author

hxu
