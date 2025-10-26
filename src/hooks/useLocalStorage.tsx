import { useEffect, useState } from "react";

type AtributosPersistidos = {
  token: string | undefined;
  logeado: string | undefined;
  usuario: string | undefined;
  permisos: string[] | undefined;
};

/**
 * Hook para utilizar localStorage de forma simple. Si no encuentra el valor buscado
 * devuelve el dado por defecto y lo almacena. Luego, si seteamos el valor a algo disinto,
 * almacena ese nuevo valor tambien en localStorage.
 * @param clave Nombre del atributo que buscamos recuperar/almacenar del localstorage.
 * @param valorPorDefecto Valor inicial que se va a usar si no se encuentra almacenado aun.
 */
const useLocalStorage = <T extends keyof AtributosPersistidos>(
  clave: T,
  valorPorDefecto: AtributosPersistidos[T]
): [
  AtributosPersistidos[T],
  React.Dispatch<React.SetStateAction<AtributosPersistidos[T]>>,
  () => void
] => {
  const [valor, setValor] = useState<AtributosPersistidos[T]>(() => {
    // Si existe, lo usamos. Si no, ponemos el por defecto
    const valorAlmacenado = window.localStorage.getItem(clave);
    // Distinto de null para que tambien podamos almacenar undefined o false
    return valorAlmacenado !== null
      ? JSON.parse(valorAlmacenado)[clave]
      : valorPorDefecto;
  });

  useEffect(() => {
    // Si lo ponemos en undefined no lo guardamos. Solo ponemos undefined al eliminarDato
    if (valor === undefined) return;
    window.localStorage.setItem(clave, JSON.stringify({ [clave]: valor }));
  }, [valor, setValor, clave]);

  // Borra el dato del localStorage.
  const eliminarDato = () => {
    // undefined significa que lo borramos.
    window.localStorage.removeItem(clave);
    setValor(undefined);
  };

  return [valor, setValor, eliminarDato];
};

export default useLocalStorage;
