import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function w2User() {
  const [w2User, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const w2User = await response.json();
      setUser(w2User);
    })();
  }, [userId]);

  if (!w2User) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>w2User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {w2User.username}
      </li>
      <li>
        <strong>Email</strong> {w2User.email}
      </li>
    </ul>
  );
}
export default w2User;
