import Repository from "./Repository";

type GithubUser = {
  avatar_url: string | undefined;
  name: string;
  login: string;
  bio: string | undefined;
  repositories: Repository[];
};

export default GithubUser;
