import { queryClient } from "@/App";
import scheduleServices, {
  returnSchedule,
  ScheduleProps,
} from "@/services/scheduleServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import { toast } from "react-toastify";

export const useSchedule = () => {
  const [schedules, setSchedules] = useState<any[]>([])

  const { data: scheduleList, refetch } = useQuery({
    queryKey: ["scheduleList"],
    queryFn: () => {
      return scheduleServices.getAllSchedules();
    },
    select(data) {
      const list = data?.map((s: returnSchedule) => {
        const end = new Date(s.horario);
        end.setMinutes(end.getMinutes() + (s.duracao || 0));
        return {
          start: new Date(s.horario),
          end,
          title: `${s.nomePaciente} - ${s.status}`,
          resource: {
            ...s
          },
        };
      });
      return list || [];
    },
  });

  useEffect(() => {
    scheduleList && setSchedules(scheduleList)
  }, [])

  const { mutateAsync: updateSchedule } = useMutation({
    mutationKey: ["updateSchedule"],
    mutationFn: async (data: any) => {
      return scheduleServices.update(data.id, data.values);
    },
    onSuccess: (data) => {
      const cache = queryClient.getQueryData<ScheduleProps[]>(["scheduleList"]);
      if (cache && data) {
        queryClient.setQueryData(['scheduleList'], {
          ...cache,
          ...data
        })
      }
    }
  })

  const handleDrop: withDragAndDropProps['onEventDrop'] = async(data) => {
    const values = {
      ...data.event.resource,
      horario: data.start,
      duracao: differenceInMinutes(data.end, data.start)
    }
    try {
      await updateSchedule({id:  data.event.resource.id, values});
      toast.success('Consulta atualizada')
    } catch (e) {
      toast.error('Erro ao atualizar consulta')
    }
  }


  return {
    refetch,
    handleDrop,
    schedules,
    setSchedules,
  };
};
