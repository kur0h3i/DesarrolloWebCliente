import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FormInfoContacto({ información, datosIniciales }) {
  return (
    <Formik
      initialValues={
        datosIniciales || { direccion: "", ciudad: "", codigoPostal: "" }
      }
      enableReinitialize={true}
      validate={(values) => {
        const errors = {};
        if (!values.direccion) {
          errors.direccion = "Requerido";
        }
        if (!values.ciudad) {
          errors.ciudad = "Requerido";
        }
        if (!values.codigoPostal) {
          errors.codigoPostal = "Requerido";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        información(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Field
          type="text"
          name="direccion"
          placeholder="🏠 Dirección completa"
        />
        <ErrorMessage name="direccion" component="div" />

        <Field type="text" name="ciudad" placeholder="🌆 Ciudad" />
        <ErrorMessage name="ciudad" component="div" />

        <Field type="text" name="codigoPostal" placeholder="📮 Código Postal" />
        <ErrorMessage name="codigoPostal" component="div" />

        <button type="submit">Continuar</button>
      </Form>
    </Formik>
  );
}
