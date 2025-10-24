// App.tsx
import React, { useState, useEffect } from 'react';
import { User } from './model/Users'; 
import './App.css'; 

const API_URL = 'https://dummyjson.com/users';

function App() {
  const [utilisateurs, setUtilisateurs] = useState<User[]>([]);
  const [estEnChargement, setEstEnChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);

  // LOGIQUE useEffect (Inchangement)
  useEffect(() => {
    const chargerUtilisateurs = async () => {
      try {
        setEstEnChargement(true);
        setErreur(null);
        const reponse = await fetch(API_URL);
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP! Statut: ${reponse.status}`);
        }
        const donnees = await reponse.json();
        setUtilisateurs(donnees.users as User[]); 
      } catch (e) {
        console.error("Erreur lors du chargement des utilisateurs:", e);
        setErreur("Échec du chargement des utilisateurs.");
      } finally {
        setEstEnChargement(false);
      }
    };
    chargerUtilisateurs();
  }, []);

  // Rendu conditionnel (Inchangement)
  if (estEnChargement) {
    return <div className="App">Chargement des utilisateurs...</div>;
  }

  if (erreur) {
    return <div className="App" style={{ color: 'red' }}>Erreur: {erreur}</div>;
  }

  // NOUVEAU RENDU : Inclut la photo, le prénom, le nom et l'email
  return (
    <div className="App">
      <h1>Liste des Utilisateurs 👤</h1>
      {utilisateurs.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {utilisateurs.map((user) => (
            <li 
              key={user.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px', 
                border: '1px solid #ddd',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              {/* 1. PHOTO */}
              <img 
                src={user.image} 
                alt={`Photo de ${user.firstName} ${user.lastName}`} 
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px', objectFit: 'cover' }}
              />
              
              {/* 2. PRÉNOM, NOM et EMAIL */}
              <div>
                {/* Prénom et Nom */}
                <strong style={{ fontSize: '1.1em' }}>
                  {user.firstName} {user.lastName.toUpperCase()}
                </strong>
                <br />
                {/* Email */}
                <span style={{ color: '#555' }}>
                  Email : <a href={`mailto:${user.email}`}>{user.email}</a> {/* Ajout de l'email */}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
}

export default App;