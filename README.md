# 🤖 AI-Powered Smart Code Translator
## 📸 Screenshot / GIF
<img width="1857" height="866" alt="image" src="https://github.com/user-attachments/assets/682df83a-4fb6-489b-9c47-2cb4b5631b3d" />


## 🎯 Overview
An AI-powered full-stack application that **translates, explains, analyzes, and optimizes** 
source code across multiple programming languages using Google's Gemini API.

**Live Demo:** https://ai-powered-smart-code-translator-three.vercel.app
**GitHub Repo:** (https://github.com/sirigirineetha4/ai-code-translator)

## ✨ Features
- 🌐 **Multi-language Support** - Translates code between C, C++, C#, Java, Python
- 🔍 **Code Analysis** - AI-powered code review and optimization suggestions
- 📝 **Code Explanation** - Detailed explanations of complex code snippets
- 🔐 **Secure Authentication** - JWT + Google OAuth2 authentication
- 💾 **Operation History** - Track all translations in MongoDB database
- 🎨 **Monaco Code Editor** - Professional code editor interface
- ⚡ **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, Vite, Bootstrap, Monaco Editor |
| **Backend** | Node.js, Express.js, JWT |
| **Database** | MongoDB Atlas |
| **AI** | Google Gemini API |
| **Authentication** | Google OAuth 2.0 |
| **Deployment** | Vercel (Frontend), Render (Backend) |

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Cloud API credentials (Gemini API)
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sirigirineetha/ai-code-translator.git
cd ai-code-translator
```

2. **Setup Environment Variables**
```bash
# Create .env file
cp .env.example .env

# Add your credentials:
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_BACKEND_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

4. **Backend Setup**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

## 📖 Usage

1. **Sign in** using Google OAuth
2. **Paste your code** in the Monaco editor
3. **Select operation:**
   - Translate: Convert code to another language
   - Explain: Get AI explanation of code
   - Analyze: Receive optimization suggestions
   - Optimize: Get performance improvements
4. **View results** with detailed explanations

## 📊 Project Stats
- ⭐ **Contributors:** 1
- 🔀 **Commits:** 45+
- 📦 **Size:** 12MB

## 🧪 Testing
```bash
# Run tests
npm test

# Coverage
npm run test:coverage
```

## 🤝 Contributing
Contributions are welcome! 
1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📝 License
MIT License - see [LICENSE](LICENSE) file for details

## 🙋 Support
- 📧 Email: sirigirineetha@gmail.com

## 🚀 Future Enhancements
- [ ] Add support for Rust and Go
- [ ] Implement code diff visualization
- [ ] Add collaborative coding features
- [ ] Create mobile app version
- [ ] Add more AI models (Claude, GPT-4)

## 📚 Resources
- [Google Gemini API Docs](https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)

---
**⭐ If this project helped you, please give it a star!**
