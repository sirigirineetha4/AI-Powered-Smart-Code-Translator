import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";
import { register, emailLogin, googleLogin } from "../services/authService.js";
import "../styles/login.css";

const features = [
  { icon: "🔄", title: "Smart Code Translation", desc: "Convert between 13+ languages instantly" },
  { icon: "📊", title: "Complexity Analysis", desc: "Detailed Big-O time & space breakdown" },
  { icon: "⚡", title: "AI Code Optimization", desc: "Improve speed, readability & idiomatic style" },
  { icon: "📖", title: "Plain English Explanations", desc: "Understand complex algorithms line by line" },
  { icon: "🐞", title: "Bug Finder & Security Audit", desc: "Detect edge cases, syntax flaws & vulnerabilities" },
  { icon: "🧪", title: "Unit Test Generator", desc: "Generate complete unit test suites automatically" },
];

function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) return toast.error("Please fill in all required fields.");
    if (isSignUp && !name) return toast.error("Please enter your full name.");
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const result = isSignUp
        ? await register(name, email, password)
        : await emailLogin(email, password);
      login(result.token, result.user);
      toast.success(isSignUp ? `Welcome, ${result.user.name}!` : `Welcome back, ${result.user.name}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      login(result.token, result.user);
      toast.success(`Welcome, ${result.user.name}!`);
      navigate("/");
    } catch {
      toast.error("Google authentication failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Feature Overview Panel */}
      <div className="login-left">
        <div>
          <div className="login-logo">
            <div className="login-logo-icon">&lt;/&gt;</div>
            <span className="login-logo-text">CodeTranslator</span>
          </div>

          <h1 className="login-hero-title">Translate, Optimize & Auditor Code with AI</h1>
          <p className="login-hero-subtitle">
            An intelligent multi-language developer platform powered by Gemini LLM.
          </p>

          <div className="login-features">
            {features.map((f, i) => (
              <div key={i} className="login-feature-card">
                <div className="login-feature-icon">{f.icon}</div>
                <div>
                  <div className="login-feature-title">{f.title}</div>
                  <div className="login-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="login-footer">⚡ Powered by Gemini 3.6 Flash. Built for modern software engineers.</div>
        </div>
      </div>

      {/* Right Login / Register Form */}
      <div className="login-right">
        <div className="login-form">
          <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <p className="login-form-subtitle">
            {isSignUp ? "Join to translate & analyze code seamlessly" : "Sign in to access your workspace"}
          </p>

          <form className="login-email-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                className="login-input"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              className="login-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? "Processing..." : isSignUp ? "Create Free Account" : "Sign In to Workspace"}
            </button>
          </form>

          <p className="login-toggle">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              className="login-toggle-btn"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setName("");
                setEmail("");
                setPassword("");
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <div className="login-divider">
            <span>or sign in with</span>
          </div>

          <div className="login-google-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Sign-In failed.")}
              theme="filled_black"
              shape="pill"
              size="large"
              text="continue_with"
              width="320"
            />
          </div>

          <p className="login-terms">
            By continuing, you agree to our Terms of Service &amp; Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
