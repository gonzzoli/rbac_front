import { type PropsWithChildren, createContext } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";
import toast from "react-hot-toast";

type LoginContextTipo = {
  tienePermiso: (rolesPermitidos: RolId[]) => boolean;
  rolId: string | undefined;
  setRolId: React.Dispatch<React.SetStateAction<string | undefined>>;
  borrarRolId: () => void;
  cerrarSesion: () => void;
  usuario: string | undefined;
  setUsuario: React.Dispatch<React.SetStateAction<string | undefined>>;
  borrarUsuario: () => void;
};

const comportamientoPorDefecto: LoginContextTipo = {
  tienePermiso: () => false,
  rolId: undefined,
  setRolId: () => undefined,
  borrarRolId: () => undefined,
  cerrarSesion: () => undefined,
  usuario: undefined,
  setUsuario: () => undefined,
  borrarUsuario: () => undefined,
};

const LoginContext = createContext<LoginContextTipo>(comportamientoPorDefecto);

const LoginProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [usuario, setUsuario, borrarUsuario] = useLocalStorage<"usuario">(
    "usuario",
    ""
  );
  const [rolId, setRolId, borrarRolId] = useLocalStorage<"rolId">(
    "rolId",
    undefined
  );

  const navigate = useNavigate();

  const tienePermiso = (rolesPermitidos: RolId[]) => {
    if (!rolId) {
      toast.error(
        "Parece que no tienes un rol asignado. Prueba iniciando sesion nuevamente."
      );
      return false;
    }

    // Y aca con que tenga solo uno de los roles ya damos acceso. Util para componentes que tengan
    // componentes con proteccion mas especifica adentro.
    return rolesPermitidos.includes(Number(rolId) as RolId);
  };

  /**
   * Borra el token y usuario del localStorage, y lo reenvia al home
   **/
  const cerrarSesion = () => {
    borrarUsuario();
    navigate("/");
  };

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
        borrarToken,
        usuario,
        setUsuario,
        borrarUsuario,
        cerrarSesion,
      }}
    >
      {" "}
      {children}{" "}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
