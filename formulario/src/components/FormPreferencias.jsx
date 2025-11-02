import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FormPreferencias({ información, datosIniciales }) {
  return (
    <Formik
      initialValues={
        datosIniciales || {
          tipoEntrenamiento: "",
          objetivos: "",
          disponibilidad: "",
        }
      }
      enableReinitialize={true}
      validate={(values) => {
        const errors = {};
        if (!values.tipoEntrenamiento) {
          errors.tipoEntrenamiento = "Requerido";
        }
        if (!values.objetivos) {
          errors.objetivos = "Requerido";
        }
        if (!values.disponibilidad) {
          errors.disponibilidad = "Requerido";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        información(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Field as="select" name="tipoEntrenamiento">
          <option value="">🏋️ Selecciona tipo de entrenamiento</option>
          <option value="cardio">Cardio</option>
          <option value="fuerza">Fuerza</option>
          <option value="funcional">Funcional</option>
          <option value="yoga">Yoga</option>
          <option value="crossfit">CrossFit</option>
        </Field>
        <ErrorMessage name="tipoEntrenamiento" component="div" />

        <Field
          type="text"
          name="objetivos"
          placeholder="🎯 Objetivos (ej: perder peso, ganar músculo)"
        />
        <ErrorMessage name="objetivos" component="div" />

        <Field as="select" name="disponibilidad">
          <option value="">📅 Disponibilidad</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
          <option value="noche">Noche</option>
          <option value="fines-semana">Fines de semana</option>
        </Field>
        <ErrorMessage name="disponibilidad" component="div" />

        <button type="submit">Continuar</button>
      </Form>
    </Formik>
  );
}
