import type { User } from '../model/Users';
import React from 'react'; // Importez React si vous utilisez React.FC ou des Hooks
import { Link } from "react-router-dom";
import './UserCard.css';
import '../App.css';

interface UserCardProps {
  user: User;
  // NOUVEAU : Indique si l'utilisateur est favori
  isFavorite: boolean; 
  // NOUVEAU : Fonction à appeler pour basculer le favori
  onToggleFavorite: (userId: number) => void; 
}

export const UserCard = ({ user, isFavorite, onToggleFavorite }: UserCardProps) => {
  
  // Fonction pour gérer le clic sur l'étoile
  const handleStarClick = (event: React.MouseEvent) => {
    // Stoppe la propagation pour éviter d'activer le lien de la carte entière (si présent)
    event.stopPropagation(); 
    // Appelle la fonction passée par le parent (UserList)
    onToggleFavorite(user.id);
  };
  
  
  const StarIcon = isFavorite ? '☆' : '☆';

  return (
    <div className="user-card">
        
        {/* BOUTON FAVORIS (Nouvel élément) */}
        <span 
          className={`favorite-star ${isFavorite ? 'is-favorite' : ''}`}
          onClick={handleStarClick}
          title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {StarIcon}
        </span>
        
      <img
        src={user.image}
        alt={`Photo de ${user.firstName} ${user.lastName}`}
        className="user-pdp"
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
