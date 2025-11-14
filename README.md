# Secure Vendor Panel – Authentication & Protected Dashboard

This project implements a secure vendor authentication system using Node.js, Express, Argon2 hashing, secure cookies, and protected routes.

## Features
- Vendor authentication with Argon2
- Secure cookies (httpOnly, sameSite strict, maxAge, secure)
- Protected dashboard route
- Rate limiting
- CORS enabled
- Logging with Morgan
- Full error handling

## Setup
```bash
npm install
node server.js
```

Server runs at: http://localhost:3000

## API Endpoints

### 1. POST /vendor-login
Authenticates vendor and sets secure cookie.

Request Body:
```json
{
  "vendorName": "Rishita",
  "password": "12345"
}
```

Success Response:
```json
{
  "message": "Login successful",
  "vendor": "Rishita"
}
```

### 2. GET /dashboard
Protected route requiring vendor_auth cookie.

Success:
```json
{
  "message": "Welcome to your secure dashboard, Rishita!"
}
```

Failure:
```json
{
  "error": "Unauthorized. Login required."
}
```

## Required Screenshots
1. Hashed password in terminal
2. Cookie in Postman response
3. Dashboard success
4. Unauthorized dashboard access

## Submission
Zip file name: secure-vendor-panel-Rishita.zip
Include: server.js, README.md, screenshots.
