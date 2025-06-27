import react from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data
    const userData = { name: 'John Doe' };
    console.log(`Welcome, ${userData.name}`);
  }, []);

  const handleSubmit = () => {
    if (feedback) {
      console.log(`Feedback submitted: ${feedback}`);
      alert('Feedback submitted successfully!');
      navigate('/'); // Redirect to home after submission
    } else {
      alert('Please enter your feedback before submitting.');
    }
  };

  return (
    <div className="feedback-container">
      <h1>Feedback</h1>
      <textarea className='feedback-textarea'
        placeholder="Enter your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
}

