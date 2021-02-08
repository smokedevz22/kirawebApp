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
import moment from 'moment';
import Amplify, { Storage } from 'aws-amplify';


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


function DefaultDropzone() {
  return (
      <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          SUBIR FOTOS
        </Typography>
       

        <Spacer mb={4} />

        <Grid container lg={12}  >
         

          {itemDatosAsegurado['tipo_siniestro'] === 'parcial' ? (<Grid item lg={12} style={{display:'flex'}}>
        
        
         <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO DETALENTERA CI
            
                </Typography>
            
                <DropzoneArea dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_DELANTERA")

                        }                 acceptedFiles={['image/*']}  
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
<Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO TRASERA CI
            
                </Typography>
            
                <DropzoneArea dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_TRASERA")

                        }                 acceptedFiles={['image/*']} 
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

            <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO DEL EQUIPO
            
                </Typography>
            
                <DropzoneArea dropzoneText={''} onChange={event =>
                          guardarImagen(event, "EQUIPO")

                        }                 acceptedFiles={['image/*']}  
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                 C SERVICIO TECNICO
            
        </Typography>
             
            <DropzoneArea dropzoneText={''} onChange={event =>
              guardarImagen(event, "SERVICIO_TECNICO")

            }     acceptedFiles={['image/*']}   
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
              </Grid>
          ):''}

       

          {itemDatosAsegurado['tipo_siniestro'] === 'total' ? (<Grid item lg={12} style={{ display: 'flex' }}>
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO DETALENTERA CI
            
                </Typography>
            
                <DropzoneArea dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_DELANTERA")

                        }                 acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>
            
<Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO TRASERA CI
            
                </Typography>
            
                <DropzoneArea dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_TRASERA")

                        }                 acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                COTIZACIONES SERVICIO TECNICO
            
        </Typography>
             
            <DropzoneArea dropzoneText={''} onChange={event =>
              guardarImagen(event, "SERVICIO_TECNICO")

            }     acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
              </Grid>
          ):''}
          
    
          {itemDatosAsegurado['tipo_siniestro'] === 'robo' ? (<Grid  lg={12} style={{display:'flex', flexDirection:'row'}}>
 
            <Grid item lg={6} style={{ marginTop: '22px', paddingRight: 6,  }}>
              <Typography variant="h6" style={{ color: '#0fb6e9', textTransform: 'uppercase' }}  >
                Foto Delantera CI 
                 
             </Typography>
            <DropzoneArea dropzoneText={''} onChange={event =>
              guardarImagen(event, "CARNET_DELANTERA")

            }                    acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
              filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>
            

                     

            <Grid  item lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' , textTransform:'uppercase'}}  >
                Foto Trasera CI
                 
        </Typography>
            
            <DropzoneArea dropzoneText={''} onChange={event =>
              guardarImagen(event, "CARNET_TRASERA")

            }              acceptedFiles={['image/*']}  
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>
            



            <Grid lg={6} style={{ marginTop: '22px' }}>
              <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                PARTE POLICIAL

        </Typography>

              <DropzoneArea dropzoneText={''} onChange={event =>
                guardarImagen(event, "PARTE_POLICIAL")

              } acceptedFiles={['image/*']} 
                filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>

              </Grid>
          ):''}
            

        </Grid>


      </CardContent>
    </Card>
  
  );
}


let listaImagenesSeguro = {}
async function guardarImagen(item, titulo) {

  console.log("asdads", item)
  if (item[0]) {
    console.log("asdad", item[0])
    await Storage.put(item[0].name, item[0])
      .then(result => {

        console.log("RESULTTT", result)

        listaImagenesSeguro[titulo] = 'https://kirastoragebucket112236-dev.s3.us-east-2.amazonaws.com/public/' + result['key']


        console.log("lista", listaImagenesSeguro)


      }) // {key: "test.txt"}
      .catch(err => console.log(err));

  }
}


function AlertDialog() {
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
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
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
  codigo_producto
    plan
    nombre_plan
    caracteristicas
    brief
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



    return < select style={{ width: '100%', height: '40px' }} onChange={functionRenderDetalle} >
      < option value="_" > SELECCIONAR PLAN</option >

      {
        listaPlanes.map(item => {
          console.log(item);
          return <option value={item['codigo_producto']}> {item['nombre_plan']}</option>

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
  codigo_producto
    plan
    nombre_plan
    caracteristicas
    brief
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



    return < select style={{ width: '100%', height: '40px' }} onChange={functionRenderDetalle} >
      < option value="_"  > SELECCIONAR PLAN</option >

      {
        listaSubPlanes.map(item => {
          console.log(item);
          return <option value={item['codigo_producto']}> {item['nombre_plan']}</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}

function RenderDetallePlan(detalle) {
  // const [detallePlan, setDetallePlan] = useState({});

  console.log("DETALLE_PLAN", detalle)
  if (detalle) {
    //setDetallePlan(detalle)
    return (<Grid>
      <Grid>

        <Typography variant="h6" gutterBottom>

          <h2>NOMBRE PLAN : {detalle['nombre_plan']}</h2>
          <p>CARACTERISTICAS : {detalle['caracteristicas']}</p>
          <p>BRIEF : {detalle['brief']}</p>

        </Typography>
      </Grid>
    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}

function RenderDetalleSubPlan(detalle) {
  // const [detallePlan, setDetallePlan] = useState({});

  console.log("DETALLE_PLAN", detalle)
  if (detalle) {
    //setDetallePlan(detalle)
    return (<Grid>
      <Grid>

        <Typography variant="h6" gutterBottom>

          <h2>NOMBRE SUBPLAN : {detalle['nombre_plan']}</h2>
          <p>CARACTERISTICAS : {detalle['caracteristicas']}</p>
          <p>BRIEF : {detalle['brief']}</p>

        </Typography>
      </Grid>
    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}

function BasicForm() {
  let data = ListaRenderPolizas();

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
                    <Grid item md={12}>

                      <h4>¿En que poliza deseas registrar un siniestro?</h4>

                      {data}
                    </Grid>
                    <Grid item md={6}>

                      <h4>¿Cuando ocurrió?</h4>

                      <form noValidate>
                        <TextField
                          style={{ marginTop: 8 }}
                          id="fecha_siniestro"
                          label="FECHA SINIESTRO"
                          type="date"
                          fullWidth
                          value={itemDatosAsegurado['fecha_siniestro']}
                          onChange={event => SaveValue("fecha_siniestro", event.target.value)} variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
                    </Grid>
                    <Grid item md={6}>

                      <h4>¿Qué ocurrió?</h4>

                      <select style={{ height: 50, width:'100%', marginTop:10, padding:6 }}
                        onChange={event => SaveValue("tipo_siniestro", event.target.value)}
                      >
                        <option  >SELECCIONAR OCURRIDO</option>

                        <option value="parcial">DAÑO PARCIAL</option>
                        <option value="total">DAÑO TOTAL</option>
                        <option value="robo">ROBO</option>

                      </select>
                    </Grid>
                    <Grid item md={12}>

                      <h4>Describa lo ocurrido</h4>

                      <textarea
                        rows="12"
                        placeholder="Ingrese descripcion de lo ocurrido..."
                        style={{ width: '100%', padding:12 }}
                        name="descripcion_siniestro"
                        fullWidth
                        value={itemDatosAsegurado['descripcion_siniestro']}
                        onBlur={handleBlur}
                        onChange={event => SaveValue("descripcion_siniestro", event.target.value)}

                      />
                    </Grid>



                  </Grid>


                </form>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function ResumenDetail() {

  console.log("itemAsegurado",itemDatosAsegurado)
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


  console.log("listaIMAGENES", listaImagenesSeguro)
  console.log("itemDatosAsegurado", itemDatosAsegurado)
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
                                <Typography variant="h3" gutterBottom>
                                  {'DECLARACION DE SINIESTRO:  ' + moment(itemDatosAsegurado['fecha_siniestro']).format('DD-MM-YYYY')}
                                </Typography>
                              </Grid>



                              <Grid item xs={12}>

                                <Grid item lg={12}>
                                  <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '22px', marginTop: 12 }}>    RESUMEN SINIESTRO</span>

                                    <Grid style={{ marginTop: 22 }}>

                                      <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                        MI CELULAR
                          </Typography>

                                      <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                        SAMSUNG - GALAXY S20  
                                      </Typography>
                                    </Grid>

                                    <Grid style={{ marginTop: 22 }}>

                                      <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                        FECHA DECLARACION
                          </Typography>

                                      <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                        {moment(itemDatosAsegurado['fecha_siniestro']).format("DD-MM-YYYY")}
                                      </Typography>
                                    </Grid>



                                  </div>
                                </Grid>


                              </Grid>

                              <Grid style={{ marginTop: 22, paddingLeft: 12}}>

                                <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                  RESUMEN
                          </Typography>
                                <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                  {itemDatosAsegurado['descripcion_siniestro']}

                                </Typography>


                              </Grid>


                              <Grid lg={12} style={{   paddingLeft: 12, marginTop: 32 }}>

                                <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                  FOTOS ADJUNTAS
                          </Typography></Grid> 
                              <Grid   lg={12} style={{display:'flex',paddingLeft:12, marginTop:22}} >
                               
                                 
                                {itemDatosAsegurado['tipo_siniestro'] === 'parcial' ? (<Grid lg={12} style={{ display: 'flex' }}><Grid lg={3} style={{ paddingRight: 2 }}>
                                  <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                    <img style={{ width: '100%', height: '100%' }}  style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['EQUIPO']} />
                                  </div>
                                </Grid>
                                <Grid item lg={3} style={{ paddingRight: 2 }}>
                                  <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['SERVICIO_TECNICO']} />
                                  </div>
                                  </Grid>

                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['CARNET_DELANTERA']} />
                                    </div>
                                  </Grid>


                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['CARNET_TRASERA']} />
                                    </div>
                                  </Grid>
                                </Grid>
                                ) : ''}

                                


                                {itemDatosAsegurado['tipo_siniestro'] === 'total' ? (<Grid lg={12} style={{ display: 'flex' }}>
                                   
                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['SERVICIO_TECNICO']} />
                                    </div>
                                  </Grid>

                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['CARNET_DELANTERA']} />
                                    </div>
                                  </Grid>


                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['CARNET_TRASERA']} />
                                    </div>
                                  </Grid>
                                </Grid>
                                ) : ''}

                             
                                

                                {itemDatosAsegurado['tipo_siniestro'] === 'robo' ? (<Grid lg={12} style={{ display: 'flex' }}>
      
                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['PARTE_POLICIAL']} />
                                    </div>
                                  </Grid>

                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['CARNET_DELANTERA']} />
                                    </div>
                                  </Grid>


                                  <Grid item lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }}  src={listaImagenesSeguro['CARNET_TRASERA']} />
                                    </div>
                                  </Grid>
                                </Grid>
                                ) : ''}


                               
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
                                    <h2>SINIESTRO INGRESADO</h2>
                                  </Typography>
                                  
                                  <Typography variant="body2" gutterBottom>

                                    <a href="#">DESCARGAR PDF</a>
                                  </Typography>

                                </div>
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

    let plan = listPlanes.find(u => u['codigo_producto'] === event.target.value);
    console.log("planSeleccionado", plan)
    setDplan(plan)
    planSeleccionado = plan;
    // this.setState({ value: event.target.value });
    // RenderDetallePlan(user)
  };

  function handleChangeSubPlan(event) {
    console.log(event.target.value)

    let subPlan = listSubPlanes.find((u) =>
      u['codigo_producto'] === String(event.target.value));
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
                                  {itemRenderDetallePlan}
                                </Typography>
                              </Grid>

                              <Grid item md={12}>
                                {itemRenderSubPlan}

                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                  {itemRenderDetalleSubPlan}

                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="caption">Client</Typography>
                                <Typography variant="body2">
                                  Anna Walley
                      <br />
                      4183 Forest Avenue
                      <br />
                      New York City
                      <br />
                      10011
                      <br />
                      USA
                      <br />
                                  <Link href="mailto:anna@walley.com">anna@walley.com</Link>
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="caption" align="right" display="block">
                                  Payment To
                    </Typography>
                                <Typography variant="body2" align="right">
                                  Material App LLC
                      <br />
                      354 Roy Alley
                      <br />
                      Denver
                      <br />
                      80202
                      <br />
                      USA
                      <br />
                                  <Link href="mailto:info@material-app.com">
                                    info@material-app.com
                      </Link>
                                </Typography>
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
                        onBlur={handleBlur}

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
                        onBlur={handleBlur}
                        value={itemDatosAsegurado['apellido_persona']}

                        onChange={event => SaveValueAccount("apellido_persona", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    name="email"
                    label="Email"
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
  return ['INGRESAR SINIESTRO', 'SUBIR FOTOS', ' RESUMEN SINIESTRO'];
}


let mensajeBotonSiguiente = 'SUBIR FOTOS'
function getStepContent(step) {
  switch (step) {
    case 0:
      mensajeBotonSiguiente = 'SUBIR FOTOS'
      return FormulariosIngreso();

    case 1:
      mensajeBotonSiguiente = 'RESUMEN SINIESTRO'
      return FormularioAnexos();
    case 2:
      mensajeBotonSiguiente = 'FINALIZAR DECLARACION'

      return ResumenSeguro();

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

      registrarProducto()
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
      {allStepsCompleted() ? (<Grid></Grid>) : (
        
        <div style={{display: 'flex'}}>
          <Grid item lg={6}>

          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
            ATRAS
              </Button>
          </Grid>

          <Grid item lg={6} style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" color="primary" onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'FINALIZAR DECLARACION' : mensajeBotonSiguiente }
            </Button>
          </Grid>

        </div>
      )}

    </div>
  );
}

async function registrarProducto() {

  const mutation = `
  mutation MyMutation($bank:registrarNuevoSiniestroInput!) {
  registrarNuevoSiniestro (input:$bank){
    data_siniestro
  }
}
`;

  let dataSave = JSON.stringify({
    detalle: itemDatosAsegurado,
    imagenes: listaImagenesSeguro
  });

  console.log("save", dataSave)
  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_siniestro: dataSave

      }
    }

  });
  console.log("SINIESTRO REGISTRADO EXITOSAMENTE!");

}

const ListaRenderPolizas = (obtenerListaProductos) => {
  const [polizas, setPolizas] = useState('undefined');



  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   listasPolizas {
     id
    data_poliza
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
    setPolizas(data)

  }, [])

  console.log("polizaaa", polizas)

  if (polizas && polizas['data']) {

    console.log("productos", polizas['data']['listasPolizas']);

    let listProductos = polizas['data']['listasPolizas'];
    console.log("listaProductos", listProductos)

    return <select style={{ width: '100%', height: 40 }}>

      {listProductos &&
        listProductos.map((item, index) => {
          console.log(item);

          let itemTemporal = JSON.parse(item['data_poliza']);
          let itemPlan = JSON.parse(itemTemporal['plan']['data_plan'])
          let itemSubPlan = JSON.parse(itemTemporal['subplan']['data_sub_plan'])


          console.log(itemTemporal)

          return (<option>
            {itemTemporal['asegurado']['marca_equipo'] + ' - ' + itemTemporal['asegurado']['modelo_equipo'] + " - " + itemSubPlan['nombre']}

          </option>)
        })
      }
    </select>
  } else {

    return polizas && 'cargando...'

  }



}

function DeclaracionSiniestroGlobal() {


  return (
    <React.Fragment>
      <Helmet title="Flujo de compra" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>

        <Typography variant="h3" gutterBottom display="inline">
          DECLARACION DE SINIESTRO
      </Typography>

     
        <Grid style={{ marginTop: '12px' }}>
          <div style={{ width: '100%', height: '210px',    }}>
            <img src="/static/img/imagen_prote.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          </div>
        </Grid>
        <Divider my={6} />
        <HorizontalNonLinearStepper>

        </HorizontalNonLinearStepper>

      </Grid>
    </React.Fragment>
  );
}

export default DeclaracionSiniestroGlobal;
