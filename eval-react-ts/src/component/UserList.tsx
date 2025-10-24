import { useEffect, useState } from 'react';
import type { User } from '../model/Users';
import { fetchUsers } from '../data/UserApi';
import { UserCard } from './UserCard';
import './UserList.css';
import '../App.tsx';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="user-list">
      <h1>Nos Utilisateurs</h1>
      <div className="user-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
