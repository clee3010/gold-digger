# Gold Digger

Gold Digger is a browser-based gold-purchase simulator built with Node.js and its native HTTP module. The application displays a simulated gold price, accepts a purchase amount, records the transaction, and generates a PDF receipt.

The backend was built without Express to practice the lower-level behavior that web frameworks normally abstract, including request routing, streamed body parsing, response headers, status codes, static-file serving, and error handling.

## Features

- Simulated gold-price updates every three seconds
- Gold-purchase calculations based on the entered amount and current price
- Native Node.js HTTP server with manual GET and POST routing
- Streamed JSON request-body parsing and input validation
- Timestamped purchase logging with asynchronous file I/O
- PDF receipt generation with PDFKit
- Static HTML, CSS, JavaScript, and image serving
- Custom 404 page and server-error responses

## Tech Stack

- **Backend:** Node.js native `http`, `fs`, and `path` modules
- **Frontend:** HTML, CSS, JavaScript, Fetch API
- **PDF generation:** PDFKit
- **Persistence:** Text-file transaction log and generated PDF files

## Getting Started

### Prerequisites

- Node.js 20.11 or newer
- npm

### Installation

```bash
git clone https://github.com/clee3010/gold-digger.git
cd gold-digger
npm install
npm start
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/price` | Return the server status and current simulated price |
| `POST` | `/purchase` | Validate a purchase, log it, and generate a receipt |

### Get the Current Price

Example response from `GET /price`:

```json
{
  "status": "online",
  "price": "2841.37"
}
```

### Create a Purchase

Example request body for `POST /purchase`:

```json
{
  "paid": 500,
  "price": 2841.37
}
```

Both values are required and must be greater than zero. A successful request returns HTTP `201`, appends the transaction to `purchases.txt`, and creates a timestamped PDF in `receipts/`.

## Project Structure

```text
public/           Browser UI, styles, client JavaScript, and image assets
receipts/         Generated PDF purchase receipts
utils/            JSON parsing, pricing, PDF, response, and static-file helpers
routeHandler.js   GET and POST request handlers
server.js         Native HTTP server and top-level routing
purchases.txt     Timestamped transaction log
```

## Implementation Highlights

- `parseJSONBody` consumes incoming request chunks asynchronously before parsing JSON.
- `serveStatic` maps browser requests to local assets and assigns the correct content type.
- `handlePost` validates inputs, calculates the gold purchased, writes a log entry, and starts PDF generation.
- The frontend polls `/price` and updates its connection indicator when the server becomes unavailable.

## Limitations

- Prices are randomly generated for demonstration and do not represent live financial data.
- Purchase data is stored in local files rather than a database.
- The application is intended as an educational project, not a real trading platform.

## License

This project is available under the ISC License.
