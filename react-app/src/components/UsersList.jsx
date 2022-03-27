import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((w2User) => {
    return (
      <li key={w2User.id}>
        <NavLink to={`/users/${w2User.id}`}>{w2User.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>w2User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
