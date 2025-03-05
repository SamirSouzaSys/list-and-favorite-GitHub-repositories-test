import React, { useState } from "react";

import RepositoryLanguages from "../types/RepositoryLanguages";
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

  // Search User
  const fetchUser = async (username: string) => {
    const userResponse = await fetch(
      `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`,
      headerModel
    );
    if (!userResponse.ok) throw new Error("Usuário não encontrado");
    return await userResponse.json();
  };

  // Search Repositories
  const fetchRepositories = async (username: string, currentPage: number) => {
    const reposResponse = await fetch(
      `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}/repos?page=${currentPage}&per_page=${perPage}`,
      headerModel
    );
    if (!reposResponse.ok) throw new Error("Erro ao buscar repositórios");
    return await reposResponse.json();
  };

  // Search Languages of each repositorie
  const fetchLanguagesForRepos = async (reposData: Repository[], username: string) => {
    return await Promise.all(
      reposData.map(async (repo: Repository) => {
        const languagesResponse = await fetch(
          `${import.meta.env.VITE_GITHUB_API_URL}/repos/${username}/${repo.name}/languages`,
          headerModel
        );
        const languagesData: RepositoryLanguages = await languagesResponse.json();
        return {
          name: repo.name,
          description: repo.description,
          languages: languagesData,
          updated_at: repo.updated_at,
          id: repo.id,
        } as Repository;
      })
    );
  };

  // Main function - search all data
  const fetchGithubData = async (username = user?.login, reset = false) => {
    if (username && !username.trim()) return;

    setLoadingSearch(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : page;

      if (reset) resetSearch();

      // Search User
      const userData = await fetchUser(username);

      // Search Repositories
      const reposData = await fetchRepositories(username, currentPage);

      // Search Languages of each repositorie
      const reposWithLanguages = await fetchLanguagesForRepos(reposData, username);

      // Update User - repositories and languages
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
    setUser,
    loadingSearch,
    error,
    fetchGithubData,
    resetSearch,
    hasMore,
    loadMore,
  };
}
