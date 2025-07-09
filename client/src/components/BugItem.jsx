import React from 'react';

function BugItem({ bug, onUpdate, onDelete }) {
  const nextStatus = {
    open: 'in-progress',
    'in-progress': 'resolved',
    resolved: 'resolved',
  };

  const handleStatusChange = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bugs/${bug._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus[bug.status] }),
      });

      if (!res.ok) throw new Error('Failed to update bug');
      const updated = await res.json();
      onUpdate(updated);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bugs/${bug._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete bug');
      onDelete(bug._id);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <li style={{ marginBottom: '0.5rem' }}>
      <strong>{bug.title}</strong> - {bug.description} [{bug.status}]
      <button onClick={handleStatusChange} style={{ marginLeft: '0.5rem' }}>
        Next Status
      </button>
      <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>
        Delete
      </button>
    </li>
  );
}

export default BugItem;
