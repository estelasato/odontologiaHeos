import { useMemo, useRef, useState } from "react";

import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { Container, ListCont } from "./styles";
import Table from "@/components/Table";
import { ButtonContainer, Content } from "@/components/IncludeResponsible/styles";
import { Button } from "@/components/Button";
import { modalRefProps } from "../Modal";
import { useIncludeMed } from "./useIncludeMed";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { ModalMedAnamnesis } from "../Modal/ModalMedAnamnesis";

interface IncludeMedProps {
  listData?: any[];
}

export const IncludeMed = ({ listData }: IncludeMedProps) => {
  const modalRef = useRef<modalRefProps>();
  const { medOptions, handleRemove, list, setList } = useIncludeMed(listData);

  const [open, setOpen] = useState(true);

  const cols = useMemo(() => [
    {
      header: "Nome",
      accessorKey: "idMedicamento",
      cell: (row: any) => {
        const name = medOptions.find((i: {label: string, value: any}) => i.value === row.getValue())?.label
        return name
      }
    },
    {
      header: "Motivo",
      accessorKey: "motivo"
    },
    {
      header: "Frequência",
      accessorKey: "frequencia"
    },
    {
      header: "",
      accessorKey: "delete",
      meta: { alignText: "right" },
      cell: (row: any) => {
        const { original, index} = row.row
        return (
        <TableIconColumn
          handleEdit={() => modalRef.current?.open({...original, index})}
          handleRemove={() => {
            handleRemove(index)
          }}
        />
      )},
    },
  ], [list])

  return (
    <Container>
      <ModalMedAnamnesis
        modalRef={modalRef}
        setList={setList}
        list={list}
      />

      <Content>
        <p className="title">Lista de medicamentos</p>
        <div className="open-icon" onClick={() => setOpen(!open)}>
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </Content>

      <ListCont>
        {list.length > 0 && open && (
          <Table data={list} cols={cols} variant="compact" />
        )}
      </ListCont>

      <ButtonContainer onClick={() => modalRef.current?.open()}>
        <Button variant="link">Adicionar Medicamento</Button>
      </ButtonContainer>
    </Container>
  );
};
