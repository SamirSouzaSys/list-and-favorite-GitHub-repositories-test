type IsFavoriteProps = {
  isActive: boolean;
  setIsActive: () => void;
};

const IsFavorite: React.FC<IsFavoriteProps> = ({
  isActive = false,
  setIsActive,
}) => {
  return (
    <>
      {isActive ? (
        <div
          className="
            rounded-[100px]
            border-primary border-[1px] border-solid
            bg-white-background-light
            w-8 h-8
            flex justify-center items-center
            "
          onClick={() => setIsActive()}
        >
          <img
            className="
            h-4 w-4
            "
            src={"./coracao-favorito-selecionado.svg"}
            alt="Is favorite"
          />
        </div>
      ) : (
        <div
          className="
            rounded-[100px]
            w-8 h-8
            bg-white-background-matte
            flex justify-center items-center
        "
          onClick={() => setIsActive()}
        >
          <img
            className="
            w-4 h-4"
            src={"./coracao-nao-preenchido-borda-cinza.svg"}
            alt="Is not favorite"
          />
        </div>
      )}
    </>
  );
};

export default IsFavorite;
