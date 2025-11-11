import { useMemo, useState } from "react";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { user, state, setState } = useAuth();
  const socio = useMemo(
    () => state.usuarios.find((u) => u.id === user.id),
    [state.usuarios, user.id]
  );

  // Drafts de edición
  const [nombreDraft, setNombreDraft] = useState(socio?.nombre || "");
  const [apellidoDraft, setApellidoDraft] = useState(socio?.apellido || "");
  const [dniDraft, setDniDraft] = useState(socio?.dni || "");
  const [msg, setMsg] = useState("");

  const guardarDatos = () => {
    setState((prev) => ({
      ...prev,
      usuarios: prev.usuarios.map((u) =>
        u.id === user.id
          ? {
              ...u,
              nombre: nombreDraft,
              apellido: apellidoDraft,
              dni: dniDraft,
            }
          : u
      ),
    }));
    setMsg("Datos guardados ✅");
    setTimeout(() => setMsg(""), 2000);
  };

  // Subir foto de perfil
  const onFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setState((prev) => ({
        ...prev,
        usuarios: prev.usuarios.map((u) =>
          u.id === user.id ? { ...u, foto: dataUrl } : u
        ),
      }));
    };
    reader.readAsDataURL(file);
  };

  const tieneReserva = state.reservas?.some((r) => r.userId === user.id);
  const tieneClase = state.clases?.some(
    (c) => Array.isArray(c.inscriptos) && c.inscriptos.includes(user.id)
  );
  const tieneEntrada = state.entradas?.some((e) => e.userId === user.id);

  const cuota = socio?.cuota;
  const cuotaTexto = cuota?.estado === "paga" ? "PAGA" : "PENDIENTE";
  const cuotaColor =
    cuota?.estado === "paga" ? "text-emerald-400" : "text-amber-400";
  const periodo = cuota
    ? `${String(cuota.mes).padStart(2, "0")}/${cuota.anio}`
    : "-";

  const fondoSrc = "/images/bg-aj.jpg";

  return (
    <div className="relative min-h-[100svh] pt-14 overflow-hidden">
      {/* Fondo tipo Home */}
      <img
        src={fondoSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      {/* Contenido */}
      <div className="relative">
        <Container className="py-8">
          {/* ALERTA NEÓN */}
          {msg && (
            <div
              className="mb-6 neon-alert bg-neutral-900/80 border border-neutral-800
                    backdrop-blur-md text-center text-red-300 py-3 px-4 
                    rounded-xl font-semibold animate-fade-in"
            >
              {msg}
            </div>
          )}
          {/* Fila 1: Perfil (izq) + Cuota (der) */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Tarjeta Perfil */}
            <section className="neon-card bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800">
                  {socio?.foto ? (
                    <img
                      src={socio.foto}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
                      Sin foto
                    </div>
                  )}
                </div>

                <label className="mt-3 inline-block cursor-pointer text-xs text-neutral-300 hover:text-white">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFotoChange}
                  />
                  Cambiar foto
                </label>

                {/* Nombre y Apellido */}
                <div className="mt-5 w-full">
                  <label className="block text-xs text-neutral-400 mb-1 text-left">
                    Nombre
                  </label>
                  <input
                    className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={nombreDraft}
                    onChange={(e) => setNombreDraft(e.target.value)}
                    placeholder="Nombre"
                  />
                </div>

                <div className="mt-3 w-full">
                  <label className="block text-xs text-neutral-400 mb-1 text-left">
                    Apellido
                  </label>
                  <input
                    className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={apellidoDraft}
                    onChange={(e) => setApellidoDraft(e.target.value)}
                    placeholder="Apellido"
                  />
                </div>

                {/* DNI + Guardar */}
                <div className="mt-3 w-full">
                  <label className="block text-xs text-neutral-400 mb-1 text-left">
                    DNI
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <input
                      className="flex-1 rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-white-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                      value={dniDraft}
                      onChange={(e) =>
                        setDniDraft(
                          e.target.value.replace(/\D+/g, "").slice(0, 8)
                        )
                      }
                      placeholder="Ej: 40123456"
                    />
                  </div>
                  <button
                    onClick={guardarDatos}
                    className="mt-4 w-full px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </section>

            {/* Tarjeta Cuota (2 columnas) */}
            <section className="neon-card md:col-span-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Estado de cuota</h2>
                  <p className="text-neutral-400 mt-1">
                    Periodo: <span className="text-neutral-300">{periodo}</span>
                  </p>
                  <p className={`mt-2 text-sm font-semibold ${cuotaColor}`}>
                    {cuotaTexto}
                  </p>
                </div>

                <div className="text-right">
                  {cuota?.estado === "paga" ? (
                    <button
                      className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-300 cursor-default border border-neutral-700"
                      disabled
                    >
                      Cuota al día
                    </button>
                  ) : (
                    <Link
                      to="/cuotas"
                      className="inline-block px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
                    >
                      Pagar ahora
                    </Link>
                  )}
                  <p className="text-xs text-neutral-500 mt-2">
                    Los pagos se reflejan automáticamente.
                  </p>
                </div>


              </div>
            </section>
          </div>

          {/* Fila 2: Resúmenes */}
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <ResumenCard
              title="Canchas"
              ok={tieneReserva}
              okText="Tenés reservas"
              noText="Sin reservas activas"
              href="/canchas"
            />
            <ResumenCard
              title="Clases"
              ok={tieneClase}
              okText="Inscripciones activas"
              noText="No estás inscripto"
              href="/clases"
            />
            <ResumenCard
              title="Entradas"
              ok={tieneEntrada}
              okText="Entradas compradas"
              noText="Aún no tenés entradas"
              href="/entradas"
            />
          </div>
        </Container>
      </div>
    </div>
  );
}

function ResumenCard({ title, ok, okText, noText, href }) {
  return (
    <section className="neon-card bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded border ${
            ok
              ? "text-emerald-300 border-emerald-700 bg-emerald-900/20"
              : "text-amber-300 border-amber-700 bg-amber-900/10"
          }`}
        >
          {ok ? "OK" : "Pendiente"}
        </span>
      </div>
      <p className="text-sm text-neutral-300 mt-2">{ok ? okText : noText}</p>
      <a
        href={href}
        className="inline-block mt-4 text-sm font-medium text-red-400 hover:text-red-300"
      >
        Ir a {title.toLowerCase()} →
      </a>
    </section>
  );
}

/* Hook: pagos del usuario actual, ordenados desc por fecha */
function usePagosUser() {
  const { user, state } = useAuth()
  const pagosUser = useMemo(() => {
    const arr = (state.pagos || []).filter(p => p.userId === user.id)
    return arr.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  }, [state.pagos, user.id])
  return pagosUser
}

function PagosHistorial() {
  const pagos = usePagosUser()
  return (
    <section className="neon-card bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold">Pagos realizados</h3>
      {pagos.length === 0 ? (
        <p className="text-neutral-400 mt-3 text-sm">Aún no registrás pagos.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-neutral-400">
              <tr>
                <th className="text-left py-2 pr-3">Período</th>
                <th className="text-left py-2 pr-3">Fecha</th>
                <th className="text-left py-2 pr-3">Medio</th>
                <th className="text-left py-2">Monto</th>
              </tr>
            </thead>
            <tbody className="text-neutral-200">
              {pagos.slice(0, 6).map(p => (
                <tr key={p.id} className="border-t border-neutral-800">
                  <td className="py-2 pr-3">{String(p.mes).padStart(2, '0')}/{p.anio}</td>
                  <td className="py-2 pr-3">{new Date(p.fecha).toLocaleString('es-AR')}</td>
                  <td className="py-2 pr-3">{labelMedio(p.medio)}</td>
                  <td className="py-2">{formatARS(p.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagos.length > 6 && (
            <p className="text-xs text-neutral-500 mt-2">Mostrando los últimos 6 pagos.</p>
          )}
        </div>
      )}
    </section>
  )
}

function CuotasPendientes() {
  const { user, state } = useAuth()
  const socio = state.usuarios.find(u => u.id === user.id)
  const pagos = (state.pagos || []).filter(p => p.userId === user.id)

  const ultimoPago = pagos
    .slice()
    .sort((a, b) => (a.anio !== b.anio ? b.anio - a.anio : b.mes - a.mes))[0]

  const refMes  = ultimoPago?.mes  ?? (socio?.cuota?.mes  ?? null)
  const refAnio = ultimoPago?.anio ?? (socio?.cuota?.anio ?? null)

  const hoy = new Date()
  const pend = buildPendientes(refMes, refAnio, hoy, pagos, socio?.cuota)

  return (
    <section className="neon-card bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold">Cuotas pendientes</h3>

      {pend.length === 0 ? (
        <p className="text-neutral-400 mt-3 text-sm">No hay cuotas pendientes hasta el período actual.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {pend.map((p) => (
            <li key={`${p.anio}-${p.mes}`} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2">
              <span className="text-neutral-200">{String(p.mes).padStart(2, '0')}/{p.anio}</span>
              <span className="text-amber-300 text-xs px-2 py-1 rounded border border-amber-700 bg-amber-900/10">Pendiente</span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-neutral-500 mt-3">Los pendientes se calculan hasta el mes en curso.</p>
    </section>
  )
}

/* Helpers */
const formatARS = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n || 0)

const labelMedio = (m) =>
  m === 'debito' ? 'Tarjeta de débito' : m === 'efectivo' ? 'Efectivo' : 'MercadoPago'

function buildPendientes(refMes, refAnio, hoy, pagos, cuotaObj) {
  let startMes = Number(refMes)
  let startAnio = Number(refAnio)

  if (!startMes || !startAnio) {
    if (cuotaObj?.mes && cuotaObj?.anio) {
      startMes = cuotaObj.mes
      startAnio = cuotaObj.anio
    } else {
      return []
    }
  }

  const refEstaPaga = Boolean(pagos.find(p => p.mes === startMes && p.anio === startAnio)) || cuotaObj?.estado === 'paga'

  let fromMes = startMes
  let fromAnio = startAnio
  if (refEstaPaga) {
    const next = addMonth(startMes, startAnio)
    fromMes = next.m
    fromAnio = next.y
  }

  const currentMes = hoy.getMonth() + 1
  const currentAnio = hoy.getFullYear()

  const pagosSet = new Set(pagos.map(p => `${p.anio}-${p.mes}`))

  const out = []
  let m = fromMes
  let y = fromAnio
  while (y < currentAnio || (y === currentAnio && m <= currentMes)) {
    const key = `${y}-${m}`
    if (!pagosSet.has(key)) out.push({ mes: m, anio: y })
    const next = addMonth(m, y)
    m = next.m
    y = next.y
  }
  return out
}

function addMonth(m, y) {
  let nm = m + 1, ny = y
  if (nm > 12) { nm = 1; ny = y + 1 }
  return { m: nm, y: ny }
}
