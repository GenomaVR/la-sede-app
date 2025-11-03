import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'


export default function Login(){
const { login } = useAuth()
const nav = useNavigate()
const [email,setEmail] = useState('socio@aj.com')
const [password,setPassword] = useState('socio')
const [error,setError] = useState(null)


const onSubmit = e => {
e.preventDefault()
try{
login(email,password)
nav('/perfil')
}catch(err){ setError(err.message) }
}


return (
<Container>
<h1>Login</h1>
<form onSubmit={onSubmit} style={{display:'grid',gap:8,maxWidth:360}}>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
{error && <p style={{color:'crimson'}}>{error}</p>}
<button>Ingresar</button>
<small>Admin: admin@aj.com / admin</small>
</form>
</Container>
)
}