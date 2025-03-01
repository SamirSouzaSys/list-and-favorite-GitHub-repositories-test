import { memo } from "react";
import IsFavorite from "../fragments/IsFavorite";
import Repository from "../types/Repository";
import { formatDate } from "../utils/date";

type RepositoryLocalProps = Pick<
  Repository,
  "id" | "name" | "description" | "languages" | "updated_at"
> & {
  setIsFavorite: (id: number) => void;
} & { isFavorite?: boolean };

const RepositoryComponent: React.FC<RepositoryLocalProps> = memo(
  ({
    id,
    name,
    description,
    updated_at,
    isFavorite = false,
    //   languages,
    setIsFavorite,
  }) => {
    return (
      <div
        className="border-border-and-line border-[1px] border-solid rounded-lg 
    p-4
    mb-2"
      >
        <div
          className="flex
      flex-row justify-between
      mb-2"
        >
          <div className="max-w-[80%]">
            <h2 className="font-poppins font-semibold text-heading-1 text-grey-neutral break-all">
              {name}
            </h2>
          </div>
          <IsFavorite
            isActive={isFavorite}
            setIsActive={() => setIsFavorite(id)}
          />
        </div>
        <div className="mb-2">
          <p className="break-words font-poppins text-paragraph-md text-placeholder ">
            {description}
          </p>
        </div>
        <div className="mb-1">
          <div>
            {/* {languages &&
            Object.entries(languages).map((item) => {
              item;
            })} */}

            {/* {Object.entries(repo.languages).map(([language, langIndex]) => (
            <li key={`${language}-${langIndex}`}>{language}</li>
          ))} */}
          </div>
          <div>
            <p className="font-poppins text-paragraph-sm text-grey-neutral ">
              Updated on {formatDate(updated_at)}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
export default RepositoryComponent;
