import { Controller, useForm } from "react-hook-form";
import axiosAPI from "./utils/axiosAPI";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    usuario: string;
    contrasena: string;
  }>();

  const iniciarSesion = handleSubmit(async (dto) => {
    console.log(dto);
    await axiosAPI.post("/login", dto);
  });

  return (
    <div className="flex bg-gray-200 flex-col items-center justify-center">
      <h2 className="my-2">Login Sistema de Gestion Supermercado Lider</h2>
      <form onSubmit={iniciarSesion} className="flex flex-col gap-10">
        <Controller
          control={control}
          name="usuario"
          rules={{
            required: { value: true, message: "El usuario es requerido" },
          }}
          render={({ field }) => (
            <div className="flex flex-col">
              <label htmlFor="usuario">Usuario</label>
              <input
                {...field}
                id="usuario"
                type="text"
                className={`bg-white border-black border-2 rounded-md ${
                  errors.usuario ? "border-red-500" : ""
                }`}
              />
              <em>{errors.usuario?.message}</em>
            </div>
          )}
        />
        <Controller
          control={control}
          name="contrasena"
          rules={{
            required: { value: true, message: "La contraseña es requerida" },
          }}
          render={({ field }) => (
            <div className="flex flex-col">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                {...field}
                id="contrasena"
                type="password"
                className={`bg-white border-black border-2 rounded-md ${
                  errors.contrasena ? "border-red-500" : ""
                }`}
              />
              <em>{errors.contrasena?.message}</em>
            </div>
          )}
        />

        <button type="submit" className="p-3 bg-green-500">
          Ingresar
        </button>
      </form>
    </div>
  );
}
