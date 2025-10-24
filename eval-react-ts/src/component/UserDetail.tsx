import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../data/UserApi";
import type { User } from "../model/Users";
import './UserDetail.css';

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUserById(parseInt(id)).then(data => {
                setUser(data);
            })
        }}, [id]);

    if (!user) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="user-detail-page">
            <div className="user-detail">
                <button className="back-button" onClick={() => navigate('/')}>← Retour à la liste</button>
                
                <div className="user-detail-header">
                    <img 
                        src={user.image} 
                        alt={`${user.firstName} ${user.lastName}`} 
                        className="detail-avatar"
                    />
                    <h2>{user.firstName} {user.lastName}</h2>
                </div>

                <div className="detail-content">
                    <div className="detail-section">
                        <h3>Informations personnelles</h3>
                        <p><strong>Âge:</strong> {user.age} ans</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Téléphone:</strong> {user.phone}</p>
                    </div>
                    
                    <div className="detail-section">
                        <h3>Société</h3>
                        <p><strong>Entreprise:</strong> {user.company.name}</p>
                        <p><strong>Poste:</strong> {user.company.title}</p>
                        <p><strong>Département:</strong> {user.company.department}</p>
                    </div>

                    <div className="detail-section">
                        <h3>Adresse</h3>
                        <p>{user.address.street}</p>
                        <p>{user.address.city}, {user.address.state} {user.address.postalCode}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserDetail;