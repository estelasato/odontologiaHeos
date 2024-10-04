import { Grid } from "@/config/grid";
import { Input } from "../Form/Input";
import { Button } from "../Button";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { modalRefProps } from "../Modal";
import { ButtonContainer, Content, ResponsibleCont } from "./styles";
import { ModalInsertResponsible } from "../Modal/ModalInsertResponsible";
import { ResponsibleProps } from "@/services/responsiblePartyService";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

export const IncludeResponsible = ({
  listData,
}: {
  listData?: ResponsibleProps[];
}) => {
  const responsibleRef = useRef<modalRefProps>();
  const [list, setList] = useState<ResponsibleProps[]>(listData || []);
  const [open, setOpen] = useState(true);
  const { register, setValue } = useFormContext();

  const handleInclude = (data: ResponsibleProps) => {
    const exist = list?.find((r) => r.id === data.id);
    if (exist) return toast.error("Responsável já incluso");
    if (!data.ativo) return toast.error("Responsável inativo");

    setList((prev) => [...prev, data]);
    responsibleRef.current?.close();
  };

  const handleRemove = useCallback(
    (id: number) => {
      const newList = list?.filter((r) => r.id != id);
      setValue("responsaveis", newList);
      setList(newList);
    },
    [list]
  );

  useEffect(() => {
    if (listData) {
      setList(listData);
    }
  }, [listData]);

  useEffect(() => {
    list?.map((r, i) => {
      setValue(`responsaveis.${i}.id`, r.id);
      setValue(`responsaveis.${i}.nome`, r.nome);
      setValue(`responsaveis.${i}.celular`, r.celular);
      setValue(`responsaveis.${i}.cpf`, r.cpf);
    });
  }, [list]);

  return (
    <ResponsibleCont>
      <ModalInsertResponsible
        modalRef={responsibleRef}
        selectData={(data) => handleInclude(data)}
      />
      <Content>
        <p className="title">Responsável</p>
        <div className="open-icon" onClick={() => setOpen(!open)}>
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </Content>
      <Grid
        $template="100px 1fr 1fr 1fr 20px"
        $templateMd="100px 1fr 1fr 1fr 20px"
      >
        {open &&
          list?.map((r: ResponsibleProps, index) => (
            <>
              <Input
                {...register(`responsaveis.${index}.id`)}
                label="Código"
                disabled={true}
                key={r.id}
              />
              <Input
                {...register(`responsaveis.${index}.nome`)}
                label="Nome"
                disabled={true}
                key={r.nome}
              />

              <Input
                {...register(`responsaveis.${index}.celular`)}
                label="Celular"
                mask="cell"
                disabled={true}
                key={r.celular}
              />
              <Input
                {...register(`responsaveis.${index}.cpf`)}
                label="CPF"
                mask="cpf"
                disabled={true}
                key={r.cpf}
              />
              <div
                className="trash-icon"
                onClick={() => r.id && handleRemove(r.id)}
              >
                <FaRegTrashCan />
              </div>
            </>
          ))}
        <ButtonContainer onClick={() => responsibleRef?.current?.open()}>
          <Button variant="link">+ Adicionar responsável</Button>
        </ButtonContainer>
      </Grid>
    </ResponsibleCont>
  );
};
