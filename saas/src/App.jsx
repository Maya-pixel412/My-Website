import React, { useState } from "react";
import { METRICS_DATA, TRANSACTIONS_DATA } from "./dashboardData";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  const filteredTransactions = TRANSACTIONS_DATA.filter(
    (t) =>
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.plan.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Analytics Hub</h2>
        <nav>
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "transactions" ? "active" : ""}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>SaaS Analytics Dashboard</h1>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              background: "#0f172a",
              color: "white",
            }}
          />
        </header>

        <section className="metrics-grid">
          {Object.entries(METRICS_DATA).map(([key, item]) => (
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
                    <span className={`badge ${tx.status}`}>{tx.status}</span>
                  </td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
