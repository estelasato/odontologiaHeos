import Table from "@/components/Table";
import { useAccReceivable } from "./useAccReceivable";
import { useMemo, useRef } from "react";
import masks from "@/utils/masks";
import { Container } from "@/pages/Employees/styles";
import { ModalAccReceivable } from "@/components/Modal/ModalAccReceivable";
import { modalRefProps } from "@/components/Modal";

export const AccReceivable = () => {
  const { accReceivableList } = useAccReceivable();

  const cols = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
        meta: { alignText: "center", alignHeader: "center" },
      },
      {
        header: "Parcela",
        accessorKey: "parcela",
        meta: { alignText: "center", alignHeader: "center" },
      },
      {
        header: "Paciente",
        accessorKey: "nomePaciente",
      },
      {
        header: "Profissional",
        accessorKey: "nomeProfissional",
      },
      {
        header: "Valor",
        accessorKey: "valorParcela",
        cell: (r: any) => {
          const value = r.getValue() as Date;
          return <p>{masks.currencyAllPlatforms(`${value}`)}</p>;
        },
      },
      {
        header: "Data Vencimento",
        accessorKey: "dtVencimento",
        cell: (r: any) => {
          const value = r.getValue() as Date;
          return <p>{masks.convertToDateString(`${value}`)}</p>;
        },
        meta: { alignText: "center", alignHeader: "center" },
      },
      {
        header: "Situação",
        accessorKey: "situacao",
        // cell: (r: any) => {
        //   const value = r.getValue() as Date;
        //   return <p>{masks.convertToDateString(`${value}`)}</p>;
        // },
        meta: { alignText: "center", alignHeader: "center" },
      },
      // {
      //   header: 'situacao',
      //   accessorKey: 'id',
      // },
    ],
    []
  );

  const modalAccRef = useRef<modalRefProps>(null);

  return (
    <Container>
      <ModalAccReceivable modalRef={modalAccRef} />
      {/* <SearchContainer onSearch={(e) => console.log(e)} /> */}
      <Table
        cols={cols}
        data={accReceivableList || []}
        onClickRow={(e) => modalAccRef.current?.open(e)}
      />
    </Container>
  );
};
