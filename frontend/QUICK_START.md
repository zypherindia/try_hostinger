# Quick Start Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Create `.env` file** (if not exists):
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Make sure backend is running:**
   ```bash
   # In a separate terminal
   cd backend
   npm start
   ```

4. **Start frontend dev server:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open browser:**
   - Go to `http://localhost:3001`
   - If you see errors, check the troubleshooting guide

## If You See Connection Errors

### Step 1: Stop Everything
- Press `Ctrl+C` in both terminal windows (backend and frontend)

### Step 2: Restart Backend First
```bash
cd backend
npm start
```
Wait until you see: "Server is running on port 3000"

### Step 3: Restart Frontend
```bash
cd frontend
npm run dev
```
Wait until you see: "Local: http://localhost:3001"

### Step 4: Clear Browser Cache
- Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open in Incognito/Private mode

### Step 5: Check Backend is Working
- Open `http://localhost:3000/api/todos` in browser
- Should show `[]` (empty array) or list of todos

## Common Issues

**Port 3001 already in use:**
- Vite will automatically try the next port (3002, 3003, etc.)
- Check the terminal output for the actual port

**Port 3000 already in use:**
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` accordingly

**Still not working?**
- See `TROUBLESHOOTING.md` for detailed solutions

