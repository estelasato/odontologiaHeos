import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "../Employees/styles";
import { modalRefProps } from "@/components/Modal";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { FilterList } from "@/utils/shared/FilterList";
import { IPaymentMethod } from "@/services/paymentMethodService";
import { usePaymentMethods } from "./usePaymentMethods";
import { ModalPaymentMethod } from "@/components/Modal/ModalPaymentMethod";
import { TableIconColumn } from "../shared/iconsTable";

interface IIllness {
  onClick?: (data: any) => void;
}

export const PaymentMethods = ({ onClick }: IIllness) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<IPaymentMethod>();
  const [paymMethods, setPaymMethods] = useState<IPaymentMethod[]>([])

  const { paymentMethodList, handleRemove } = usePaymentMethods(modalRemoveRef)

  const cols = useMemo(
    () => [
      { header: "Código", accessorKey: "id" },
      { header: "Forma de Pagamento", accessorKey: "descricao" },
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
            handleEdit={() => modalRef.current?.open(row.row.original)}
            handleRemove={() => {
              setSelectData(row.row.original);
              modalRemoveRef.current?.open();
            }}
          />
        ),
      },
    ],
    []
  );

  const handleClickRow = (data?: any) => {
    selectData?.id === data.id ? setSelectData(undefined) : setSelectData(data);
    onClick && onClick(data?.id ? data : undefined);
  };

  useEffect(() => {
    paymMethods && setPaymMethods(paymMethods);
  }, [paymMethods]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(paymMethods, e, ["id", "descricao"]);
      setPaymMethods(filtered || []);
    } else setPaymMethods(paymMethods);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover doença"
        message={"Tem certeza que deseja remover esta forma de pagamento?"}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalPaymentMethod modalRef={modalRef} />
      <h1>Forma de Pagamento</h1>
      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        cols={cols}
        data={paymentMethodList || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
        onClickRow={handleClickRow}
      />
    </Container>
  );
};
