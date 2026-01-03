# Todo Frontend - React Application

React.js frontend application for the Todo app, built with Vite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL if needed:
```
VITE_API_URL=http://localhost:3000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3001` (configured in `vite.config.js`).

The Vite dev server is configured to proxy `/api` requests to `http://localhost:3000`, so API calls will work seamlessly.

## Build for Production

Build the production version:
```bash
npm run build
```

The build output will be in the `dist` folder.

Preview the production build:
```bash
npm run preview
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000/api)
- `VITE_ENV` - Environment (development/production)

Note: Vite requires the `VITE_` prefix for environment variables to be exposed to the client code.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── FilterButtons.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── styles/         # CSS styles
│   │   └── index.css
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html
├── vite.config.js      # Vite configuration
└── package.json
```

## Features

- ✅ Add new todos with title and description
- ✅ Mark todos as completed/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Beautiful, responsive UI
- ✅ Error handling
- ✅ Loading states
