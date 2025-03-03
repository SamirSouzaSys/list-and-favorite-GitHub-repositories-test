import LanguageColor from "../types/LanguageColor";

const languagesColorsName = "languagesColors";

const getLanguagesColorsFromLocalStorage = (): LanguageColor[] => {
  const languagesColors = localStorage.getItem(languagesColorsName);
  return languagesColors ? JSON.parse(languagesColors) : [];
};

const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

const getUniqueRandomColor = (existingColors: LanguageColor[]): string => {
  let newColor: string;

  const existingColorSet = new Set(
    existingColors.map((language) => language.color.toLowerCase())
  );

  do {
    newColor = generateRandomColor();
  } while (existingColorSet.has(newColor.toLowerCase()));

  return newColor;
};

const verifyLanguageColorInLocalStorage = (languageName: string): string => {
  const currentLanguagesColors = getLanguagesColorsFromLocalStorage();

  const foundLanguage = currentLanguagesColors.find(
    (language) => language.name.toLowerCase() === languageName.toLowerCase()
  );

  // console.log(foundLanguage);

  if (foundLanguage) {
    return foundLanguage?.color;
  } else {
    const generatedColor = getUniqueRandomColor(currentLanguagesColors);

    currentLanguagesColors.push({
      name: languageName.toLowerCase(),
      color: generatedColor,
    });

    localStorage.setItem(
      languagesColorsName,

      JSON.stringify(currentLanguagesColors)
    );
    return generatedColor;
  }
};

export { verifyLanguageColorInLocalStorage };
