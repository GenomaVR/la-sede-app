import { useState } from 'react'
import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import Form from '../components/forms/Form'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import Card from '../components/ui/Card'
import PageHeader from '../components/layout/PageHeader'

export default function Canchas() {
  const { state } = useAuth()
  const { reservarCancha } = useData()
  const [canchaId, setCanchaId] = useState(1)
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10))
  const [horaInicio, setHoraInicio] = useState('18:00')
  const [horaFin, setHoraFin] = useState('19:00')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const reservar = e => {
    e.preventDefault()
    setMsg('')
    try {
      reservarCancha({ 
        canchaId: Number(canchaId), 
        fecha, 
        horaInicio, 
        horaFin 
      })
      setMsg('Reserva confirmada ✅')
      setMsgType('success')
    } catch (ex) {
      setMsg(ex.message)
      setMsgType('error')
    }
  }

  const canchaOptions = state.canchas.map(c => ({
    value: c.id,
    label: `${c.nombre} - ${c.estado}`
  }))

  // Reservas del día para la cancha seleccionada
  const reservasDelDia = state.reservas.filter(
    r => r.canchaId === Number(canchaId) && r.fecha === fecha
  )

  return (
    <Container>
      <PageHeader title="Reservar Cancha" />
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulario de reserva */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Nueva Reserva</h2>
          <Form onSubmit={reservar}>
            <Select
              label="Cancha"
              value={canchaId}
              onChange={e => setCanchaId(e.target.value)}
              options={canchaOptions}
            />
            <Input
              label="Fecha"
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
            />
            <Input
              label="Hora inicio"
              type="time"
              value={horaInicio}
              onChange={e => setHoraInicio(e.target.value)}
            />
            <Input
              label="Hora fin"
              type="time"
              value={horaFin}
              onChange={e => setHoraFin(e.target.value)}
            />
            <Button type="submit">Reservar</Button>
            {msg && <Alert type={msgType} message={msg} />}
          </Form>
        </Card>

        {/* Reservas del día */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Reservas del día ({fecha})
          </h2>
          {reservasDelDia.length === 0 ? (
            <p className="text-neutral-400">No hay reservas para este día</p>
          ) : (
            <div className="space-y-2">
              {reservasDelDia.map(r => (
                <div 
                  key={r.id}
                  className="p-3 bg-neutral-800 rounded-lg border border-neutral-700"
                >
                  <p className="text-sm text-neutral-300">
                    <span className="font-medium">{r.horaInicio} - {r.horaFin}</span>
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