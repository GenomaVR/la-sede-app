import { useState } from 'react'
import Container from '../components/Container'
import { useData } from '../context/DataContext'
import Form from '../components/forms/Form'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'

export default function Cuotas() {
  const { pagarCuota } = useData()
  const now = new Date()
  const [mes, setMes] = useState(now.getMonth() + 1)
  const [anio, setAnio] = useState(now.getFullYear())
  const [medio, setMedio] = useState('debito')
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    setErr('')
    setOk('')
    try {
      pagarCuota({ mes: Number(mes), anio: Number(anio), medio })
      setOk('Cuota registrada ✅')
    } catch (ex) {
      setErr(ex.message)
    }
  }

  const medioOptions = [
    { value: 'debito', label: 'Débito' },
    { value: 'credito', label: 'Crédito' },
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' }
  ]

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Pagar cuota</h1>
      <Form onSubmit={onSubmit}>
        <Input
          label="Mes"
          type="number"
          min="1"
          max="12"
          value={mes}
          onChange={e => setMes(e.target.value)}
        />
        <Input
          label="Año"
          type="number"
          value={anio}
          onChange={e => setAnio(e.target.value)}
        />
        <Select
          label="Medio de pago"
          value={medio}
          onChange={e => setMedio(e.target.value)}
          options={medioOptions}
        />
        <Button type="submit">Confirmar pago</Button>
        {ok && <Alert type="success" message={ok} />}
        {err && <Alert type="error" message={err} />}
      </Form>
    </Container>
  )
}