import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FormPago({ información, datosIniciales }) {
  return (
    <Formik
      initialValues={
        datosIniciales || {
          metodoPago: "",
          numeroTarjeta: "",
          fechaExpiracion: "",
          cvv: "",
        }
      }
      enableReinitialize={true}
      validate={(values) => {
        const errors = {};
        if (!values.metodoPago) {
          errors.metodoPago = "Requerido";
        }
        if (!values.numeroTarjeta) {
          errors.numeroTarjeta = "Requerido";
        } else if (values.numeroTarjeta.length < 16) {
          errors.numeroTarjeta = "El número debe tener 16 dígitos";
        }
        if (!values.fechaExpiracion) {
          errors.fechaExpiracion = "Requerido";
        }
        if (!values.cvv) {
          errors.cvv = "Requerido";
        } else if (values.cvv.length < 3) {
          errors.cvv = "El CVV debe tener al menos 3 dígitos";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        información(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Field as="select" name="metodoPago">
          <option value="">💳 Método de pago</option>
          <option value="visa">Visa</option>
          <option value="mastercard">MasterCard</option>
          <option value="amex">American Express</option>
          <option value="paypal">PayPal</option>
        </Field>
        <ErrorMessage name="metodoPago" component="div" />

        <Field
          type="text"
          name="numeroTarjeta"
          placeholder="💳 Número de tarjeta (16 dígitos)"
          maxLength="16"
        />
        <ErrorMessage name="numeroTarjeta" component="div" />

        <Field
          type="text"
          name="fechaExpiracion"
          placeholder="📅 Fecha de expiración (MM/AA)"
          maxLength="5"
        />
        <ErrorMessage name="fechaExpiracion" component="div" />

        <Field
          type="text"
          name="cvv"
          placeholder="🔒 CVV (3-4 dígitos)"
          maxLength="4"
        />
        <ErrorMessage name="cvv" component="div" />

        <button type="submit">Finalizar Registro</button>
      </Form>
    </Formik>
  );
}
