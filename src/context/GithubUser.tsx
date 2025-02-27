import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import GithubUser from "../types/GithubUser";

type GithubUserContextType = {
  user: GithubUser | null;
  setUser: Dispatch<SetStateAction<GithubUser | null>>;

  username: string;
  setUsername: Dispatch<SetStateAction<string>>;

  page: number;
  setPage: Dispatch<SetStateAction<number>>;

  hasMore: boolean;
  setHasMore: Dispatch<React.SetStateAction<boolean>>;
};

export const GithubUserContext = createContext<
  GithubUserContextType | undefined
>(undefined);

export const GithubUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [username, setUsername] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  return (
    <GithubUserContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        page,
        setPage,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </GithubUserContext.Provider>
  );
};

export const useGithubUser = () => {
  const context = useContext(GithubUserContext);
  if (!context) {
    throw new Error(
      "useGithubUser deve ser usado dentro de GithubUserProvider"
    );
  }
  return context;
};
