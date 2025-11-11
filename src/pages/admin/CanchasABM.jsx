import { useAuth } from '../../context/AuthContext'
import Container from '../../components/Container'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import PageHeader from '../../components/layout/PageHeader'

export default function CanchasABM() {
  const { state } = useAuth()

  return (
    <Container>
      <PageHeader title="Gestión de Canchas" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.canchas.map(c => (
          <Card key={c.id}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{c.nombre}</h3>
              <Badge variant={c.estado === 'disponible' ? 'success' : 'warning'}>
                {c.estado}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  )
}