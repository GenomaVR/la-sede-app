import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'


export default function Perfil(){
const { user, state } = useAuth()
const socio = state.usuarios.find(u=>u.id===user.id)
return (
<Container>
<h1>Mi perfil</h1>
<p><b>Nombre:</b> {socio.nombre} {socio.apellido}</p>
<p><b>Email:</b> {socio.email}</p>
<p><b>Cuota:</b> {socio.cuota?.estado === 'paga' ? 'Paga' : 'Pendiente'} ({socio.cuota?.mes}/{socio.cuota?.anio})</p>
</Container>
)
}