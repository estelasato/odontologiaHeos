import { useMemo, useRef } from "react";
import { TableIconColumn } from "../shared/iconsTable";
import { Container } from "../Employees/styles";
import Table from "@/components/Table";
import { SearchContainer } from "@/components/SearchContainer";
import { useServicesList } from "./useServicesList";
import masks from "@/utils/masks";
import { ModalService } from "@/components/ModalService";
import { modalRefProps } from "@/components/Modal";


export const ServicesList = () => {
  const modalRef = useRef<modalRefProps>(null);
  const {servicesList, isLoading} = useServicesList();

  const columns = useMemo(
    () => [
      { header: "Código", accessorKey: "id" },
      {
        header: "Valor",
        accessorKey: "valor",
        cell: (row: any) => {
          const v = row.getValue();
          return <>{masks.currencyAllPlatforms(`${v}`)}</>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Código Orçamento",
        accessorKey: "idOrcamento",
      },
      {
        header: "",
        accessorKey: "delete",
        meta: { alignText: "right" },
        cell: (row: any) => (
          <TableIconColumn
            // handleEdit={() => navigate(`/patient/${row.row.original.id}`)}
            // handleRemove={() => {
            //   setSelectData(row.row.original);
            //   modalRemoveRef.current?.open();
            // }}
          />
        ),
      },
    ],
    []
  );
  return (
    <Container>
      <ModalService modalRef={modalRef}/>
      {/* <SearchContainer
        // onClick={() => navigate('/patient')}
        // onSearch={(e) => handleSearch(e)}
      /> */}
      <Table
        cols={columns}
        data={servicesList || []}
        isLoading={isLoading}
        onClickRow={(data) => modalRef.current?.open(data)}
        // onOpenRow={(data) => navigate(`/patient/${data.id}`)}
        // onClickRow={(data) => onClick ?  handleClickRow(data) : navigate(`/patient/${data.id}`)}
      />
    </Container>
  )
}
