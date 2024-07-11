import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

export const Dashboard = () => {

  const localizer = momentLocalizer(moment)

  return (
    <div>
      <h1>Dashboard</h1>
      <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  )
}
