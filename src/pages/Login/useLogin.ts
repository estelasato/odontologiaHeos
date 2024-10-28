import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import AuthServices, { SignInData } from "@/services/AuthServices";

const authFormValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Você deve inserir seu e-mail")
    .email("E-mail inválido"),
    senha: zod.string().min(6, "Você deve inserir sua senha"),
  //persist: zod.boolean()
});

type AuthFormData = zod.infer<typeof authFormValidationSchema>;

export function useLogin() {
  const loginForm = useForm<AuthFormData>({
    resolver: zodResolver(authFormValidationSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInData) => {
      return AuthServices.signIn(data);
    },
  });

  const onSubmitForm = (async (data: AuthFormData) => {
    try {
      await mutateAsync(data);
      navigate("/registrations");
    } catch {
      toast.error("Email e/ou senha estão incorretos");
    }
  });

  return {
    onSubmitForm,
    loginForm,
    isPending,
  };
}
