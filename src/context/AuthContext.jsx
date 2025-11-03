import { createContext, useContext, useEffect, useState } from 'react'
import { readState, writeState } from '../services/storage'
import { seed } from '../data/seed'


const AuthContext = createContext()


export function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [state, setState] = useState(() => readState() || seed)


useEffect(() => { writeState(state) }, [state])


const login = (email, password) => {
const u = state.usuarios.find(u => u.email === email && u.password === password && u.activo)
if (!u) throw new Error('Credenciales inválidas o usuario inactivo')
setUser({ id: u.id, nombre: u.nombre, rol: u.rol, email: u.email })
}


const logout = () => setUser(null)


const value = { user, login, logout, state, setState }
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext)