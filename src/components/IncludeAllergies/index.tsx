import { useMemo, useRef, useState } from "react";
import { modalRefProps } from "../Modal";
import { useIncludeAllergies } from "./useIncludeAllergies";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { Container, ListCont } from "../IncludeMed/styles";
import { ButtonContainer, Content } from "../IncludeResponsible/styles";
import Table from "../Table";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { Button } from "../Button";
import { ModalAllergyAnamnesis } from "../Modal/ModalAllergyAnamnesis";

interface IncludeAllergiesProps {
  listData?: any[];
}

export const IncludeAllergies = ({ listData }: IncludeAllergiesProps) => {
  const modalRef = useRef<modalRefProps>();
  const { allergyOptions, handleRemove, list, setList } =
    useIncludeAllergies(listData);

  const [open, setOpen] = useState(true);

  const cols = useMemo(
    () => [
      {
        header: "Nome",
        accessorKey: "idAlergia",
        cell: (row: any) => {
          const name = allergyOptions.find(
            (i: { label: string; value: any }) => i.value === row.getValue()
          )?.label;
          return name;
        },
      },
      {
        header: "Gravidade",
        accessorKey: "gravidade",
      },
      {
        header: "Complicações",
        accessorKey: "complicacoes",
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => {
          const { original, index } = row.row;
          return (
            <TableIconColumn
              handleEdit={() => modalRef.current?.open({ ...original, index })}
              handleRemove={() => {
                handleRemove(index);
              }}
            />
          );
        },
      },
    ],
    [list]
  );

  return (
    <Container>
      <ModalAllergyAnamnesis
        modalRef={modalRef}
        setList={setList}
        list={list}
      />
      <Content>
        <p className="title">Lista de Alergias</p>
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
        <Button variant="link">Adicionar Alergia</Button>
      </ButtonContainer>
    </Container>
  );
};
