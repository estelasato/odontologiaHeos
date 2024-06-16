import { EmployeeFormSchema, EmployeeSchema, defaultValuesEmployee } from "@/validators/employeeValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { modalRefProps } from "..";
import { useMutation } from "@tanstack/react-query";
import employeeServices, { EmployeeProps } from "@/services/employeeServices";
import { toast } from "react-toastify";
import { useEmployee } from "@/pages/Employees/useEmployee";

export const useModalEmployee = (
  isCreate = false,
  modalRef: RefObject<modalRefProps>
) => {
  const employeeForm = useForm<EmployeeFormSchema>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: defaultValuesEmployee,
  });

  const { mutateAsync: createEmployee } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: async (data: EmployeeProps) => {
      return employeeServices.createEmployee(data)
    }
  })

  const { mutateAsync: updateEmployee } = useMutation({
    mutationKey: ["updateEmployee"],
    mutationFn: async (params: any) => {
      return employeeServices.updateEmployee(params.id, params);
    }
  })

  const { refetch } = useEmployee();

  const onSubmit = async (data?: any) => {
    try {
      console.log(data)
      if (isCreate) {
        await createEmployee(data);
      } else {
        await updateEmployee(data);
      }
      toast.success("Salvo com sucesso");
      refetch();
      modalRef.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  }

  return {
    employeeForm,
    // defaultValues,
    onSubmit,

  };
};
