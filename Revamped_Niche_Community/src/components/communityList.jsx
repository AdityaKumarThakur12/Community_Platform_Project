import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig/firebase';
import { ref, get } from 'firebase/database';

export default function CommunityList({ onSelect }) {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const snapshot = await get(ref(db, 'communities'));
      if (snapshot.exists()) {
        setCommunities(Object.values(snapshot.val()));
      }
    };
    fetchCommunities();
  }, []);

  return (
    <div className="space-y-4">
      {communities.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">{c.name}</h2>
          <p>{c.members} Members</p>
        </div>
      ))}
    </div>
  );
}
