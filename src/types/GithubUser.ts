import Repository from "./Repository";

type GithubUser = {
  name: string;
  login: string;
  bio: string | null;
  repositories: Repository[];
};

export default GithubUser;
