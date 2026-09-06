import { useState } from "react";
import Editor from "@monaco-editor/react";
import { MONACO_LANGUAGE_MAP } from "../constants/languages.js";

function CodeEditor({ code, onChange, language, readOnly = false }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!readOnly) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (readOnly) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result.toString());
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        border: isDragging ? "2px dashed #6366f1" : "none",
        borderRadius: "8px",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: "rgba(99, 102, 241, 0.25)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: "700",
            fontSize: "16px",
            pointerEvents: "none",
          }}
        >
          📂 Drop code file to load
        </div>
      )}
      <Editor
        height="100%"
        language={MONACO_LANGUAGE_MAP[language] || "plaintext"}
        value={code}
        onChange={(v) => onChange(v || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          readOnly,
          padding: { top: 14, bottom: 14 },
          automaticLayout: true,
          tabSize: 2,
          lineNumbers: "on",
          renderLineHighlight: "all",
          bracketPairColorization: { enabled: true },
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          matchBrackets: "always",
          formatOnPaste: true,
          suggestOnTriggerCharacters: true,
          folding: true,
          smoothScrolling: true,
          fixedOverflowWidgets: true,
        }}
        loading={
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading editor environment...</p>
          </div>
        }
      />
    </div>
  );
}

export default CodeEditor;