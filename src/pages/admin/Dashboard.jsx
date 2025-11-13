import { useAuth } from '../../context/AuthContext'
import Container from '../../components/Container'
import Card from '../../components/ui/Card'

export default function Dashboard() {
  const { state } = useAuth()
  const ingresosCuotas = state.usuarios.filter(u => u.cuota?.estado === 'paga').length * 10000
  const entradasVendidas = state.entradas.reduce((acc, e) => acc + e.cantidad, 0)
  const totalUsuarios = state.usuarios.length
  const usuariosActivos = state.usuarios.filter(
  u => u.cuota?.estado === 'paga'
  ).length

  return (
    <Container>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <h3 className="text-sm font-medium text-neutral-400 mb-2">Ingresos por cuotas</h3>
          <p className="text-2xl font-bold text-white">${ingresosCuotas.toLocaleString()}</p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-neutral-400 mb-2">Entradas vendidas</h3>
          <p className="text-2xl font-bold text-white">{entradasVendidas}</p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-neutral-400 mb-2">Total usuarios</h3>
          <p className="text-2xl font-bold text-white">{totalUsuarios}</p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-neutral-400 mb-2">Usuarios activos</h3>
          <p className="text-2xl font-bold text-white">{usuariosActivos}</p>
        </Card>
      </div>
    </Container>
  )
}