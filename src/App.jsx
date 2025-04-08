import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyIndustry: '',
    location: '',
    salary: '',
    excitement: '',
    tenure: '',
    sideHustle: '',
    energy: '',
    fear: '',
    emoji: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>🔮 MBA Oracle 🔮</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Discover your post-MBA fate, powered by vibes and mild data science.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        {Object.entries(formData).map(([field, value]) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={value}
            onChange={handleChange}
            required={field !== 'sideHustle'}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        ))}
        <button type="submit" style={{ padding: '1rem', background: '#222', color: '#fff' }}>
          Reveal My Fate
        </button>
      </form>

      {submitted && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          border: '1px solid #444',
          background: '#222',
          color: '#f8f8f8',
          borderRadius: '8px'
        }}>

          <h2>Your MBA Oracle Result</h2>
          <p><strong>🗓 Burnout Date:</strong> September 12, 2026</p>
          <p><strong>📈 Career Pivot Probability:</strong> 68%</p>
          <p><strong>🚀 Startup Likelihood:</strong> 13%</p>
          <p><strong>🌤 Vibe Forecast:</strong></p>
          <ul>
            <li>Q3 2025: Confident and caffeinated ☕</li>
            <li>Q4 2025: “I own this sh*t” energy 💼</li>
            <li>Q1 2026: Subtle dread, masked by group dinners 🍝</li>
            <li>Q2 2026: Inbox zero becomes a myth. You write a LinkedIn post about growth 📈</li>
          </ul>
          <p><strong>😂 Meme Horoscope:</strong> “I didn’t read the email, but I’ll nod in the meeting.” Strategic improvisation is your superpower.</p>
          <h3>✨ Blessings Board:</h3>
          <ul>
            <li>🚀 “You got this!” – adds +3 days to burnout buffer</li>
            <li>☕ “Coffee on me” – reduces weekly stress</li>
            <li>🧘 “Manifest peace” – boosts long-term clarity</li>
            <li>🍷 “Post-work drink” – increases joy in Q4</li>
            <li>💌 “LinkedIn Endorsement” – ego boost detected</li>
          </ul>
        </div>
      )}
    </div>
  );
}

