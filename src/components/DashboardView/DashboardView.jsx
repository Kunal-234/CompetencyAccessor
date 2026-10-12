import React, { useState } from 'react';
import './DashboardView.css';

export const initialTasks = [
  {
    id: 'ticket-api',
    name: 'Ticket API with DRF',
    skill: 'DRF API design',
    dueText: 'Due tomorrow',
    dueBadge: true,
    status: 'not-submitted',
    statusLabel: 'Not submitted',
    actionType: 'submit',
    actionLabel: 'Submit'
  },
  {
    id: 'jwt-auth',
    name: 'JWT auth for Ticket API',
    skill: 'Auth and security',
    dueText: 'Due 29 Sep',
    status: 'questions-ready',
    statusLabel: 'Questions ready',
    actionType: 'questions',
    actionLabel: 'Answer questions'
  },
  {
    id: 'pagination-filters',
    name: 'Pagination and filters',
    skill: 'DRF API design',
    dueText: 'Submitted 22 Sep',
    status: 'processing',
    statusLabel: 'Processing',
    actionType: 'processing-time',
    actionLabel: 'About 5 min left'
  },
  {
    id: 'unit-tests',
    name: 'Unit tests for services',
    skill: 'Testing',
    dueText: 'Submitted 12 Sep',
    status: 'under-review',
    statusLabel: 'Under review',
    actionType: 'view-submission',
    actionLabel: 'View submission'
  },
  {
    id: 'models-migrations',
    name: 'Models and migrations',
    skill: 'Django ORM',
    dueText: 'Published 5 Sep',
    status: 'published',
    statusLabel: 'Published',
    actionType: 'view-report',
    actionLabel: 'View report'
  }
];

export const DashboardView = ({ onNavigate }) => {
  const [filter, setFilter] = useState('all');
  const [tasks] = useState(initialTasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'todo') {
      return task.status === 'not-submitted' || task.status === 'questions-ready';
    }
    if (filter === 'done') {
      return task.status === 'processing' || task.status === 'under-review' || task.status === 'published';
    }
    return true;
  });

  return (
    <div className="main-wrapper">
      {/* Page Heading */}
      <div className="page-heading-group">
        <h1 className="page-title">Good morning, Kunal</h1>
        <p className="page-subtitle">You have 2 tasks that need you this week.</p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="stat-cards-grid">
        {/* Card 1: Tasks to do */}
        <div className="stat-card">
          <div className="stat-card-title">Tasks to do</div>
          <div className="stat-card-value">2</div>
          <div className="stat-card-desc">1 due tomorrow</div>
        </div>

        {/* Card 2: Average score */}
        <div className="stat-card">
          <div className="stat-card-title">Average score</div>
          <div className="stat-card-value">68%</div>
          <div className="stat-card-desc">Across 3 published reports</div>
        </div>

        {/* Card 3: Current level */}
        <div className="stat-card">
          <div className="stat-card-title">Current level</div>
          <div className="stat-card-value">L2</div>
          <div className="stat-card-desc">Guided. Next: L3 Independent</div>
          <div className="level-segments-bar">
            <div className="level-segment filled" title="Level 1 Completed"></div>
            <div className="level-segment filled" title="Level 2 Current"></div>
            <div className="level-segment empty" title="Level 3 Next"></div>
            <div className="level-segment empty" title="Level 4 Master"></div>
          </div>
        </div>
      </div>

      {/* Section Box: Your tasks */}
      <div className="section-card">
        <div className="section-header-row">
          <h2 className="section-heading">Your tasks</h2>
          
          <div className="filter-tabs-pills">
            <button 
              className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All (5)
            </button>
            <button 
              className={`filter-pill-btn ${filter === 'todo' ? 'active' : ''}`}
              onClick={() => setFilter('todo')}
            >
              To do (2)
            </button>
            <button 
              className={`filter-pill-btn ${filter === 'done' ? 'active' : ''}`}
              onClick={() => setFilter('done')}
            >
              Done (3)
            </button>
          </div>
        </div>

        {/* Tasks Data Table */}
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Task</th>
                <th style={{ width: '22%' }}>Skill</th>
                <th style={{ width: '18%' }}>Due</th>
                <th style={{ width: '17%' }}>Status</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  {/* Task name */}
                  <td>
                    <span className="task-name-text">{task.name}</span>
                  </td>

                  {/* Skill */}
                  <td>
                    <span className="skill-name-text">{task.skill}</span>
                  </td>

                  {/* Due */}
                  <td>
                    {task.dueBadge ? (
                      <span className="badge-warning-amber">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        {task.dueText}
                      </span>
                    ) : (
                      <span className="due-date-text">{task.dueText}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    {task.status === 'not-submitted' && (
                      <span className="status-pill not-submitted">
                        {task.statusLabel}
                      </span>
                    )}

                    {task.status === 'questions-ready' && (
                      <span className="status-pill questions-ready">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        {task.statusLabel}
                      </span>
                    )}

                    {task.status === 'processing' && (
                      <span className="status-pill processing">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                          <path d="M3 3v5h5"></path>
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                          <path d="M16 21h5v-5"></path>
                        </svg>
                        {task.statusLabel}
                      </span>
                    )}

                    {task.status === 'under-review' && (
                      <span className="status-pill under-review">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {task.statusLabel}
                      </span>
                    )}

                    {task.status === 'published' && (
                      <span className="status-pill published">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {task.statusLabel}
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: 'right' }}>
                    {task.actionType === 'submit' && (
                      <button 
                        className="btn-table-action-primary"
                        onClick={() => onNavigate('submit-work')}
                      >
                        Submit
                      </button>
                    )}

                    {task.actionType === 'questions' && (
                      <button 
                        className="btn-table-action-secondary"
                        onClick={() => onNavigate('code-questions')}
                      >
                        Answer questions
                      </button>
                    )}

                    {task.actionType === 'processing-time' && (
                      <span className="table-action-text">{task.actionLabel}</span>
                    )}

                    {task.actionType === 'view-submission' && (
                      <button 
                        className="table-link-action"
                        onClick={() => alert('Opening submission files: unit_tests_services.py, fixtures.json, test_runner.log')}
                      >
                        {task.actionLabel}
                      </button>
                    )}

                    {task.actionType === 'view-report' && (
                      <button 
                        className="table-link-action"
                        onClick={() => onNavigate('report-detail')}
                      >
                        {task.actionLabel}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
