import { useMemo, useRef, useState } from "react";
import { BtnContent, Container } from "./styles";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { useBudgets } from "./useBudgets";
import { modalRefProps } from "@/components/Modal";
import { ModalBudgets } from "@/components/Modal/ModalBudgets";
import Budget from "./Budget";
import { AnimatePresence } from "framer-motion";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import masks from "@/utils/masks";
import { Button } from "@/components/Button";

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
          let value = row.getValue() as any;
          const d = row.row.original.percDesconto;
          if (d) {
            const perc = Number(d);
            const total = Number(row.row.original.total);
            const discount = total * (perc / 100);
            value = total - discount;
          }
          return <>{masks.currencyAllPlatforms(value)}</>;
        },
      },
      {
        header: "status",
        accessorKey: "status",
      },
      // {
      //   header: "Código Anamnese",
      //   accessorKey: "idAnamnese",
      //   meta: {alignText: "center"},
      // },
      {
        header: "Última Alteração",
        accessorKey: "dtUltAlt",
        cell: (row: any) => {
          const date = row.getValue() as string;
          return <>{masks.convertToDateString(date)}</>;
        },
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
      <AnimatePresence>
        {open && <Budget setOpen={setOpen} data={selectBudget} />}
      </AnimatePresence>

      {!open && (
        <>
          <ModalBudgets modalRef={modalRefCreate} />

          <BtnContent>
            <Button
              className="add-btn-budget"
              variant="link"
              onClick={() => {
                setSelectBudget(null);
                setOpen(!open);
              }}
            >
              + Adicionar
            </Button>
          </BtnContent>
          {/* <SearchContainer
            // modalRef={modalRef}
            // onSearch={(e) => handleSearch(e)}
            onClick={() => {
              setSelectBudget(null);
              setOpen(!open);
            }}
          /> */}

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
