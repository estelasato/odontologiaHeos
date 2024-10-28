import {  useRef } from "react";
// import { Calendar, Event, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop, {
//   withDragAndDropProps,
// } from "react-big-calendar/lib/addons/dragAndDrop";
// import moment from "moment";
import { Button } from "@/components/Button";
import { ModalSchedule } from "@/components/Modal/ModalSchedule";
import { modalRefProps } from "@/components/Modal";

// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSchedule } from "./useSchedule";
import { Container, Header, SchedulerCont } from "./styles";
import { Scheduler } from "@aldabil/react-scheduler";
import { ptBR } from "date-fns/locale";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
// import { toast } from "react-toastify";

// const localizer = momentLocalizer(moment);
export const Schedule = () => {
  const traducao = {
    navigation: {
      month: "Mensal",
      week: "Semanal",
      day: "Diáro",
      today: "Hoje",
      agenda: "Agenda",
    },
    form: {
      addTitle: "Adicionar consulta",
      editTitle: "Editar consulta",
      confirm: "Salvar",
      delete: "Remover",
      cancel: "Cancelar",
    },
    event: {
      title: "Título",
      subtitle: "Subtitulo",
      start: "Início",
      end: "Fim",
      allDay: "Dia inteiro",
    },
    validation: {
      required: "Campo obrigatório",
      invalidEmail: "E-mail inválido",
      onlyNumbers: "Apenas números",
      min: "Mínimo {{min}} letras",
      max: "Max {{max}} letras",
    },
    moreEvents: "Mais...",
    noDataToDisplay: "Sem dados para exibir",
    loading: "Loading...",
  };
  const {
    // handleDrop,
    schedules,
    // setSchedules,
    // isLoading,
    // isPendingUpdate
  } =
    useSchedule();

  const scheduleRef = useRef<modalRefProps>(null);

  const onEventDrop = async (
    event: React.DragEvent<HTMLButtonElement>,
    droppedOn: Date,
    updatedEvent: ProcessedEvent,
    originalEvent: ProcessedEvent
  ): Promise<void | ProcessedEvent> => {
    // Lógica para manipular o evento quando ele é arrastado e solto
    console.log(
      "Event dropped:",
      event,
      droppedOn,
      updatedEvent,
      originalEvent,
      droppedOn
    );

    // if (new Date(droppedOn) < new Date()) {
    //   toast.error("Não é possível agendar em datas passadas");
    //   return
    // }

    // const s = schedules.find((s) => s.event_id === updatedEvent.event_id);

    // if (s && s.event_id) {
    //   const values = {
    //     ...s,
    //     start: droppedOn,
    //     end: new Date(droppedOn.getTime() + (s.end.getTime() - s.start.getTime())),
    //   };
    //   await handleDrop(values);
    //   return values;
    // }

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1000);
    // });
    return;
  };

  // const handleEvents = (e: any) => {
  //   console.log(e);
  //   scheduleRef.current?.open();
  //   return <ModalSchedule modalRef={scheduleRef} />;
  // };
  // console.log(schedules);
  // const defaultDate = useMemo(() => new Date(2015, 3, 1), []);
  return (
    <Container>
      <ModalSchedule modalRef={scheduleRef} />
      <Header>
        <h1>Agenda</h1>
        <Button onClick={() => scheduleRef.current?.open()}>
          + Marcar Consulta
        </Button>
      </Header>
      <SchedulerCont>
        <Scheduler
          alwaysShowAgendaDays={false}
          hourFormat="24"
          translations={traducao}
          view="week"
          agenda
          selectedDate={new Date()}
          onEventClick={(e) => scheduleRef.current?.open({ id: e.event_id, ...e, })}
          // onCellClick={handleEvents}
          onSelectedDateChange={(date) => console.log(date)}
          locale={ptBR}
          events={schedules}
          onEventDrop={onEventDrop}
          disableViewer={true}
        />
      </SchedulerCont>
    </Container>
  );
};
// const DnDCalendar = withDragAndDrop(Calendar);
