import { useMemo, useRef } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment";
import { Button } from "@/components/Button";
import { ModalSchedule } from "@/components/Modal/ModalSchedule";
import { modalRefProps } from "@/components/Modal";

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSchedule } from "./useSchedule";
import { Container, Header } from "./styles";

const localizer = momentLocalizer(moment);
export const Schedule = () => {
  const {handleDrop, schedules, setSchedules} = useSchedule();


  const scheduleRef = useRef<modalRefProps>(null);

  // const formatRange = (data: any) => {
  //   let finalRange = {};
  //   if (Array.isArray(data)) {
  //     finalRange = {
  //       start: moment(data[0])?.format("YYYY-MM-DD"),
  //       end: moment(
  //         data[data?.length > 1 ? data?.length - 1 : data.length]?.format(
  //           "YYYY-MM-DD"
  //         )
  //       ),
  //     };
  //   } else {
  //     finalRange = {
  //       start: moment(data?.start)?.format("YYYY-MM-DD"),
  //       end: moment(data?.end)?.format("YYYY-MM-DD"),
  //     };
  //   }
  //   return finalRange;
  // };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
    handleDrop(data)

    const updatedEvents = schedules.map((e: Event) => {
      if (e.resource.id === data?.event.resource.id) {
        return {
          ...e,
          start: data.start,
          end: data.end,
        };
      }
      return e;
    });
    setSchedules(updatedEvents)
  };

  const defaultDate = useMemo(() => new Date(2015, 3, 1), [])
  return (
    <Container>
      <ModalSchedule modalRef={scheduleRef} />
      <Header>
        <h1>Agenda</h1>
        <Button onClick={() => scheduleRef.current?.open()}>
          + Marcar Consulta
        </Button>
      </Header>
      <DnDCalendar
        defaultView="week"
        events={schedules}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventDrop}
        resizable
        defaultDate={defaultDate}
          popup
          popupOffset={30}
          toolbar={true}
        selectable
        style={{ height: "calc(100vh - px)", width: "100%" }}
      />
    </Container>
  );
};
const DnDCalendar = withDragAndDrop(Calendar)
