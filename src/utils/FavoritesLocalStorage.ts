const favoritesName = "favorites";

import Repository from "../types/Repository";

const getFavoritesFromLocalStorage = (): Repository[] => {
  const favorites = localStorage.getItem(favoritesName);
  return favorites ? JSON.parse(favorites) : [];
};

const toggleFavoriteInLocalStorage = (repo: Repository) => {
  const currentFavorites = getFavoritesFromLocalStorage();

  const repoIndex = currentFavorites.findIndex((item) => item.id === repo.id);

  if (repoIndex !== -1) {
    currentFavorites.splice(repoIndex, 1);
  } else {
    currentFavorites.push(repo);
  }

  localStorage.setItem(favoritesName, JSON.stringify(currentFavorites));
};

const removeFavoriteInLocalStorage = (repoId: number) => {
  const currentFavorites = getFavoritesFromLocalStorage();

  const repoIndex = currentFavorites.findIndex((item) => item.id === repoId);

  if (repoIndex !== -1) currentFavorites.splice(repoIndex, 1);

  localStorage.setItem(favoritesName, JSON.stringify(currentFavorites));
};

export {
  getFavoritesFromLocalStorage,
  toggleFavoriteInLocalStorage,
  removeFavoriteInLocalStorage,
};
