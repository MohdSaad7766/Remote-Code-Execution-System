import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProblemSolvePage = () => {
  const { contestId, contestProblemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('// write your code here');
  const [language, setLanguage] = useState('cpp'); // default to cpp
  const [submissionStatus, setSubmissionStatus] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/central/contest/get-problem?contestProblemId=${contestProblemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setProblem(data.problem);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching problem:', err);
      }
    };

    fetchProblem();
  }, [contestProblemId, token]);

  const handleSubmit = async () => {
    try {
      setSubmissionStatus('⏳ Submitting...');
      const response = await fetch('http://localhost:8080/central/contest/submit-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contestProblemId,
          language,
          code,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Submission failed');
      setSubmissionStatus(`✅ Submitted: ${result.verdict || 'Check result later.'}`);
    } catch (err) {
      console.error(err);
      setSubmissionStatus('❌ Submission failed.');
    }
  };

  if (loading) return <p>Loading problem...</p>;
  if (!problem) return <p>Problem not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{problem.problemTitle}</h2>
      <p><strong>Difficulty:</strong> {problem.problemDifficulty}</p>
      <div>
        <h3>Description</h3>
        <p>{problem.problemStatement}</p>
      </div>
      <div>
        <h4>Input Format</h4>
        <pre>{problem.inputFormat}</pre>
      </div>
      <div>
        <h4>Output Format</h4>
        <pre>{problem.outputFormat}</pre>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <div>
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
          </select>
        </label>
      </div>

      <textarea
        rows={15}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ marginTop: '10px', fontFamily: 'monospace', fontSize: '14px', width: '100%' }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Submit Code
      </button>

      {submissionStatus && (
        <p style={{ marginTop: '10px', color: submissionStatus.startsWith('❌') ? 'red' : 'green' }}>
          {submissionStatus}
        </p>
      )}
    </div>
  );
};

export default ProblemSolvePage;
