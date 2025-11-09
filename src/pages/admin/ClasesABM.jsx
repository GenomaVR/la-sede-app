import { useAuth } from '../../context/AuthContext'
import Container from '../../components/Container'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import PageHeader from '../../components/layout/PageHeader'

export default function ClasesABM() {
  const { state } = useAuth()

  return (
    <Container>
      <PageHeader title="Gestión de Clases" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.clases.map(c => {
          const cupoDisponible = c.cupo - c.inscriptos.length
          
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{c.disciplina}</h3>
                <Badge variant={cupoDisponible === 0 ? 'error' : 'success'}>
                  {c.inscriptos.length}/{c.cupo}
                </Badge>
              </div>
              <p className="text-sm text-neutral-400">
                {c.diaSemana} • {c.hora}
              </p>
            </Card>
          )
        })}
      </div>
    </Container>
  )
}