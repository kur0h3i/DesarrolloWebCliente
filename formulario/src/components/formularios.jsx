import { useState } from "react";
import FormContacto from "./formContacto";
import FormInfoContacto from "./FormInfoContacto";
import FormPreferencias from "./FormPreferencias";
import FormPago from "./FormPago";

export default function Formularios() {
  const [paso, setPaso] = useState(1);
  const [informacion, setInformacion] = useState({
    datosPersonales: null,
    informacionContacto: null,
    preferenciasEntrenamiento: null,
    datosPago: null,
  });
  const [estadoEnvio, setEstadoEnvio] = useState({
    enviando: false,
    exito: false,
    error: null,
  });

  // Función para simular envío de datos al servidor
  const enviarDatosAlServidor = async (todosLosDatos) => {
    setEstadoEnvio({ enviando: true, exito: false, error: null });

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Simulación de envío exitoso (sin llamada real al endpoint)
      console.log(
        "[!] Simulando envío POST a: https://api.ejemplo.com/registro-gimnasio"
      );
      console.log(
        "[*] Datos enviados:",
        JSON.stringify(todosLosDatos, null, 2)
      );
      console.log(
        "[+] Respuesta simulada del servidor: { success: true, message: 'Registro completado' }"
      );

      setEstadoEnvio({ enviando: false, exito: true, error: null });
      return true;
    } catch (error) {
      console.error("❌ Error inesperado:", error);
      setEstadoEnvio({
        enviando: false,
        exito: false,
        error: error.message,
      });
      return false;
    }
  };

  const guardarDatosPersonales = (datos) => {
    setInformacion({ ...informacion, datosPersonales: datos });
    setPaso(2);
  };

  const guardarInformacionContacto = (datos) => {
    setInformacion({ ...informacion, informacionContacto: datos });
    setPaso(3);
  };

  const guardarPreferenciasEntrenamiento = (datos) => {
    setInformacion({ ...informacion, preferenciasEntrenamiento: datos });
    setPaso(4);
  };

  const guardarDatosPago = async (datos) => {
    const todosLosDatos = {
      ...informacion,
      datosPago: datos,
    };

    setInformacion(todosLosDatos);

    // Mostrar todos los datos en consola
    console.log("DATOS COMPLETOS DEL FORMULARIO");
    console.log("Datos Personales:", todosLosDatos.datosPersonales);
    console.log("Información de Contacto:", todosLosDatos.informacionContacto);
    console.log(
      "Preferencias de Entrenamiento:",
      todosLosDatos.preferenciasEntrenamiento
    );
    console.log("Datos de Pago:", todosLosDatos.datosPago);

    // Enviar datos al servidor
    const enviado = await enviarDatosAlServidor(todosLosDatos);

    if (enviado) {
      console.log("[+] Se ha mandando el packete al servidor");
    }
  };

  // Función para retroceder al paso anterior
  const irAtras = () => {
    if (paso > 1) {
      setPaso(paso - 1);
      setEstadoEnvio({ enviando: false, exito: false, error: null });
    }
  };

  return (
    <div>
      {/* Indicador de progreso */}
      <div className="progress-bar">
        <div className={`step ${paso >= 1 ? "active" : ""}`}>1</div>
        <div className={`step ${paso >= 2 ? "active" : ""}`}>2</div>
        <div className={`step ${paso >= 3 ? "active" : ""}`}>3</div>
        <div className={`step ${paso >= 4 ? "active" : ""}`}>4</div>
      </div>

      {/* Paso 1: Datos personales */}
      {paso === 1 && (
        <div>
          <h2>Paso 1: Datos Personales</h2>
          <FormContacto
            información={guardarDatosPersonales}
            datosIniciales={informacion.datosPersonales}
          />
        </div>
      )}

      {/* Paso 2: Información de contacto */}
      {paso === 2 && (
        <div>
          <h2>Paso 2: Información de Contacto</h2>
          <FormInfoContacto
            información={guardarInformacionContacto}
            datosIniciales={informacion.informacionContacto}
          />
          <button onClick={irAtras} className="btn-atras">
            ← Atrás
          </button>
        </div>
      )}

      {/* Paso 3: Preferencias de entrenamiento */}
      {paso === 3 && (
        <div>
          <h2>Paso 3: Preferencias de Entrenamiento</h2>
          <FormPreferencias
            información={guardarPreferenciasEntrenamiento}
            datosIniciales={informacion.preferenciasEntrenamiento}
          />
          <button onClick={irAtras} className="btn-atras">
            ← Atrás
          </button>
        </div>
      )}

      {/* Paso 4: Datos de pago */}
      {paso === 4 && (
        <div>
          <h2>Paso 4: Datos de Pago</h2>
          <FormPago
            información={guardarDatosPago}
            datosIniciales={informacion.datosPago}
          />
          <button onClick={irAtras} className="btn-atras">
            ← Atrás
          </button>

          {estadoEnvio.enviando && (
            <div className="mensaje-envio enviando">
              <p>Enviando datos al servidor...</p>
            </div>
          )}

          {estadoEnvio.error && (
            <div className="mensaje-envio error">
              <p>Error: {estadoEnvio.error}</p>
              <p>
                Nota: Este es un endpoint ficticio. Los datos se han guardado
                localmente.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
