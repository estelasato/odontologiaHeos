import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import AuthServices, { SignInData } from "@/services/AuthServices";

const RegisterFormValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Você deve inserir seu e-mail")
    .email("E-mail inválido"),
    senha: zod.string().min(6, "Você deve inserir sua senha"),
    nome: zod.string().min(1, "Você deve inserir seu nome"),
  //persist: zod.boolean()
});

type RegisterFormData = zod.infer<typeof RegisterFormValidationSchema>;

export function useRegister() {
  const RegisterForm = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormValidationSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      return AuthServices.register({...data, role: 'admin', ativo: 1});
    },
  });

  const onSubmitForm = (async (data: RegisterFormData) => {
    try {
      await mutateAsync(data);
      navigate("/registrations");
    } catch {
      toast.error("Erro ao cadastrar usuário");
    }
  });

  return {
    onSubmitForm,
    RegisterForm,
    isPending,
  };
}
