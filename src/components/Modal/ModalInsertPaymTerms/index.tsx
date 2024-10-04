import { RefObject, useMemo, useRef, useState } from "react";
import Modal, { modalRefProps } from "..";
import { Button } from "@/components/Button";
import { Container } from "../ModalInsertCity/styles";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { IPaymentTerm } from "@/services/paymentTermService";
import { toast } from "react-toastify";
import { Content } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { useModalInsertPaymTerms } from "./useModalInsertPaymTerms";
import { ModalPaymentTerm } from "../ModalPaymentTerm";
import { ModalConfirmation } from "../ModalConfirm";

interface ModalInsertPaymTermsProps {
  modalRef: RefObject<any>;
  selectData: (data: IPaymentTerm) => void;
}

export const ModalInsertPaymentTerms = ({
  modalRef,
  selectData,
}: ModalInsertPaymTermsProps) => {
  const [data, setData] = useState<IPaymentTerm | undefined>();
  const msgRemove = "Tem certeza que deseja remover esta condição de pagamento?";

  const removeRef = useRef<modalRefProps>(null);
  const modalPaymTermRef = useRef<modalRefProps>(null);
  const { list,handleRemove} = useModalInsertPaymTerms(removeRef);

  const handleSelect = () => {
    console.log()
    if (data && !!data.status) {
      selectData(data);
      modalRef.current?.close();
    } else toast.error("Selecione uma condição ativa");
  };

  const cols = useMemo(
    () => [
      { header: "Código", accessorKey: "id" },
      { header: "Condição de Pagamento", accessorKey: "descricao" },
      {
        header: "Ativo",
        accessorKey: "status",
        cell: (row: any) => {
          return <>{row.getValue() === true ? "Sim" : "Não"}</>;
        },
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
          handleEdit={() => modalPaymTermRef.current?.open(row.row.original)}
          handleRemove={() => {
            setData(row.row.original);
            removeRef.current?.open();
          }}
          />
        ),
      },
    ],
    [list]
  );

  return (
    <Modal ref={modalRef} width="90%">
      <ModalConfirmation modalRef={removeRef} message={msgRemove} onConfirm={() => data?.id && handleRemove(data?.id)}/>
      <ModalPaymentTerm modalRef={modalPaymTermRef}/>
      <Container>
        <Content>
          <h2>Condição de Pagamento</h2>

          <SearchContainer
            onClick={() => modalPaymTermRef.current?.open()}
            // onSearch={(e) => handleSearch(e)}
          />

          <Table
            cols={cols}
            data={list || []}
            onClickRow={(e) => setData(e)}
          />
        </Content>
        <div>
          <Button className="select-btn" onClick={() => handleSelect()}>
            Selecionar
          </Button>
        </div>
      </Container>
    </Modal>
  );
};
