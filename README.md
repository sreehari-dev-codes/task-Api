# Task API (TypeScript)

## Run locally
1. `.env` and set values.
2. Install: `npm ci`
3. Dev: `npm run dev` (ts-node-dev)

## Build & run
1. `npm run build`
2. `npm start`

## Docker
`docker-compose up --build`

API:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout
- POST /api/tasks
- GET /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
