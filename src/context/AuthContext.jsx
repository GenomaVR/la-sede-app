import { createContext, useContext, useEffect, useState } from 'react'
import { readState, writeState } from '../services/storage'
import { seed } from '../data/seed'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

const deepClone = (obj) =>
  typeof structuredClone === 'function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj))

// Sanitiza storage y asegura 'pagos: []'
function sanitizeLoadedState(loaded) {
  const base = loaded && Array.isArray(loaded.usuarios) ? loaded : deepClone(seed)

  // aseguro 'pagos'
  const pagos = Array.isArray(base.pagos) ? base.pagos : []

  const seedById = Object.fromEntries(seed.usuarios.map(u => [u.id, u]))
  let changed = false

  const usuarios = base.usuarios.map(u => {
    const dni = String(u.dni ?? '').replace(/\D+/g, '').slice(0, 8)
    if (dni.length < 2) {              // ej: "1"
      changed = true
      return { ...u, dni: String(seedById[u.id]?.dni ?? '') }
    }
    return { ...u, dni }
  })

  return { ...base, usuarios, pagos }
}

export function AuthProvider({ children }) {
  // 1) State global
  const [state, setState] = useState(() => {
    const saved = readState()
    return sanitizeLoadedState(saved ?? deepClone(seed))
  })

  // 2) Usuario actual
  const [user, setUser] = useState(() => {
    const saved = readState()
    return saved?.user ?? null
  })

  // 3) Persistencia conjunta
  useEffect(() => {
    writeState({ ...state, user })
  }, [state, user])

  // 4) Auth API
  const login = (email, password) => {
  const u = state.usuarios.find(
    x => x.email === email && x.password === password && x.activo
  )
  if (!u) throw new Error('Credenciales inválidas o usuario inactivo')
  
  setUser({ id: u.id, nombre: u.nombre, rol: u.rol, email: u.email })
  window.location.reload()
  }

  const logout = () => {
  setUser(null)
  window.location.reload()
  }

  const value = { user, login, logout, state, setState }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
