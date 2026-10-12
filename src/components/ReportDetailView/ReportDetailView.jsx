import React, { useState } from 'react';
import './ReportDetailView.css';

export const sampleCriteria = [
  {
    id: 'api-design',
    name: 'API design',
    score: 4,
    maxScore: 5,
    evidence: {
      files: [
        { file: 'tickets/urls.py:12', line: 12, note: 'RESTful URL naming conventions followed cleanly.' },
        { file: 'tickets/serializers.py:18', line: 18, note: 'Proper ModelSerializer with explicit fields list.' }
      ],
      learnNext: 'HyperlinkedModelSerializer for linked relationships.'
    }
  },
  {
    id: 'error-handling',
    name: 'Error handling',
    score: 3,
    maxScore: 5,
    evidence: {
      files: [
        { file: 'tickets/views.py:54', line: 54, note: 'Http404 caught and mapped to standard DRF error.' },
        { file: 'tickets/serializers.py:31', line: 31, note: 'ValidationError raised on invalid state changes.' }
      ],
      learnNext: 'Custom exception handler for unified envelope format across 4xx & 5xx.'
    }
  },
  {
    id: 'testing',
    name: 'Testing',
    score: 1,
    maxScore: 5,
    evidence: {
      files: [
        { file: 'tickets/tests/test_basic.py:10', line: 10, note: 'Only smoke tests for root endpoint; missing CRUD assertions.' }
      ],
      learnNext: 'APITestCase fixtures, edge case testing for invalid payloads, authentication mocks.'
    }
  },
  {
    id: 'security',
    name: 'Security',
    score: 2,
    maxScore: 5,
    evidence: {
      files: [
        { file: 'settings.py:23', line: 23, note: 'SECRET_KEY is written directly in the code' },
        { file: 'views.py:41', line: 41, note: 'AllowAny lets anyone update a ticket' }
      ],
      learnNext: 'DRF object level permissions, environment variables for secrets'
    }
  }
];

export const ReportDetailView = ({ onNavigate }) => {
  // In Image 4, Security is expanded by default
  const [expandedIds, setExpandedIds] = useState(['security']);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNote, setReviewNote] = useState('');

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const handleRequestReview = () => {
    if (!reviewNote.trim()) {
      alert('Please specify which criterion and reason for review.');
      return;
    }
    alert('Review request submitted to Teaching Assistant Priya S. You will receive an update within 24 hours.');
    setShowReviewModal(false);
    setReviewNote('');
  };

  return (
    <div className="main-wrapper">
      {/* Breadcrumb Navigation: My reports > Ticket API with DRF */}
      <nav className="breadcrumb-nav">
        <span 
          className="breadcrumb-link" 
          onClick={() => onNavigate('dashboard')}
        >
          My reports
        </span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">Ticket API with DRF</span>
      </nav>

      {/* Header with Title and Green Published Badge */}
      <div className="page-heading-group" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <h1 className="page-title" style={{ margin: 0 }}>Ticket API with DRF</h1>
          <span className="status-pill published">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Published
          </span>
        </div>
        <p className="page-subtitle" style={{ marginTop: '6px' }}>
          Reviewed by Priya S. (TA) on 24 Sep. Rubric: DRF API v2.
        </p>
      </div>

      {/* Two-Column Master Layout matching Image 4 */}
      <div className="report-grid-layout">
        
        {/* LEFT COLUMN: Top 2 score cards + Score by criterion list */}
        <div>
          {/* Pair of Metric Cards side-by-side */}
          <div className="report-stat-cards">
            {/* Card 1: Overall score */}
            <div className="stat-card" style={{ padding: '20px 24px' }}>
              <div className="stat-card-title">Overall score</div>
              <div className="stat-card-value">52%</div>
              <div className="stat-card-desc">Weighted across 4 criteria</div>
            </div>

            {/* Card 2: Level for this skill */}
            <div className="stat-card" style={{ padding: '20px 24px' }}>
              <div className="stat-card-title">Level for this skill</div>
              <div className="stat-card-value">L2</div>
              <div className="stat-card-desc">Guided. Up from L1 last task.</div>
            </div>
          </div>

          {/* Score by Criterion Section */}
          <div style={{ marginTop: '12px' }}>
            <h2 className="criteria-section-title">
              Score by criterion
            </h2>

            <div className="criteria-list">
              {sampleCriteria.map((criterion) => {
                const isExpanded = expandedIds.includes(criterion.id);
                const fillPercentage = (criterion.score / criterion.maxScore) * 100;

                return (
                  <div key={criterion.id} className="criterion-row">
                    <div className="criterion-header">
                      <div className="criterion-name">
                        {criterion.name}
                      </div>
                      
                      <div className="criterion-bar-track">
                        <div 
                          className="criterion-bar-fill" 
                          style={{ width: `${fillPercentage}%` }}
                        ></div>
                      </div>

                      <div className="criterion-score-text">
                        {criterion.score} / {criterion.maxScore}
                      </div>

                      <button 
                        type="button" 
                        className="btn-accordion-toggle"
                        onClick={() => toggleExpand(criterion.id)}
                        title={isExpanded ? 'Collapse evidence' : 'Expand evidence'}
                      >
                        {isExpanded ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Evidence Expansion Box */}
                    {isExpanded && criterion.evidence && (
                      <div className="evidence-box">
                        <div className="evidence-title">
                          Evidence
                        </div>
                        
                        {criterion.evidence.files.map((item, idx) => (
                          <div key={idx} className="evidence-item">
                            <span className="evidence-file">
                              {item.file}
                            </span>
                            <span>{item.note}</span>
                          </div>
                        ))}

                        <div className="evidence-learn-next">
                          <span style={{ fontWeight: 600 }}>Learn next:</span> {criterion.evidence.learnNext}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Feedback from your TA & Disagree with a score? */}
        <div className="report-side-cards">
          {/* Card 1: Feedback from your TA */}
          <div className="stat-card" style={{ padding: '20px 24px' }}>
            <h3 className="report-card-heading">
              Feedback from your TA
            </h3>
            <p className="report-card-text">
              Clean serializers and good URL structure. Your weak spot is security. Read up on permission classes before the JWT task, and move secrets into environment variables.
            </p>
          </div>

          {/* Card 2: Disagree with a score? */}
          <div className="stat-card" style={{ padding: '20px 24px' }}>
            <h3 className="report-card-heading">
              Disagree with a score?
            </h3>
            <p className="report-card-text" style={{ marginBottom: '16px' }}>
              You can ask your TA to look again within 7 days of publishing. Say which criterion and why.
            </p>
            <button 
              type="button" 
              className="btn-secondary-cancel"
              onClick={() => setShowReviewModal(true)}
              style={{ width: '100%', textAlign: 'center' }}
            >
              Request a review
            </button>
          </div>
        </div>

      </div>

      {/* Request Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <h3 className="modal-dialog-title">
              Request a Score Review
            </h3>
            <p className="modal-dialog-desc">
              You can ask your TA to look again within 7 days of publishing (until 1 Oct). Say which criterion and why:
            </p>

            <textarea 
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="e.g. Regarding Security (settings.py:23): I moved SECRET_KEY to decouple in branch fix/security-config..."
              rows={4}
              className="modal-textarea"
            />

            <div className="modal-buttons-row">
              <button 
                type="button" 
                className="btn-secondary-cancel"
                onClick={() => setShowReviewModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary-submit"
                onClick={handleRequestReview}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
