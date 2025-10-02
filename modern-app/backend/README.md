# Modern Kanboard Backend

This Express service recreates the core task management APIs from the original PHP Kanboard implementation using MariaDB for persistence.

## Requirements

- Node.js 18+
- MariaDB 10.6+

## Setup

1. Copy `.env.example` to `.env` and adjust the database credentials.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize the database schema:

   ```bash
   mysql -u <user> -p < database_name > schema.sql
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   The API is available at `http://localhost:4000` by default.

## API Overview

- `GET /api/boards` — list boards.
- `POST /api/boards` — create a board with optional columns.
- `GET /api/boards/:id` — fetch board details with columns and tasks.
- `POST /api/boards/:id/columns/:columnId/reorder` — reorder a column within a board.
- `GET /api/tasks?boardId=<id>` — list tasks for a board.
- `POST /api/tasks` — create a task.
- `GET /api/tasks/:id` — fetch a task.
- `PUT /api/tasks/:id` — update a task.
- `DELETE /api/tasks/:id` — delete a task.

All responses are JSON.
