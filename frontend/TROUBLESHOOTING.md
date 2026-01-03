# Troubleshooting Guide

## Connection Errors (504, ERR_SOCKET_NOT_CONNECTED)

### Issue: "Failed to load resource: the server responded with a status of 504"

**Solution:**

1. **Make sure both servers are running:**
   - Backend: `cd backend && npm start` (should run on port 3000)
   - Frontend: `cd frontend && npm run dev` (should run on port 3001)

2. **Clear browser cache and restart:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

3. **Stop and restart the dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   cd frontend
   npm run dev
   ```

4. **Check if ports are available:**
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :3000
   netstat -ano | findstr :3001
   
   # If ports are in use, kill the process or change ports
   ```

5. **Verify backend is running:**
   - Open `http://localhost:3000/api/todos` in your browser
   - You should see JSON response (even if empty array `[]`)

6. **Check browser console for specific errors:**
   - Open Developer Tools (F12)
   - Check Console and Network tabs

### Issue: "Could not establish connection. Receiving end does not exist"

This is often caused by browser extensions. Try:

1. **Disable browser extensions temporarily:**
   - Open in Incognito/Private mode
   - Or disable extensions one by one

2. **Try a different browser:**
   - Chrome, Firefox, Edge, etc.

### Issue: CORS errors

If you see CORS errors, make sure:
1. Backend CORS is enabled (already configured in `server.js`)
2. Backend is running on port 3000
3. Frontend is using the proxy (relative paths `/api`)

## Common Fixes

### 1. Reinstall Dependencies
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### 2. Clear Vite Cache
```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

### 3. Check Environment Variables
Make sure `.env` file exists in `frontend/` folder:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Verify Backend Connection
Test backend directly:
```bash
curl http://localhost:3000/api/todos
```

### 5. Check Firewall/Antivirus
Sometimes firewalls block localhost connections. Temporarily disable to test.

## Still Having Issues?

1. Check that Node.js version is 16+:
   ```bash
   node --version
   ```

2. Make sure PostgreSQL is running (for backend)

3. Check terminal output for specific error messages

4. Verify file structure:
   ```
   frontend/
   ├── src/
   │   ├── main.jsx
   │   ├── App.jsx
   │   └── ...
   ├── index.html
   ├── vite.config.js
   └── package.json
   ```

