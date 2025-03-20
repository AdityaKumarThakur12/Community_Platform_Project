import React, { useState } from 'react';
import { db } from '../firebaseConfig/firebase';
import { ref, push, set } from 'firebase/database';

export default function CreateCommunity({ onUpdate }) {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) return;
    const newCommunityRef = push(ref(db, 'communities'));
    await set(newCommunityRef, { id: newCommunityRef.key, name, members: 0 });
    setName('');
    onUpdate();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Community Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded mt-2">
        Create Community
      </button>
    </div>
  );
}
