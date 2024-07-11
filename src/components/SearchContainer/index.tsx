import { Button } from "../Button";
import Searchbar from "../Form/Searchbar";
import { Container } from "./styles";

interface SearchContainerProps {
  modalRef?: React.RefObject<any>;
  buttonLabel?: string;
  onSearch?: (value: string) => void;
  label?: string;
}

export const SearchContainer = ({
  modalRef,
  buttonLabel,
  onSearch,
  label,
}: SearchContainerProps) => {
  return (
    <Container>
      {label && <p>{label}</p>}
      <Searchbar
        className="searchbar-comp"
        onSearch={onSearch}
      />

      <Button variant="link" onClick={() => modalRef?.current?.open()}>
        {buttonLabel ? buttonLabel : "+ Adicionar"}
      </Button>
    </Container>
  );
};
