import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export default function useLoginCtx() {
  return useContext(LoginContext);
}
