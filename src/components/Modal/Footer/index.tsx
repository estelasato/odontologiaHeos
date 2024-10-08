import masks from "@/utils/masks";
import { Button } from "@/components/Button";
import { Container, Content } from "./styles";

interface FooterModalProps {
  dtCadastro?: any;
  dtUltAlt?: any;
  handleSubmit?: () => void;
  modalRef?: React.RefObject<any>;
  isLoading?: boolean;
}

export const FooterModal = ({
  dtCadastro,
  dtUltAlt,
  handleSubmit,
  modalRef,
  isLoading,
}: FooterModalProps) => {
  return (
    <Container>
      <Content>
        <div>
          <p>Data de cadastro</p>
          <p>{masks.convertDateISO(dtCadastro || new Date())}</p>
        </div>
        <div>
          <p>Data da última alteração</p>
          <p>{masks.convertDateISO(dtUltAlt || new Date())}</p>
        </div>
      </Content>

      <Content>
        <Button isLoading={isLoading} className="btn-cancel" variant="link" onClick={() => modalRef &&  modalRef?.current?.close()}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Salvar</Button>
      </Content>
    </Container>
  );
};
