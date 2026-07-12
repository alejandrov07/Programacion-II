import { useState } from 'react'
import './App.css'

function App() {
  // Cada control del formulario tiene su propia variable de estado.
  // El textarea usa "comentario", el select usa "categoria"
  // y el grupo de radios usa "calificacion".
  const [comentario, setComentario] = useState('')
  const [categoria, setCategoria] = useState('sugerencia')
  const [calificacion, setCalificacion] = useState('bueno')

  function manejarEnvio(evento) {
    evento.preventDefault()
    alert('Comentario enviado')
  }

  return (
    <div className="contenedor">
      <h1>Formulario de Comentarios</h1>

      <form onSubmit={manejarEnvio} className="formulario">

        {/* TEXTAREA enlazado a "comentario" */}
        <div className="campo">
          <label htmlFor="comentario">Escribe tu comentario:</label>
          <textarea
            id="comentario"
            rows="4"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe aquí..."
          />
        </div>

        {/* SELECT enlazado a "categoria" */}
        <div className="campo">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="sugerencia">Sugerencia</option>
            <option value="queja">Queja</option>
            <option value="felicitacion">Felicitación</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* GRUPO DE RADIO BUTTONS enlazado a "calificacion" */}
        <div className="campo">
          <p>¿Cómo calificarías tu experiencia?</p>

          <label className="opcion-radio">
            <input
              type="radio"
              name="calificacion"
              value="bueno"
              checked={calificacion === 'bueno'}
              onChange={(e) => setCalificacion(e.target.value)}
            />
            Bueno
          </label>

          <label className="opcion-radio">
            <input
              type="radio"
              name="calificacion"
              value="regular"
              checked={calificacion === 'regular'}
              onChange={(e) => setCalificacion(e.target.value)}
            />
            Regular
          </label>

          <label className="opcion-radio">
            <input
              type="radio"
              name="calificacion"
              value="malo"
              checked={calificacion === 'malo'}
              onChange={(e) => setCalificacion(e.target.value)}
            />
            Malo
          </label>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
