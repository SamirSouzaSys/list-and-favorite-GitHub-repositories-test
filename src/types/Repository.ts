import RepoLanguages from "./RepoLanguages";

type Repository = {
  name: string;
  description: string | null;
  languages: RepoLanguages;
  updated_at: string;
};

export default Repository;
