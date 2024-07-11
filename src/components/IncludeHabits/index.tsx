import { Grid } from "@/config/grid";
import { Input } from "../Form/Input";
import { Button } from "../Button";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { modalRefProps } from "../Modal";
import { Content, Container } from "./styles";
import { ResponsibleProps } from "@/services/responsiblePartyService";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { BasicProps } from "@/services/basicServices";
import { ModalInsertHabit } from "../Modal/ModalInsertHabit";

export const IncludeHabits = ({ listData }: { listData?: BasicProps[] }) => {
  const modalRef = useRef<modalRefProps>();
  const [list, setList] = useState<BasicProps[]>(listData || []);
  const [open, setOpen] = useState(true);
  const { register, setValue } = useFormContext();

  const handleInclude = (data: ResponsibleProps) => {
    const exist = list?.find((r) => r.id === data.id);
    if (exist) toast.error("Hábito já incluso");
    if (!data.ativo) toast.error("Hábito inativo");
    else {
      setList((prev) => [...prev, data]);
      modalRef.current?.close();
    }
  };

  const handleRemove = useCallback(
    (id: number) => {
      const newList = list?.filter((r) => r.id != id);
      setList(newList)
      setValue('habitos', newList)
    },
    [list]
  );

  useEffect(() => {
    if (listData) {
      setList(listData);
    }
  }, [listData])

  useEffect(() => {
    list?.map((r, i) => {
      setValue(`habitos.${i}.id`, r.id);
      setValue(`habitos.${i}.nome`, r.nome);
      setValue(`habitos.${i}.descricao`, r.descricao);
    });
  }, [list]);

  return (
    <Container>
      <ModalInsertHabit
        modalRef={modalRef}
        selectData={(data) => handleInclude(data)}
      />
      <Content>
        <p className="title">Hábitos</p>
        <div className='open-icon' onClick={() => setOpen(!open)}>
          {open ? <IoChevronUp /> : <IoChevronDown />}
        </div>
      </Content>
      <Grid
        $template="100px 1fr 1fr 20px"
        $templateMd="100px 1fr 1fr 20px"
      >
        {open && list?.map((r: BasicProps, index) => (
          <>
            <Input
              {...register(`habitos.${index}.id`)}
              label="Código"
              disabled={true}
              key={r.id}
            />
            <Input
              {...register(`habitos.${index}.nome`)}
              label="Nome"
              disabled={true}
              key={r.nome}
            />

            <Input
              {...register(`habitos.${index}.descricao`)}
              label="Descrição"
              disabled={true}
              key={r.descricao}
            />
            <div className="trash-icon" onClick={() => r.id && handleRemove(r.id)}>
              <FaRegTrashCan />
            </div>
          </>
        ))}
        <div
          className="resp-btn"
          onClick={() => modalRef?.current?.open()}
        >
          <Button variant="link">+ Adicionar hábito</Button>
        </div>
      </Grid>
    </Container>
  );
};
