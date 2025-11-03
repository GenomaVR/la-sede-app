import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'


export default function Clases(){
const { state } = useAuth()
const { inscribirClase } = useData()


return (
<Container>
<h1>Clases</h1>
<ul>
{state.clases.map(c => (
<li key={c.id} style={{marginBottom:8}}>
<b>{c.disciplina.toUpperCase()}</b> – {c.diaSemana} {c.hora} — Cupo: {c.inscriptos.length}/{c.cupo}
<button style={{marginLeft:8}} onClick={()=>{
try{ inscribirClase(c.id) }catch(e){ alert(e.message) }
}}>Inscribirme</button>
</li>
))}
</ul>
</Container>
)
}