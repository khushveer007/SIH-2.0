# SIH 2.0 - Student Information Hub

A comprehensive web application designed to help students discover and explore government colleges, track academic timelines, and make informed educational decisions.

## 🚀 Features

- **College Directory**: Searchable and filterable directory of government colleges
- **Course Information**: Detailed information about courses offered by colleges
- **Aptitude Quiz**: Interactive quiz to suggest academic streams based on student interests
- **Timeline Tracker**: Academic deadline tracking system
- **Student Authentication**: Secure registration and login system
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components built on Radix UI
- **Magic UI** - Modern UI components and animations
- **Framer Motion** - Animation library for React

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

```
SIH-2.0/
├── frontend/          # React.js frontend application
├── backend/           # Node.js/Express.js API server
├── database/          # Database scripts and configurations
├── .github/           # GitHub workflows and templates
├── .taskmaster/       # Task management configuration
└── .vscode/           # VS Code workspace settings
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khushveer007/SIH-2.0.git
   cd SIH-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory (or project root if you prefer a single env) and add:
   ```env
   # Database
   MONGODB_URI=your_mongodb_atlas_connection_string

   # Server
   PORT=5000

   # Authentication
   AUTH_JWT_SECRET=your_jwt_secret_key
   AUTH_JWT_EXPIRES=1h            # e.g. 15m, 1h, 7d
   ```
   A template is available at `backend/.env.example`.

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm test` - Run tests
- `npm run build` - Build the application for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Khushveer Singh
- **Project**: SIH 2.0 - Smart India Hackathon

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

*Built with ❤️ for students, by students*

## 📘 Basic API Documentation

> This is an initial high‑level overview of currently implemented backend endpoints. It will expand as new features are added.

### Base URL

During development (default port `5000`):

```
http://localhost:5000
```

### Authentication Overview

Authentication uses JSON Web Tokens (JWT). After a successful login or registration, the server returns a token. Include it in subsequent protected requests via the `Authorization` header:

```
Authorization: Bearer <token>
```

### Environment Variables (Backend)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes (for DB operations) | MongoDB Atlas connection string. If omitted, server starts in degraded mode without DB connection. |
| `PORT` | No (default 5000) | HTTP server port. |
| `AUTH_JWT_SECRET` | Yes | Secret key for signing JWTs. Keep this private. |
| `AUTH_JWT_EXPIRES` | No (default `1h`) | JWT expiry (e.g. `15m`, `1h`, `7d`). |

### Health & Status Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/health` | Returns API & DB status summary. | None |
| GET | `/db-status` | Detailed MongoDB connection info (connected flag, URI presence). | None |

#### `GET /health`
**Response (200)**
```json
{
   "status": "ok",
   "uptime": 123.45,
   "timestamp": "2025-09-03T10:15:30.000Z",
   "db": { "connected": true }
}
```

#### `GET /db-status`
**Response (200)**
```json
{
   "connected": true,
   "hasUri": true
}
```

### Auth Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create a new user account. |
| POST | `/api/auth/login` | Authenticate user & receive JWT. |
| GET | `/api/auth/me` | Fetch current user profile (protected). |

#### `POST /api/auth/register`
**Request Body**
```json
{
   "username": "john_doe",
   "email": "john@example.com",
   "password": "StrongPass123!"
}
```
**Success (201)**
```json
{
   "user": {
      "id": "66f000000000000000000001",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "student"
   },
   "token": "<jwt>"
}
```
Possible Errors:
* 400 – Missing / invalid fields
* 409 – Email already registered

#### `POST /api/auth/login`
**Request Body**
```json
{
   "email": "john@example.com",
   "password": "StrongPass123!"
}
```
**Success (200)**
```json
{
   "token": "<jwt>"
}
```
Possible Errors:
* 400 – Missing credentials
* 401 – Invalid email or password

#### `GET /api/auth/me` (Protected)
Headers:
```
Authorization: Bearer <jwt>
```
**Success (200)**
```json
{
   "id": "66f000000000000000000001",
   "username": "john_doe",
   "email": "john@example.com",
   "role": "student"
}
```
Errors:
* 401 – Missing or invalid token

### Error Response Format (Typical)

While formats may evolve, current errors use a simple JSON object:
```json
{
   "error": "Invalid email or password"
}
```

### Sample cURL Commands

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username":"john_doe","email":"john@example.com","password":"StrongPass123!"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"john@example.com","password":"StrongPass123!"}'
```

Get Current User:
```bash
curl http://localhost:5000/api/auth/me \
   -H "Authorization: Bearer <jwt>"
```

Health:
```bash
curl http://localhost:5000/health
```

### Next Steps

Upcoming additions will include: structured validation, rate limiting, richer error codes, and expanded domain endpoints (colleges, courses, timelines).
