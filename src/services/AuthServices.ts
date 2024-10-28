import api from '../config/api';
import { useAuthStore } from '../stores/auth';

export interface SignInData {
  email: string,
  senha: string,
  persist?: boolean
}
export interface SignInResponse {
  token: string,
  usuario: IUsuario,
}

class AuthServices {
  setLoginStorage = (data: SignInResponse) => {
    const { token, usuario } = data;
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setProfile(usuario);
  };

  async signIn(credentials: SignInData) {
    const { data } = await api.post<SignInResponse>('/usuarios/login', credentials);
    this.setLoginStorage(data);
    return data
  }
}

export default new AuthServices();
