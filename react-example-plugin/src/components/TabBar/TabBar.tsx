import React from "react";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-bar">
      <button
        className={`tab ${activeTab === "text" ? "active" : ""}`}
        onClick={() => setActiveTab("text")}
      >
        Text
      </button>
      <button className="tab disabled">Avatars</button>
      <button className="tab disabled">Icons</button>
      <div className="tooltip-container">
        <button className="tab info">i</button>
        <div className="tooltip">Utilisez ce plugin pour générer du contenu aléatoire.</div>
      </div>
      <button
        className={`tab ${activeTab === "about" ? "active" : ""}`}
        onClick={() => setActiveTab("about")}
      >
        About
      </button>
    </div>
  );
};

export default TabBar;
