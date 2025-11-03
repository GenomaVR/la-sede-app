import { useAuth } from '../../context/AuthContext'


export default function CanchasABM(){
const { state } = useAuth()
return (
<div>
<h2>Canchas</h2>
<ul>
{state.canchas.map(c=> <li key={c.id}>{c.nombre} – {c.estado}</li>)}
</ul>
</div>
)
}