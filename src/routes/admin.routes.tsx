import { LuClock } from "react-icons/lu";
// import { MdOutlineAssignment } from "react-icons/md";
// import { FiUserCheck } from "react-icons/fi";
import { RiFolderUserLine } from "react-icons/ri";
import { MdOutlineBadge } from "react-icons/md";
import { RiMedicineBottleLine } from "react-icons/ri";
import { RiThermometerLine } from "react-icons/ri";
import { PiTreeBold } from "react-icons/pi";
import { MdOutlineLocationOn } from "react-icons/md";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiPillBold } from "react-icons/pi";
import { LuCalendarClock } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { TbReportMoney } from "react-icons/tb";
import { PiTooth } from "react-icons/pi";

export default [
  {
    name: 'Agenda',
    route: '/schedules',
    icon: <LuCalendarClock color="white" size={20}/>
  },
  {
    name: 'Localidades',
    route: '/registrations',
    icon: <MdOutlineLocationOn size={20}/>
  },
  {
    name: 'Funcionários',
    route: '/employees',
    icon: <MdOutlineBadge size={20}/>
  },
  {
    name: 'Pacientes',
    route: '/patients',
    icon: <RiFolderUserLine color="white" size={20}/>
  },
  {
    name: 'Responsáveis',
    route: '/responsible',
    icon: <PiUsersThree color="white" size={20}/>
  },
  {
    name: 'Profissionais',
    route: '/professionals',
    icon: <LiaUserNurseSolid color="white" size={25}/>
  },
  // {
  //   name: 'Medicamentos',
  //   route: '/medications',
  //   icon: <RiMedicineBottleLine size={20}/>
  // },
  // {
  //   name: 'Doenças',
  //   route: '/illnesses',
  //   icon: <RiThermometerLine size={20}/>
  // },
  // {
  //   name: 'Alergias',
  //   route: '/allergies',
  //   icon: <PiPillBold size={20}/>
  // },
  // {
  //   name: 'Hábitos',
  //   route: '/habits',
  //   icon: <PiTreeBold size={20}/>
  // },
  {
    name: 'Financeiro',
    route: '/financial',
    icon: <TbReportMoney size={20}/>
  },
  // {
  //   name: 'Procedimentos',
  //   route: '/procedures',
  //   icon: <PiTooth size={20}/>
  // },
  {
    name: 'Cadastros gerais',
    route: '/registers',
    icon: <RiMedicineBottleLine color="white" size={20}/>
  }
]
