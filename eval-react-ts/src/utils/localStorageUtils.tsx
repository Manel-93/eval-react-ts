// Clé pour stocker les IDs des favoris dans le localStorage
const FAVORITES_KEY = 'favoriteUserIds';

/**
 * Récupère la liste des IDs d'utilisateurs favoris depuis le localStorage.
 * @returns {number[]} Tableau des IDs.
 */
export const getFavoriteUserIds = (): number[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    // Retourne le tableau parsé, ou un tableau vide si rien n'est trouvé
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    // En cas d'erreur (ex: localStorage non disponible), on retourne un tableau vide
    console.error('Erreur de lecture du localStorage:', error);
    return [];
  }
};

/**
 * Enregistre une nouvelle liste d'IDs d'utilisateurs favoris dans le localStorage.
 * @param {number[]} ids - Le tableau des IDs à enregistrer.
 */
export const saveFavoriteUserIds = (ids: number[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Erreur d\'écriture dans le localStorage:', error);
  }
};

/**
 * Bascule l'état de favori (ajout/suppression) pour un utilisateur donné.
 * Met à jour le localStorage et retourne le nouvel état des IDs.
 * @param {number} userId - L'ID de l'utilisateur à basculer.
 * @returns {number[]} Le nouvel état des IDs favoris.
 */
export const toggleFavorite = (userId: number): number[] => {
  const currentFavorites = getFavoriteUserIds();
  let newFavorites: number[];

  if (currentFavorites.includes(userId)) {
    newFavorites = currentFavorites.filter(id => id !== userId);
  } else {
    newFavorites = [...currentFavorites, userId];
  }

  saveFavoriteUserIds(newFavorites);
  return newFavorites;
};
