import React, { useState } from "react";
import { HARDWARE_DATA } from "./hardwareData";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState("Gaming");
  const [selectedCpu, setSelectedCpu] = useState(HARDWARE_DATA.cpus[0]);
  const [selectedGpu, setSelectedGpu] = useState(HARDWARE_DATA.gpus[0]);
  const [selectedRam, setSelectedRam] = useState(HARDWARE_DATA.ram[0]);
  const [selectedPsu, setSelectedPsu] = useState(HARDWARE_DATA.psus[0]);

  const [savedBuilds, setSavedBuilds] = useState(() => {
    const saved = localStorage.getItem("pc_builds");
    return saved ? JSON.parse(saved) : [];
  });
  const [buildName, setBuildName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const totalPrice =
    selectedCpu.price +
    selectedGpu.price +
    selectedRam.price +
    selectedPsu.price;
  const isPowerSufficient = selectedPsu.wattage >= selectedGpu.minPSU;

  const handleSaveBuild = () => {
    if (!buildName.trim()) return;
    const newBuild = {
      id: Date.now(),
      name: buildName,
      useCase,
      cpu: selectedCpu.name,
      gpu: selectedGpu.name,
      ram: selectedRam.name,
      psu: selectedPsu.name,
      price: totalPrice,
    };
    const updated = [newBuild, ...savedBuilds];
    setSavedBuilds(updated);
    localStorage.setItem("pc_builds", JSON.stringify(updated));
    setBuildName("");
    setStep(4);
  };

  const handleDeleteBuild = (id) => {
    const updated = savedBuilds.filter((b) => b.id !== id);
    setSavedBuilds(updated);
    localStorage.setItem("pc_builds", JSON.stringify(updated));
  };

  const filteredBuilds = savedBuilds.filter(
    (build) =>
      build.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      build.useCase.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Custom PC Builder</h1>
      <div className="stepper">
        <button
          className={step === 1 ? "active" : ""}
          onClick={() => setStep(1)}
        >
          1. Use Case
        </button>
        <button
          className={step === 2 ? "active" : ""}
          onClick={() => setStep(2)}
        >
          2. Hardware
        </button>
        <button
          className={step === 3 ? "active" : ""}
          onClick={() => setStep(3)}
        >
          3. Summary & Save
        </button>
        <button
          className={step === 4 ? "active" : ""}
          onClick={() => setStep(4)}
        >
          4. Saved Builds ({savedBuilds.length})
        </button>
      </div>

      <hr style={{ borderColor: "var(--border)" }} />

      {step === 1 && (
        <div className="step-content">
          <h2>Select Primary Use Case</h2>
          {["Gaming", "Workstation / Video Editing", "AI & Software Dev"].map(
            (mode) => (
              <button
                key={mode}
                className={`use-case-btn ${useCase === mode ? "selected" : ""}`}
                onClick={() => setUseCase(mode)}
              >
                {mode}
              </button>
            ),
          )}
          <br />
          <br />
          <button className="nav-btn" onClick={() => setStep(2)}>
            Next: Pick Components &rarr;
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <h2>Select Hardware Components</h2>

          <div className="field">
            <label>Processor (CPU):</label>
            <select
              value={selectedCpu.id}
              onChange={(e) =>
                setSelectedCpu(
                  HARDWARE_DATA.cpus.find((c) => c.id === e.target.value),
                )
              }
            >
              {HARDWARE_DATA.cpus.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (${c.price})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Graphics Card (GPU):</label>
            <select
              value={selectedGpu.id}
              onChange={(e) =>
                setSelectedGpu(
                  HARDWARE_DATA.gpus.find((g) => g.id === e.target.value),
                )
              }
            >
              {HARDWARE_DATA.gpus.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} (${g.price})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Memory (RAM):</label>
            <select
              value={selectedRam.id}
              onChange={(e) =>
                setSelectedRam(
                  HARDWARE_DATA.ram.find((r) => r.id === e.target.value),
                )
              }
            >
              {HARDWARE_DATA.ram.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (${r.price})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Power Supply (PSU):</label>
            <select
              value={selectedPsu.id}
              onChange={(e) =>
                setSelectedPsu(
                  HARDWARE_DATA.psus.find((p) => p.id === e.target.value),
                )
              }
            >
              {HARDWARE_DATA.psus.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price})
                </option>
              ))}
            </select>
          </div>

          {!isPowerSufficient && (
            <div className="warning">
              ⚠️ <strong>Power Incompatibility Warning:</strong>{" "}
              {selectedGpu.name} requires at least {selectedGpu.minPSU}W, but
              selected PSU is only {selectedPsu.wattage}W.
            </div>
          )}

          <br />
          <button className="nav-btn" onClick={() => setStep(1)}>
            &larr; Back
          </button>
          <button
            className="nav-btn"
            onClick={() => setStep(3)}
            disabled={!isPowerSufficient}
          >
            Next: Review & Save &rarr;
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="step-content">
          <h2>Build Summary</h2>
          <ul>
            <li>
              <strong>Use Case:</strong> {useCase}
            </li>
            <li>
              <strong>CPU:</strong> {selectedCpu.name} (${selectedCpu.price})
            </li>
            <li>
              <strong>GPU:</strong> {selectedGpu.name} (${selectedGpu.price})
            </li>
            <li>
              <strong>RAM:</strong> {selectedRam.name} (${selectedRam.price})
            </li>
            <li>
              <strong>PSU:</strong> {selectedPsu.name} (${selectedPsu.price})
            </li>
          </ul>
          <h3>Total Estimated Price: ${totalPrice}</h3>

          <div className="field">
            <input
              type="text"
              placeholder="Enter Build Name (e.g., Gaming Rig)"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
            />
          </div>
          <button
            className="nav-btn"
            onClick={handleSaveBuild}
            disabled={!buildName.trim()}
          >
            Save to Dashboard
          </button>
          <button className="nav-btn" onClick={() => setStep(2)}>
            &larr; Back to Editing
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="step-content">
          <h2>Saved Builds Dashboard</h2>
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by name or use case..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          {filteredBuilds.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No builds found.</p>
          ) : (
            filteredBuilds.map((build) => (
              <div key={build.id} className="dashboard-card">
                <header>
                  <h3 style={{ margin: 0 }}>{build.name}</h3>
                  <button
                    className="nav-btn"
                    style={{ background: "var(--warning)", padding: "4px 8px" }}
                    onClick={() => handleDeleteBuild(build.id)}
                  >
                    Delete
                  </button>
                </header>
                <p>
                  <strong>Target:</strong> {build.useCase} |{" "}
                  <strong>Total:</strong> ${build.price}
                </p>
                <small style={{ color: "var(--text-muted)" }}>
                  {build.cpu} • {build.gpu} • {build.ram} • {build.psu}
                </small>
              </div>
            ))
          )}
          <br />
          <button className="nav-btn" onClick={() => setStep(1)}>
            + Create New Build
          </button>
        </div>
      )}
    </div>
  );
}
