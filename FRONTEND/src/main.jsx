import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import robotHelmet from "../robot-helmet.png";
import speedometerBg from "../speedometer-bg.png";
import userIllustration from "../user-illustration.png";
import userProfile from "../user-profile.png";
import webcamPlaceholder from "../webcam-placeholder.png";

const alerts = [
  { title: "Warning", detail: "Eyes Closed", time: "10:30 AM", tone: "warning", icon: "!" },
  { title: "Caution", detail: "Distracted", time: "10:35 AM", tone: "caution", icon: "!" },
  { title: "Safe", detail: "Normal", time: "10:40 AM", tone: "safe", icon: "✓" },
];

const weeklyBars = [82, 82, 82, 82, 82, 82, 82];
const monthlyBars = [52, 68, 44, 77, 61, 86, 72];

const logs = [
  ["2024-03-15", "09:30 AM", "Drowsiness Detected", false],
  ["2024-03-15", "11:45 AM", "Distraction Detected", false],
  ["2024-03-16", "02:15 PM", "Drowsiness Detected", false],
  ["2024-03-17", "08:00 AM", "Distraction Detected", false],
  ["2024-03-17", "04:50 PM", "Drowsiness Detected", false],
];

function BrandMark({ label = "DriveSafe", home = false }) {
  return (
    <button className="brand" onClick={home ? undefined : null} aria-label={label}>
      <span className="brand-icon" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>{label}</span>
    </button>
  );
}

function BellIcon() {
  return (
    <span className="icon-button" aria-label="Notifications" role="button">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 17H9a3 3 0 0 0 6 0Z" />
        <path d="M18 15V10a6 6 0 0 0-12 0v5l-2 2h16l-2-2Z" />
      </svg>
    </span>
  );
}

function TopNav({ page, onNavigate }) {
  const dashboard = page === "dashboard";
  const live = page === "live";

  return (
    <header className={`top-nav ${page}`}>
      <BrandMark label={dashboard ? "DriveSafe AI" : live ? "DriveSafe" : "AI Road Safety"} />
      <nav className="nav-links" aria-label="Primary navigation">
        {page === "home" ? (
          <>
            <button onClick={() => onNavigate("home")}>Home</button>
            <button>About</button>
            <button onClick={() => onNavigate("live")}>Live Detection</button>
            <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
            <button>Contact</button>
            <button className="nav-cta" onClick={() => onNavigate("live")}>Start Live Detection</button>
          </>
        ) : (
          <>
            <button className={dashboard ? "active" : ""} onClick={() => onNavigate("dashboard")}>Dashboard</button>
            {live && <button className="active" onClick={() => onNavigate("live")}>Live Detection</button>}
            <button>Settings</button>
            {dashboard && <button>Help</button>}
            <BellIcon />
            <button className="avatar-button" aria-label="User profile">
              <img src={userProfile} alt="" />
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

function HomePage({ onNavigate }) {
  return (
    <main className="hero" style={{ "--speedometer-bg": `url(${speedometerBg})` }}>
      <section className="hero-copy" aria-labelledby="hero-title">
        <h1 id="hero-title">AI-Powered Driver Safety System</h1>
        <p>Detect drowsiness &amp; distractions in real-time to prevent accidents</p>
        <button className="primary-button hero-button" onClick={() => onNavigate("live")}>
          Start Live Detection
        </button>
      </section>
      <img className="hero-robot" src={robotHelmet} alt="AI road safety robot helmet" />
    </main>
  );
}

function LiveDetectionPage({ onNavigate }) {
  return (
    <main className="live-page">
      <section className="live-main" aria-labelledby="live-title">
        <h1 id="live-title">Live Detection</h1>
        <div className="camera-panel">
          <img src={webcamPlaceholder} alt="Camera preview" />
          <button className="play-button" aria-label="Play camera feed" onClick={() => onNavigate("dashboard")}>
            <span />
          </button>
        </div>
        <button className="primary-button monitor-button" onClick={() => onNavigate("dashboard")}>
          Start Monitoring
        </button>
      </section>

      <aside className="live-sidebar" aria-label="Driver status">
        <img className="driver-card" src={userIllustration} alt="Driver profile illustration" />
        <section className="alerts-block">
          <h2>Alerts</h2>
          <div className="alert-list">
            {alerts.map((alert) => (
              <article className="alert-row" key={alert.title}>
                <span className={`alert-icon ${alert.tone}`}>{alert.icon}</span>
                <div>
                  <h3>{alert.title}</h3>
                  <p>{alert.detail}</p>
                </div>
                <time>{alert.time}</time>
              </article>
            ))}
          </div>
        </section>
        <section className="confidence-block">
          <h2>Confidence Score</h2>
          <div className="confidence-line">
            <span>Confidence</span>
            <strong>95%</strong>
          </div>
          <div className="confidence-track" aria-label="Confidence score 95 percent">
            <span />
          </div>
        </section>
      </aside>
    </main>
  );
}

function DashboardPage() {
  const [range, setRange] = useState("weekly");
  const bars = useMemo(() => (range === "weekly" ? weeklyBars : monthlyBars), [range]);
  const labels = range === "weekly" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <main className="dashboard-page">
      <section className="dashboard-heading">
        <h1>Dashboard</h1>
        <p>Monitor driver drowsiness and distraction events in real-time.</p>
      </section>

      <div className="range-switch" role="tablist" aria-label="Dashboard range">
        <button className={range === "weekly" ? "selected" : ""} onClick={() => setRange("weekly")}>Weekly</button>
        <button className={range === "monthly" ? "selected" : ""} onClick={() => setRange("monthly")}>Monthly</button>
      </div>

      <section className="chart-panel" aria-labelledby="chart-title">
        <h2 id="chart-title">Drowsiness/Distraction Events</h2>
        <div className="bar-chart">
          {bars.map((height, index) => (
            <div className="bar-group" key={labels[index]}>
              <span className="bar" style={{ height: `${height}%` }} />
              <span className="bar-label">{labels[index]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="logs-section" aria-labelledby="logs-title">
        <h2 id="logs-title">Logs</h2>
        <div className="logs-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
                <th>Alert<br />Triggered</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(([date, time, event, checked]) => (
                <tr key={`${date}-${time}-${event}`}>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{event}</td>
                  <td><input type="checkbox" defaultChecked={checked} aria-label={`${event} alert triggered`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <TopNav page={page} onNavigate={setPage} />
      {page === "home" && <HomePage onNavigate={setPage} />}
      {page === "live" && <LiveDetectionPage onNavigate={setPage} />}
      {page === "dashboard" && <DashboardPage />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
