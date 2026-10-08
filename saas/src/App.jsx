import React, { useState, useEffect } from "react";
import { METRICS_DATA, TRANSACTIONS_DATA } from "./dashboardData";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") setIsDarkMode(true);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch (e) {}
  }, [isDarkMode]);

  const transactions = Array.isArray(TRANSACTIONS_DATA)
    ? TRANSACTIONS_DATA
    : [];
  const metrics = METRICS_DATA || {};

  const filteredTransactions = transactions.filter(
    (t) =>
      t.user?.toLowerCase().includes(search.toLowerCase()) ||
      t.plan?.toLowerCase().includes(search.toLowerCase()) ||
      t.status?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={`dashboard-layout ${isDarkMode ? "dark" : "light"}`}>
      <aside className="sidebar">
        <h2>Analytics Hub</h2>
        <nav>
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`nav-item ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>

        <div className="theme-toggle-container">
          <button
            className="theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="header-title">SaaS Analytics Dashboard</h1>
          <input
            type="text"
            className="search-input"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {activeTab === "overview" && (
          <section className="metrics-grid">
            {Object.entries(metrics).map(([key, item]) => (
              <div key={key} className="metric-card">
                <h4>{item.label}</h4>
                <div className="value">{item.value}</div>
                <div
                  className={`change ${item.positive ? "positive" : "negative"}`}
                >
                  {item.change} vs last month
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === "transactions" && (
          <section className="table-container">
            <h3>Recent Transactions</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.id}</td>
                    <td>
                      <strong>{tx.user}</strong>
                    </td>
                    <td>{tx.plan}</td>
                    <td>{tx.amount}</td>
                    <td>
                      <span
                        className={`badge ${tx.status?.toLowerCase().replace(" ", "-")}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="settings-container">
            <h3>Dashboard Settings</h3>
            <p className="settings-subtitle">
              Manage your preferences, profile details, and theme
              configurations.
            </p>
            <div className="settings-card">
              <h4>Appearance</h4>
              <div className="settings-row">
                <span>Theme Mode</span>
                <button
                  className="settings-action-btn"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  Switch to {isDarkMode ? "Light" : "Dark"} Mode
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
