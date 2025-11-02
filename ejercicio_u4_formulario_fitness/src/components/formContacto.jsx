import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FormContacto({ información, datosIniciales }) {
  return (
    <Formik
      initialValues={datosIniciales || { email: "", nombre: "", telefono: "" }}
      enableReinitialize={true}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Requerido";
        }
        if (!values.nombre) {
          errors.nombre = "Requerido";
        }
        if (!values.telefono) {
          errors.telefono = "Requerido";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        información(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Field type="email" name="email" placeholder="📧 Correo electrónico" />
        <ErrorMessage name="email" component="div" />

        <Field type="text" name="nombre" placeholder="👤 Nombre completo" />
        <ErrorMessage name="nombre" component="div" />

        <Field type="tel" name="telefono" placeholder="📱 Teléfono" />
        <ErrorMessage name="telefono" component="div" />

        <button type="submit">Enviar Información</button>
      </Form>
    </Formik>
  );
}
