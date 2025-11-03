import { useAuth } from '../../context/AuthContext'


export default function PartidosABM(){
const { state } = useAuth()
return (
<div>
<h2>Partidos</h2>
<ul>
{state.partidos.map(p=> <li key={p.id}>{p.rival} – {new Date(p.fechaHora).toLocaleString()} – Stock {p.stockEntradas}</li>)}
</ul>
</div>
)
}