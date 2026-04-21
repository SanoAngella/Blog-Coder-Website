# Blog Coder Website

A blog platform built with MongoDB, Express, Node.js, and EJS.

## Project Structure

```text
.
|-- app.js                # Backend entry point
|-- models/
|   `-- blog.js           # Mongoose blog schema
|-- route/
|   `-- blogroutes.js     # Blog routes
|-- public/
|   |-- styles.css
|   `-- trashcan.svg
|-- views/                # EJS pages + partials
|-- frontend/             # Separate Vite + React frontend (optional)
`-- package.json
```

## Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in the project root:

```env
DBURL=your_mongodb_connection_string
PORT=3000
```

3. Run:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Frontend Setup (Optional)

The `frontend/` folder is a separate Vite React app.

```bash
cd frontend
npm install
npm run dev
```
