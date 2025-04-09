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

  const [loading, setLoading] = useState(false);
  const [oracleResponse, setOracleResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOracleResponse('');

    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setOracleResponse(data.prediction);
    } catch (err) {
      setOracleResponse("⚠️ The Oracle is sleeping. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>🔮 MBA Oracle 🔮</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Discover your post-MBA fate, powered by GPT and good vibes.
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

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '1rem', background: '#222', color: '#fff', cursor: 'pointer' }}
        >
          {loading ? 'Consulting the Oracle...' : 'Reveal My Fate'}
        </button>
      </form>

      {oracleResponse && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            border: '1px solid #444',
            background: '#222',
            color: '#f8f8f8',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {oracleResponse}
        </div>
      )}
    </div>
  );
}


