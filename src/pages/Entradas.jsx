import { useState } from 'react'
import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'


export default function Entradas(){
const { state } = useAuth()
const { comprarEntradas } = useData()
const [partidoId,setPartidoId] = useState(1)
const [cantidad,setCantidad] = useState(1)
return (
<Container>
<h1>Entradas</h1>
<div style={{display:'grid',gap:8,maxWidth:420}}>
<label>Partido
<select value={partidoId} onChange={e=>setPartidoId(Number(e.target.value))}>
{state.partidos.map(p=> (
<option key={p.id} value={p.id}>{p.rival} – {new Date(p.fechaHora).toLocaleString()} – stock {p.stockEntradas}</option>
))}
</select>
</label>
<label>Cantidad <input type="number" min="1" value={cantidad} onChange={e=>setCantidad(Number(e.target.value))} /></label>
<button onClick={()=>{
try{ comprarEntradas({ partidoId, cantidad }) }catch(e){ alert(e.message) }
}}>Comprar</button>
</div>
</Container>
)
}