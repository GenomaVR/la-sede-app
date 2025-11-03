import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'


export default function MisActividades(){
const { user, state } = useAuth()
const misReservas = state.reservas.filter(r=>r.userId===user.id)
const misEntradas = state.entradas.filter(e=>e.userId===user.id)
const misClases = state.clases.filter(c=>c.inscriptos.includes(user.id))
return (
<Container>
<h1>Mis actividades</h1>
<h3>Reservas</h3>
<ul>{misReservas.map(r=> <li key={r.id}>Cancha {r.canchaId} – {r.fecha} {r.horaInicio}-{r.horaFin}</li>)}</ul>
<h3>Clases</h3>
<ul>{misClases.map(c=> <li key={c.id}>{c.disciplina} – {c.diaSemana} {c.hora}</li>)}</ul>
<h3>Entradas</h3>
<ul>{misEntradas.map(e=> <li key={e.id}>Partido #{e.partidoId} – x{e.cantidad}</li>)}</ul>
</Container>
)
}