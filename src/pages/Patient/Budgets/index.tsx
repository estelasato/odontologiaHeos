import { useMemo, useRef, useState } from "react";
import { Container } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { useBudgets } from "./useBudgets";
import { modalRefProps } from "@/components/Modal";
import { ModalBudgets } from "@/components/Modal/ModalBudgets";
import Budget from "./Budget";
import { AnimatePresence } from "framer-motion";

export const Budgets = () => {
  const { budgets } = useBudgets();

  const modalRefCreate = useRef<modalRefProps>(null);

  const cols = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: (row: any) => {
          return <>{row.getValue()}</>;
        },
      },
      {
        header: "status",
        accessorKey: "status",
      },
      {
        header: "Código Anamnese",
        accessorKey: "idAnamnese",
      },
      {
        header: "Última Alteração",
        accessorKey: "dtUltAlt",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);

  return (
    <Container>
      <AnimatePresence>{open && <Budget setOpen={setOpen}/>}</AnimatePresence>

      {!open && (
        <>
          <ModalBudgets modalRef={modalRefCreate} />
          <SearchContainer
            // modalRef={modalRef}
            // onSearch={(e) => handleSearch(e)}
            onClick={() => setOpen(!open)}
          />

          <Table
            cols={cols}
            data={budgets || []}
            // onClickRow={(data) => handleClickRow(data)}
            // onClickRow={onClickRow ? (data) => handleClickRow(data) : undefined}
          />
        </>
      )}
    </Container>
  );
};
