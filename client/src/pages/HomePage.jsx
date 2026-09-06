import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import CodeEditor from "../components/CodeEditor.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";

import {
  STARTER_CODE,
  FILE_EXTENSIONS,
  getLanguageExtension,
} from "../constants/languages.js";

import {
  translateCode,
  analyzeComplexity,
  optimizeCode,
  explainCode,
  debugCode,
  generateTests,
} from "../services/codeService.js";

import "../styles/home.css";

const ACTIONS = [
  { id: "translate", label: "🔄 Translate" },
  { id: "analyze", label: "📊 Analyze" },
  { id: "optimize", label: "⚡ Optimize" },
  { id: "explain", label: "📖 Explain" },
  { id: "debug", label: "🐞 Find Bugs" },
  { id: "generate-tests", label: "🧪 Unit Tests" },
];

function HomePage() {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [activeAction, setActiveAction] = useState("translate");
  const [sourceLanguage, setSourceLanguage] = useState("python");
  const [targetLanguage, setTargetLanguage] = useState("java");
  const [code, setCode] = useState(STARTER_CODE.python || "");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore state if passed from History page
  useEffect(() => {
    if (location.state) {
      const {
        inputCode,
        sourceLang,
        targetLang,
        actionType,
        outputData,
      } = location.state;

      if (inputCode) setCode(inputCode);
      if (sourceLang) setSourceLanguage(sourceLang);
      if (targetLang) setTargetLanguage(targetLang);
      if (actionType) setActiveAction(actionType);
      if (outputData) setResult(outputData);

      toast.success("Loaded history item into workspace!");
    }
  }, [location.state]);

  // Handle source language switch
  const handleSourceChange = (langId) => {
    setSourceLanguage(langId);
    if (STARTER_CODE[langId] && (!code || code === STARTER_CODE[sourceLanguage])) {
      setCode(STARTER_CODE[langId]);
    }
    setResult(null);
  };

  // Action switch
  const handleActionChange = (actionId) => {
    setActiveAction(actionId);
    setResult(null);
  };

  // Swap source & target languages
  const handleSwap = () => {
    if (activeAction !== "translate") return;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);

    if (result?.translatedCode) {
      setCode(result.translatedCode);
      setResult(null);
    }
  };

  // Open file dialog
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setCode(content);
        toast.success(`Loaded ${file.name}`);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Download output code
  const handleDownload = () => {
    if (!result) return;

    let outputText = "";
    let ext = FILE_EXTENSIONS[targetLanguage] || ".txt";

    if (activeAction === "translate") {
      outputText = result.translatedCode || "";
    } else if (activeAction === "optimize") {
      outputText = result.optimizedCode || "";
    } else if (activeAction === "generate-tests") {
      outputText = result.testCode || "";
    } else if (activeAction === "explain") {
      outputText = result.explanation || "";
      ext = ".txt";
    } else if (activeAction === "analyze") {
      outputText = `Time Complexity: ${result.timeComplexity}\nSpace Complexity: ${result.spaceComplexity}\n\nExplanation:\n${result.explanation}`;
      ext = ".txt";
    } else if (activeAction === "debug") {
      outputText = JSON.stringify(result, null, 2);
      ext = ".json";
    }

    if (!outputText) {
      toast.error("Nothing to download.");
      return;
    }

    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output_${activeAction}${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  // Copy output
  const handleCopy = async () => {
    if (!result) return;
    let text = "";

    if (activeAction === "translate") {
      text = result.translatedCode || "";
    } else if (activeAction === "optimize") {
      text = result.optimizedCode || "";
    } else if (activeAction === "generate-tests") {
      text = result.testCode || "";
    } else if (activeAction === "explain") {
      text = result.explanation || "";
    } else if (activeAction === "analyze") {
      text = `Time: ${result.timeComplexity || "N/A"}\nSpace: ${result.spaceComplexity || "N/A"}\n\n${result.explanation || ""}`;
    } else if (activeAction === "debug") {
      text = JSON.stringify(result, null, 2);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  // Run operation
  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Please write or paste code in the editor first.");
      return;
    }

    if (!sourceLanguage) {
      toast.error("Please select a source language.");
      return;
    }

    if (activeAction === "translate" && !targetLanguage) {
      toast.error("Please select a target language.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const apiCalls = {
        translate: () => translateCode(code, sourceLanguage, targetLanguage),
        analyze: () => analyzeComplexity(code, sourceLanguage),
        optimize: () => optimizeCode(code, sourceLanguage),
        explain: () => explainCode(code, sourceLanguage),
        debug: () => debugCode(code, sourceLanguage),
        "generate-tests": () => generateTests(code, sourceLanguage),
      };

      const data = await apiCalls[activeAction]();
      setResult(data);
      toast.success("Operation complete!");
    } catch (error) {
      console.error("Action failed:", error);
      const message =
        error.response?.data?.message ||
        "AI service error. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      {/* Top Toolbar */}
      <div className="toolbar">
        <div className="action-tabs">
          {ACTIONS.map((tab) => (
            <button
              key={tab.id}
              className={`action-tab ${activeAction === tab.id ? "active" : ""}`}
              onClick={() => handleActionChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="toolbar-actions">
          <button
            className="tool-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload code file"
          >
            📂 Open File
          </button>
          <button
            className="tool-btn"
            onClick={() => setCode(STARTER_CODE[sourceLanguage] || "")}
            title="Reset to starter template"
          >
            💡 Template
          </button>

          <button
            className="run-btn"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }} />
                Processing...
              </>
            ) : (
              "▶ Run AI Action"
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Workspace */}
      <div className="panels">
        {/* Source Code Panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-left">
              <span className="panel-label">Source Code</span>
              <LanguageSelector
                value={sourceLanguage}
                onChange={handleSourceChange}
              />
            </div>

            <div className="panel-header-right">
              <button
                className="action-icon-btn"
                onClick={() => setCode("")}
                title="Clear editor"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="panel-body">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={sourceLanguage}
            />
          </div>
        </div>

        {/* Swap / Arrow Connector */}
        <div className="swap-area">
          {activeAction === "translate" ? (
            <button
              className="swap-btn"
              onClick={handleSwap}
              title="Swap languages"
            >
              ⇄
            </button>
          ) : (
            <div className="swap-arrow">➔</div>
          )}
        </div>

        {/* Output Panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-left">
              {activeAction === "translate" ? (
                <>
                  <span className="panel-label">Target Code</span>
                  <LanguageSelector
                    value={targetLanguage}
                    onChange={(langId) => {
                      setTargetLanguage(langId);
                      setResult(null);
                    }}
                  />
                </>
              ) : (
                <>
                  <span className="panel-label">AI Output</span>
                  <span className="action-badge">{activeAction}</span>
                </>
              )}
            </div>

            {result && (
              <div className="panel-header-right">
                <button className="action-icon-btn" onClick={handleDownload}>
                  📥 Download
                </button>
                <button className="action-icon-btn" onClick={handleCopy}>
                  {copied ? "✓ Copied" : "📋 Copy"}
                </button>
              </div>
            )}
          </div>

          <div className="panel-body">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Gemini AI is processing your code...</p>
              </div>
            ) : (
              <OutputPanel
                result={result}
                action={activeAction}
                targetLanguage={
                  activeAction === "translate" ? targetLanguage : sourceLanguage
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;