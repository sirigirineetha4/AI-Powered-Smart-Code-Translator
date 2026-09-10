# 🚀 Complete Setup Guide for AI Code Translator

## Prerequisites Check
```bash
node --version  # Should be v16+
npm --version
mongosh --version (optional, for local testing)
```

## Step 1: Clone & Setup Environment

```bash
# Clone repo
git clone https://github.com/sirigirineetha/ai-code-translator.git
cd ai-code-translator

# Frontend setup
cd frontend
npm install
cp .env.example .env  # Add your credentials here

# Backend setup (new terminal)
cd backend
npm install
cp .env.example .env  # Add your credentials here
```

## Step 2: Get API Keys

### Google Gemini API
1. Go to https://cloud.google.com/vertex-ai/generative-ai/
2. Enable Vertex AI API
3. Create API key from Credentials page
4. Add to `backend/.env`: `GEMINI_API_KEY=xxx`

### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create OAuth credentials
3. Add redirect URI: `http://localhost:5173/callback`
4. Copy credentials to `.env` files

### MongoDB
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Add to `backend/.env`: `MONGODB_URI=xxx`

## Step 3: Run Locally

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# Visit http://localhost:5173

# Terminal 2 - Backend
cd backend
npm start
# Backend running on http://localhost:5000
```

## Step 4: Test API

```bash
# Test translation endpoint
curl -X POST http://localhost:5000/api/code/translate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(\"hello\");",
    "fromLanguage": "JavaScript",
    "toLanguage": "Python"
  }'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| PORT 5000 already in use | Change port in `backend/.env` to 5001 |
| API key error | Verify key is correct in `.env` |
| MongoDB connection failed | Check internet connection & cluster is running |

## Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
vercel deploy
# Follow prompts, set VITE_BACKEND_URL to production URL
```

### Deploy Backend to Render
