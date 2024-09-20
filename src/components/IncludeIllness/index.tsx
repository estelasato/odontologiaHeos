import { useEffect, useMemo, useRef, useState } from "react";
import { modalRefProps } from "../Modal";
import { useFormContext } from "react-hook-form";
import { Container, IllnessCont } from "./styles";
import { ButtonContainer, Content } from "../IncludeResponsible/styles";

import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { Button } from "../Button";
import { useIncludeIllness } from "./useIncluseIllness";
import Table from "../Table";
import { TableIconColumn } from "@/pages/shared/iconsTable";
import { ModalIllnessAnamnesis } from "../Modal/ModalIllnessAnamnesis";

export const IncludeIllness = ({ listData }: { listData?: any[] }) => {
  const { illnessOptions } = useIncludeIllness();

  const form = useFormContext();
  const { setValue } = form;

  const [list, setList] = useState<any[]>(listData || []);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    listData && setList(listData)
  }, [listData]);

  const handleRemove = (index: number) => {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList);
    setValue('doencas', newList)
  };

  const cols = useMemo(() => [
    {
      header: "Nome",
      accessorKey: "idDoenca",
      cell: (row: any) => {
        const name = illnessOptions.find((i: {label: string, value: any}) => i.value === row.getValue())?.label
        return name
      }
    },
    {
      header: "Gravidade",
      accessorKey: "gravidade"
    },
    {
      header: "Crônica",
      accessorKey: "cronica",
      cell: (row: any) => {
        const r = row.getValue() as boolean
        return typeof r != 'boolean' ? null : (r ? 'sim' : 'não')
      }
    },
    {
      header: "Complicações",
      accessorKey: "complicacoes"
    },
    {
      header: "",
      accessorKey: "delete",
      meta: { alignText: "right" },
      cell: (row: any) => {
        const { original, index} = row.row
        // console.log
        return (
        <TableIconColumn
          handleEdit={() => modalIllnessRef.current?.open({...original, index})}
          handleRemove={() => {
            handleRemove(index)
          //   setSelectedAnamnesis(row.row.original);
          //   modalRemoveRef.current?.open();
          }}
        />
      )},
    },
  ], [list])


  const modalIllnessRef = useRef<modalRefProps>();

  return (
    <Container>
      <ModalIllnessAnamnesis modalRef={modalIllnessRef} setList={setList} list={list}/>
      <Content>
        <p className="title">Lista de doenças</p>
        <div className="open-icon" onClick={() => setOpen(!open)}>
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </Content>

      <IllnessCont>
        {(list.length > 0 && open) && (
          <Table
            data={list}
            cols={cols}
            variant="compact"
          />
        )}
      </IllnessCont>


      <ButtonContainer onClick={() => modalIllnessRef.current?.open()}>
        <Button variant="link">Adicionar Doença</Button>
      </ButtonContainer>
    </Container>
  );
};
