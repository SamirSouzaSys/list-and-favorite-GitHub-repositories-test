import React, { useCallback, useEffect, useRef, useState } from "react";
import searchStatus from "../types/SearchStatus";

import InstrucaoProcureNome from "../fragments/InstrucaoProcureNome";

import { usePaginateGHProfileRepos } from "../hooks/useGitHubRepos";
import SearchStatus from "../types/SearchStatus";
import NenhumUsuarioEncontrado from "../fragments/NenhumUsuarioEncontrado";
import User from "../components/User";
import RepositoryComponent from "../components/Repository";

interface HomeProps {
  searchLoadingStatus: searchStatus;
  setSearchLoadingStatus: React.Dispatch<React.SetStateAction<SearchStatus>>;
}

const Home: React.FC<HomeProps> = ({ searchLoadingStatus }) => {
  const {
    username,
    user,
    setUser,
    loadingSearch,
    hasMore,
    loadMore,
    fetchGithubData,
  } = usePaginateGHProfileRepos();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRepoRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (loadingSearch || searchLoadingStatus === "loading") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [loadingSearch, searchLoadingStatus]);

  useEffect(() => {
    if (!hasMore || loadingSearch) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchGithubData();
        }
      },
      { threshold: 1 }
    );

    if (lastRepoRef.current) {
      observer.current.observe(lastRepoRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, loadingSearch, loadMore, searchLoadingStatus]);

  const toggleFavorite = useCallback(
    (repoId: number) => {
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        return {
          ...prevUser,
          repositories: prevUser.repositories.map((repo) =>
            repo.id === repoId
              ? { ...repo, isFavorite: !repo.isFavorite }
              : repo
          ),
        };
      });
    },
    [setUser]
  );

  const handleIsFavorite = useCallback(
    (repoId: number) => {
      toggleFavorite(repoId);
    },
    [toggleFavorite]
  );

  return (
    <>
      {searchLoadingStatus === "initial" && <InstrucaoProcureNome />}

      {searchLoadingStatus === "errorNotFoundUser" && (
        <NenhumUsuarioEncontrado usernameSearch={username} />
      )}

      {searchLoadingStatus === "errorNotFoundRepo" && (
        <p>Nenhum repo encontrado</p>
      )}

      <div className="flex flex-col desktop:flex-row">
        <div className="mb-4 desktop:mr-12">
          {searchLoadingStatus === "found" && (
            <User
              avatar_url={user?.avatar_url}
              name={user?.name ?? ""}
              login={user?.login ?? ""}
              bio={user?.bio ?? ""}
            />
          )}
        </div>
        <div>
          {searchLoadingStatus === "found" && (
            <>
              {/* {console.dir(user)} */}
              <h1 className="font-poppins font-semibold text-heading-1 text-primary mb-4">
                Repositórios
              </h1>
              {user?.repositories.map((repo) => {
                return (
                  <RepositoryComponent
                    key={repo.id}
                    id={repo.id}
                    name={repo.name}
                    description={repo.description}
                    languages={repo.languages}
                    updated_at={repo.updated_at}
                    isFavorite={repo.isFavorite ?? false}
                    setIsFavorite={() => handleIsFavorite(repo.id)}
                  />
                );
              })}
              {!hasMore &&
                "Todos os repositórios públicos já foram carregados."}
              <div ref={lastRepoRef} className="h-20" />
            </>
          )}
        </div>
      </div>

      {/* // {searchLoadingStatus === "found" && ( */}
      {/* // )} */}

      {/* {searchLoadingStatus === "found" && (
        <>
          <div>

            
            <ol>
              {Array.isArray(user?.repositories) &&
              user?.repositories.length > 0 ? (
                user.repositories.map((repo, repoIndex) => (
                  <li key={`${repo.name}-${repoIndex}`}>
                    ---- <strong>{repo.name}</strong>
                    <p>{repo.description}</p>
                    <p>
                      Última atualização:{" "}
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </p>
                    <br />
                    <p>
                      <strong>Languages</strong>
                    </p>
                    <ol>
                      {Object.entries(repo.languages).map(
                        ([language, langIndex]) => (
                          <li key={`${language}-${langIndex}`}>{language}</li>
                        )
                      )}
                    </ol>
                    <br />
                    <hr />
                  </li>
                ))
              ) : (
                <li>Nenhum repositório encontrado</li>
              )}
            </ol>
          </div>
          {!hasMore && "Todos os repositórios públicos já foram carregados."}
          <div ref={lastRepoRef} className="h-20" />
        </>
      )} */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50
          flex justify-center items-center z-50`}
        >
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <img src={"./loading.gif"} className={"w-16 h-16"} />
            <p className="mt-4">Carregando...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
