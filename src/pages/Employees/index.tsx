import { Container } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";
import { useMemo, useRef } from "react";
import { modalRefProps } from "@/components/Modal";
import { ModalEmployee } from "@/components/Modal/ModalEmployee";

export const Employees = () => {
  const modalRef = useRef<modalRefProps>(null);

  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "id" },
      {
        header: "Nome",
        accessorKey: "nome",
        cell: (row: any) => {
          return <>{row.getValue() || 0}</>;
        },
      },
      { header: "Cargo", accessorKey: "cargo" },
      { header: "Contato", accessorKey: "celular" },
      { header: "Ativo", accessorKey: "ativo" },
    ],
    []
  );

  return (
    <Container>
      <ModalEmployee modalRef={modalRef}/>
      <h1>Funcionários</h1>
      <SearchContainer
        modalRef={modalRef}
        onSearch={(e) => console.log(e, "search")}
      />
    </Container>
  );
};
