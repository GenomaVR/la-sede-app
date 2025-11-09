import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import PageHeader from '../components/layout/PageHeader'


export default function MisActividades() {
  const { user, state } = useAuth()
  const misReservas = state.reservas.filter(r => r.userId === user.id)
  const misEntradas = state.entradas.filter(e => e.userId === user.id)
  const misClases = state.clases.filter(c => c.inscriptos.includes(user.id))

  const canchaNombre = (canchaId) => {
    const cancha = state.canchas.find(c => c.id === canchaId)
    return cancha ? cancha.nombre : `Cancha ${canchaId}`
  }

  const partidoNombre = (partidoId) => {
    const partido = state.partidos.find(p => p.id === partidoId)
    return partido ? partido.rival : `Partido #${partidoId}`
  }

  return (
    <Container>
      <PageHeader title="Mis Actividades" />
      
      <div className="space-y-6">
        {/* Reservas */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Reservas de Canchas</h2>
          {misReservas.length === 0 ? (
            <p className="text-neutral-400">No tienes reservas</p>
          ) : (
            <div className="space-y-3">
              {misReservas.map(r => (
                <div 
                  key={r.id}
                  className="p-3 bg-neutral-800 rounded-lg border border-neutral-700"
                >
                  <p className="text-white font-medium">
                    {canchaNombre(r.canchaId)}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    {r.fecha} • {r.horaInicio} - {r.horaFin}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Clases */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Clases Inscriptas</h2>
          {misClases.length === 0 ? (
            <p className="text-neutral-400">No estás inscripto en ninguna clase</p>
          ) : (
            <div className="space-y-3">
              {misClases.map(c => (
                <div 
                  key={c.id}
                  className="p-3 bg-neutral-800 rounded-lg border border-neutral-700"
                >
                  <p className="text-white font-medium">
                    {c.disciplina.toUpperCase()}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    {c.diaSemana} • {c.hora}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Entradas */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Entradas Compradas</h2>
          {misEntradas.length === 0 ? (
            <p className="text-neutral-400">No has comprado entradas</p>
          ) : (
            <div className="space-y-3">
              {misEntradas.map(e => (
                <div 
                  key={e.id}
                  className="p-3 bg-neutral-800 rounded-lg border border-neutral-700"
                >
                  <p className="text-white font-medium">
                    {partidoNombre(e.partidoId)}
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    Cantidad: {e.cantidad}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Container>
  )
}