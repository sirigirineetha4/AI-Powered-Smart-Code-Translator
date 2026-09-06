import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CodeEditor from "../components/CodeEditor.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import {
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from "../services/historyService.js";
import "../styles/history.css";

const FILTER_TYPES = [
  { id: "all", label: "All" },
  { id: "translate", label: "Translate" },
  { id: "analyze", label: "Analyze" },
  { id: "optimize", label: "Optimize" },
  { id: "explain", label: "Explain" },
  { id: "debug", label: "Find Bugs" },
  { id: "generate-tests", label: "Unit Tests" },
];

function HistoryPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchHistoryData(page);
  }, [page]);

  const fetchHistoryData = async (p = 1) => {
    try {
      setLoading(true);
      const data = await getHistory(p, 20);
      setHistory(data?.entries || []);
      setTotalPages(data?.totalPages || 1);
      setTotalEntries(data?.totalEntries || 0);

      if (data?.entries?.length > 0 && !selectedItem) {
        setSelectedItem(data.entries[0]);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
      toast.error("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteHistoryItem(id);
      toast.success("History entry deleted.");
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (selectedItem?._id === id) {
        setSelectedItem(null);
      }
    } catch {
      toast.error("Failed to delete entry.");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL history items?")) {
      return;
    }

    try {
      await clearHistory();
      toast.success("All history cleared!");
      setHistory([]);
      setSelectedItem(null);
    } catch {
      toast.error("Failed to clear history.");
    }
  };

  // Restore entry to Home Page Workspace
  const handleLoadInWorkspace = () => {
    if (!selectedItem) return;

    navigate("/", {
      state: {
        inputCode: selectedItem.inputCode,
        sourceLang: selectedItem.sourceLanguage || "python",
        targetLang: selectedItem.targetLanguage || "java",
        actionType: selectedItem.type,
        outputData: selectedItem.output,
      },
    });
  };

  const filteredHistory = history.filter((item) => {
    const matchesType =
      filterType === "all" || item.type === filterType;
    const matchesSearch =
      !search ||
      item.inputCode.toLowerCase().includes(search.toLowerCase()) ||
      item.sourceLanguage.toLowerCase().includes(search.toLowerCase()) ||
      (item.targetLanguage &&
        item.targetLanguage.toLowerCase().includes(search.toLowerCase()));

    return matchesType && matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="history-page">
      {/* Sidebar List */}
      <div className="history-sidebar">
        <div className="history-sidebar-header">
          <div className="history-header-top">
            <div className="history-title">
              📜 History
              <span className="history-count">{totalEntries}</span>
            </div>

            {history.length > 0 && (
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </div>

          <input
            type="text"
            className="history-search-input"
            placeholder="🔍 Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="history-filter-tabs">
            {FILTER_TYPES.map((t) => (
              <button
                key={t.id}
                className={`history-filter-tab ${
                  filterType === t.id ? "active" : ""
                }`}
                onClick={() => setFilterType(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="history-list-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading history...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="history-empty">No history entries found.</div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item._id}
                className={`history-item ${
                  selectedItem?._id === item._id ? "active" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="history-item-top">
                  <span className={`history-item-type type-${item.type}`}>
                    {item.type}
                  </span>
                  <span className="history-item-langs">
                    {item.sourceLanguage}
                    {item.targetLanguage ? ` ➔ ${item.targetLanguage}` : ""}
                  </span>
                </div>

                <div className="history-item-preview">
                  {item.inputCode.split("\n")[0]}
                </div>

                <div className="history-item-footer">
                  <span className="history-item-date">
                    {formatDate(item.createdAt)}
                  </span>
                  <button
                    className="history-item-delete"
                    onClick={(e) => handleDelete(item._id, e)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="history-pagination">
            <button
              className="page-btn"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {page} / {totalPages}
            </span>
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Main Detail View */}
      <div className="history-detail">
        {selectedItem ? (
          <>
            <div className="history-detail-header">
              <div className="detail-header-left">
                <span className={`history-item-type type-${selectedItem.type}`}>
                  {selectedItem.type}
                </span>
                <span className="detail-type">
                  {selectedItem.sourceLanguage}
                  {selectedItem.targetLanguage
                    ? ` ➔ ${selectedItem.targetLanguage}`
                    : ""}
                </span>
                <span className="detail-date">
                  {formatDate(selectedItem.createdAt)}
                </span>
              </div>

              <div className="detail-actions">
                <button
                  className="restore-btn"
                  onClick={handleLoadInWorkspace}
                >
                  🚀 Load in Workspace
                </button>
              </div>
            </div>

            <div className="history-detail-content">
              <div>
                <div className="detail-section-label">Input Code</div>
                <div className="detail-editor-container">
                  <CodeEditor
                    code={selectedItem.inputCode}
                    onChange={() => {}}
                    language={selectedItem.sourceLanguage}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <div className="detail-section-label">AI Result</div>
                <OutputPanel
                  result={selectedItem.output}
                  action={selectedItem.type}
                  targetLanguage={
                    selectedItem.targetLanguage || selectedItem.sourceLanguage
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <div className="history-detail-empty">
            <span>👈 Select a history item to inspect details</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;