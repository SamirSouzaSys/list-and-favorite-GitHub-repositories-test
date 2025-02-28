import React, { useEffect, useRef, useState } from "react";
import searchStatus from "../types/SearchStatus";

import InstrucaoProcureNome from "../fragments/InstrucaoProcureNome";

import { usePaginateGHProfileRepos } from "../hooks/useGitHubRepos";
import SearchStatus from "../types/SearchStatus";
import NenhumUsuarioEncontrado from "../fragments/NenhumUsuarioEncontrado";
import User from "../components/User";

interface HomeProps {
  searchLoadingStatus: searchStatus;
  setSearchLoadingStatus: React.Dispatch<React.SetStateAction<SearchStatus>>;
}

const Home: React.FC<HomeProps> = ({ searchLoadingStatus }) => {
  const { username, user, loadingSearch, hasMore, loadMore, fetchGithubData } =
    usePaginateGHProfileRepos();

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

  return (
    <>
      {searchLoadingStatus === "initial" && <InstrucaoProcureNome />}

      {searchLoadingStatus === "errorNotFoundUser" && (
        <NenhumUsuarioEncontrado usernameSearch={username} />
      )}

      {searchLoadingStatus === "errorNotFoundRepo" && (
        <p>Nenhum repo encontrado</p>
      )}
      {searchLoadingStatus === "found" && (
        <User
          avatar_url={user?.avatar_url}
          name={user?.name ?? ""}
          login={user?.login ?? ""}
          bio={user?.bio ?? ""}
        />
      )}

      <br />

      {searchLoadingStatus === "found" && (
        <>
          <div>

            <hr />
            <br />

            <strong>Repositórios:</strong>
            <br />

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
      )}
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
