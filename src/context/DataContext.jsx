import { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'

const DataContext = createContext()

export function DataProvider({ children }) {
  const { state, setState, user } = useAuth()

  // Helpers de negocio (reservas, cuotas, clases, entradas)
  const pagarCuota = ({ mes, anio, medio }) => {
    if (!user) throw new Error('No autenticado')
    setState(prev => ({
      ...prev,
      usuarios: prev.usuarios.map(u =>
        u.id === user.id
          ? {
              ...u,
              cuota: { mes, anio, estado: 'paga', medio }
            }
          : u
      )
    }))
  }

  const reservarCancha = ({ canchaId, fecha, horaInicio, horaFin }) => {
    if (!user) throw new Error('No autenticado')

    // No solapar: misma cancha + fecha + rango horario
    const solapa = state.reservas.some(r =>
      r.canchaId === canchaId &&
      r.fecha === fecha &&
      !(horaFin <= r.horaInicio || horaInicio >= r.horaFin)
    )

    if (solapa) throw new Error('Horario no disponible')

    const nueva = {
      id: Date.now(),
      canchaId,
      userId: user.id,
      fecha,
      horaInicio,
      horaFin
    }

    setState(prev => ({ ...prev, reservas: [...prev.reservas, nueva] }))
  }

  const inscribirClase = (claseId) => {
    if (!user) throw new Error('No autenticado')

    setState(prev => ({
      ...prev,
      clases: prev.clases.map(c => {
        if (c.id !== claseId) return c
        if (c.inscriptos.includes(user.id)) return c
        if (c.inscriptos.length >= c.cupo) {
          throw new Error('Cupo completo')
        }
        return { ...c, inscriptos: [...c.inscriptos, user.id] }
      })
    }))
  }

  // 👇 NUEVO: darse de baja de una clase
  const bajaClase = (claseId) => {
    if (!user) throw new Error('No autenticado')

    const clase = state.clases.find(c => c.id === claseId)
    if (!clase) throw new Error('La clase no existe')

    if (!clase.inscriptos.includes(user.id)) {
      throw new Error('No estás inscripto en esta clase')
    }

    setState(prev => ({
      ...prev,
      clases: prev.clases.map(c =>
        c.id === claseId
          ? {
              ...c,
              inscriptos: c.inscriptos.filter(uid => uid !== user.id)
            }
          : c
      )
    }))
  }

  const comprarEntradas = ({ partidoId, cantidad }) => {
    if (!user) throw new Error('No autenticado')

    const partido = state.partidos.find(p => p.id === partidoId)
    if (!partido || partido.stockEntradas < cantidad) {
      throw new Error('Stock insuficiente')
    }

    setState(prev => ({
      ...prev,
      partidos: prev.partidos.map(p =>
        p.id === partidoId
          ? { ...p, stockEntradas: p.stockEntradas - cantidad }
          : p
      ),
      entradas: [
        ...prev.entradas,
        { id: Date.now(), partidoId, userId: user.id, cantidad }
      ]
    }))
  }

  // Admin – ABM mínimos
  const admin = {
    crearUsuario: (payload) =>
      setState(prev => ({
        ...prev,
        usuarios: [...prev.usuarios, { id: Date.now(), ...payload }]
      })),

    toggleActivo: (id) =>
      setState(prev => ({
        ...prev,
        usuarios: prev.usuarios.map(u =>
          u.id === id ? { ...u, activo: !u.activo } : u
        )
      })),

    crearClase: (payload) =>
      setState(prev => ({
        ...prev,
        clases: [...prev.clases, { id: Date.now(), inscriptos: [], ...payload }]
      })),

    toggleEstadoCancha: (id) =>
      setState(prev => ({
        ...prev,
        canchas: prev.canchas.map(c =>
          c.id === id
            ? {
                ...c,
                estado:
                  c.estado === 'disponible'
                    ? 'no disponible'
                    : 'disponible'
              }
            : c
        )
      }))
  }

  const value = {
    state,
    setState,
    pagarCuota,
    reservarCancha,
    inscribirClase,
    bajaClase,          // 👈 ahora sí la exponemos
    comprarEntradas,
    admin
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
