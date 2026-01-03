# Environment Setup

## Creating .env file

Create a `.env` file in the `frontend` folder with the following content:

```env
# Frontend Environment Variables
# API Backend URL
VITE_API_URL=http://localhost:3000/api

# Environment
VITE_ENV=development
```

## Quick Setup Command

On Windows (PowerShell):
```powershell
@"
# Frontend Environment Variables
# API Backend URL
VITE_API_URL=http://localhost:3000/api

# Environment
VITE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8
```

On Linux/Mac:
```bash
cat > .env << EOF
# Frontend Environment Variables
# API Backend URL
VITE_API_URL=http://localhost:3000/api

# Environment
VITE_ENV=development
EOF
```

## Important Notes

- Vite requires the `VITE_` prefix for environment variables to be exposed to client code
- Update `VITE_API_URL` if your backend runs on a different port or URL
- The `.env` file is already in `.gitignore` and won't be committed to version control

