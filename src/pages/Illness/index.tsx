import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "../Employees/styles";
import { modalRefProps } from "@/components/Modal";
import { BasicProps } from "@/services/basicServices";
import { useBasicForm } from "../shared/useBasicForm";
import columnsBasicForm from "../shared/basicTableData";
import { ModalConfirmation } from "@/components/Modal/ModalConfirm";
import { ModalBasicForm } from "@/components/Modal/ModalBasicForm";
import { SearchContainer } from "@/components/SearchContainer";
import Table from "@/components/Table";
import { FilterList } from "@/utils/shared/FilterList";

interface IIllness {
  onClick?: (data: any) => void;
}

export const Illnesses = ({ onClick }: IIllness) => {
  const modalRef = useRef<modalRefProps>(null);
  const modalRemoveRef = useRef<modalRefProps>(null);
  const [selectData, setSelectData] = useState<BasicProps>();
  const [illnesses, setIllnesses] = useState<BasicProps[]>([])

  const { list, handleRemove } = useBasicForm("illness", modalRemoveRef);

  const cols = useMemo(
    () => columnsBasicForm({ setSelectData, modalRef, modalRemoveRef }),
    []
  );

  const handleClickRow = (data?: any) => {
    selectData?.id === data.id ? setSelectData(undefined) : setSelectData(data);
    onClick && onClick(data?.id ? data : undefined);
  };

  useEffect(() => {
    list && setIllnesses(list);
  }, [list]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(list, e, ["id", "nome"]);
      setIllnesses(filtered || []);
    } else setIllnesses(list);
  };

  return (
    <Container>
      <ModalConfirmation
        modalRef={modalRemoveRef}
        title="Remover doença"
        message={"Tem certeza que deseja remover esta doença?"}
        onConfirm={() => selectData?.id && handleRemove(selectData.id)}
      />
      <ModalBasicForm modalRef={modalRef} type="illness"/>
      <SearchContainer modalRef={modalRef} onSearch={(e) => handleSearch(e)} />
      <Table
        cols={cols}
        data={illnesses || []}
        onOpenRow={(data) => modalRef.current?.open(data)}
        onClickRow={handleClickRow}
      />
    </Container>
  );
};
