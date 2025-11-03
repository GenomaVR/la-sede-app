import { Outlet, NavLink } from 'react-router-dom'
import Container from '../../components/Container'


export default function AdminLayout(){
return (
<Container>
<h1>Admin</h1>
<nav style={{display:'flex',gap:8,marginBottom:12}}>
<NavLink to="." end>Dashboard</NavLink>
<NavLink to="usuarios">Usuarios</NavLink>
<NavLink to="canchas">Canchas</NavLink>
<NavLink to="clases">Clases</NavLink>
<NavLink to="partidos">Partidos</NavLink>
</nav>
<Outlet />
</Container>
)
}