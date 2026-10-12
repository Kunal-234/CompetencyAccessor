import React, { useState } from 'react';
import { Header } from './components/Header/Header.jsx';
import { DashboardView } from './components/DashboardView/DashboardView.jsx';
import { SubmitWorkView } from './components/SubmitWorkView/SubmitWorkView.jsx';
import { CodeQuestionsView } from './components/CodeQuestionsView/CodeQuestionsView.jsx';
import { ReportDetailView } from './components/ReportDetailView/ReportDetailView.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />

      {/* Main View Render */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentView === 'dashboard' && (
          <DashboardView onNavigate={setCurrentView} />
        )}

        {currentView === 'submit-work' && (
          <SubmitWorkView onNavigate={setCurrentView} />
        )}

        {currentView === 'code-questions' && (
          <CodeQuestionsView onNavigate={setCurrentView} />
        )}

        {currentView === 'report-detail' && (
          <ReportDetailView onNavigate={setCurrentView} />
        )}
      </main>
    </div>
  );
}
