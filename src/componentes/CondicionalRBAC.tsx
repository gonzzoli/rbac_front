import { useContext, useEffect, useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/LoginContext";

type PropsProtegido = {
  // TPermisos requeridos para mostrar el componente
  permisos: string[];
  // Si es false, con que tenga uno de los permisos ya se muestra el componente
  // (util para paginas o componentes con mas componentes protegidos internos)
  requerirTodos?: boolean;
  // Para saber si redirigir a /error o solo no mostrar el componente
  esPagina?: boolean;
} & PropsWithChildren;
/**
 * Para englobar componentes y rutas que necesiten permisos especificos para mostrarse en pantalla.
 * Si hacen algun truquito alguno que sepa de react quiza puedan agregarse los permisos para acceder,
 * pero aun asi no tendrian datos sensibles pues lo verificamos en el servidor.
 * Es solo para mejor experiencia de usuario, no para seguridad. Seguridad esta en el servidor.
 */
const Protegido: React.FunctionComponent<PropsProtegido> = ({
  permisos,
  requerirTodos,
  esPagina,
  children,
}) => {
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();
  const [permisoOtorgado, setPermisoOtorgado] = useState<boolean | null>(null);

  // Nos fijamos si tiene permiso.
  useEffect(() => {
    async function verificarPermiso() {
      // Si el permiso requerido es '' , osea la cadena vacia, significa que solo debe estar logeado
      if (permisos.length === 0 && loginCtx.logeado)
        return setPermisoOtorgado(true);

      // si no tiene token es porque no ha iniciado sesion. Asi que no tiene permiso
      if (!loginCtx.logeado)
        if (!esPagina)
          // Si no es pagina, no redigirimos
          return setPermisoOtorgado(false);
        // Si no tiene token y es pagina, redirigimos a la pagina de No Autorizado
        else return navigate("/error");

      const tienePermiso = loginCtx.tienePermiso(permisos, requerirTodos);
      // Si no tiene permiso y era pagina, redirigimos a /error
      if (!tienePermiso && esPagina) return navigate("/error");

      setPermisoOtorgado(tienePermiso);
    }
    verificarPermiso();
  }, [permisos, requerirTodos, esPagina, navigate, loginCtx]);

  // Entonces si tiene permiso se muestran los children. Si no, no.
  return <>{permisoOtorgado && children} </>;
};

export default Protegido;
