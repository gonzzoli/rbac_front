import { NavLink, Outlet, useLocation } from "react-router";
import useLoginCtx from "./hooks/useLoginCtx";

export default function Layout() {
  const { cerrarSesion } = useLoginCtx();
  const location = useLocation();
  return (
    <>
      {/* Si estamos en /login, no mostramos el header */}
      {location.pathname !== "/login" && (
        <header className="border-b border-black py-2">
          <nav className="flex items-center justify-center gap-x-10">
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
              to={"/"}
            >
              Inicio
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
              to={"/ventas"}
            >
              Ventas
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
              to={"/inventario"}
            >
              Inventario
            </NavLink>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
              to={"/usuarios"}
            >
              Usuarios
            </NavLink>
            <p onClick={cerrarSesion} className="text-red-500 cursor-pointer">
              Cerrar sesión
            </p>
          </nav>
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
}
