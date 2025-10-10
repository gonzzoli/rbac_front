import { Link } from "react-router";

export default function Inicio() {
  return (
    <div>
      <Link to={"/usuarios"}>
        <h2>Modulo Usuarios</h2>
      </Link>
      <Link to={"/ventas"}>
        <h2>Modulo Ventas</h2>
      </Link>
      <Link to={"/inventario"}>
        <h2>Modulo Inventario</h2>
      </Link>
    </div>
  );
}
