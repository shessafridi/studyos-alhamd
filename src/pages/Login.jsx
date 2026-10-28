import React, { useState } from 'react';
import { PRESET_STUDENT_ACCOUNTS } from '../data/demoData';
import { getRegisteredStudents, registerStudentAccount } from '../utils/storage';

export default function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  // Sign In Form State
  const [loginRollNo, setLoginRollNo] = useState('ALH-1042');
  const [loginPassword, setLoginPassword] = useState('123');
  const [loginError, setLoginError] = useState('');

  // Sign Up Form State
  const [regName, setRegName] = useState('');
  const [regRollNo, setRegRollNo] = useState('');
  const [regGrade, setRegGrade] = useState('Grade 10 (SSC-II)');
  const [regTrack, setRegTrack] = useState('Matric (FBISE Science)');
  const [regTarget, setRegTarget] = useState('Target: 95%+ in Board Finals');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');

  // Handle Sign In Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginRollNo.trim()) {
      setLoginError('Please enter your Student Roll Number or ID.');
      return;
    }

    // Check registered accounts first, then presets
    const registered = getRegisteredStudents();
    const matchedRegistered = registered.find(
      a => a.rollNo.toLowerCase() === loginRollNo.trim().toLowerCase()
    );

    if (matchedRegistered) {
      if (loginPassword && matchedRegistered.password && matchedRegistered.password !== loginPassword) {
        setLoginError('Incorrect password. Please check your PIN.');
        return;
      }
      onLogin(matchedRegistered);
      return;
    }

    // Check presets
    const matchedPreset = PRESET_STUDENT_ACCOUNTS.find(
      a => a.rollNo.toLowerCase() === loginRollNo.trim().toLowerCase()
    );

    if (matchedPreset) {
      onLogin(matchedPreset);
      return;
    }

    // Fallback: Custom student login
    onLogin({
      id: `student-custom-${Date.now()}`,
      name: loginRollNo.trim().toUpperCase(),
      rollNo: loginRollNo.trim().toUpperCase(),
      grade: 'Secondary Science Track',
      track: 'Matric / O-Level Science',
      school: 'Alhamdia International School & College',
      targetGoal: 'Target: A* / 90%+ in Board Finals'
    });
  };

  // Handle Student Registration (Create Account)
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please enter your full student name.');
      return;
    }

    if (!regRollNo.trim()) {
      setRegError('Please enter your Student Roll Number or ID (e.g. ALH-1055).');
      return;
    }

    if (!regPassword) {
      setRegError('Please create a portal password / PIN.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    const newAccount = {
      id: `student-${Date.now()}`,
      name: regName.trim(),
      rollNo: regRollNo.trim().toUpperCase(),
      grade: regGrade,
      track: regTrack,
      school: 'Alhamdia International School & College',
      targetGoal: regTarget.trim() || 'Target: A* / 90%+ in Board Finals',
      password: regPassword,
      registeredAt: new Date().toISOString()
    };

    // Save account locally so student can log in anytime
    registerStudentAccount(newAccount);

    // Immediately log in with new account
    onLogin(newAccount);
  };

  const handleSelectPreset = (account) => {
    setLoginRollNo(account.rollNo);
    setLoginPassword('123');
    setLoginError('');
    onLogin(account);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#090d16',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.09) 0%, rgba(15, 23, 42, 0) 65%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: activeTab === 'signup' ? '540px' : '460px',
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'max-width 0.2s ease'
        }}
      >
        {/* Top Gold Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #d4af37 0%, #fef08a 50%, #d4af37 100%)'
          }}
        />

        {/* School Crest & Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '84px',
              height: '84px',
              margin: '0 auto 12px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              padding: '3px',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/alhamdia-logo.png"
              alt="Alhamdia Crest"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '50%'
              }}
            />
          </div>

          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#d4af37',
              marginBottom: '4px'
            }}
          >
            Alhamdia International School & College
          </div>

          <h1
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '-0.02em',
              margin: '0 0 4px 0'
            }}
          >
            ALHAMDIA STUDENT PLANNER
          </h1>

          <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: 0 }}>
            “Your studies. One clear plan.” • Student Portal
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#1e293b',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '20px',
            border: '1px solid #334155'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'login' ? '#0f172a' : 'transparent',
              color: activeTab === 'login' ? '#fef08a' : '#94a3b8',
              boxShadow: activeTab === 'login' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            🔑 Sign In
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'signup' ? '#0f172a' : 'transparent',
              color: activeTab === 'signup' ? '#fef08a' : '#94a3b8',
              boxShadow: activeTab === 'signup' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            ✨ Create Student Account
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: SIGN IN MODE */}
        {/* ======================================================== */}
        {activeTab === 'login' && (
          <div>
            {loginError && (
              <div
                style={{
                  backgroundColor: '#451a1a',
                  border: '1px solid #7f1d1d',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  color: '#fca5a5',
                  marginBottom: '16px'
                }}
              >
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#cbd5e1',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Student Roll No / ID
                </label>
                <input
                  type="text"
                  value={loginRollNo}
                  onChange={e => setLoginRollNo(e.target.value)}
                  placeholder="e.g. ALH-1042"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#f8fafc',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#cbd5e1',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Password / Portal PIN
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#f8fafc',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  color: '#090d16',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)'
                }}
              >
                Sign In to Study Planner ➔
              </button>
            </form>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#38bdf8',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                New student at Alhamdia? Create your account
              </button>
            </div>

            {/* 1-Click Quick Demo Access */}
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  letterSpacing: '0.06em',
                  marginBottom: '10px',
                  textAlign: 'center'
                }}
              >
                ⚡ 1-Click Exhibition Demonstration Accounts:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRESET_STUDENT_ACCOUNTS.map(acc => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectPreset(acc)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
                        {acc.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {acc.grade} • {acc.track}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#0f172a',
                        color: '#d4af37',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #334155'
                      }}
                    >
                      {acc.rollNo}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CREATE STUDENT ACCOUNT MODE (REGISTRATION) */}
        {/* ======================================================== */}
        {activeTab === 'signup' && (
          <div>
            {regError && (
              <div
                style={{
                  backgroundColor: '#451a1a',
                  border: '1px solid #7f1d1d',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  color: '#fca5a5',
                  marginBottom: '16px'
                }}
              >
                ⚠️ {regError}
              </div>
            )}

            <form onSubmit={handleSignUpSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Zain Ahmed"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Roll Number */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Roll No / ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={regRollNo}
                    onChange={e => setRegRollNo(e.target.value)}
                    placeholder="e.g. ALH-1055"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                {/* Class / Grade */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Class / Grade
                  </label>
                  <select
                    value={regGrade}
                    onChange={e => setRegGrade(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      fontSize: '12.5px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  >
                    <option value="Grade 9 (SSC-I)">Grade 9 (SSC-I)</option>
                    <option value="Grade 10 (SSC-II)">Grade 10 (SSC-II)</option>
                    <option value="Cambridge O-Level (Year 10)">Cambridge O-Level (Year 10)</option>
                    <option value="Cambridge O-Level (Year 11)">Cambridge O-Level (Year 11)</option>
                    <option value="First Year (HSSC-I / College)">First Year (HSSC-I / College)</option>
                    <option value="Second Year (HSSC-II / College)">Second Year (HSSC-II / College)</option>
                  </select>
                </div>

                {/* Curriculum Track */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Examination Track
                  </label>
                  <select
                    value={regTrack}
                    onChange={e => setRegTrack(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      fontSize: '12.5px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  >
                    <option value="Matric (FBISE Science)">Matric (FBISE Science)</option>
                    <option value="Cambridge O-Level (CAIE)">Cambridge O-Level (CAIE)</option>
                    <option value="Punjab Board (BISE)">Punjab Board (BISE)</option>
                    <option value="Dual Track (Matric & O-Level)">Dual Track (Both)</option>
                  </select>
                </div>
              </div>

              {/* Target Goal */}
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#cbd5e1',
                    marginBottom: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  Academic Target Goal
                </label>
                <input
                  type="text"
                  value={regTarget}
                  onChange={e => setRegTarget(e.target.value)}
                  placeholder="e.g. Target: 95%+ in Federal Board Finals"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    color: '#f8fafc',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Password & Confirm */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Password / PIN *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="••••••"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#cbd5e1',
                      marginBottom: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Confirm PIN *
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      color: '#f8fafc',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  color: '#090d16',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)',
                  marginBottom: '14px'
                }}
              >
                ✨ Create Account & Launch Planner ➔
              </button>
            </form>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Already have an account? <strong style={{ color: '#38bdf8' }}>Sign In here</strong>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Institutional Footer */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#64748b' }}>
          Official Student Study Portal • Alhamdia International School & College
        </div>
      </div>
    </div>
  );
}
