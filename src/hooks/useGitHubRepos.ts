import React, { useCallback, useState } from "react";

import RepoLanguages from "../types/RepoLanguages";
import Repository from "../types/Repository";
import { useGithubUser } from "../context/GithubUser";
import GithubUser from "../types/GithubUser";

const perPage = 5;

const headerModel = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
};

export function usePaginateGHProfileRepos() {
  // const [username, setUsername] = useState<string>("");
  // const [page, setPage] = useState<number>(1);
  // const [hasMore, setHasMore] = useState<boolean>(true);

  const {
    user,
    setUser,
    username,
    setUsername,
    page,
    setPage,
    hasMore,
    setHasMore,
  } = useGithubUser();

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGithubData = async (reset = false) => {
    if (username && !username.trim()) return;

    setLoadingSearch(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : page;

      if (reset) resetSearch();

      // Search User
      const userResponse = await fetch(
        `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`,
        headerModel
      );

      if (!userResponse.ok) throw new Error("Usuário não encontrado");

      const userData = await userResponse.json();

      // Search Repositories
      const reposResponse = await fetch(
        `${
          import.meta.env.VITE_GITHUB_API_URL
        }/users/${username}/repos?page=${currentPage}&per_page=${perPage}`,
        headerModel
      );

      if (!reposResponse.ok) throw new Error("Erro ao buscar repositórios");
      const reposData = await reposResponse.json();

      // Search Languages of each repositorie
      const reposWithLanguages = await Promise.all(
        reposData.map(async (repo: Repository) => {
          const languagesResponse = await fetch(
            `${import.meta.env.VITE_GITHUB_API_URL}/repos/${username}/${
              repo.name
            }/languages`,
            headerModel
          );
          const languagesData: RepoLanguages = await languagesResponse.json();

          return {
            name: repo.name,
            description: repo.description,
            languages: languagesData,
            updated_at: repo.updated_at,
          } as Repository;
        })
      );

      // Update User
      setUser((prevUser: GithubUser | null): GithubUser => {
        const updateRepositories = reset
          ? reposWithLanguages
          : [...(prevUser?.repositories || []), ...reposWithLanguages];

        return {
          name: userData.name ?? "",
          login: userData.login ?? "",
          bio: userData.bio ?? "",
          avatar_url: userData.avatar_url ?? "",
          repositories: updateRepositories,
        };
      });

      setPage((value) => value + 1);
      setHasMore(reposData.length > 0);
    } catch (localError) {
      setError(
        localError instanceof Error ? localError.message : "Error desconhecido"
      );
    } finally {
      setLoadingSearch(false);
    }
  };

  // Reset Search
  const resetSearch = () => {
    setUser(null);
    setPage(1);
    setHasMore(false);
  };

  const loadMore = () => {
    if (!loadingSearch && hasMore) {
      fetchGithubData();
    }
  };

  return {
    username,
    setUsername,
    user,
    loadingSearch,
    error,
    fetchGithubData,
    resetSearch,
    hasMore,
    loadMore,
  };
}
