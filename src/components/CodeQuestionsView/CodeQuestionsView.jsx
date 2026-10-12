import React, { useState } from 'react';
import './CodeQuestionsView.css';

export const sampleQuestions = [
  {
    id: 1,
    title: 'Why ModelViewSet here?',
    prompt: 'You selected ModelViewSet for the Ticket resource. Why did you choose ModelViewSet over generic API views or APIView directly?',
    tags: ['Architecture', 'From your learning doc, page 2'],
    codeFile: 'tickets/views.py',
    codeLine: 18,
    codeLines: [
      { num: 17, text: 'from rest_framework.viewsets import ModelViewSet' },
      { num: 18, text: 'class TicketViewSet(ModelViewSet):', highlighted: true },
      { num: 19, text: '    serializer_class = TicketDetailSerializer' },
      { num: 20, text: '    queryset = Ticket.objects.select_related("owner")' }
    ],
    answer: 'ModelViewSet provides standard CRUD actions out of the box with router integration, reducing boilerplate for our DRF service while maintaining clean separation of concerns.',
    isSaved: true,
    savedTime: '10:35 am'
  },
  {
    id: 2,
    title: 'Who can update a ticket?',
    prompt: 'Your doc says tickets are protected by JWT auth, but the update view uses AllowAny. Who can update a ticket right now, and what would you change?',
    tags: ['Security', 'From your learning doc, page 4'],
    codeFile: 'tickets/views.py',
    codeLine: 41,
    codeLines: [
      { num: 39, text: 'class TicketUpdateView(UpdateAPIView):' },
      { num: 40, text: '    queryset = Ticket.objects.all()' },
      { num: 41, text: '    permission_classes = [AllowAny]', highlighted: true },
      { num: 42, text: '    serializer_class = TicketSerializer' }
    ],
    answer: 'Right now anyone can update any ticket, even without logging in, because AllowAny skips auth completely. I added JWT for the list view but forgot this one. I would switch it to IsAuthenticated plus a custom permission that checks ticket.owner == request.user',
    isSaved: false,
    savedTime: ''
  },
  {
    id: 3,
    title: 'Where are errors handled?',
    prompt: 'When ticket validation fails on PATCH requests, how are DRF validation errors formatted for frontend clients?',
    tags: ['Error Handling', 'Rubric: Exception formatting'],
    codeFile: 'tickets/serializers.py',
    codeLine: 29,
    codeLines: [
      { num: 27, text: 'def validate_status(self, value):' },
      { num: 28, text: '    if value not in VALID_TRANSITIONS[self.instance.status]:' },
      { num: 29, text: '        raise serializers.ValidationError("Illegal state transition")', highlighted: true },
      { num: 30, text: '    return value' }
    ],
    answer: '',
    isSaved: false,
    savedTime: ''
  },
  {
    id: 4,
    title: 'Why this pagination style?',
    prompt: 'You implemented PageNumberPagination with a custom page_size of 25. How will this scale for high-volume ticket queries with 50,000+ items?',
    tags: ['Performance', 'Rubric: DRF API v2'],
    codeFile: 'tickets/pagination.py',
    codeLine: 12,
    codeLines: [
      { num: 10, text: 'class StandardResultsSetPagination(PageNumberPagination):' },
      { num: 11, text: '    page_size = 25' },
      { num: 12, text: '    max_page_size = 100', highlighted: true },
      { num: 13, text: '    page_size_query_param = "page_size"' }
    ],
    answer: '',
    isSaved: false,
    savedTime: ''
  },
  {
    id: 5,
    title: 'What do your tests miss?',
    prompt: 'Reviewing test_views.py: which edge cases around expired JWT refresh tokens or revoked blacklisted tokens are currently uncovered?',
    tags: ['Testing', 'Rubric: Test coverage'],
    codeFile: 'tickets/tests/test_auth.py',
    codeLine: 34,
    codeLines: [
      { num: 32, text: 'def test_valid_jwt_header_success(self):' },
      { num: 33, text: '    response = self.client.get("/api/tickets/", **self.auth_headers)' },
      { num: 34, text: '    self.assertEqual(response.status_code, 200)', highlighted: true }
    ],
    answer: '',
    isSaved: false,
    savedTime: ''
  },
  {
    id: 6,
    title: 'How is SECRET_KEY stored?',
    prompt: 'In settings.py, SECRET_KEY is set in plain text. What environment variable strategy will you deploy before staging release?',
    tags: ['Security', 'Rubric: Environment config'],
    codeFile: 'core/settings.py',
    codeLine: 23,
    codeLines: [
      { num: 22, text: '# SECURITY WARNING: keep secret key secret' },
      { num: 23, text: 'SECRET_KEY = "django-insecure-default-demo-key"', highlighted: true },
      { num: 24, text: 'DEBUG = True' }
    ],
    answer: '',
    isSaved: false,
    savedTime: ''
  }
];

export const CodeQuestionsView = ({ onNavigate }) => {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [currentIndex, setCurrentIndex] = useState(1); // Question 2 by default as shown in Image 3

  const currentQ = questions[currentIndex];

  const handleAnswerChange = (val) => {
    const updated = [...questions];
    updated[currentIndex] = {
      ...updated[currentIndex],
      answer: val
    };
    setQuestions(updated);
  };

  const handleSaveDraft = () => {
    const updated = [...questions];
    const currentAnswer = updated[currentIndex].answer ? updated[currentIndex].answer.trim() : '';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    // Mark current question as saved
    updated[currentIndex] = {
      ...updated[currentIndex],
      answer: currentAnswer || 'Saved response.',
      isSaved: true,
      savedTime: now
    };
    setQuestions(updated);
  };

  const handleSaveAndNext = () => {
    const updated = [...questions];
    const currentAnswer = updated[currentIndex].answer ? updated[currentIndex].answer.trim() : '';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    // Always mark current question as saved so the progress bar and sidebar tick turn green
    updated[currentIndex] = {
      ...updated[currentIndex],
      answer: currentAnswer || updated[currentIndex].answer || 'Saved response.',
      isSaved: true,
      savedTime: now
    };
    setQuestions(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Only count explicitly saved questions
  const completedCount = questions.filter((q) => q.isSaved === true).length;

  return (
    <div className="main-wrapper">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <span 
          className="breadcrumb-link" 
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">JWT auth for Ticket API</span>
      </nav>

      {/* Header with counter */}
      <div className="question-page-header">
        <h1 className="page-title" style={{ margin: 0 }}>Questions about your code</h1>
        <span className="question-counter-indicator">Question {currentQ.id} of {questions.length}</span>
      </div>

      {/* 6-Step Multi-segment Progress Bar: green for saved questions */}
      <div className="question-progress-multi">
        {questions.map((q, idx) => {
          let stateClass = 'upcoming';
          if (q.isSaved === true) {
            stateClass = idx === currentIndex ? 'completed active-completed' : 'completed';
          } else if (idx === currentIndex) {
            stateClass = 'current';
          }
          return (
            <div 
              key={q.id} 
              className={`q-progress-bar-seg ${stateClass}`}
              title={`Question ${q.id}: ${q.title} (${q.isSaved ? 'Saved' : idx === currentIndex ? 'Current' : 'Unsaved'})`}
              style={{ cursor: 'pointer' }}
              onClick={() => setCurrentIndex(idx)}
            ></div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="two-column-layout">
        {/* Left Column: Question, Code Snippet, Answer */}
        <div>
          {/* Question Meta Tags */}
          <div className="question-meta-tags">
            {currentQ.tags.map((tag, i) => (
              <span key={i} className="tag-pill-outline">{tag}</span>
            ))}
          </div>

          {/* Question Prompt */}
          <h2 className="question-prompt-text">{currentQ.prompt}</h2>

          {/* Code Snippet Window */}
          <div className="code-snippet-window">
            <div className="code-snippet-header">
              <span>{currentQ.codeFile}</span>
              <span>line {currentQ.codeLine}</span>
            </div>
            <div className="code-snippet-body">
              {currentQ.codeLines.map((line) => (
                <div 
                  key={line.num} 
                  className={`code-line ${line.highlighted ? 'highlighted' : ''}`}
                >
                  <span className="code-line-num">{line.num}</span>
                  <span className="code-line-content">{line.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Section */}
          <div className="answer-section">
            <label className="form-label" htmlFor="answer-textarea">
              Your answer
            </label>
            <textarea
              id="answer-textarea"
              className="answer-textarea-box"
              value={currentQ.answer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your explanation here..."
              maxLength={2000}
            />

            <div className="answer-status-bar">
              <div className="draft-saved-text">
                {currentQ.isSaved ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>Draft saved at {currentQ.savedTime || '10:42 am'}</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>
                      {currentQ.answer.trim().length > 0 ? 'Unsaved draft — click Save draft or Save and next' : 'Not saved yet'}
                    </span>
                    {currentQ.answer.trim().length > 0 && (
                      <button 
                        type="button" 
                        onClick={handleSaveDraft}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0284c7',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          marginLeft: '6px'
                        }}
                      >
                        Save now
                      </button>
                    )}
                  </>
                )}
              </div>
              <div style={{ color: '#64748b' }}>
                {currentQ.answer.length} / 2000 characters
              </div>
            </div>

            {/* Previous and Save/Next buttons */}
            <div className="q-nav-buttons-row">
              <button 
                type="button" 
                className="btn-secondary-cancel"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
              >
                &lt; Previous
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn-secondary-cancel"
                  onClick={handleSaveDraft}
                >
                  Save draft
                </button>

                <button 
                  type="button" 
                  className="btn-primary-submit"
                  onClick={handleSaveAndNext}
                >
                  {currentIndex === questions.length - 1 ? 'Save answer' : 'Save and next'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: All questions list - GREEN TICK ONLY FOR SAVED ONES */}
        <div className="side-column">
          <div className="questions-menu-card">
            <h3 className="questions-menu-title">All questions</h3>
            <div className="questions-list">
              {questions.map((q, idx) => {
                const isActive = idx === currentIndex;
                const isSaved = q.isSaved === true;

                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`question-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {/* ONLY SHOW GREEN TICK IF IS_SAVED IS TRUE */}
                    {isSaved ? (
                      <div className="q-status-icon-circle checked" title="Saved">✓</div>
                    ) : (
                      <div 
                        className={`q-status-icon-circle ${isActive ? 'current-num' : 'pending-num'}`}
                        title={isActive ? 'Current question' : 'Unsaved'}
                      >
                        {q.id}
                      </div>
                    )}
                    <span>{q.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Card */}
          <div className="info-banner-card">
            <div className="info-icon-circle">i</div>
            <div className="info-banner-text">
              <strong>Answer all 6 to submit</strong><br />
              You can go in any order. Nothing is sent until you press Submit all answers. {completedCount} of 6 done.
            </div>
          </div>

          {/* Submit all answers */}
          <button 
            type="button" 
            className="btn-submit-all-answers"
            onClick={() => {
              if (completedCount < 6) {
                alert(`You have saved ${completedCount} of 6 answers. Please answer and save all 6 questions before final submission.`);
              } else {
                alert(`All 6 answers submitted successfully! Status updated.`);
                onNavigate('dashboard');
              }
            }}
          >
            Submit all answers
          </button>
        </div>
      </div>
    </div>
  );
};
