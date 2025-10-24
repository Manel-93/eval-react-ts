import type { User } from '../model/Users';
/*import React from 'react';*/
import './Card.css';
import '..App.css';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <img
        src={user.image}
        alt={`Photo de ${user.firstName} ${user.lastName}`}
        className="user-image"
      />

      <Link to={`/user/${user.id}`}>
        <button>Détails</button>
      </Link>

      <div className="user-content">
        <h3 className="user-title">
          {user.firstName} {user.lastName.toUpperCase()}
        </h3>
        
        <p className="user-email">{user.email}</p>
        
        <div className="user-info">
          <a href={`mailto:${user.email}`} className="user-link">Contacter</a>
        </div>
      </div>
    </div>
  );
};