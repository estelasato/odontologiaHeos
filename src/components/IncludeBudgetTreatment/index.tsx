import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

// import { FaRegTrashCan } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

import { Input } from "../Form/Input";
import { Button } from "../Button";
import { ModalInsertTreatment } from "../Modal/ModalInsertTreatment";
import { ButtonContainer, Content } from "../IncludeResponsible/styles";
import {
  Box,
  Container,
  InfosContainer,
  TableCont,
  ValuesContainer,
} from "./styles";
// import { ColumnDef } from "@tanstack/react-table";
import Table from "../Table";
import masks from "@/utils/masks";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { Grid } from "@/config/grid";
import { useIncludeBudget } from "./useIncludeBudget";

export interface IBudgetProcedure extends IProcedure {
  valor?: number;
  obs?: string;
  qtd?: string;
  total?: number;
  descricao?: string;
  id?: number;
  idProcedimento?: number;
  percDesconto?: number;
}
export const IncludeBudgetProcedure = ({
  setProcedures,
}: {
  listData?: IBudgetProcedure[];
  setProcedures: (data: any) => void;
}) => {
  const [open, setOpen] = useState(true);
  const {
    handleEdit,
    handleRemove,
    handleInsertForm,
    handleUpdateSubtotal,
    handleSave,
    treatmentRef,
    calcDiscount,
    list,
  } = useIncludeBudget(setProcedures);
  const { register, getValues } = useFormContext();

  const hasApproved = getValues("status") == "APROVADO";

  let cols: any = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "idProcedimento",
      },
      {
        header: "Procedimento",
        accessorKey: "nome",
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
      // {
      //   header: "",
      //   accessorKey: "delete",
      //   meta: { alignText: "right" },
      //   cell: (row: any) => (
      //     <TableIconColumn
      //       handleEdit={() => handleEdit(row.row.index)}
      //       handleRemove={() => handleRemove(row.row.original.idProcedimento)}
      //     />
      //   ),
      // },
    ],
    [list]
  );

  if (!hasApproved) {
    cols.push(
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
            handleEdit={() => handleEdit(row.row.index)}
            handleRemove={() => handleRemove(row.row.original.idProcedimento)}
          />
        ),
      },
    )
  }
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

      {!hasApproved && (
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
            <Input {...register("idProcedimento")} disabled label="Código" />
            <Box>
              <Input
                {...register("procedimento")}
                label="Procedimento"
                disabled
              />
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
              disabled
            />
          </Grid>

          <ButtonContainer onClick={() => handleSave()}>
            <Button variant="link">Salvar tratamento</Button>
          </ButtonContainer>
        </Grid>
      )}
      <div style={{ width: "100%" }}>
        <TableCont>{open && <Table cols={cols} data={list || []} />}</TableCont>
        <hr />
      </div>

      {list?.length >= 0 && (
        <ValuesContainer>
          <InfosContainer>
            <h4>Desconto %:</h4>
            <Input
              width="50px"
              variant="invisible"
              {...register("percDesconto")}
              type="number"
              placeholder="0"
              disabled={hasApproved}
              // error={errors.percDesconto?.message}
            />
            {!hasApproved && (
              <p className="addDesc" onClick={() => calcDiscount()}>
                Aplicar desconto
              </p>
            )}
          </InfosContainer>
          <InfosContainer>
            <h4>Total:</h4>
            <Input
              {...register("total")}
              variant="invisible"
              placeholder="0,00"
              mask="currency"
              disabled
            />
          </InfosContainer>
        </ValuesContainer>
      )}
    </Container>
  );
};
