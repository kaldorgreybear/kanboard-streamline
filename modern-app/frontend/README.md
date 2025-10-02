# Modern Kanboard Frontend

This React application reproduces the classic Kanboard board view with a modern UI, consuming the new Express + MariaDB API.

## Requirements

- Node.js 18+

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   Vite will start on `http://localhost:5173` and proxy API calls to `http://localhost:4000`.

## Features

- Board selector populated from `/api/boards`.
- Inline task creation, editing, and deletion backed by the REST API.
- Column-based layout similar to the legacy PHP implementation.
- Responsive styling suitable for desktop and tablet widths.
