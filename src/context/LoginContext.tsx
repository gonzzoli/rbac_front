import { type PropsWithChildren, createContext } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";
import toast from "react-hot-toast";

type LoginContextTipo = {
  tienePermiso: (permisos: string[], esPagina?: boolean) => boolean;
  permisos: string[] | undefined;
  setPermisos: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  borrarPermisos: () => void;
  cerrarSesion: () => void;
  usuario: string | undefined;
  setUsuario: React.Dispatch<React.SetStateAction<string | undefined>>;
  borrarUsuario: () => void;
  logeado: string | undefined;
  setLogeado: React.Dispatch<React.SetStateAction<string | undefined>>;
  borrarLogeado: () => void;
};

const comportamientoPorDefecto: LoginContextTipo = {
  tienePermiso: () => false,
  permisos: undefined,
  setPermisos: () => undefined,
  borrarPermisos: () => undefined,
  cerrarSesion: () => undefined,
  usuario: undefined,
  setUsuario: () => undefined,
  borrarUsuario: () => undefined,
  logeado: undefined,
  setLogeado: () => undefined,
  borrarLogeado: () => undefined,
};

const LoginContext = createContext<LoginContextTipo>(comportamientoPorDefecto);

const LoginProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [usuario, setUsuario, borrarUsuario] = useLocalStorage<"usuario">(
    "usuario",
    ""
  );
  const [logeado, setLogeado, borrarLogeado] = useLocalStorage<"logeado">(
    "logeado",
    ""
  );
  const [permisos, setPermisos, borrarPermisos] = useLocalStorage<"permisos">(
    "permisos",
    undefined
  );

  const navigate = useNavigate();

  const tienePermiso = (
    permisosRequeridos: string[],
    requerirTodos = false
  ) => {
    if (!permisos) {
      toast.error(
        "Parece que no tienes ningun permiso. Prueba iniciando sesion nuevamente."
      );
      return false;
    }
    // Si se requieren todos, exigimos que tenga todos los permisos para dar acceso
    if (requerirTodos)
      return permisosRequeridos.every((permisoRequerido) =>
        permisos.includes(permisoRequerido)
      );
    // Y aca con que tenga solo uno de los permisos ya damos acceso. Util para componentes que tengan
    // componentes con proteccion mas especifica adentro.
    else {
      return permisosRequeridos.some((permisoRequerido) =>
        permisos.includes(permisoRequerido)
      );
    }
  };

  /**
   * Borra el token, usuario, y permisos del localStorage, y lo reenvia al home
   **/
  const cerrarSesion = () => {
    borrarUsuario();
    borrarLogeado();
    borrarPermisos();
    navigate("/");
  };

  return (
    <LoginContext.Provider
      value={{
        permisos,
        tienePermiso,
        setPermisos,
        borrarPermisos,
        usuario,
        setUsuario,
        borrarUsuario,
        logeado,
        setLogeado,
        borrarLogeado,
        cerrarSesion,
      }}
    >
      {" "}
      {children}{" "}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
