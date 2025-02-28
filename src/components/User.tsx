import GithubUser from "../types/GithubUser";

type UserProps = Pick<GithubUser, "avatar_url" | "name" | "bio" | "login">;

const User: React.FC<UserProps> = ({ avatar_url, name, login, bio }) => {
  return (
    <>
      <div
        className="
        desktop:h-[420px] desktop:w-[448px]
      border-border-and-line border-[1px] border-solid rounded-lg p-4 desktop:p-6 
        flex flex-col desktop:items-center
      "
      >
        <div
          className="
          flex flex-row desktop:flex-col
          mb-2 min-w-full 
           border-b-[1px]"
        >
          <div className="flex justify-center">
            <img
              className="bg-cover bg-center h-12 w-12 desktop:h-[12.5rem] desktop:w-[12.5rem] rounded-[100px] desktop:mb-6 desktop:mt-10 mr-2"
              src={avatar_url}
              alt="User Avatar"
            />
          </div>
          <div className="flex flex-col text-left desktop:text-center">
            <h1 className="font-poppins font-semibold text-heading-1 text-grey-neutral ">
              {name}
            </h1>
            <p className="font-poppins font-regu text-paragraph-md text-grey-dark mb-6">
              @{login}
            </p>
          </div>
        </div>
        <div className="">
          <p className="font-poppins text-paragraph-md text-grey-dark text-left desktop:text-center">
            {bio}
          </p>
        </div>
      </div>
    </>
  );
};

export default User;
