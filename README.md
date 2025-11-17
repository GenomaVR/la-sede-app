# LA SEDE APP

Aplicación web de gestión de cuotas y actividades para la sede de un club desarrollada con React, Vite y React Router. Permite a los socios gestionar sus cuotas, reservar canchas, inscribirse en clases, comprar entradas y administrar sus actividades, además de proporcionar un panel de administración completo.


![La Sede App](https://res.cloudinary.com/dsbjzd18p/image/upload/v1763340698/la-sede-app_s7qwmx.png)

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Arquitectura y Diseño](#arquitectura-y-diseño)
- [Contextos y Gestión de Estado](#contextos-y-gestión-de-estado)
- [Componentes](#componentes)
- [Páginas](#páginas)
- [Rutas y Navegación](#rutas-y-navegación)
- [Funcionalidades](#funcionalidades)
- [Servicios](#servicios)
- [Hooks de React Utilizados](#hooks-de-react-utilizados)

## Tecnologías Utilizadas

### Frontend

- **React 19.1.1**: Biblioteca principal para la construcción de la interfaz de usuario
- **React DOM 19.1.1**: Renderizado de componentes React en el DOM
- **React Router DOM 7.9.5**: Sistema de enrutamiento para aplicaciones de una sola página (SPA)
- **Vite 7.1.7**: Herramienta de construcción y desarrollo rápida
- **Tailwind CSS 4.1.16**: Framework de CSS utility-first para estilos
- **Lucide React 0.553.0**: Biblioteca de iconos para React

### Herramientas de Desarrollo

- **ESLint 9.36.0**: Linter para mantener la calidad del código
- **@vitejs/plugin-react-swc**: Plugin de Vite con soporte para SWC (compilador rápido)
- **TypeScript Types**: Tipos para React y React DOM

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio o navegar al directorio del proyecto:
```bash
cd la-sede-app
```

2. Instalar las dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. La aplicación estará disponible en `http://localhost:5173` (o el puerto que el bueno de Vite asigne)

### Scripts

- `npm run dev`: Inicia el servidor de desarrollo con hot-reload
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Arquitectura y Diseño

### Diseño

La aplicación sigue una arquitectura basada en componentes con separación de responsabilidades:

- **Componentes Presentacionales**: Componentes UI reutilizables en `src/components/ui/`
- **Componentes de Contenedor**: Páginas que manejan lógica de negocio en `src/pages/`
- **Contextos**: Gestión de estado global mediante React Context API
- **Servicios**: Funciones utilitarias para operaciones como almacenamiento

### Principios Aplicados

- **Single Responsibility**: Cada componente tiene una responsabilidad única
- **DRY (Don't Repeat Yourself)**: Componentes reutilizables para evitar duplicación
- **Composición sobre Herencia**: Uso de composición de componentes
- **Separación de Concerns**: Separación clara entre UI, lógica y datos

## Contextos y Gestión de Estado

### AuthContext

**Ubicación**: `src/context/AuthContext.jsx`

Gestiona el estado de autenticación y los datos globales de la aplicación.

**Estado**:
- `user`: Objeto con información del usuario autenticado (`id`, `nombre`, `rol`, `email`)
- `state`: Estado global de la aplicación (usuarios, canchas, reservas, clases, partidos, entradas)

**Funciones**:
- `login(email, password)`: Autentica un usuario y establece la sesión
- `logout()`: Cierra la sesión del usuario actual
- `setState()`: Actualiza el estado global de la aplicación

**Hook Personalizado**:
- `useAuth()`: Hook para acceder al contexto de autenticación

**Persistencia**:
- El estado se guarda automáticamente en `localStorage` mediante `useEffect`
- Se inicializa desde `localStorage` o desde datos seed si no existe

### DataContext

**Ubicación**: `src/context/DataContext.jsx`

Proporciona funciones de negocio para operaciones de datos.

**Funciones Disponibles**:

1. **pagarCuota({ mes, anio, medio })**
   - Registra el pago de una cuota mensual
   - Actualiza el estado de cuota del usuario autenticado
   - Parámetros: mes (número), anio (número), medio (string: 'debito', 'credito', 'efectivo', 'transferencia')

2. **reservarCancha({ canchaId, fecha, horaInicio, horaFin })**
   - Crea una reserva de cancha
   - Valida que no haya solapamiento de horarios
   - Lanza error si el horario no está disponible
   - Parámetros: canchaId (número), fecha (string formato YYYY-MM-DD), horaInicio y horaFin (string formato HH:MM)

3. **inscribirClase(claseId)**
   - Inscribe al usuario autenticado en una clase
   - Valida disponibilidad de cupo
   - Lanza error si el cupo está completo o el usuario ya está inscripto
   - Parámetros: claseId (número)

4. **comprarEntradas({ partidoId, cantidad })**
   - Compra entradas para un partido
   - Valida disponibilidad de stock
   - Actualiza el stock y registra la compra
   - Parámetros: partidoId (número), cantidad (número)

5. **admin**: Objeto con funciones de administración
   - `crearUsuario(payload)`: Crea un nuevo usuario
   - `toggleActivo(id)`: Activa/desactiva un usuario

**Hook Personalizado**:
- `useData()`: Hook para acceder a las funciones del contexto de datos

## Componentes

### Componentes UI Base

#### Button

**Ubicación**: `src/components/ui/Button.jsx`

Componente de botón reutilizable con múltiples variantes y tamaños.

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `type`: Tipo de botón HTML (default: 'button')
- `disabled`: Boolean para deshabilitar el botón
- `onClick`: Función manejadora de eventos
- `className`: Clases CSS adicionales
- `children`: Contenido del botón

**Ejemplo de uso**:
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Confirmar
</Button>
```

#### Input

**Ubicación**: `src/components/ui/Input.jsx`

Campo de entrada de texto con soporte para etiquetas y mensajes de error.

**Props**:
- `label`: Texto de la etiqueta (opcional)
- `error`: Mensaje de error a mostrar (opcional)
- `id`: ID único del input (se genera automáticamente si no se proporciona)
- `type`: Tipo de input HTML (default: 'text')
- `className`: Clases CSS adicionales
- Props estándar de input HTML (`value`, `onChange`, `placeholder`, etc.)

**Ejemplo de uso**:
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

#### Select

**Ubicación**: `src/components/ui/Select.jsx`

Selector desplegable con soporte para opciones y validación.

**Props**:
- `label`: Texto de la etiqueta (opcional)
- `error`: Mensaje de error a mostrar (opcional)
- `options`: Array de objetos `{ value, label }`
- `id`: ID único del select (se genera automáticamente si no se proporciona)
- `className`: Clases CSS adicionales
- Props estándar de select HTML (`value`, `onChange`, etc.)

**Ejemplo de uso**:
```jsx
<Select
  label="Medio de pago"
  value={medio}
  onChange={(e) => setMedio(e.target.value)}
  options={[
    { value: 'debito', label: 'Débito' },
    { value: 'credito', label: 'Crédito' }
  ]}
/>
```

#### Card

**Ubicación**: `src/components/ui/Card.jsx`

Contenedor de tarjeta con estilo consistente.

**Props**:
- `children`: Contenido de la tarjeta
- `padding`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: Clases CSS adicionales

**Ejemplo de uso**:
```jsx
<Card padding="lg">
  <h2>Título</h2>
  <p>Contenido</p>
</Card>
```

#### Badge

**Ubicación**: `src/components/ui/Badge.jsx`

Etiqueta/badge para mostrar estados o categorías.

**Props**:
- `variant`: 'default' | 'success' | 'error' | 'warning' | 'info' | 'active' | 'inactive' (default: 'default')
- `className`: Clases CSS adicionales
- `children`: Texto del badge

**Ejemplo de uso**:
```jsx
<Badge variant="success">Paga</Badge>
<Badge variant="warning">Pendiente</Badge>
```

#### Alert

**Ubicación**: `src/components/ui/Alert.jsx`

Componente de alerta para mostrar mensajes al usuario.

**Props**:
- `type`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `message`: Texto del mensaje
- `className`: Clases CSS adicionales

**Ejemplo de uso**:
```jsx
<Alert type="success" message="Operación exitosa" />
<Alert type="error" message="Error al procesar" />
```

#### LoadingSpinner

**Ubicación**: `src/components/ui/LoadingSpinner.jsx`

Indicador de carga animado.

**Props**:
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: Clases CSS adicionales

**Ejemplo de uso**:
```jsx
<LoadingSpinner size="sm" />
```

#### Table

**Ubicación**: `src/components/ui/Table.jsx`

Componente de tabla para mostrar datos estructurados.

**Props**:
- `headers`: Array de strings con los encabezados de las columnas
- `rows`: Array de arrays, donde cada array interno representa una fila
- `className`: Clases CSS adicionales

**Ejemplo de uso**:
```jsx
<Table
  headers={['Nombre', 'Email', 'Rol']}
  rows={[
    ['Juan Pérez', 'juan@email.com', 'user'],
    ['María García', 'maria@email.com', 'admin']
  ]}
/>
```

### Componentes de Layout

#### Container

**Ubicación**: `src/components/Container.jsx`

Contenedor con ancho máximo y padding consistente para centrar el contenido.

**Props**:
- `children`: Contenido a envolver

**Ejemplo de uso**:
```jsx
<Container>
  <h1>Título</h1>
  <p>Contenido</p>
</Container>
```

#### PageHeader

**Ubicación**: `src/components/layout/PageHeader.jsx`

Encabezado reutilizable para páginas con título y subtítulo opcional.

**Props**:
- `title`: Título principal (requerido)
- `subtitle`: Subtítulo opcional
- `children`: Contenido adicional (opcional)
- `className`: Clases CSS adicionales

**Ejemplo de uso**:
```jsx
<PageHeader title="Mi Perfil" subtitle="Gestiona tu información" />
```

#### Navbar

**Ubicación**: `src/components/Navbar.jsx`

Barra de navegación principal con soporte responsive y menú móvil.

**Características**:
- Navegación adaptativa para desktop y móvil
- Menú hamburguesa en dispositivos móviles
- Enlaces activos resaltados
- Botón de login/logout según estado de autenticación
- Enlace a panel admin solo visible para administradores
- Cierre automático del menú móvil al cambiar de tamaño de pantalla

**Enlaces de navegación**:
- Perfil
- Cuotas
- Canchas
- Clases
- Entradas
- Mis actividades
- Admin (solo para usuarios con rol 'admin')

### Componentes de Formularios

#### Form

**Ubicación**: `src/components/forms/Form.jsx`

Wrapper para formularios con estilo consistente.

**Props**:
- `onSubmit`: Función manejadora del evento submit
- `maxWidth`: Clase CSS para ancho máximo (default: 'max-w-md')
- `className`: Clases CSS adicionales
- `children`: Campos del formulario

**Ejemplo de uso**:
```jsx
<Form onSubmit={handleSubmit}>
  <Input label="Nombre" />
  <Button type="submit">Enviar</Button>
</Form>
```

### Componentes Específicos

#### NewsCard

**Ubicación**: `src/components/NewsCard.jsx`

Tarjeta para mostrar noticias del club.

**Props**:
- `title`: Título de la noticia
- `date`: Fecha de la noticia (opcional)
- `excerpt`: Resumen de la noticia (opcional)

**Ejemplo de uso**:
```jsx
<NewsCard
  title="Venta de entradas vs. Racing"
  date="15 nov 2025"
  excerpt="Socios con cuota al día tienen prioridad."
/>
```

## Páginas

### Páginas Públicas

#### Home

**Ubicación**: `src/pages/Home.jsx`

Página principal con hero section y noticias del club.

#### Login

**Ubicación**: `src/pages/Login.jsx`

Página de inicio de sesión con validación de formulario.

### Páginas Protegidas (Usuario Autenticado)

#### Perfil

**Ubicación**: `src/pages/Perfil.jsx`

Página de perfil del usuario que muestra información personal y estado de cuota.

#### Cuotas

**Ubicación**: `src/pages/Cuotas.jsx`

Página para registrar el pago de cuotas mensuales.

#### Canchas

**Ubicación**: `src/pages/Canchas.jsx`

Página para reservar canchas deportivas.

#### Clases

**Ubicación**: `src/pages/Clases.jsx`

Página para inscribirse en clases disponibles.

#### Entradas

**Ubicación**: `src/pages/Entradas.jsx`

Página para comprar entradas a partidos.

#### Mis Actividades

**Ubicación**: `src/pages/MisActividades.jsx`

Página que muestra todas las actividades del usuario autenticado.

### Páginas de Administración

#### AdminLayout

**Ubicación**: `src/pages/admin/AdminLayout.jsx`

Layout del panel de administración con navegación interna.


**Rutas hijas**:
- Dashboard (índice)
- Usuarios
- Canchas
- Clases
- Partidos

#### Dashboard

**Ubicación**: `src/pages/admin/Dashboard.jsx`

Panel principal del administrador con métricas clave.

#### Usuarios

**Ubicación**: `src/pages/admin/Usuarios.jsx`

Gestión de usuarios del sistema.

#### CanchasABM

**Ubicación**: `src/pages/admin/CanchasABM.jsx`

Visualización y gestión de canchas.

#### ClasesABM

**Ubicación**: `src/pages/admin/ClasesABM.jsx`

Gestión de clases disponibles.

#### PartidosABM

**Ubicación**: `src/pages/admin/PartidosABM.jsx`

Gestión de partidos y venta de entradas.

## Rutas y Navegación

### Configuración de Rutas

**Ubicación**: `src/App.jsx`

La aplicación utiliza React Router DOM para el enrutamiento.

### Rutas Públicas

- `/`: Página principal (Home)
- `/login`: Página de inicio de sesión

### Rutas Protegidas (Usuario Autenticado)

Todas estas rutas requieren autenticación y están protegidas por el componente `ProtectedRoute`:

- `/perfil`: Perfil del usuario
- `/cuotas`: Pago de cuotas
- `/canchas`: Reserva de canchas
- `/clases`: Inscripción a clases
- `/entradas`: Compra de entradas
- `/mis-actividades`: Actividades del usuario

### Rutas de Administración

Rutas anidadas bajo `/admin` que requieren rol de administrador:

- `/admin`: Dashboard principal (índice)
- `/admin/usuarios`: Gestión de usuarios
- `/admin/canchas`: Gestión de canchas
- `/admin/clases`: Gestión de clases
- `/admin/partidos`: Gestión de partidos

### ProtectedRoute

**Ubicación**: `src/routes/ProtectedRoute.jsx`

Componente que protege rutas basándose en autenticación y roles.

**Funcionalidad**:
- Verifica si el usuario está autenticado
- Si no está autenticado, redirige a `/login`
- Si está autenticado pero no tiene el rol requerido, redirige a `/`
- Si cumple los requisitos, renderiza las rutas hijas con `<Outlet />`

**Props**:
- `roles`: Array de roles permitidos (ej: `["user", "admin"]` o `["admin"]`)

**Ejemplo de uso**:
```jsx
<Route element={<ProtectedRoute roles={["admin"]} />}>
  <Route path="/admin" element={<AdminLayout />} />
</Route>
```

## Funcionalidades

### Autenticación

- **Login**: Autenticación mediante email y contraseña
- **Logout**: Cierre de sesión del usuario
- **Persistencia de sesión**: El estado de autenticación se mantiene mediante localStorage
- **Validación de credenciales**: Verificación de usuario activo y credenciales correctas

### Gestión de Cuotas

- Registro de pago de cuotas mensuales
- Selección de medio de pago
- Actualización del estado de cuota del usuario
- Visualización del estado de cuota en el perfil

### Reserva de Canchas

- Selección de cancha disponible
- Selección de fecha y horario
- Validación de disponibilidad (evita solapamientos)
- Visualización de reservas del día
- Gestión de reservas por usuario

### Inscripción a Clases

- Visualización de clases disponibles
- Información de cupos disponibles
- Inscripción en clases
- Validación de cupo disponible
- Prevención de inscripciones duplicadas

### Compra de Entradas

- Visualización de partidos disponibles
- Información de stock de entradas
- Compra de múltiples entradas
- Validación de stock disponible
- Actualización automática del stock

### Panel de Administración

- Dashboard con métricas clave
- Gestión de usuarios (activar/desactivar)
- Visualización de canchas
- Gestión de clases
- Gestión de partidos

### Gestión de Actividades

- Visualización consolidada de todas las actividades del usuario
- Reservas de canchas realizadas
- Clases en las que está inscripto
- Entradas compradas

## Servicios

### Storage Service

**Ubicación**: `src/services/storage.js`

Servicio para manejar el almacenamiento local (localStorage).

**Funciones**:

- `readState()`: Lee el estado guardado desde localStorage
  - Retorna el objeto parseado o `null` si no existe
  - Clave utilizada: `'aj-club'`

- `writeState(state)`: Guarda el estado en localStorage
  - Recibe el objeto de estado completo
  - Lo serializa a JSON y lo guarda

- `resetState()`: Elimina el estado guardado
  - Útil para resetear la aplicación

**Uso**:
El servicio se utiliza automáticamente en `AuthContext` para persistir el estado de la aplicación.

## Hooks de React Utilizados

### Hooks Estándar

#### useState

Utilizado en múltiples componentes para manejar estado local:

- **Login**: Estado de email, password, errores, loading
- **Cuotas**: Estado de mes, año, medio de pago, mensajes
- **Canchas**: Estado de cancha seleccionada, fecha, horarios, mensajes
- **Clases**: Estado de mensajes de confirmación/error
- **Entradas**: Estado de partido seleccionado, cantidad, mensajes
- **Navbar**: Estado de menú móvil abierto/cerrado, detección de tamaño de pantalla

**Ejemplo**:
```jsx
const [email, setEmail] = useState('')
const [isLoading, setIsLoading] = useState(false)
```

#### useEffect

Utilizado para efectos secundarios:

- **AuthContext**: Persistencia automática del estado en localStorage cuando cambia
- **Navbar**: Detección de cambios en el tamaño de la ventana para menú responsive

**Ejemplo**:
```jsx
useEffect(() => {
  writeState(state)
}, [state])
```

#### useContext

Utilizado para acceder a los contextos:

- `useAuth()`: Acceso al contexto de autenticación
- `useData()`: Acceso al contexto de datos

**Ejemplo**:
```jsx
const { user, login, logout, state } = useAuth()
const { pagarCuota, reservarCancha } = useData()
```

### Hooks de React Router

#### useNavigate

Utilizado para navegación programática:

- **Login**: Redirección a `/perfil` después del login exitoso

**Ejemplo**:
```jsx
const navigate = useNavigate()
navigate('/perfil')
```

#### NavLink y Link

Utilizados para navegación declarativa:

- **Navbar**: Enlaces de navegación con estado activo
- **Home**: Link al login
- **AdminLayout**: Navegación interna del panel admin

**Ejemplo**:
```jsx
<NavLink to="/perfil" className={({isActive}) => isActive ? 'active' : ''}>
  Perfil
</NavLink>
```

### Hooks Personalizados

#### useAuth

**Ubicación**: `src/context/AuthContext.jsx`

Hook personalizado para acceder al contexto de autenticación.

**Retorna**:
- `user`: Usuario autenticado o `null`
- `login(email, password)`: Función para iniciar sesión
- `logout()`: Función para cerrar sesión
- `state`: Estado global de la aplicación
- `setState`: Función para actualizar el estado global

**Ejemplo de uso**:
```jsx
const { user, login, logout, state } = useAuth()
```

#### useData

**Ubicación**: `src/context/DataContext.jsx`

Hook personalizado para acceder a funciones de negocio.

**Retorna**:
- `state`: Estado global de la aplicación
- `setState`: Función para actualizar el estado
- `pagarCuota`: Función para pagar cuotas
- `reservarCancha`: Función para reservar canchas
- `inscribirClase`: Función para inscribirse en clases
- `comprarEntradas`: Función para comprar entradas
- `admin`: Objeto con funciones de administración

**Ejemplo de uso**:
```jsx
const { pagarCuota, reservarCancha, inscribirClase, comprarEntradas } = useData()
```

## Estilos y Diseño

### Tailwind CSS

La aplicación utiliza Tailwind CSS 4.1.16 para todos los estilos. El diseño sigue un esquema de colores oscuro con:

- **Colores principales**: Neutral (grises oscuros) y Red (rojo para acentos)
- **Tema**: Modo oscuro por defecto
- **Responsive**: Diseño mobile-first con breakpoints de Tailwind

### Estructura de Estilos

- `index.css`: Estilos base y configuración de Tailwind
- `App.css`: Estilos específicos de la aplicación
- Clases utilitarias de Tailwind en los componentes

### Iconos

Se utiliza **Lucide React** para los iconos. Los iconos se importan individualmente para optimizar el bundle.

**Ejemplo**:
```jsx
import { Mail, Lock, LogIn } from 'lucide-react'
```

## Datos Iniciales (Seed)

**Ubicación**: `src/data/seed.js`

El archivo `seed.js` contiene los datos iniciales de la aplicación:

- **Usuarios**: Usuario admin y usuario socio de ejemplo
- **Canchas**: Canchas disponibles para reserva
- **Clases**: Clases disponibles para inscripción
- **Partidos**: Partidos con entradas disponibles
- **Reservas**: Array vacío inicial
- **Entradas**: Array vacío inicial

**Credenciales de ejemplo**:
- Admin: `admin@aj.com` / `admin`
- Socio: `socio@aj.com` / `socio`

## Consideraciones de Desarrollo

### Estado de la Aplicación

- El estado se persiste en `localStorage` automáticamente
- Los datos se inicializan desde `localStorage` o desde `seed.js` si no existen
- Cada cambio en el estado se guarda automáticamente

### Validaciones

- Las validaciones del lado del cliente están implementadas en los formularios
- Las validaciones de negocio (cupos, disponibilidad) están en las funciones del contexto
- Se deben agregar validaciones del backend cuando se integre con una API

### Manejo de Errores

- Los errores se manejan mediante try-catch en las funciones de negocio
- Los mensajes de error se muestran mediante el componente `Alert`
- Los errores se propagan y se muestran al usuario

### Accesibilidad

- Uso de etiquetas semánticas HTML
- Atributos `aria-label` y `aria-expanded` en el menú móvil
- Estructura de formularios accesible con labels asociados


### Próximos pasos
- Para la siguiente entrega, se debe agregar el backend y la integración con la API como se conversó en clase. De momento, solo frontend.
- Hay "credenciales" creadas para esta parte de testing y de desarrollo. Deben ser reemplazadas por las credenciales reales cuando se integre el backend y eliminar las menciones en el login.

---
