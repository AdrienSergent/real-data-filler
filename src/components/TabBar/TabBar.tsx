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
    </div>
  );
};

export default TabBar;
