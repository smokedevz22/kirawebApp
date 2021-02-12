import React from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import AppBar from "../presentation/Landing/HomeBar";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import { Alert as MuiAlert } from "@material-ui/lab";

import { spacing } from "@material-ui/system";

import { Helmet } from "react-helmet";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const initialValues = {
  nombre: "",
  email: "",
  comentario: "",

};

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("Campo requerido"),
  comentario: Yup.string().required("Campo requerido"),
  email: Yup.string().email().required("Campo requerido"),

});

function BasicForm() {
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>

            <div style={{ width: '100%', height: '210px', }}>
              <img src={'/static/img/imagen_chat.jpg'} style={{
                width: '100%', height: '100%', objectFit: 'cover'
              }} />

            </div>

            {status && status.sent && (
              <Alert severity="success" my={3}>
                HEMOS RECIBIDO TU CONTACTO
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6} style={{ marginTop: 12 }}>
                    <Grid item md={6} style={{ paddingBottom: 12 }}>
                      <TextField
                        name="nombre"
                        label="Nombres"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        value={values.nombre}

                        my={2}
                      />
                      {errors.nombre ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.nombre}</div> : null}

                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        onBlur={handleBlur}
                        value={values.email}

                        onChange={handleChange}
                        type="email"

                        variant="outlined"
                        my={2}
                      />
                      {errors.email ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.email}</div> : null}

                    </Grid>
                  </Grid>



                  <Grid style={{ paddingTop: '12px' }}>

                    <TextField
                      name="comentario"
                      id="standard-textarea"
                      multiline
                      rows={8}
                      value={values.comentario}

                      placeholder='Escribir mensaje'
                      fullWidth
                      style={{ border: '1px solid black', padding: 8 }}
                      onChange={handleChange}
                    />
                    {errors.comentario ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.comentario}</div> : null}

                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    ENVIAR
                </Button>
                </form>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function FormikPage() {
  return (
    <React.Fragment>
      <Helmet title="Formik" />
      <AppBar />

      <Typography variant="h3" gutterBottom display="inline">
        FORMULARIO DE CONTACTO
      </Typography>

      <Divider my={6} />

      <BasicForm />
    </React.Fragment>
  );
}

export default FormikPage;
