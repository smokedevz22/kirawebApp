import React, { Fragment, useState, Suspense, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";
import * as Yup from "yup";
import styled, { createGlobalStyle } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { API } from "aws-amplify";
import { Route } from 'react-router-dom'
import AppBar from "../presentation/Landing/HomeBar";


import {

  CheckCircle as CheckCircle,

} from "@material-ui/icons";


import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Paper as MuiPaper,

  TextField as MuiTextField,
  Typography,
  Select,
} from "@material-ui/core";

import { color, spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";

const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Shadow = styled.div`
  box-shadow: ${(props) => props.theme.shadows[1]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const GlobalStyleDropzone = createGlobalStyle`
  [class^="DropzoneArea-dropZone"] {
    min-height: 160px;
  }
`;

const timeOut = (time) => new Promise((res) => setTimeout(res, time));



const initialValues = {
  firstName: "Lucy",
  lastName: "Lavender",
  email: "lucylavender@gmail.com",
  password: "mypassword123",
  confirmPassword: "mypassword123",
};


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(12, "Must be at least 12 characters")
    .max(255)
    .required("Required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});


function Project({ id, image, title, description, chip }) {
  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>

        {chip}

        <Typography mb={4} component="p">
          {description}
        </Typography>


      </CardContent>
      <CardActions>

        <Route render={({ history }) => (
          <Button onClick={() => { history.push('/pages/detalle_seguro') }} size="small" color="primary">
            COTIZACION
          </Button>)} />

        <Route render={({ history }) => (
          <Button onClick={() => { history.push('/pages/flujo_compras') }} size="small" color="primary">
            COMPRAR
          </Button>
        )} />

        <Route render={({ history }) => (
          <Button onClick={() => { history.push(`/pages/seguros/detalles/${id}`) }} size="small" color="primary">
            DETALLES
          </Button>
        )} />

      </CardActions>
    </Card>
  );
}




async function registrarCotizacion() {

  const mutation = `
  mutation MyMutation($bank:registrarNuevaCotizacionInput!) {
  registrarNuevaCotizacion (input:$bank){
    data_cotizacion
  }
}
`;

  let objectoRegistro = JSON.stringify({
    asegurado: itemDatosAsegurado,
    plan: planSeleccionado,
    subplan: subPlanSeleccionado
  });

  console.log("objecto_cotizacion", objectoRegistro)
  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_cotizacion: objectoRegistro

      }
    }

  });
  console.log("cotizacion_registrada");

}


async function registrarProducto() {

  const mutation = `
  mutation MyMutation($bank:registrarNuevaPolizaInput!) {
  registrarNuevaPoliza (input:$bank){
    data_poliza
  }
}
`;

  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_poliza: JSON.stringify({
          asegurado: itemDatosAsegurado,
          plan: planSeleccionado,
          user: userAccountData,
          subplan: subPlanSeleccionado
        }),

      }
    }

  });
  console.log("USUARIO REGISTRADO EXITOSAMENTE!");

}




function DefaultDropzone() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ADJUNTAR ARCHIVOS
        </Typography>
        <Typography variant="body2" gutterBottom>
          Material-UI-Dropzone is a React component using Material-UI and is
          based on the excellent react-dropzone library.
        </Typography>

        <Spacer mb={4} />

        <Grid container lg={12}  >
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              ADJUNTAR FOTO BOLETA
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }} >
               Material-UI-Dropzone is a React component using Material-UI and is
              based on the excellent react-dropzone library.
        </Typography>
            <DropzoneArea dropzoneText={''}                       acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />



          </Grid>

          <Grid lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
              ADJUNTAR FOTO EQUIPO
            
        </Typography>
            <Typography variant="body2" style={{marginTop:6, marginBottom:6}} >
               Material-UI-Dropzone is a React component using Material-UI and is
              based on the excellent react-dropzone library.
        </Typography>
            <DropzoneArea  dropzoneText={''}                       acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
              ADJUNTAR FOTO SERIE
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }} >
               Material-UI-Dropzone is a React component using Material-UI and is
              based on the excellent react-dropzone library.
        </Typography>
            <DropzoneArea dropzoneText={''}   acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          <Grid lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color:'#0fb6e9'}} >
              ADJUNTAR FOTO IMEI
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }}>
               Material-UI-Dropzone is a React component using Material-UI and is
              based on the excellent react-dropzone library.
        </Typography>
            <DropzoneArea   
 dropzoneText={''}                       acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

        </Grid>


      </CardContent>
    </Card>
  );
}

function AlertDialogImei() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={4}>
          <span style={{ cursor: 'pointer', color: '#376fd0' }} variant="contained" color="primary" onClick={handleClickOpen}>
            #COMO CONSEGUIR IMEI DEL TELEFONO
          </span>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"COMO CONSEGUIR IMEI DEL TELEFONO"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
*#06#
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CERRAR
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card >
  );
}

function AlertDialogNroSerie() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={4}>
          <span style={{ cursor: 'pointer', color: '#376fd0' }} variant="contained" color="primary" onClick={handleClickOpen}>
            #COMO CONSEGUIR NRO DE SERIE DEL TELEFONO
          </span>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"COMO CONSEGUIR NUMERO DE SERIE DEL TELEFONO"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               *#06#
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CERRAR
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card >
  );
}
let listPlanes = [];
let listSubPlanes = [];

let itemRender = 'cargando';
let itemRenderSubPlan = 'cargando';
let itemRenderDetallePlan = 'cargando'
let itemRenderDetalleSubPlan = 'cargando'

let planSeleccionado = {};
let subPlanSeleccionado = {};


let itemDatosAsegurado = {};
let userAccountData = {};


function SaveValue(key, value) {
  itemDatosAsegurado[key] = value
}


function SaveValueAccount(key, value) {
  userAccountData[key] = value
}


const ListaRender = (functionRenderDetalle) => {
  const [productos, setProductos] = useState('undefined');
  const [error, setError] = useState('undefined');


  // console.log("listaProductos", listaProductos)

  useEffect(async () => {


    const queryListaActividadGraphql = `
 query MyQuery {
      listasPlanes {
        id
data_plan
  }
}

`;

    console.log(queryListaActividadGraphql)
    await API.graphql({
      query: queryListaActividadGraphql
    }).then(result => {
      console.log(result);
      setProductos(result);


    }
    )

  }, []);


  if (productos && productos['data']) {

    console.log("productos", productos['data']['listasPlanes']);

    let listaPlanes = productos['data']['listasPlanes'];
    listPlanes = listaPlanes;

    console.log("listaProductos", listaPlanes)



    return < select style={{ width: '100%', height: '40px', textTransform: 'uppercase' }} onChange={functionRenderDetalle} >
      < option value="_" > SELECCIONAR PLAN</option >

      {
        listaPlanes.map(item => {
          console.log(item);
          let itemPlan = JSON.parse(item['data_plan'])
          return <option style={{ textTransform: 'uppercase' }} value={item['id']}> {itemPlan['nombre_plan']}</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}

const ListaRenderSubPlan = (functionRenderDetalle) => {
  const [productos, setProductos] = useState('undefined');
  const [error, setError] = useState('undefined');


  // console.log("listaProductos", listaProductos)

  useEffect(async () => {


    const queryListaActividadGraphql = `
 query MyQuery {
    listasSubPlanes {
      id
 data_sub_plan
  }
}

`;

    console.log(queryListaActividadGraphql)
    await API.graphql({
      query: queryListaActividadGraphql
    }).then(result => {
      console.log(result);
      setProductos(result);


    }
    )

  }, []);


  if (productos && productos['data']) {

    console.log("productos", productos['data']['listasSubPlanes']);

    let listaSubPlanes = productos['data']['listasSubPlanes'];
    listSubPlanes = listaSubPlanes;
    console.log("listaProductos", listaSubPlanes)



    return < select style={{ width: '100%', height: '40px', textTransform: 'uppercase' }} onChange={functionRenderDetalle} >
      < option value="_"  > SELECCIONAR PLAN</option >

      {
        listaSubPlanes.map(item => {
          console.log(item);
          let itemSubPlan = JSON.parse(item['data_sub_plan'])
          return <option style={{ textTransform: 'uppercase' }} value={item['id']}> {itemSubPlan['plan']}</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}

function RenderDetallePlan(item) {
  // const [detallePlan, setDetallePlan] = useState({});

  let detalle = JSON.parse(item['data_plan'])
  console.log("DETALLE_PLAN", detalle)

  if (detalle) {
    //setDetallePlan(detalle)
    return (<Grid>
      <Grid>
        <Grid style={{ marginTop: '12px' }}>
          <div style={{ width: '100%', height: '160px', background: 'red' }}>
            <img src={detalle['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

          </div>
        </Grid>
        <Typography variant="h6" gutterBottom>
          <h2 style={{
            textTransform: 'uppercase'
          }}> {detalle['nombre_plan']}</h2>
          <p>{detalle['descripcion_comercial_plan']}</p>

          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>BRIEF : {detalle['brief']}</p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>REVISTA : {detalle['caracteristicas']}</p>

        </Typography>
      </Grid>


      <Grid item lg={12}>
        <Divider />
      </Grid>
      <Grid item lg={12} style={{ display: 'flex' }}>
        <Grid lg={6}>
          <br />

          <Typography variant="h4">CARACTERISTICAS</Typography>
          <br />

          <Typography variant="h6">
                FECHA INICIO
                 <br />
                FECHA TERMINO
                <br />
                CAPITAL ASEGURADO
                <br />
                PRECIO MENSUAL
                <br />

          </Typography>
        </Grid>
        <Grid lg={6}>
          <br />

          <Typography variant="h4" align="right" display="block">
            DETALLE
                                </Typography>

          <br />

          <Typography variant="h6" align="right">
            {''}
            <br />
            {''}
            <br />
            {detalle['capital_asegurado_basico']}
            <br />
            {detalle['precio_mensual']}
            <br />

          </Typography>
        </Grid>


      </Grid>



    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}

function RenderDetalleSubPlan(item) {
  // const [detallePlan, setDetallePlan] = useState({});


  let detalle = JSON.parse(item['data_sub_plan'])

  console.log("DETALLE_SUBPLAN", detalle)

  if (detalle) {
    //setDetallePlan(detalle)
    return (<Grid lg={12}>

      <Grid lg={12}>
        <Typography variant="h6" gutterBottom>

          <h2 style={{
            textTransform: 'uppercase'
          }}>COBERTURA : {detalle['plan']}</h2>

          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CODIGO : {detalle['codigo_cobertura']}</p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>BRIEF : {detalle['brief']}</p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>REVISTA : {detalle['pdf_cobetura']}</p>


        </Typography>
      </Grid>



      <Grid item lg={12}>
        <Divider />
      </Grid>
      <Grid item lg={12} style={{ display: 'flex' }}>
        <Grid lg={6}>
          <br />

          <Typography variant="h4">CARACTERISTICAS</Typography>
          <br />

          <Typography variant="h4">
        
                DAÑO PARCIAL
               <br />
                DAÑO TOTAL
                <br />
                PERDIDA
                <br />
          </Typography>
        </Grid>
        <Grid lg={6}>
          <br />

          <Typography variant="h4" align="right" display="block">
            DETALLE
                                </Typography>
          <br />

          <Typography variant="h4" align="right">

            {detalle['fecha_inicio']}
            <br />
            {detalle['fecha_termino']}
            <br />
            {detalle['pol_cad_cobertura']}                                    <br />

            {detalle['ramo_fecu']}                                    <br />
            {detalle['deducible']}                                    <br />

          </Typography>
        </Grid>


      </Grid>






    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}

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
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6}>
                    <Grid lg={12} style={{ paddingLeft: 12 }}>
                      <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</span>
                    </Grid>

                    <Grid item md={12}>
                      <span style={{ fontWeight: 'bold', fontSize: '22px' , marginTop:12}}> INFORMACION PERSONAL</span>
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="rut_persona"
                        value={itemDatosAsegurado['rut_persona']}
                        label="RUT PERSONA"
                        fullWidth
                        onChange={event => SaveValue("rut_persona", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="nro_serie"
                        value={itemDatosAsegurado['nro_serie']}
                        label="NUMERO DE SERIE CARNET"
                        fullWidth
                        onChange={event => SaveValue("nro_serie", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="fecha_nacimiento"
                        label="FECHA NACIMIENTO"
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['fecha_nacimiento']}

                        onChange={event => SaveValueAccount("fecha_nacimiento", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="nombre_persona"
                        label="NOMBRES "
                        value={itemDatosAsegurado['nombre_persona']}
                        fullWidth
                        onChange={event => SaveValue("nombre_persona", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="apellido_paterno"
                        label="APELLIDO PATERNO "
                        value={itemDatosAsegurado['apellido_paterno']}
                        fullWidth
                        onChange={event => SaveValue("apellido_paterno", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="apellido_materno"
                        label="APELLIDO MATERNO "
                        value={itemDatosAsegurado['apellido_materno']}
                        fullWidth
                        onChange={event => SaveValue("apellido_materno", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={6}>


                      <select onChange={event => SaveValue("marca_equipo", event.target.value)} style={{ width: '100%', height: '40px' }}>
                        <option > SELECCIONAR GENERO </option>
                        <option value="femenino"> FEMENINO </option>
                        <option value="masculino"> MASCULINO </option>
                      </select>
                    </Grid>
                    <Grid item md={12}>
                      <span style={{ fontWeight: 'bold', fontSize: '22px' }}> INFORMACION EQUIPO</span>
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="telefono_persona"
                        value={itemDatosAsegurado['telefono_persona']}
                        label="N° CELULAR"
                        fullWidth
                        onChange={event => SaveValue("telefono_persona", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={6}>
                     </Grid>
                    <Grid item md={6}>
                      

                      <select onChange={event => SaveValue("marca_equipo", event.target.value)} style={{ width:'100%', height:'40px'}}>
                        <option > SELECCIONAR MARCA </option>
                        <option value="samsung"> SAMSUNG </option>
                      </select>
                    </Grid>

                    
                    <Grid item md={6}>


                      <select onChange={event => SaveValue("modelo_equipo", event.target.value)} style={{ width: '100%', height: '40px' }}>
                        <option > SEELECCIONAR MODELO </option>
                        <option value="samsung"> SAMSUNG </option>


                        <option value="samsung"> Galaxy S5</option>
                           <option value="samsung">Galaxy S6</option>
                           <option value="samsung">Galaxy S7</option>
                           <option value="samsung">Galaxy S8</option>
                           <option value="samsung">Galaxy S9</option>
                           <option value="samsung">Galaxy S10</option>
                          <option value="samsung">Galaxy S10 +</option>
                           <option value="samsung">Galaxy S20</option>
                          <option value="samsung">Galaxy S20+</option>
                          <option value="samsung">Galaxy S20+ Ultra</option>
                           <option value="samsung">Galaxy A10</option>
                           <option value="samsung">Galaxy A20</option>
                           <option value="samsung">Galaxy A30</option>
                           <option value="samsung">Galaxy A40</option>
                           <option value="samsung">Galaxy A50</option>
                           <option value="samsung">Galaxy A60</option>
                           <option value="samsung">Galaxy A70</option>
                           <option value="samsung">Galaxy A80</option>
                           <option value="samsung">Galaxy A90</option>
                      </select>
                    </Grid>


 


                    <Grid item md={6}>
                      <TextField
                        name="numero_serie"
                        label="NUMERO SERIE"
                        value={itemDatosAsegurado['numero_serie']}
                        fullWidth
                        onChange={event => SaveValue("numero_serie", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="imei"
                        label="IMEI"
                        fullWidth
                        value={itemDatosAsegurado['imei']}
                        onChange={event => SaveValue("imei", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                  </Grid>
                  <Grid style={{ display: 'flex' }} lg={12}>

                    <Grid lg={6}>
                      <AlertDialogNroSerie />
                    </Grid>
                    <Grid lg={6}>
                      <AlertDialogImei />                     
                    </Grid>

                  </Grid>
                </form>
              )}
          </CardContent>
        </Card>
      )
      }
    </Formik >
  );
}

function ResumenDetail() {


  let detallePlan = JSON.parse(planSeleccionado['data_plan'])
  let detalleSubPlan = JSON.parse(subPlanSeleccionado['data_sub_plan'])



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
  let registrarCotz = async () => {
    registrarCotizacion();
  }
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
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <Grid container spacing={6} justify="center">



                  <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>





                              <Grid item md={6}>
                                <h2>RESUMEN</h2>
                              </Grid>
                              <Grid md={6} >

                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                  <Button onClick={registrarCotz} variant="contained" color="primary" mt={2} style={{ marginTop: '22px' }}>
                                    GUARDAR COTIZACION
                </Button>
                                </div>


                              </Grid>
                              <Grid lg={12}  >
                                <Typography variant="caption">CLIENTE</Typography>
                                <Typography variant="h5">
                                  RUT:  {itemDatosAsegurado['rut_persona']}
                                  <br />
                                NOMBRE:  {itemDatosAsegurado['nombre_persona'] + ' ' + itemDatosAsegurado['apellido_persona']}
                                  <br />
                                  {'MARCA: ' + itemDatosAsegurado['marca_equipo']}
                                  <br />
                                  {'MODELO: ' + itemDatosAsegurado['modelo_equipo']}
                                  <br />

                                  {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}
                                  <br />
                                  {'IMEI: ' + itemDatosAsegurado['imei']}
                                  <br />
                                </Typography>
                              </Grid>
                              <Grid lg={12}>
                                <Grid style={{ marginTop: '12px' }}>
                                  <div style={{ width: '100%', height: '160px', background: 'red' }}>
                                    <img src={detallePlan['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

                                  </div>
                                </Grid>
                                <Typography variant="h6" gutterBottom>
                                  <h2 style={{
                                    textTransform: 'uppercase'
                                  }}> {detallePlan['nombre_plan']}</h2>
                                  <p>{detallePlan['descripcion_comercial_plan']}</p>

                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>BRIEF : {detallePlan['brief']}</p>
                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>REVISTA : {detallePlan['caracteristicas']}</p>

                                </Typography>
                              </Grid>



                              <Grid lg={12}>

                                <Grid style={{ marginTop: '12px' }}>
                                  <div style={{ width: '100%', height: '160px', background: 'red' }}>
                                    <img src={detalleSubPlan['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

                                  </div>
                                </Grid>
                                <Typography variant="h6" gutterBottom>

                                  <h2 style={{
                                    textTransform: 'uppercase'
                                  }}>COBERTURA : {detalleSubPlan['plan']}</h2>

                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CODIGO : {detalleSubPlan['codigo_cobertura']}</p>
                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>BRIEF : {detalleSubPlan['brief']}</p>
                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>REVISTA : {detalleSubPlan['pdf_cobetura']}</p>
                                </Typography>



                              </Grid>


                            </Grid>
                          </CardContent>
                        </Card>
                        <Card item lg={12}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>DETALLE</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">VALOR</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  FECHA INICIO
                    </TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">{detalleSubPlan['fecha_inicio']}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  FECHA TERMINO

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">{detalleSubPlan['fecha_termino']}</TableCell>
                              </TableRow>


                              <TableRow>
                                <TableCell component="th" scope="row">
                                  PRIMA SEGURO

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">-</TableCell>
                              </TableRow>



                              <TableRow>
                                <TableCell component="th" scope="row">
                                  PRIMA NETA

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">-</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell component="th" scope="row">
                                  DEDUCIBLE

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">-</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell />
                                <TableCell>COSTO MENSUAL</TableCell>
                                <TableCell align="right">$275.00</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell />
                                <TableCell>COSTO ANUAL</TableCell>
                                <TableCell align="right">$275.00</TableCell>
                              </TableRow>


                              <TableRow>
                                <TableCell />
                                <TableCell>Total</TableCell>
                                <TableCell align="right"></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Card>

                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}


function FlujoTerminadoRender() {


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

  let detallePlan = JSON.parse(planSeleccionado['data_plan'])
  let detalleSubPlan = JSON.parse(subPlanSeleccionado['data_sub_plan'])
  registrarProducto()

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
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <Grid container spacing={6} justify="center">



                  <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>



                              <Grid item xs={12} >

                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                                  <Typography variant="h2" gutterBottom>
                                    <CheckCircle style={{ color: 'green', fontSize: 80 }}></CheckCircle>
                                  </Typography>

                                  <Typography variant="h2" gutterBottom>
                                    <h2>POLIZA REGISTRADA</h2>
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    This is the receipt for a payment of $268.85 (USD) you
                                    made to Material App.

                                   </Typography>
                                  <Typography variant="body2" gutterBottom>

                                    <a href="#">DESCARGAR CONTRATO</a>
                                  </Typography>

                                </div>
                              </Grid>

                              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                                <Typography variant="h2" gutterBottom>
                                  <h2>RESUMEN</h2>
                                </Typography>
                              </div>
                              <Grid xl={12} style={{ marginTop: '12px' }}>
                                <div style={{ width: '100%', height: '210px', background: 'red' }}>
                                  <img src="https://sfestaticos.blob.core.windows.net/argentina/home/secciones/banner-accidentes-personales-desktop.jpg" style={{ width: '100%', height: '100%' }} />

                                </div>
                              </Grid>
                              <Grid item xs={6}>

                                <Grid style={{ marginTop: '12px' }}>
                                  <div style={{ width: '100%', height: '160px', background: 'red' }}>
                                    <img src={detallePlan['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

                                  </div>
                                </Grid>
                                <Typography variant="h6" gutterBottom>

                                  <h2 style={{
                                    textTransform: 'uppercase'
                                  }}> {detallePlan['nombre_plan']}</h2>
                                  <p>{detallePlan['descripcion_comercial_plan']}</p>

                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>BRIEF : {detallePlan['brief']}</p>
                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>REVISTA : {detallePlan['caracteristicas']}</p>

                                </Typography>



                              </Grid>

                              <Grid item xs={6}>

                                <Grid style={{ marginTop: '12px' }}>
                                  <div style={{ width: '100%', height: '160px', background: 'red' }}>
                                    <img src={detalleSubPlan['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

                                  </div>
                                </Grid>
                                <Typography variant="h6" gutterBottom>

                                  <h2 style={{
                                    textTransform: 'uppercase'
                                  }}>COBERTURA : {detalleSubPlan['plan']}</h2>

                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CODIGO : {detalleSubPlan['codigo_cobertura']}</p>
                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>BRIEF : {detalleSubPlan['brief']}</p>
                                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>REVISTA : {detalleSubPlan['pdf_cobetura']}</p>
                                </Typography>



                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="caption">CLIENTE</Typography>
                                <Typography variant="h4">
                                  {'RUT: ' + itemDatosAsegurado['rut_persona']}
                                  <br />

                                  {'NOMBRE: ' + itemDatosAsegurado['nombre_persona'] + ' ' + itemDatosAsegurado['apellido_persona']}
                                  <br />
                                  {'EMAIL: ' + userAccountData['email']}
                                  <br />
                                  <br />
                                </Typography>

                                <Typography variant="caption">EQUIPÖ</Typography>
                                <Typography variant="h4">

                                  {'MARCA: ' + itemDatosAsegurado['marca_equipo']}
                                  <br />
                                  {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}
                                  <br />
                                  {'IMEI: ' + itemDatosAsegurado['imei']}
                                  <br />
                                </Typography>
                              </Grid>

                            </Grid>
                          </CardContent>
                        </Card>
                        <Card lg={12}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>DETALLE</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">VALOR</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  FECHA INICIO
                    </TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">{detalleSubPlan['fecha_inicio']}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  FECHA TERMINO

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">{detalleSubPlan['fecha_termino']}</TableCell>
                              </TableRow>


                              <TableRow>
                                <TableCell component="th" scope="row">
                                  PRIMA SEGURO

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">-</TableCell>
                              </TableRow>



                              <TableRow>
                                <TableCell component="th" scope="row">
                                  PRIMA NETA

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">-</TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell component="th" scope="row">
                                  DEDUCIBLE

                    </TableCell>


                                <TableCell></TableCell>
                                <TableCell align="right">-</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell />
                                <TableCell>COSTO MENSUAL</TableCell>
                                <TableCell align="right">$275.00</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell />
                                <TableCell>COSTO ANUAL</TableCell>
                                <TableCell align="right">$275.00</TableCell>
                              </TableRow>


                              <TableRow>
                                <TableCell />
                                <TableCell>Total</TableCell>
                                <TableCell align="right"></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Card>

                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
              )}
          </CardContent>
        </Card>
      )
      }
    </Formik >
  );
}
function PlanesForm() {

  const [dplan, setDplan] = useState('');
  const [splan, setSplan] = useState('');


  function handleChangePlan(event) {
    console.log(event)

    let plan = listPlanes.find((u) => {

      return u['id'] === event.target.value


    });
    console.log("planSeleccionado", plan)
    setDplan(plan)
    planSeleccionado = plan;
    // this.setState({ value: event.target.value });
    // RenderDetallePlan(user)
  };

  function handleChangeSubPlan(event) {
    console.log(event.target.value)

    let subPlan = listSubPlanes.find((u) =>
      u['id'] === String(event.target.value));
    console.log("subPlaneSeleccionado", subPlan)
    subPlanSeleccionado = subPlan;
    setSplan(subPlan)
    // this.setState({ value: event.target.value });
    // RenderDetallePlan(user)
  };

  itemRender = ListaRender(handleChangePlan)
  itemRenderSubPlan = ListaRenderSubPlan(handleChangeSubPlan)
  itemRenderDetallePlan = dplan && RenderDetallePlan(dplan)
  itemRenderDetalleSubPlan = splan && RenderDetalleSubPlan(splan)



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
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <Grid container spacing={6} justify="center">


                  <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>

                              <Grid item md={12}>
                                {itemRender}


                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                  {itemRenderDetalleSubPlan &&  itemRenderDetallePlan}
                                </Typography>
                              </Grid>

                              <Grid item md={12}>
                                {itemRenderSubPlan}

                              </Grid>
                              <Grid item xs={12}>
                                {itemRenderDetalleSubPlan}

                              </Grid>

                            </Grid>
                          </CardContent>
                        </Card>
                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function RegistrarPerfil() {
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
            <Typography variant="h6" gutterBottom>
              REGISTRAR CUENTA USUARIO
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginBottom: '60px' }}>
            </Typography>

            {status && status.sent && (
              <Alert severity="success" my={3}>
                [CUENTA REGISTRADA] La cuenta de usuario ha sido registrada exitosamente!
              </Alert>
            )}

            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6}>
                    <Grid item md={6}>
                      <TextField
                        name="nombre_persona"
                        label="NOMBRE PERSONA"

                        value={itemDatosAsegurado['nombre_persona']}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}

                        onChange={event => SaveValueAccount("nombre_persona", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="apellido_persona"
                        label="APELLIDO PERSONA"
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['apellido_persona']}

                        onChange={event => SaveValueAccount("apellido_persona", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>

                   
                    <Grid item md={12}>
                      <TextField
                        name="direccion_persona"
                        label="DIRECCION "
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['direccion_persona']}

                        onChange={event => SaveValueAccount("direccion_persona", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>
                     
                    <Grid item md={6}>
                      <TextField
                        name="region_persona"
                        label="REGION"
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['region_persona']}

                        onChange={event => SaveValueAccount("region_persona", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="comuna_persona"
                        label="COMUNDA"
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['comuna_persona']}

                        onChange={event => SaveValueAccount("comuna_persona", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    name="email"
                    label="Email"
                    value={userAccountData['email']}
                    onChange={event => SaveValueAccount("email", event.target.value)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    type="email"
                    variant="outlined"
                    my={2}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    fullWidth
                    value={userAccountData['password']}

                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                    onChange={event => SaveValueAccount("password", event.target.value)}
                    type="password"
                    variant="outlined"
                    my={2}
                  />

                  <TextField
                    name="confirmPassword"
                    label="Confirm password"

                    fullWidth
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    onBlur={handleBlur}
                    value={userAccountData['repassword']}
                    onChange={event => SaveValueAccount("repassword", event.target.value)}
                    type="password"
                    variant="outlined"
                    my={2}
                  />

                  <Button
                    style={{ marginTop: '60px' }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    REGISTRAR USUARIO
                </Button>
                </form>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function ResumenSeguro() {
  return (
    <Card mb={6}>
      <CardContent>
        <ResumenDetail />

      </CardContent>
    </Card>
  );
}

function FlujoTerminado() {
  return (
    <Card mb={6}>
      <CardContent>
        <FlujoTerminadoRender />

      </CardContent>
    </Card>
  );
}
function EmptyCard() {
  return (
    <Card mb={6}>
      <CardContent>
        <PlanesForm />

      </CardContent>
    </Card>
  );
}

function FormularioPerfil() {
  return (
    <Card mb={6}>
      <CardContent>
        <RegistrarPerfil />

      </CardContent>
    </Card>
  );
}

function FormularioAnexos() {
  return (
    <Card mb={6}>
      <CardContent>
        <DefaultDropzone />

      </CardContent>
    </Card>
  );
}

function FormularioPlanes() {
  return (
    <Card mb={6}>
      <CardContent>
        <PlanesForm />

      </CardContent>
    </Card>
  );
}

function FormulariosIngreso() {
  return (
    <Card mb={6}>
      <CardContent>
        <BasicForm />
      </CardContent>
    </Card>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['DATOS USUARIOS', 'SEGURO', 'ADJUNTOS', ' RESUMEN', 'PERFIL'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return FormulariosIngreso();
    case 1:
      return FormularioPlanes();
    case 2:
      return FormularioAnexos();
    case 3:
      return ResumenSeguro();
    case 4:
      return FormularioPerfil();

    default:
      return 'Unknown step';
  }
}

function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    if (completedSteps() === totalSteps()) {

      return true
    }

    return false
  };




  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);

    console.log("itemdatosasegurados", itemDatosAsegurado)
    console.log("planSeleccionado", planSeleccionado)
    console.log("subPlanSeleccionado", subPlanSeleccionado)
    console.log("userAccountLogin", userAccountData)


  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();


  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>

      <div style={{ marginTop: '16px', marginBottom: '10px', display: 'flex', flexDirection: 'row', }}>
        <div style={{ flex: 1 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
            ATRAS
              </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            SIGUIENTE
              </Button>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== steps.length &&
            (completed[activeStep] ? (
              <Typography variant="caption" className={classes.completed}>
                Paso {activeStep + 1} completado
              </Typography>
            ) : (
                <Button variant="contained" color="primary" onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1 ? 'FINALIZAR' : 'COMPLETAR'}
                </Button>
              ))}
        </div>
      </div>

      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Card mb={6}>
              <CardContent>
                <FlujoTerminado />
              </CardContent>
            </Card>

            <Button onClick={handleReset}>Reiniciar</Button>
          </div>
        ) : (
            <div  >


              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </div>
          )}
      </div>
    </div>
  );
}


function FlujoCompra() {


  return (
    <React.Fragment>
      <Helmet title="Flujo de compra" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>
        <Typography variant="h3" gutterBottom display="inline">
          Flujo de compra
      </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            KIRAWEBAPP
        </Link>
          <Link component={NavLink} exact to="/">
            SEGUROS
        </Link>
          <Typography>FLUJO DE COMPRA</Typography>
        </Breadcrumbs>
        <Grid style={{ marginTop: '12px' }}>
          <div style={{ width: '100%', height: '210px', background: 'red' }}>
            <img src="https://sfestaticos.blob.core.windows.net/argentina/home/secciones/banner-accidentes-personales-desktop.jpg" style={{ width: '100%', height: '100%' }} />

          </div>
        </Grid>
        <Divider my={6} />
        <HorizontalNonLinearStepper>

        </HorizontalNonLinearStepper>
      </Grid>

    </React.Fragment>
  );
}

export default FlujoCompra;
