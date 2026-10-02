import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const [formData, setFormData] = useState({
    age: '', sex: '1', cp: '0', trestbps: '', chol: '',
    fbs: '0', restecg: '0', thalach: '', exang: '0',
    oldpeak: '', slope: '0', ca: '0', thal: '1'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Prediction request failed');
      }
    } catch (err) {
      setError('Unable to reach the backend evaluation server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#0b0f19',
      minHeight: '100vh',
      color: '#f8fafc',
      margin: 0,
      padding: 0
    }}>
      
      {/* Navigation Bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 50px',
        backgroundColor: '#111827',
        borderBottom: '1px solid #1f2937',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(244, 63, 94, 0.3)' }}>脉</div>
          <span style={{ fontSize: '19px', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.5px' }}>CardioPulse <span style={{ color: '#f43f5e', fontSize: '12px' }}>AI</span></span>
        </div>
        
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: '600' }}>
          <span onClick={() => setActiveTab('home')} style={{ cursor: 'pointer', color: activeTab === 'home' ? '#f43f5e' : '#9ca3af', transition: 'color 0.2s' }}>Home</span>
          <span onClick={() => setActiveTab('prediction')} style={{ cursor: 'pointer', color: activeTab === 'prediction' ? '#f43f5e' : '#9ca3af', transition: 'color 0.2s' }}>Risk Evaluation</span>
          <span onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer', color: activeTab === 'dashboard' ? '#f43f5e' : '#9ca3af', transition: 'color 0.2s' }}>Analytics Hub</span>
          <span onClick={() => setActiveTab('about')} style={{ cursor: 'pointer', color: activeTab === 'about' ? '#f43f5e' : '#9ca3af', transition: 'color 0.2s' }}>System Info</span>
        </div>
      </nav>

      {/* 1. HOME TAB */}
      {activeTab === 'home' && (
        <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '60px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center' }}>
            <div>
              <span style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                Next-Gen Cardiovascular Intelligence
              </span>
              <h1 style={{ fontSize: '44px', fontWeight: '900', color: '#f8fafc', lineHeight: '1.2', margin: '20px 0' }}>
                Empowering Preventive Cardiology Through <span style={{ color: '#fb7185' }}>Smart Diagnostics</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
                Leverage advanced clinical machine learning models to assess myocardial health status, analyze biometric metrics, and preemptively evaluate potential coronary risks.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={() => setActiveTab('prediction')} style={{ background: '#e11d48', color: '#fff', border: 'none', padding: '13px 26px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)' }}>
                  Launch Evaluation →
                </button>
                <button onClick={() => setActiveTab('dashboard')} style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', padding: '13px 26px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
                  Explore Analytics Hub
                </button>
              </div>
            </div>

            {/* Right Side Card */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '45px 35px', color: '#fff', textAlign: 'center', boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.5)', border: '1px solid #334155', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(244, 63, 94, 0.15)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
              <div style={{ fontSize: '48px', marginBottom: '15px', filter: 'drop-shadow(0 4px 8px rgba(244, 63, 94, 0.4))' }}>🫀</div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>Biometric Health Core</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', marginBottom: '25px' }}>Real-time telemetry and clinical data processing unit calibrated for deep cardiovascular profiling.</p>
              <div style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '8px 18px', borderRadius: '30px', display: 'inline-block', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px' }}>
                ⚡ System Fully Operational
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '60px', background: '#111827', padding: '30px', borderRadius: '18px', border: '1px solid #1f2937', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)' }}>
            <div style={{ textAlign: 'center' }}><h2 style={{ margin: 0, fontSize: '28px', color: '#fb7185', fontWeight: '800' }}>1,025</h2><p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Evaluated Profiles</p></div>
            <div style={{ textAlign: 'center' }}><h2 style={{ margin: 0, fontSize: '28px', color: '#fb7185', fontWeight: '800' }}>13</h2><p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Clinical Parameters</p></div>
            <div style={{ textAlign: 'center' }}><h2 style={{ margin: 0, fontSize: '28px', color: '#fb7185', fontWeight: '800' }}>2</h2><p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Ensemble Algorithms</p></div>
            <div style={{ textAlign: 'center' }}><h2 style={{ margin: 0, fontSize: '28px', color: '#fb7185', fontWeight: '800' }}>0.0%</h2><p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>Imputation Error</p></div>
          </div>
        </div>
      )}

      {/* 2. PREDICTION TAB */}
      {activeTab === 'prediction' && (
        <div style={{ maxWidth: '850px', margin: '40px auto', padding: '40px', background: '#111827', borderRadius: '20px', border: '1px solid #1f2937', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginTop: 0, fontSize: '22px', fontWeight: '800', borderBottom: '2px solid #1f2937', paddingBottom: '15px', color: '#f8fafc' }}>
            Clinical Parameter Inputs
          </h2>
          
          <form onSubmit={handleSubmit} style={{ marginTop: '25px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div style={fieldGroup}>
                <label style={labelStyle}>Age (Years)</label>
                <input type="number" name="age" placeholder="e.g. 54" value={formData.age} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Biological Sex</label>
                <select name="sex" value={formData.sex} onChange={handleChange} style={inputStyle}>
                  <option value="1">Male</option><option value="0">Female</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Chest Pain Category</label>
                <select name="cp" value={formData.cp} onChange={handleChange} style={inputStyle}>
                  <option value="0">Typical Angina</option><option value="1">Atypical Angina</option>
                  <option value="2">Non-anginal Pain</option><option value="3">Asymptomatic</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Resting Blood Pressure</label>
                <input type="number" name="trestbps" placeholder="e.g. 130 mmHg" value={formData.trestbps} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Serum Cholesterol</label>
                <input type="number" name="chol" placeholder="e.g. 240 mg/dl" value={formData.chol} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Fasting Blood Glucose</label>
                <select name="fbs" value={formData.fbs} onChange={handleChange} style={inputStyle}>
                  <option value="1">&gt; 120 mg/dl (High)</option><option value="0">&le; 120 mg/dl (Normal)</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Resting ECG Results</label>
                <select name="restecg" value={formData.restecg} onChange={handleChange} style={inputStyle}>
                  <option value="0">Normal</option><option value="1">ST-T Wave Abnormality</option><option value="2">Left Ventricular Hypertrophy</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Peak Heart Rate (Thalach)</label>
                <input type="number" name="thalach" placeholder="e.g. 160 bpm" value={formData.thalach} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Exercise Induced Angina</label>
                <select name="exang" value={formData.exang} onChange={handleChange} style={inputStyle}>
                  <option value="1">Yes</option><option value="0">No</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>ST Depression (Oldpeak)</label>
                <input type="number" step="0.1" name="oldpeak" placeholder="e.g. 1.5" value={formData.oldpeak} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Peak Exercise ST Slope</label>
                <select name="slope" value={formData.slope} onChange={handleChange} style={inputStyle}>
                  <option value="0">Upsloping</option><option value="1">Flat</option><option value="2">Downsloping</option>
                </select>
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Major Vessels Colored (CA)</label>
                <select name="ca" value={formData.ca} onChange={handleChange} style={inputStyle}>
                  <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
                </select>
              </div>
              <div style={{ ...fieldGroup, gridColumn: 'span 3' }}>
                <label style={labelStyle}>Thalassemia Type</label>
                <select name="thal" value={formData.thal} onChange={handleChange} style={inputStyle}>
                  <option value="1">Normal Blood Flow</option><option value="2">Fixed Defect Profile</option><option value="3">Reversible Defect Profile</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '35px' }}>
              <button type="submit" disabled={loading} style={{ width: '100%', background: '#e11d48', color: '#fff', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)' }}>
                {loading ? 'Processing Diagnostic Metrics...' : 'Execute Risk Assessment'}
              </button>
            </div>
          </form>

          {error && <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '10px', textAlign: 'center', fontWeight: '600', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}

          {result && (
            <div style={{ marginTop: '25px', padding: '25px', background: result.prediction === 1 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)', borderRadius: '12px', textAlign: 'center', border: '1px solid ' + (result.prediction === 1 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)') }}>
              <h3 style={{ margin: '0 0 6px 0', color: result.prediction === 1 ? '#f87171' : '#4ade80', fontSize: '20px', fontWeight: '800' }}>
                Diagnostic Outcome: {result.risk_level}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
                Confidence Metric: <strong style={{ color: '#f8fafc' }}>{result.confidence.toFixed(2)}%</strong>
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div style={{ maxWidth: '1150px', margin: '40px auto', padding: '20px' }}>
          <div style={{ marginBottom: '30px' }}>
            <span style={{ color: '#fb7185', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Telemetry & Statistics</span>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#f8fafc', margin: '5px 0' }}>Clinical Analytics Dashboard</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Comprehensive distribution breakdowns of patient demographics, biomarker correlations, and comparative evaluation metrics.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '30px' }}>
            <div style={statCard}>
              <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>Total Records</span>
              <h2 style={{ margin: '8px 0 0 0', fontSize: '26px', color: '#f8fafc', fontWeight: '800' }}>1,025</h2>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Aggregated entries</span>
            </div>
            <div style={statCard}>
              <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>Positive Cases</span>
              <h2 style={{ margin: '8px 0 0 0', fontSize: '26px', color: '#fb7185', fontWeight: '800' }}>526</h2>
              <span style={{ fontSize: '11px', color: '#fb7185' }}>51.3% prevalence rate</span>
            </div>
            <div style={statCard}>
              <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>Healthy Cases</span>
              <h2 style={{ margin: '8px 0 0 0', fontSize: '26px', color: '#38bdf8', fontWeight: '800' }}>499</h2>
              <span style={{ fontSize: '11px', color: '#38bdf8' }}>48.7% baseline normal</span>
            </div>
            <div style={statCard}>
              <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>Input Attributes</span>
              <h2 style={{ margin: '8px 0 0 0', fontSize: '26px', color: '#f8fafc', fontWeight: '800' }}>13</h2>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Dimensional features</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#fb7185', textTransform: 'uppercase' }}>Prevalence Ratio</span>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 20px 0' }}>Cardiovascular Disease Distribution</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'conic-gradient(#e11d48 0deg 185deg, #0284c7 185deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                  <div style={{ width: '70px', height: '70px', background: '#111827', borderRadius: '50%' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', fontWeight: '600', marginTop: '10px' }}>
                <span style={{ color: '#fb7185' }}>● Positive Risk</span>
                <span style={{ color: '#38bdf8' }}>● Normal Profile</span>
              </div>
            </div>

            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#fb7185', textTransform: 'uppercase' }}>Demographics</span>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 20px 0' }}>Patient Age Stratification</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '170px', borderBottom: '1px solid #1f2937', paddingBottom: '5px' }}>
                <div style={{ background: '#e11d48', width: '25px', height: '20px', borderRadius: '4px' }}></div>
                <div style={{ background: '#e11d48', width: '25px', height: '60px', borderRadius: '4px' }}></div>
                <div style={{ background: '#e11d48', width: '25px', height: '120px', borderRadius: '4px' }}></div>
                <div style={{ background: '#e11d48', width: '25px', height: '150px', borderRadius: '4px' }}></div>
                <div style={{ background: '#e11d48', width: '25px', height: '100px', borderRadius: '4px' }}></div>
                <div style={{ background: '#e11d48', width: '25px', height: '25px', borderRadius: '4px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
                <span>29-38</span><span>39-48</span><span>49-58</span><span>59-68</span><span>69-77</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '25px' }}>
            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#fb7185', textTransform: 'uppercase' }}>Biomarker</span>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 15px 0' }}>Cholesterol Levels</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '130px', borderBottom: '1px solid #1f2937' }}>
                <div style={{ background: '#e11d48', width: '20px', height: '65px', borderRadius: '3px' }}></div>
                <div style={{ background: '#e11d48', width: '20px', height: '125px', borderRadius: '3px' }}></div>
                <div style={{ background: '#e11d48', width: '20px', height: '95px', borderRadius: '3px' }}></div>
                <div style={{ background: '#e11d48', width: '20px', height: '85px', borderRadius: '3px' }}></div>
              </div>
            </div>

            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#38bdf8', textTransform: 'uppercase' }}>Telemetry</span>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 15px 0' }}>Resting BP Spread</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '130px', borderBottom: '1px solid #1f2937' }}>
                <div style={{ background: '#38bdf8', width: '18px', height: '75px', borderRadius: '3px' }}></div>
                <div style={{ background: '#38bdf8', width: '18px', height: '105px', borderRadius: '3px' }}></div>
                <div style={{ background: '#38bdf8', width: '18px', height: '95px', borderRadius: '3px' }}></div>
                <div style={{ background: '#38bdf8', width: '18px', height: '100px', borderRadius: '3px' }}></div>
                <div style={{ background: '#38bdf8', width: '18px', height: '45px', borderRadius: '3px' }}></div>
              </div>
            </div>

            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#4ade80', textTransform: 'uppercase' }}>Cardio Dynamics</span>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 15px 0' }}>Max Heart Rate</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '130px', borderBottom: '1px solid #1f2937' }}>
                <div style={{ background: '#4ade80', width: '18px', height: '25px', borderRadius: '3px' }}></div>
                <div style={{ background: '#4ade80', width: '18px', height: '55px', borderRadius: '3px' }}></div>
                <div style={{ background: '#4ade80', width: '18px', height: '85px', borderRadius: '3px' }}></div>
                <div style={{ background: '#4ade80', width: '18px', height: '115px', borderRadius: '3px' }}></div>
                <div style={{ background: '#4ade80', width: '18px', height: '125px', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#fb7185', textTransform: 'uppercase' }}>Algorithm Benchmark</span>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 15px 0' }}>Model Performance Metrics</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', borderBottom: '1px solid #1f2937', paddingBottom: '5px' }}>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
                  <div style={{ background: '#e11d48', width: '12px', height: '115px', borderRadius: '2px' }}></div>
                  <div style={{ background: '#38bdf8', width: '12px', height: '125px', borderRadius: '2px' }}></div>
                  <div style={{ background: '#4ade80', width: '12px', height: '135px', borderRadius: '2px' }}></div>
                  <div style={{ background: '#818cf8', width: '12px', height: '120px', borderRadius: '2px' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
                  <div style={{ background: '#e11d48', width: '12px', height: '135px', borderRadius: '2px' }}></div>
                  <div style={{ background: '#38bdf8', width: '12px', height: '135px', borderRadius: '2px' }}></div>
                  <div style={{ background: '#4ade80', width: '12px', height: '135px', borderRadius: '2px' }}></div>
                  <div style={{ background: '#818cf8', width: '12px', height: '135px', borderRadius: '2px' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: '#94a3b8', marginTop: '8px', fontWeight: '600' }}>
                <span>Logistic Regression</span><span>Random Forest Ensemble</span>
              </div>
            </div>

            <div style={graphCard}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#38bdf8', textTransform: 'uppercase' }}>Feature Weighting</span>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '4px 0 15px 0' }}>Top Important Parameters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600' }}><span style={{ width: '60px', color: '#94a3b8' }}>thal</span><div style={{ background: '#3b82f6', height: '10px', width: '85%', borderRadius: '4px' }}></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600' }}><span style={{ width: '60px', color: '#94a3b8' }}>cp</span><div style={{ background: '#3b82f6', height: '10px', width: '70%', borderRadius: '4px' }}></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600' }}><span style={{ width: '60px', color: '#94a3b8' }}>thalach</span><div style={{ background: '#3b82f6', height: '10px', width: '60%', borderRadius: '4px' }}></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600' }}><span style={{ width: '60px', color: '#94a3b8' }}>oldpeak</span><div style={{ background: '#3b82f6', height: '10px', width: '50%', borderRadius: '4px' }}></div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600' }}><span style={{ width: '60px', color: '#94a3b8' }}>ca</span><div style={{ background: '#3b82f6', height: '10px', width: '40%', borderRadius: '4px' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ABOUT TAB */}
      {activeTab === 'about' && (
        <div style={{ maxWidth: '800px', margin: '60px auto', padding: '45px', background: '#111827', borderRadius: '20px', border: '1px solid #1f2937', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginTop: 0, color: '#f8fafc', fontSize: '24px', fontWeight: '900' }}>About CardioPulse Intelligence</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', maxWidth: '620px', margin: '20px auto' }}>
            CardioPulse AI is built as a state-of-the-art clinical decision support system. Utilizing rigorous data curation and supervised predictive algorithms, it assists medical researchers and practitioners in evaluating cardiovascular vulnerability factors accurately and seamlessly.
          </p>
        </div>
      )}

    </div>
  );
}

const fieldGroup = { display: 'flex', flexDirection: 'column', gap: '6px' };
const labelStyle = { fontSize: '12px', fontWeight: '700', color: '#94a3b8' };
const inputStyle = { background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc', padding: '10px 14px', fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box' };
const statCard = { background: '#111827', border: '1px solid #1f2937', padding: '20px', borderRadius: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
const graphCard = { background: '#111827', border: '1px solid #1f2937', padding: '22px', borderRadius: '14px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)' };