import React, { useEffect, useState } from 'react';
import BugItem from './BugItem';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBugs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/bugs');
      const data = await res.json();
      setBugs(data);
    } catch (error) {
      console.error('Failed to fetch bugs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const updateBug = (updatedBug) => {
    setBugs((prev) =>
      prev.map((bug) => (bug._id === updatedBug._id ? updatedBug : bug))
    );
  };

  const deleteBug = (id) => {
    setBugs((prev) => prev.filter((bug) => bug._id !== id));
  };

  if (loading) return <p>Loading bugs...</p>;
  if (bugs.length === 0) return <p>No bugs reported yet.</p>;

  return (
    <ul>
      {bugs.map((bug) => (
        <BugItem
          key={bug._id}
          bug={bug}
          onUpdate={updateBug}
          onDelete={deleteBug}
        />
      ))}
    </ul>
  );
}

export default BugList;
