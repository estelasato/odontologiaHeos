import { useMemo, useRef, useState } from "react";
import { Container } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { useBudgets } from "./useBudgets";
import { modalRefProps } from "@/components/Modal";
import { ModalBudgets } from "@/components/Modal/ModalBudgets";
import Budget from "./Budget";
import { AnimatePresence } from "framer-motion";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import masks from "@/utils/masks";

export const Budgets = () => {
  const { budgets } = useBudgets();
  const [selectBudget, setSelectBudget] = useState<any>();

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
        meta: {alignText: "center"},
      },
      {
        header: "Última Alteração",
        accessorKey: "dtUltAlt",
        cell: (row: any) => {
          const date = row.getValue() as string
          return <>{masks.convertToDateString(date)}</>;
        }
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
            handleEdit={() => {
              setSelectBudget(row.row.original);
              setOpen(true);
            }}
            // handleRemove={() => {
            //   setSelectedAnamnesis(row.row.original);
            //   modalRemoveRef.current?.open();
            // }}
          />
        ),
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);

  // TODO: integrar orçamento (edição, busca...)
  return (
    <Container>
      <AnimatePresence>{open && <Budget setOpen={setOpen} data={selectBudget}/>}</AnimatePresence>

      {!open && (
        <>
          <ModalBudgets modalRef={modalRefCreate} />
          <SearchContainer
            // modalRef={modalRef}
            // onSearch={(e) => handleSearch(e)}
            onClick={() => {setSelectBudget(null); setOpen(!open)}}
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
