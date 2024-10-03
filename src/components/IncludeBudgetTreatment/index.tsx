import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

// import { FaRegTrashCan } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

// import { Grid } from "@/config/grid";
import { TreatmentsProps } from "@/services/treatmentsServices";
import { Input } from "../Form/Input";
import { Button } from "../Button";
import { modalRefProps } from "../Modal";
import { ModalInsertTreatment } from "../Modal/ModalInsertTreatment";
import { ButtonContainer, Content } from "../IncludeResponsible/styles";
import { Container, FooterTable, TableCont } from "./styles";
// import { ColumnDef } from "@tanstack/react-table";
import Table from "../Table";
import masks from "@/utils/masks";

export interface IBudgetTreatm extends TreatmentsProps {
  valor?: number;
  obs?: string;
  qtd?: string;
  total?: number;
  descricao?: string;
  id?: number;
}
export const IncludeBudgetTreatm = ({
  listData,
}: {
  listData?: IBudgetTreatm[];
}) => {
  const [open, setOpen] = useState(true);
  const treatmentRef = useRef<modalRefProps>();
  const [list, setList] = useState<any>([]);
  const { register, setValue, getValues } = useFormContext();

  const handleInclude = (data: TreatmentsProps) => {
    const exist = list?.find((r: TreatmentsProps) => r.id === data.id);
    if (data.dataFim) {
      const df = new Date(data.dataFim);
      const today = new Date();
      today > df && toast.error("Este tratamento já foi finalizado!");
    }
    if (exist) toast.error("Tratamento já incluso");
    else {
      setList((prev: any) => [...prev, data]);

      treatmentRef.current?.close();
    }
  };

  // const handleRemove = useCallback(
  //   (id: number) => {
  //     const newList = list?.filter((r: IBudgetTreatm) => r.id != id);
  //     setValue("tratamentos", newList);
  //     setList(newList);
  //   },
  //   [list]
  // );

  useEffect(() => {
    if (listData) {
      setList(listData);
    }
  }, [listData]);

  useEffect(() => {
    list?.map((r: IBudgetTreatm, i: number) => {
      setValue(`tratamentos.${i}.id`, r.id); // puxa do tratamento
      setValue(`tratamentos.${i}.descricao`, r.descricao); // puxa do tratamento
      setValue(`tratamentos.${i}.valor`, r.valor);
      setValue(`tratamentos.${i}.obs`, r.obs);
      setValue(`tratamentos.${i}.qtd`, r.qtd || 1);

    });
  }, [list]);

  const tratamentos = getValues("tratamentos");
  const updateValues = (i?: number) => {
    if (!!!i) {
      const { valor, qtd } = getValues(`tratamentos.${i}`);
      const total = Number(masks.number(valor)) * Number(qtd);

      setValue(`tratamentos.${i}.total`, total);
    }
    // setValue("total", sumTotal);
    calcTotal()
  };

  const calcTotal = () => {
    let sumTotal = 0;
    console.log(getValues("tratamentos"), "tratamentos");
    tratamentos.map((e: any, index: number) => {
      console.log(e.total, 'e', sumTotal)
      sumTotal += Number(masks.number(e.total))
    });
    console.log(sumTotal, 'aa')
    setValue("total", sumTotal);
  };

  const cols = useMemo(
    () => [
      {
        header: "Código",
        accessorKey: "id",
      },
      {
        header: "Tratamento",
        accessorKey: "descricao",
        cell: (row: any) => {
          const i = row.row.index;
          return (
            <Input
              className="column-treatment-table"
              placeholder="Descrição"
              variant="invisible"
              {...register(`tratamentos.${i}.descricao`)}
            />
          );
        },
      },
      {
        header: "Obs",
        accessorKey: "obs",
        cell: (row: any) => {
          const i = row.row.index;
          return (
            <Input
              className="column-treatment-table"
              placeholder="Obs."
              variant="invisible"
              {...register(`tratamentos.${i}.obs`)}
            />
          );
        },
      },
      {
        header: "Valor",
        accessorKey: "valor",
        meta: { width: "100px" },
        cell: (row: any) => {
          const i = row.row.index;
          return (
            <Input
              className="column-treatment-table"
              handleChange={() => updateValues(i)}
              placeholder="0,00"
              variant="invisible"
              mask="partialCurrency"
              {...register(`tratamentos.${i}.valor`)}
            />
          );
        },
      },
      {
        header: "Qtd",
        accessorKey: "qtd",
        meta: { width: "100px", alignHeader: "right" },
        cell: (row: any) => {
          setList;
          const i = row.row.index;
          return (
            <Input
              className="qty-treatment-table"
              handleChange={() => updateValues(i)}
              placeholder="1"
              variant="invisible"
              {...register(`tratamentos.${i}.qtd`)}
            />
          );
        },
      },
      {
        header: "Total",
        accessorKey: "total",
        cell: (row: any) => {
          const i = row.row.index;
          return (
            <Input
              handleChange={() => calcTotal()}
              className="total-treatment-table"
              placeholder="0,00"
              variant="invisible"
              {...register(`tratamentos.${i}.total`)}
              mask="partialCurrency"
            />
          );
        },
        meta: { alignHeader: "right", width: "150px" },
      },
    ],
    [list]
  );

  return (
    <Container>
      <ModalInsertTreatment
        modalRef={treatmentRef}
        selectData={(data) => handleInclude(data)}
      />
      <Content>
        <p className="title">Tratamentos</p>
        <div className="open-icon" onClick={() => setOpen(!open)}>
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </Content>

      <TableCont>{open && <Table cols={cols} data={list} />}</TableCont>
      {list?.length > 0 && (
        <>
          <hr />

          <FooterTable>
            <Input
              // handleChange={() => updateValues()}
              {...register("total")}
              variant="invisible"
              placeholder="0,00"
              mask="currency"
            />
          </FooterTable>
        </>
      )}

      <ButtonContainer onClick={() => treatmentRef.current?.open()}>
        <Button variant="link">Selecionar tratamento</Button>
      </ButtonContainer>
    </Container>
  );
};
