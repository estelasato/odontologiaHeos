import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

// import { FaRegTrashCan } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

// import { Grid } from "@/config/grid";
import { TreatmentsProps } from "@/services/treatmentsServices";
import { Input } from "../Form/Input";
import { Button } from "../Button";
import { ModalInsertTreatment } from "../Modal/ModalInsertTreatment";
import { ButtonContainer, Content } from "../IncludeResponsible/styles";
import { Box, Container, FooterTable, TableCont } from "./styles";
// import { ColumnDef } from "@tanstack/react-table";
import Table from "../Table";
import masks from "@/utils/masks";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { Grid } from "@/config/grid";
import { useIncludeBudget } from "./useIncludeBudget";

export interface IBudgetTreatm extends TreatmentsProps {
  valor?: number;
  obs?: string;
  qtd?: string;
  total?: number;
  descricao?: string;
  id?: number;
  idTratamento?: number;
}
export const IncludeBudgetTreatm = ({
  listData,
  setTreatments,
}: {
  listData?: IBudgetTreatm[];
  setTreatments: (data: any) => void;
}) => {
  const [open, setOpen] = useState(true);
  const {
    handleEdit,
    handleRemove,
    handleInsertForm,
    handleUpdateSubtotal,
    handleSave,
    treatmentRef,
    list,
  } = useIncludeBudget(setTreatments, listData);
  const { register } = useFormContext();

  const cols = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "idTratamento",
      },
      {
        header: "Tratamento",
        accessorKey: "descricao",
      },
      {
        header: "Obs",
        accessorKey: "obs",
      },
      {
        header: "Valor",
        accessorKey: "valor",
        meta: { width: "100px", alignHeader: "right", alignText: "right" },
        cell: (row: any) => {
          const v = row.getValue();
          return (
            <div className="column-treatment-table">
              {masks.currency(`${v}`)}
            </div>
          );
        },
      },
      {
        header: "Qtd",
        accessorKey: "qtd",
        meta: { width: "100px", alignHeader: "right", alignText: "right" },
      },
      {
        header: "Subtotal",
        accessorKey: "total",
        cell: (row: any) => {
          const v = row.getValue();
          return masks.currency(`${v}`);
        },
        meta: { alignHeader: "right", width: "150px", alignText: "right" },
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
            handleEdit={() => handleEdit(row.row.index)}
            handleRemove={() => handleRemove(row.row.original.idTratamento)}
          />
        ),
      },
    ],
    [list]
  );

  return (
    <Container>
      <ModalInsertTreatment
        modalRef={treatmentRef}
        selectData={(data) => handleInsertForm(data)}
      />
      <Content>
        <p className="title">Tratamentos*</p>
        <div className="open-icon" onClick={() => setOpen(!open)}>
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </Content>

      <Grid
        $alignItems="flex-end"
        $template="2fr 1fr"
        $templateMd="2 1fr"
        $templateSm="1fr"
      >
        <Grid
          $template="80px 1fr"
          $templateMd="80px 1fr"
          $templateSm="80px 1fr"
        >
          <Input {...register("idTratamento")} disabled label="Código" />
          <Box>
            <Input {...register("tratamento")} label="Tratamento" disabled />
            <Button onClick={() => treatmentRef.current?.open()}>+</Button>
          </Box>
        </Grid>
        <Input {...register("obs")} label="Obs" />

        <Grid
          $minWidth="100px"
          $template="1fr 1fr 1fr"
          $templateMd="1fr 1fr 1fr"
          $templateSm="1fr 1fr 1fr"
        >
          <Input
            handleChange={() => handleUpdateSubtotal()}
            {...register("valor")}
            label="Valor"
            mask="currency"
            placeholder="0,00"
          />
          <Input
            type="number"
            {...register("qtd")}
            label="Qtd"
            handleChange={() => handleUpdateSubtotal()}
          />
          <Input
            {...register("subtotal")}
            label="total"
            mask="currency"
            placeholder="0,00"
          />
        </Grid>

        <ButtonContainer onClick={() => handleSave()}>
          <Button variant="link">Salvar tratamento</Button>
        </ButtonContainer>
      </Grid>

      <div style={{ width: "100%" }}>
        <TableCont>{open && <Table cols={cols} data={list || []} />}</TableCont>
        <hr />
      </div>

      {list?.length > 0 && (
        <FooterTable>
          <Input
            {...register("total")}
            variant="invisible"
            placeholder="0,00"
            mask="currency"
          />
        </FooterTable>
      )}
    </Container>
  );
};
