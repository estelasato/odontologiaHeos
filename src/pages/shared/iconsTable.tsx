import { FiEdit } from "react-icons/fi";
import { CgTrash } from "react-icons/cg";
import styled from "styled-components";

interface IconsTableProps {
  handleEdit?: () => void;
  handleRemove?: () => void;
}

export const TableIconColumn = ({ handleEdit, handleRemove }: IconsTableProps) => {

  return (
    <Container>
      {handleEdit && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleEdit && handleEdit()
          }}
        >
          <FiEdit />
        </div>
      )}
      {handleRemove && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleRemove && handleRemove()
          }}
        >
          <CgTrash />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
