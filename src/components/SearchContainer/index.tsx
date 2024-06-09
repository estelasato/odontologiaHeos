import { Button } from "../Button";
import Searchbar from "../Form/Searchbar";
import { Container } from "./styles";

interface SearchContainerProps {
  modalRef?: React.RefObject<any>;
  buttonLabel?: string;
  onSearch?: (value: string) => void;
}

export const SearchContainer = ({
  modalRef,
  buttonLabel,
  onSearch,
}: SearchContainerProps) => {
  return (
    <Container>
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
