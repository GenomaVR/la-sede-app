import { useState } from 'react'
import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import Form from '../components/forms/Form'
import Select from '../components/ui/Select'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import PageHeader from '../components/layout/PageHeader'

export default function Entradas() {
  const { state } = useAuth()
  const { comprarEntradas } = useData()
  const [partidoId, setPartidoId] = useState(state.partidos[0]?.id || 1)
  const [cantidad, setCantidad] = useState(1)
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('success')

  const partidoOptions = state.partidos.map(p => ({
    value: p.id,
    label: `${p.rival} – ${new Date(p.fechaHora).toLocaleString()} – Stock: ${p.stockEntradas}`
  }))

  const partidoSeleccionado = state.partidos.find(p => p.id === Number(partidoId))

  const handleComprar = () => {
    try {
      comprarEntradas({ partidoId: Number(partidoId), cantidad })
      setMsg(`Compra exitosa: ${cantidad} entrada(s) ✅`)
      setMsgType('success')
      setCantidad(1)
      setTimeout(() => setMsg(''), 3000)
    } catch (e) {
      setMsg(e.message)
      setMsgType('error')
      setTimeout(() => setMsg(''), 3000)
    }
  }

  return (
    <Container>
      <PageHeader title="Comprar Entradas" />
      
      <div className="max-w-md">
        <Form onSubmit={(e) => { e.preventDefault(); handleComprar() }}>
          <Select
            label="Partido"
            value={partidoId}
            onChange={e => setPartidoId(e.target.value)}
            options={partidoOptions}
          />
          
          {partidoSeleccionado && (
            <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
              <p className="text-sm text-neutral-300">
                <span className="font-medium">Stock disponible:</span> {partidoSeleccionado.stockEntradas}
              </p>
            </div>
          )}

          <Input
            label="Cantidad"
            type="number"
            min="1"
            max={partidoSeleccionado?.stockEntradas || 1}
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
          />

          <Button 
            type="submit"
            disabled={!partidoSeleccionado || partidoSeleccionado.stockEntradas === 0}
          >
            Comprar
          </Button>

          {msg && <Alert type={msgType} message={msg} />}
        </Form>
      </div>
    </Container>
  )
}