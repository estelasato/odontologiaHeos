import { Button } from "../Button";
import Searchbar from "../Form/Searchbar";
import { Container } from "./styles";

interface SearchContainerProps {
  modalRef?: React.RefObject<any>;
  buttonLabel?: string;
  onSearch?: (value: string) => void;
  label?: string;
  onClick?: () => void;
}

export const SearchContainer = ({
  modalRef,
  buttonLabel,
  onSearch,
  label,
  onClick
}: SearchContainerProps) => {
  return (
    <Container>
      {label && <p>{label}</p>}
      <Searchbar
        className="searchbar-comp"
        onSearch={onSearch}
      />

      <Button variant="link" onClick={() => onClick ? onClick() : modalRef?.current?.open()}>
        {buttonLabel ? buttonLabel : "+ Adicionar"}
      </Button>
    </Container>
  );
};
