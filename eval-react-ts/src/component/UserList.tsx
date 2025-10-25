import { useEffect, useState, useMemo } from 'react'; 
import type { User } from '../model/Users';
import { fetchUsers } from '../data/UserApi';
import { UserCard } from './UserCard';
import './UserList.css';
import '../App.tsx';


const USERS_PER_PAGE = 10;
type SortKey = 'lastName' | 'age' | 'none'; 

export const UserList = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('none');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null); 
            try {
                const data = await fetchUsers();
                setAllUsers(data);
            } catch (err: any) {
                console.error("Erreur lors du chargement des utilisateurs:", err);
                const errorMessage = err.message || "Une erreur de connexion est survenue.";
                setError(errorMessage);
                setAllUsers([]); 
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    
    const processedUsers = useMemo(() => {
        let users = [...allUsers];

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            users = users.filter(user =>
                user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
                user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
                user.email.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        if (sortKey !== 'none') {
            users.sort((a, b) => {
                if (sortKey === 'lastName') {
                    return a.lastName.localeCompare(b.lastName);
                }
                if (sortKey === 'age') {
                    return a.age - b.age;
                }
                return 0;
            });
        }
        

        return users;
    }, [allUsers, searchTerm, sortKey]);

    useEffect(() => {
        setCurrentPage(1);
    }, [processedUsers]);


    // C. Pagination
    const totalPages = Math.ceil(processedUsers.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = processedUsers.slice(
        startIndex,
        startIndex + USERS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    if (loading) {
        return <div className="loading">Chargement des utilisateurs...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2 className="error-title">Une erreur est survenue</h2>
                <p className="error-message">Nous n'avons pas pu charger la liste des utilisateurs.</p>
                <p className="error-details">Détails: {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="reload-button"
                >
                    Réessayer
                </button>
            </div>
        );
    }


    return (
        <div className="user-list">
            <div className="user-header">
                <h2 className="user-header-title">Gestion des utilisateurs</h2>
            </div>

            <h1>Liste des utilisateurs</h1>

            {/* NOUVELLE BARRE DE CONTRÔLE */}
            <div className="user-controls">
                <input
                    type="text"
                    placeholder="Rechercher (Nom, Prénom, Email)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select 
                    value={sortKey} 
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="sort-select"
                >
                    <option value="none">Trier par...</option>
                    <option value="lastName">Nom (A-Z)</option>
                    <option value="age">Âge (Croissant)</option>
                </select>
            </div>

            <div className="user-grid">
                {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                ) : (
                    <p className="no-results">
                        {allUsers.length === 0 && !loading && !error 
                            ? "Aucun utilisateur trouvé (l'API peut être vide)." 
                            : "Aucun utilisateur ne correspond à votre recherche."}
                    </p>
                )}
                </div>

            {/* CONTRÔLES DE PAGINATION */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Précédent
                    </button>
                    <span>Page {currentPage} de {totalPages}</span>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
};