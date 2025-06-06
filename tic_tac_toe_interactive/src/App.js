import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  // Renders layout and includes the main TicTacToe Interactive game container.
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* The button is not used for the TicTacToe UI, removed for clean design */}
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110 }}>
          <h1 className="title" style={{ color: '#2196f3', textAlign: 'center', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '0.7px', marginBottom: 4 }}>
            TicTacToe Interactive
          </h1>
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;