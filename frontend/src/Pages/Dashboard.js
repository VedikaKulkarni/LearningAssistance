// src/Pages/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Chat from '../Components/Chat';
import Notes from '../Components/Notes';
//import Summarizer from '../components/Summarizer';
import Quiz from '../Components/Quiz';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const renderContent = () => {
    switch (activeTab) {
      case "chat": return <Chat />;
     case "notes": return <Notes />;
      //case "summarizer": return <Summarizer />;
      case "quiz": return <Quiz />;
      default: return <Chat />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 overflow-y-auto bg-gray-100">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
