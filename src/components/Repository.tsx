import { memo, useEffect, useState } from "react";
import IsFavorite from "../fragments/IsFavorite";
import Repository from "../types/Repository";
import { formatDate } from "../utils/date";
import { verifyLanguageColorInLocalStorage } from "../utils/LanguagesLocalStorage";
import RepositoryLanguages from "../types/RepositoryLanguages";
import LanguageColor from "../types/LanguageColor";

type RepositoryLocalProps = Pick<
  Repository,
  "id" | "name" | "description" | "updated_at"
> & {
  setIsFavorite: (id: number) => void;
} & { isFavorite?: boolean } & { languages: RepositoryLanguages };

const RepositoryComponent: React.FC<RepositoryLocalProps> = memo(
  ({
    id,
    name,
    description,
    updated_at,
    isFavorite = false,
    languages,
    setIsFavorite,
  }) => {
    const [languagesColors, setLanguagesColors] = useState<LanguageColor[]>([]);

    useEffect(() => {
      const onlyLanguageArray = Object.keys(languages).map((language) => ({
        name: language,
        color: verifyLanguageColorInLocalStorage(language),
      }));

      setLanguagesColors(onlyLanguageArray);
    }, []);

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
        <div>
          <div className="flex flex-row flex-wrap gap-x-3 mb-2">
            {languagesColors.map(({ name, color }, index) => (
              <div key={`${name} - ${index}`} className="flex flex-row items-center">
                <div
                  style={{ backgroundColor: color }}
                  className="rounded-full w-4 h-4 mr-2"
                ></div>
                <div className="font-poppins text-paragraph-sm text-grey-neutral ">{name}</div>
              </div>
            ))}
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
