import React from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🐞 Bug Tracker</h1>
      <BugForm />
      <BugList />
    </div>
  );
}

export default App;
