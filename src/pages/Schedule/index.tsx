import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Header } from './styles';
import { Button } from '@/components/Button';
// @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD

const localizer = momentLocalizer(moment)
export const Schedule = () => {


  const formatRange = (data: any) => {
    let finalRange = {};
    console.log(data)
    if (Array.isArray(data)) {
      finalRange = {
        start: moment(data[0])?.format('YYYY-MM-DD'),
        end: moment(data[data?.length  > 1 ?  data?.length - 1 : data.length]?.format('YYYY-MM-DD'))
      }
    } else {
      finalRange = {
        start: moment(data?.start)?.format('YYYY-MM-DD'),
        end: moment(data?.end)?.format('YYYY-MM-DD')
      }
    }
    return finalRange;
  }
  return (
    <Container>
      <Header>
        <h1>Agenda</h1>
        <Button>+ Marcar Consulta</Button>
      </Header>

      <Calendar
      localizer={localizer}
      // events={myEventsList}
      // startAccessor="start"
      events={[
        { title: "evento teste", start: moment().toDate(), end: moment().add(30, 'minutes').toDate()}
      ]}
      selectable
      defaultView='week'
      popup
      onRangeChange={(e) => {
        const { start, end } = formatRange(e) as {start: string, end: string};
        console.log(start, end)
      }}
      // endAccessor="end"
      style={{ height: 'calc(100vh - px)', width: '100%' }}
    />
    </Container>
  )
}
