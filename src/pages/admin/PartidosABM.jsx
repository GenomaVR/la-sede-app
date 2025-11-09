import { useAuth } from '../../context/AuthContext'
import Container from '../../components/Container'
import Table from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import PageHeader from '../../components/layout/PageHeader'

export default function PartidosABM() {
  const { state } = useAuth()

  const headers = ['Rival', 'Fecha y Hora', 'Stock de Entradas']
  
  const rows = state.partidos.map(p => [
    <span className="font-medium">{p.rival}</span>,
    new Date(p.fechaHora).toLocaleString(),
    <Badge variant={p.stockEntradas > 0 ? 'success' : 'error'}>
      {p.stockEntradas}
    </Badge>
  ])

  return (
    <Container>
      <PageHeader title="Gestión de Partidos" />
      <Table headers={headers} rows={rows} />
    </Container>
  )
}