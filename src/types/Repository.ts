import RepositoryLanguages from "./RepositoryLanguages";

type Repository = {
  id: number;
  name: string;
  description: string | undefined;
  languages: RepositoryLanguages | undefined;
  updated_at: string;
  isFavorite: boolean;
};

export default Repository;
