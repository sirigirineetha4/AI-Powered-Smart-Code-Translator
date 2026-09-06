import CodeEditor from "./CodeEditor.jsx";
import "../styles/output.css";

function OutputPanel({ result, action, targetLanguage }) {
  if (!result) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚡</div>
        <p>
          Write or paste code in the editor, select an action above, and click{" "}
          <span>Run</span> to see magic happen.
        </p>
      </div>
    );
  }

  // 1. Translation
  if (action === "translate") {
    return (
      <div className="output-full-height">
        <CodeEditor
          code={result.translatedCode || ""}
          onChange={() => {}}
          language={targetLanguage}
          readOnly
        />
      </div>
    );
  }

  // 2. Complexity Analysis
  if (action === "analyze") {
    return (
      <div className="output-cards">
        <div className="output-cards-row">
          <InfoCard label="Time Complexity" value={result.timeComplexity || "N/A"} />
          <InfoCard label="Space Complexity" value={result.spaceComplexity || "N/A"} />
        </div>
        {result.explanation && (
          <div className="output-explanation-box">
            <div className="output-explanation-title">Analysis Breakdown</div>
            <p className="output-explanation">{result.explanation}</p>
          </div>
        )}
      </div>
    );
  }

  // 3. Code Optimization
  if (action === "optimize") {
    return (
      <div className="output-flex-col">
        <div className="output-editor-area">
          <CodeEditor
            code={result.optimizedCode || ""}
            onChange={() => {}}
            language={targetLanguage}
            readOnly
          />
        </div>
        {result.suggestions && (
          <div className="output-suggestions">
            <div className="output-suggestions-label">⚡ Improvements & Best Practices</div>
            <p>{result.suggestions}</p>
          </div>
        )}
      </div>
    );
  }

  // 4. Code Explanation
  if (action === "explain") {
    return (
      <div className="output-cards">
        <div className="output-explanation-box">
          <div className="output-explanation-title">📖 Code Guide</div>
          <p className="output-explanation">{result.explanation}</p>
        </div>
      </div>
    );
  }

  // 5. Bug Finder & Security Audit
  if (action === "debug") {
    const bugCount = result.bugCount ?? (result.issues ? result.issues.length : 0);
    return (
      <div className="output-cards">
        <div className={`bug-summary-card ${bugCount === 0 ? "clean" : ""}`}>
          <span className="bug-summary-text">
            {bugCount === 0
              ? "✨ Code looks clean! No major issues found."
              : `Found ${bugCount} potential issue(s)`}
          </span>
          <span className={`bug-count-badge ${bugCount === 0 ? "zero" : ""}`}>
            {bugCount === 0 ? "0 Issues" : `${bugCount} Bugs`}
          </span>
        </div>

        {result.summary && (
          <p className="output-explanation" style={{ fontSize: "13px" }}>
            {result.summary}
          </p>
        )}

        <div className="bug-report-container">
          {result.issues &&
            result.issues.map((issue, idx) => (
              <div className="bug-issue-card" key={idx}>
                <div className="bug-issue-header">
                  <span className={`severity-tag ${issue.severity || "Warning"}`}>
                    {issue.severity || "Issue"}
                  </span>
                </div>
                <div className="bug-issue-desc">{issue.issue}</div>
                {issue.fix && (
                  <div className="bug-issue-fix">
                    <strong>Suggested Fix:</strong> {issue.fix}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }

  // 6. Unit Test Generator
  if (action === "generate-tests") {
    return (
      <div className="output-flex-col">
        <div className="output-editor-area">
          <CodeEditor
            code={result.testCode || ""}
            onChange={() => {}}
            language={targetLanguage}
            readOnly
          />
        </div>
        {(result.framework || result.coverageNotes) && (
          <div className="output-suggestions">
            <div className="output-suggestions-label">
              🧪 Framework: {result.framework || "Standard Suite"}
            </div>
            <p>{result.coverageNotes}</p>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <div className="info-card-label">{label}</div>
      <div className="info-card-value">{value}</div>
    </div>
  );
}

export default OutputPanel;