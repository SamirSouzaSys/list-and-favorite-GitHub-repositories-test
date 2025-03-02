import { useCallback, useEffect, useState } from "react";
import {
  getFavoritesFromLocalStorage,
  removeFavoriteInLocalStorage,
} from "../utils/FavoritesLocalStorage";
import Repository from "../types/Repository";
import RepositoryComponent from "../components/Repository";
import { usePaginateGHProfileRepos } from "../hooks/useGitHubRepos";

const Favorites = () => {
  const { user, setUser } = usePaginateGHProfileRepos();
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const [favoritesItems, setFavoritesItems] = useState<Repository[]>([]);

  useEffect(() => {
    setFavoritesIds(getFavoritesFromLocalStorage().map((repo) => repo.id));
  }, []);

  useEffect(() => {
    setFavoritesItems(getFavoritesFromLocalStorage());
  }, [user]);

  const handleRemoveFavorite = useCallback(
    (repoId: number) => {
      // const repoItem = user?.repositories.find((item) => item.id === repoId);
      // if (!repoItem) return;

      removeFavoriteInLocalStorage(repoId);

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          repositories: prevUser.repositories.map((repo) =>
            repo.id === repoId
              ? { ...repo, IsFavorite: !repo.isFavorite }
              : repo
          ),
        };
      });
    },
    [setUser, user?.repositories]
  );

  return (
    <>
      <h1 className="font-poppins font-semibold text-heading-1 text-primary mb-4">
        Favorites
      </h1>

      {favoritesItems.length > 0 ? (
        favoritesItems.map((repo) => {
          const isFavorite = favoritesItems.some(
            (favorite) => favorite.id === repo.id
          );

          return (
            <RepositoryComponent
              key={repo.id}
              id={repo.id}
              name={repo.name}
              description={repo.description}
              languages={repo.languages}
              updated_at={repo.updated_at}
              isFavorite={isFavorite}
              setIsFavorite={() => handleRemoveFavorite(repo.id)}
            />
          );
        })
      ) : (
        <h3>Lista de favoritos está vazia</h3>
      )}
    </>
  );
};

export default Favorites;
