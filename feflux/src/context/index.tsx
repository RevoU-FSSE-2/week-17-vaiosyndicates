/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react"

export type GlobalContent = {
  token: string
  loading: boolean,
  setLoading:(c: boolean) => void,
  setToken:(c: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  token: '',
  loading: false,
  setLoading: () => {},
  setToken: () => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)