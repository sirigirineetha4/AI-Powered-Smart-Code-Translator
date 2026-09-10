# 📡 API Routes Documentation

## Authentication Routes

### `POST /api/auth/google`
Authenticate user with Google OAuth
- **Request:** Google OAuth token
- **Response:** JWT token + User data
- **Status:** 200 OK / 401 Unauthorized

```bash
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token": "google_oauth_token"}'
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Code Translation Routes

### `POST /api/code/translate`
Translate code from one language to another using Gemini API

- **Request:**
  - `code` (string): Source code to translate
  - `fromLanguage` (string): Current language (Java, Python, etc.)
  - `toLanguage` (string): Target language
  
- **Response:** Translated code + explanation

```bash
curl -X POST http://localhost:5000/api/code/translate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jwt_token" \
  -d '{
    "code": "public class Hello { ... }",
    "fromLanguage": "Java",
    "toLanguage": "Python"
  }'
```

**Response:**
```json
{
  "success": true,
  "translatedCode": "class Hello: ...",
  "explanation": "This is a Python equivalent of the Java class...",
  "timestamp": "2024-09-10T10:30:00Z"
}
```

### `POST /api/code/explain`
Get detailed explanation of code

### `POST /api/code/analyze`
Get optimization suggestions

### `GET /api/code/history`
Retrieve user's translation history

---
