import { useAuth } from '../../context/AuthContext'


export default function ClasesABM(){
const { state } = useAuth()
return (
<div>
<h2>Clases</h2>
<ul>
{state.clases.map(c=> <li key={c.id}>{c.disciplina} – {c.diaSemana} {c.hora} – Cupo {c.inscriptos.length}/{c.cupo}</li>)}
</ul>
</div>
)
}