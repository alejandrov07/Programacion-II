import React, { useState } from "react";
import "./App.css";

/**
 * Actividad 4 - Formulario controlado con validación inmediata
 * TEMA 12: Enlace de controles con variables de estado (useState)
 * TEMA 13: Validación inmediata mientras el usuario escribe
 *
 * Campos: nombre, correo y contraseña.
 * Cada <input> es un componente "controlado": su valor viene siempre
 * del estado (value={...}) y cada cambio se refleja en el estado
 * mediante onChange, que es la definición de un formulario controlado.
 */

// --- Funciones de validación puras (una por campo) ---
// Cada función recibe el valor actual y devuelve un mensaje de error
// (string) o "" si el campo es válido. Se ejecutan en cada pulsación.

function validarNombre(valor) {
  if (!valor.trim()) {
    return "El nombre es obligatorio.";
  }
  if (valor.trim().length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor)) {
    return "El nombre solo puede contener letras y espacios.";
  }
  return "";
}

function validarCorreo(valor) {
  if (!valor.trim()) {
    return "El correo es obligatorio.";
  }
  // Expresión regular simple para formato usuario@dominio.tld
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronCorreo.test(valor)) {
    return "Ingresa un correo electrónico válido.";
  }
  return "";
}

function validarPassword(valor) {
  if (!valor) {
    return "La contraseña es obligatoria.";
  }
  if (valor.length < 8) {
    return "Debe tener al menos 8 caracteres.";
  }
  if (!/[A-Z]/.test(valor)) {
    return "Debe incluir al menos una letra mayúscula.";
  }
  if (!/[a-z]/.test(valor)) {
    return "Debe incluir al menos una letra minúscula.";
  }
  if (!/[0-9]/.test(valor)) {
    return "Debe incluir al menos un número.";
  }
  return "";
}

function App() {
  // --- Variables de estado enlazadas a cada control (TEMA 12) ---
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

  // Mensajes de error por campo, se actualizan en cada tecla (TEMA 13)
  const [errors, setErrors] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

  // Controla si un campo ya fue "tocado" para no mostrar errores
  // antes de que el usuario haya interactuado con él.
  const [touched, setTouched] = useState({
    nombre: false,
    correo: false,
    password: false,
  });

  const [enviado, setEnviado] = useState(false);

  // Mapa de validadores para reutilizar la lógica por nombre de campo
  const validadores = {
    nombre: validarNombre,
    correo: validarCorreo,
    password: validarPassword,
  };

  // --- Manejador único de cambios (reutilizado por los 3 inputs) ---
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    // 1. Actualiza la variable de estado del formulario (enlace del control)
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 2. Vuelve a validar ese campo inmediatamente con el nuevo valor
    const mensajeError = validadores[name](value);
    setErrors((prev) => ({ ...prev, [name]: mensajeError }));

    // 3. Marca el campo como tocado en cuanto el usuario empieza a escribir
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const manejarBlur = (evento) => {
    const { name } = evento.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // El formulario es válido solo si ningún campo tiene mensaje de error
  // y ninguno está vacío.
  const formularioValido =
    Object.values(errors).every((mensaje) => mensaje === "") &&
    Object.values(formData).every((valor) => valor.trim() !== "");

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!formularioValido) return;
    setEnviado(true);
  };

  const manejarNuevoRegistro = () => {
    setFormData({ nombre: "", correo: "", password: "" });
    setErrors({ nombre: "", correo: "", password: "" });
    setTouched({ nombre: false, correo: false, password: false });
    setEnviado(false);
  };

  if (enviado) {
    return (
      <div className="pagina">
        <div className="tarjeta tarjeta-exito">
          <h1>Registro enviado</h1>
          <p>
            Gracias, <strong>{formData.nombre}</strong>. Tu registro con el
            correo <strong>{formData.correo}</strong> se completó
            correctamente.
          </p>
          <button className="boton boton-secundario" onClick={manejarNuevoRegistro}>
            Registrar otro usuario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina">
      <div className="tarjeta">
        <h1>Formulario de registro</h1>
        <p className="subtitulo">
          Actividad 4 · Formulario controlado con validación inmediata
        </p>

        <form onSubmit={manejarEnvio} noValidate>
          {/* Campo: Nombre */}
          <div className="campo">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej. Ana Pérez"
              value={formData.nombre}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              className={
                touched.nombre && errors.nombre ? "input input-error" : "input"
              }
            />
            {touched.nombre && errors.nombre && (
              <span className="mensaje-error">{errors.nombre}</span>
            )}
          </div>

          {/* Campo: Correo */}
          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="Ej. ana@correo.com"
              value={formData.correo}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              className={
                touched.correo && errors.correo ? "input input-error" : "input"
              }
            />
            {touched.correo && errors.correo && (
              <span className="mensaje-error">{errors.correo}</span>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              className={
                touched.password && errors.password
                  ? "input input-error"
                  : "input"
              }
            />
            {touched.password && errors.password && (
              <span className="mensaje-error">{errors.password}</span>
            )}
            <span className="ayuda">
              Debe incluir mayúscula, minúscula y un número.
            </span>
          </div>

          <button
            type="submit"
            className="boton"
            disabled={!formularioValido}
            title={
              !formularioValido
                ? "Completa correctamente todos los campos para continuar"
                : "Enviar formulario"
            }
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
