import scheduleServices from "@/services/scheduleServices";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useSchedule = () => {
  const [schedules, setSchedules] = useState<ProcessedEvent[]>([])

  const { data: scheduleList, refetch, isLoading } = useQuery({
    queryKey: ["scheduleList"],
    queryFn: () => {
      return scheduleServices.getAllSchedules();
    },
  });

  useEffect(() => {
    const data = scheduleList ? scheduleList?.map((s: any) => {
      const end = new Date(s.horario);
      end.setMinutes(end.getMinutes() + (s.duracao || 0));
      return {
        ...s,
        start: new Date(s.horario),
        end,
        title: `${s.nomePaciente} - ${s.status}`,
        event_id: s.id || schedules.length + 1,
      }
    }) : []
    setSchedules(data as any)
  }, [scheduleList])

  const { mutateAsync: updateSchedule, isPending: isPendingUpdate } = useMutation({
    mutationKey: ["updateSchedule"],
    mutationFn: async (data: any) => {
      return scheduleServices.update(data);
    },
  })

  const handleDrop = async(data: any) => {
    console.log(data, 'handleDrop')
    try {
      await updateSchedule(data);
      // queryClient.invalidateQueries({ queryKey: ["scheduleList"] });
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
    isPendingUpdate,
    isLoading,
  };
};
