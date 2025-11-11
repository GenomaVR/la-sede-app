import { useState } from 'react'
import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/layout/PageHeader'

export default function Clases() {
  const { state } = useAuth()
  const { inscribirClase } = useData()
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const handleInscribir = (claseId) => {
    try {
      inscribirClase(claseId)
      setMsg('Inscripción exitosa ✅')
      setMsgType('success')
      setTimeout(() => setMsg(''), 3000)
    } catch (e) {
      setMsg(e.message)
      setMsgType('error')
      setTimeout(() => setMsg(''), 3000)
    }
  }

  return (
    <Container>
      <PageHeader title="Clases Disponibles" />
      
      {msg && (
        <div className="mb-4">
          <Alert type={msgType} message={msg} />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.clases.map(c => {
          const cupoDisponible = c.cupo - c.inscriptos.length
          const isCompleto = cupoDisponible === 0
          
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {c.disciplina.toUpperCase()}
                </h3>
                <Badge variant={isCompleto ? 'error' : 'success'}>
                  {cupoDisponible} cupos
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-neutral-300">
                  <span className="font-medium">Día:</span> {c.diaSemana}
                </p>
                <p className="text-sm text-neutral-300">
                  <span className="font-medium">Hora:</span> {c.hora}
                </p>
                <p className="text-sm text-neutral-300">
                  <span className="font-medium">Cupo:</span> {c.inscriptos.length}/{c.cupo}
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                disabled={isCompleto}
                onClick={() => handleInscribir(c.id)}
                className="w-full"
              >
                {isCompleto ? 'Cupo completo' : 'Inscribirme'}
              </Button>
            </Card>
          )
        })}
      </div>
    </Container>
  )
}