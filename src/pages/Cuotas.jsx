import { useState } from 'react'
import Container from '../components/Container'
import { useData } from '../context/DataContext'


export default function Cuotas(){
const { pagarCuota } = useData()
const now = new Date()
const [mes,setMes] = useState(now.getMonth()+1)
const [anio,setAnio] = useState(now.getFullYear())
const [medio,setMedio] = useState('debito')
const [ok,setOk] = useState('')
const [err,setErr] = useState('')


const onSubmit = e => {
e.preventDefault()
setErr(''); setOk('')
try{ pagarCuota({ mes:Number(mes), anio:Number(anio), medio }); setOk('Cuota registrada ✅') }
catch(ex){ setErr(ex.message) }
}


return (
<Container>
<h1>Pagar cuota</h1>
<form onSubmit={onSubmit} style={{display:'grid',gap:8,maxWidth:420}}>
<label>Mes <input type="number" min="1" max="12" value={mes} onChange={e=>setMes(e.target.value)} /></label>
<label>Año <input type="number" value={anio} onChange={e=>setAnio(e.target.value)} /></label>
<label>Medio
<select value={medio} onChange={e=>setMedio(e.target.value)}>
<option value="debito">Débito</option>
<option value="credito">Crédito</option>
<option value="efectivo">Efectivo</option>
<option value="transferencia">Transferencia</option>
</select>
</label>
<button>Confirmar pago</button>
{ok && <p style={{color:'green'}}>{ok}</p>}
{err && <p style={{color:'crimson'}}>{err}</p>}
</form>
</Container>
)
}