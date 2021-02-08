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
import Amplify ,{ API, Storage } from "aws-amplify";
import { Route } from 'react-router-dom'
import AppBar from "../presentation/Landing/HomeBar";
import moment from 'moment';
import { Auth } from 'aws-amplify';


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
  Chip as MuiChip,
 
  Paper as MuiPaper,

  TextField as MuiTextField,
  Typography,
  Select,
} from "@material-ui/core";

 import { Alert as MuiAlert } from "@material-ui/lab";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";

import {
  Done as DoneIcon,
  Face as FaceIcon,
  NewReleases,
  BurstMode as BurstModeIcon,
  Description as DescriptionIcon,
  TagFaces as TagFacesIcon,
} from "@material-ui/icons";
import { spacing, display } from "@material-ui/system";

const Chip = styled(MuiChip)(spacing);
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




let listPlanes = [];
let listSubPlanes = [];
let listCoberturas = [];

let itemRender = 'cargando';
let itemRenderSubPlan = 'cargando';
let itemRenderDetallePlan = 'cargando'
let itemRenderDetalleSubPlan = 'cargando'

let planSeleccionado = {};
let subPlanSeleccionado = {};


let itemDatosAsegurado = {};
let userAccountData = {};
let detallesExtras = {};



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
    subplan: subPlanSeleccionado,
    detalles:detallesExtras
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
          subplan: subPlanSeleccionado,
          detalles: detallesExtras,
          imagenes: listaImagenesSeguro
        }),

      }
    }

  });
  console.log("USUARIO REGISTRADO EXITOSAMENTE!");

}

let listaImagenesSeguro = {}

async function guardarImagen(item,titulo)
{ 

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

function DefaultDropzone() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
        SUBA LAS SIGUIENTES FOTOS
        </Typography>
       
        <Spacer mb={4} />

        <Grid container lg={12}  >
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
                FOTO BOLETA EQUIPO
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }} >
               TOME UNA FOTO DONDE SE VEA CLARAMENTE LA BOLETA DEL EQUIPO
        </Typography>
            <DropzoneArea dropzoneText={''}
              onChange={event =>  
                guardarImagen(event,"BOLETA_EQUIPO")
                
            }
              acceptedFiles={['image/*']}  
              filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />



          </Grid>

          <Grid lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                FOTO NUMERO DE SERIE
            
        </Typography>
            <Typography variant="body2" style={{marginTop:6, marginBottom:6}} >
               PUEDE ENCONTRAR EL NUMERO DE SERIE EN LA CAJA DEL MISMO DISPOSITIVO
        </Typography>
            <DropzoneArea
              onChange={event =>  
                guardarImagen(event, "NUMERO_SERIE")

              }   dropzoneText={''} acceptedFiles={['image/*']} 
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
              FOTO DE IMEI
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }} >
            PUEDE ENCONTRAR EL IMEI EN LA CAJA DEL EQUIPO <a href="#">EJEMPLO</a>
        </Typography>
            <DropzoneArea dropzoneText={''}
              onChange={event =>
                guardarImagen(event, "IMEI")

              }
              acceptedFiles={['image/*']} 
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          <Grid lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color:'#0fb6e9'}} >
           FOTO DEL EQUIPO
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }}>
               TOME UNA FOTO DONDE SE VEA CLARAMENTE SU DISPOSITIVO
        </Typography>
            <DropzoneArea   
              dropzoneText={''} onChange={event => 
                guardarImagen(event, "EQUIPO")

              }                 acceptedFiles={['image/*']} 
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
              {"Buscar el número de serie o el IMEI del iPhone"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{display:'flex', flexDirection:'column'}}>

                <Grid item lg={12}> 
                {`Para encontrar el IMEI puedes ver el instructivo para buscar el modelo y numero de serie del
equipo.
Puedes conseguirlo también marcando el *#06# en tu celular y te aparecerá la información en
pantalla.` }
                
                </Grid>
   
                <Grid item lg={12} style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:20}}> <img style={{ width: 200 }} src="https://elandroidelibre.elespanol.com/wp-content/uploads/2016/10/saber-imei-002.jpg" />
            </Grid>
              
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

 

function AlertDialogCotizacion() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRegistrar = () => {
    registrarCotizacion();
    setOpen(false);
  };

  const handleCancelar = () => {
     setOpen(false);
  };
  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={4}>
        

          <Grid>        <Button variant="contained" color="primary" mt={2} style={{ marginTop: '22px' }} onClick={handleClickOpen}>
            GUARDAR COTIZACION
                                   </Button>

            <Button variant="contained" color="primary" style={{ marginLeft: '22px', marginTop: '22px'}} mt={2} onClick={fnxCompleteStep}>
              CONTRATAR SEGURO
                                   </Button></Grid>
          <Dialog
            open={open}
            onClose={handleCancelar}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Guardar cotizacion"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                SE DEJARA UNA COTIZACION EN LOS DETALLES DE SU CUENTA
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={handleCancelar} color="primary" autoFocus>
                CANCELAR
              </Button>
              <Button onClick={handleRegistrar} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card >
  );
}



function AlertCompletarFormulario(props) {


  console.log("props",props)
  const [open, setOpen] = React.useState(false);

  let itemSubPlan = JSON.parse(subPlanSeleccionado['data_sub_plan'])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRegistrar = () => {
     //ssetOpen(false);
    props.onClick()
    registrarProducto();

   };

  const handleCancelar = () => {
    setOpen(false);
 
  };
  return (
     <Grid>
          <Button variant="contained" color="primary" mt={2} style={{ marginTop: '22px' }} onClick={handleClickOpen}>
            FINALIZAR COMPRA
                                   </Button>
          <Dialog
            open={open}
            onClose={handleCancelar}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"ACEPTACION DE LA POLIZA DE SEGURO"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
            <Grid>
              <Typography   gutterBottom>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}> 
                  La poliza del seguro sera enviada a su correo electronico registrado</p>

                <h4 style={{
                  marginTop:22,
                  textTransform: 'uppercase'
                }}>COBERTURAS (DEDUCIBLE)
 </h4>

                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CAPITAL ASEGURADO : <strong> {itemSubPlan['capital']} UF</strong></p>
                <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL  ( DEDUCIBLE DE  {detallesExtras['CL-Daño-Total']} UF )</p>
 
                <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL  ( DEDUCIBLE DE {detallesExtras['CL-Daño-Parcial']} UF) </p>
                <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO ( DEDUCIBLE DE  {detallesExtras['CL-Robo']} UF)</p>
               
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong> {itemSubPlan['precio_mensual']} UF  </strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px', marginTop: 22 }}><strong>El riesgo es asegurado por Chubb Compañía de Seguros Generales S.A</strong></p>


              </Typography>
           </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={handleCancelar} color="primary" autoFocus>
                CANCELAR
              </Button>
              <Button onClick={handleRegistrar} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
    </Grid>

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
              {"¿Cómo buscar el modelo y el número de serie de mi Smartphone?"}
            </DialogTitle>
            <DialogContent>
            
              <DialogContentText id="alert-dialog-description" style={{ display: 'flex', flexDirection: 'column' }}>

                <Grid item lg={12}>
                  {`Para obtener el numero de serie de su telefon debe ir a:   Configuraciones > Informacion del telefono > estado` }
                </Grid>
 
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

function SaveValue(key, value) {
  itemDatosAsegurado[key] = value
}


function SaveValueAccount(key, value) {
  userAccountData[key] = value
}

async function obtenerListaItems() {

  listCoberturas = []
  const queryListaActividadGraphql = `
 query MyQuery {
   listasCoberturas{
     id
     id_sub_plan
    data_cobertura
  }
}

`;

  console.log(queryListaActividadGraphql)
  const data = await API.graphql({
    query: queryListaActividadGraphql
  });
  console.log("data from GraphQL:", data);
 
  let listasProductos = data['data']['listasCoberturas'];
  listasProductos && listasProductos.forEach(element => {

    let itemPlan = JSON.parse(element['data_cobertura'])
    let itemCobertura = {
      ...itemPlan,
      id: element['id'],
      id_sub_plan: element['id_sub_plan']

     }
    console.log(itemCobertura);
    listCoberturas.push(itemCobertura);
  
  });
  console.log(listCoberturas)


  return true;
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
      < option value="_"  > SELECCIONAR BANDA</option >

      {
        listaSubPlanes.map(item => {
          console.log(item);
          let itemSubPlan = JSON.parse(item['data_sub_plan'])
          return <option style={{ textTransform: 'uppercase' }} value={item['id']}> {itemSubPlan['nombre']} + {itemSubPlan['capital']} UF</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}

function RenderDetallePlan(item, subplan, showButtons) {
  // const [detallePlan, setDetallePlan] = useState({});

  let detalle = JSON.parse(item['data_plan'])
  let detalleSubPlan = JSON.parse(subplan['data_sub_plan'])

  console.log("DETALLE_PLAN", detalle)

  if (detalle) {

    cargarDetallesCobertura(subplan)
    //setDetallePlan(detalle)
    return (<Grid  lg={12}>
     <Grid   lg={12}>
    <Grid item lg={12}>

          <Typography variant="h2" gutterBottom style={{ marginTop: 12 }}>
            {detalle['nombre_plan']}   {detalleSubPlan['nombre']}


          </Typography>

          <Typography variant="body2" gutterBottom>
            <p>El capital asegurado es el valor máximo a cubrir en caso de robo, pérdida parcial o total.</p>

          </Typography>
        </Grid> 

        <Grid item lg={12}>
          <Typography variant="h6" gutterBottom>

            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}></p>
            <Chip
            
              avatar={<CheckCircle style={{ color: 'green' }} />}
              label={`CAPITAL ASEGURADO :  ${detalleSubPlan['capital']} UF `}
               m={1}
            />
          
            <h2 style={{
              textTransform: 'uppercase'
            }}>CARACTERISTICAS </h2>

            <Grid style={{ display: 'flex' }} item lg={12}>
              <Grid item lg={4}>
                <h4> COBERTURAS (DEDUCIBLE) </h4>
                <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL (DEDUCIBLE DE UF) </p>
                <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL (DEDUCIBLE DE UF)   </p>
                <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO (DEDUCIBLE DE UF) : </p>
              </Grid>
              <Grid item lg={4}>
                <h4>VIGENCIA</h4>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>

              </Grid>
              <Grid item lg={4}>

                <h4>PRIMA</h4>

              <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong>{detalleSubPlan['precio_mensual']} UF  </strong></p>
             

            </Grid>

            
        </Grid>
          </Typography>
        </Grid>
        <Chip
          style={{ textTransform: 'uppercase', fontSize: '12px', marginTop: 42 }}
          avatar={<CheckCircle style={{ color: 'green' }} />}
          label={`El riesgo es asegurado por Chubb Compañía de Seguros Generales S.A`}
          m={1}
        />

        {showButtons ? <Grid lg={12} >

          <div style={{ display: 'flex', width: '100%' }}>
            <AlertDialogCotizacion />

          </div>


        </Grid> : ''}

       
      </Grid>



     </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}


function cargarDetallesCobertura(item) {


  console.log("listaItems", item)
  
  let listaTemporalCoberturas = []

  let cargarDetalleCob = async function () {
    listCoberturas && listCoberturas.forEach((data) => {

      console.log("cobertura", data)
      console.log("subplan", item)

      if (data['id_sub_plan'] === item['id']) {

        console.log("....---COBERTURAS---...")
        listaTemporalCoberturas.push(data)
      }
    })
  };
  
  cargarDetalleCob().then((data) => {
    console.log("lista", listaTemporalCoberturas)


    listaTemporalCoberturas.find((item) => { 

      switch (item['codigo_cobertura']) { 

        case "CL-Daño-Total":
          document.getElementById('cobertura_total').innerHTML = 'DEDUCIBLE DE DAÑO TOTAL : <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Daño-Total": item['deducible']
          }
          break;
        
        case "CL-Daño-Parcial":
          document.getElementById('cobertura_parcial').innerHTML = 'DEDUCIBLE DE DAÑO PARCIAL  : <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Daño-Parcial": item['deducible']
          }
          break;

        case "CL-Robo":
          document.getElementById('cobertura_perdida').innerHTML = 'DEDUCIBLE DE ROBO  :  <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Robo": item['deducible']
          }
          break;

      }
    })
  })

}



function RenderDetalleSubPlan(item) {
  // const [detallePlan, setDetallePlan] = useState({});


  let detalle = JSON.parse(item['data_sub_plan'])
 
  
 
  console.log("DETALLE_SUBPLAN", detalle)

  if (detalle) {
 
    //setDetallePlan(detalle)
    return (<Grid lg={12}>

      
  
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
                    

                    <Grid item md={12}>
                      <span style={{ fontWeight: 'bold', fontSize: '22px' , marginTop:12}}> INFORMACION PERSONAL</span>
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
                        name="email"
                        label="CORREO ELECTRONICO "
                        value={itemDatosAsegurado['email']}
                        fullWidth
                        onChange={event => SaveValue("email", event.target.value)}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <span style={{ fontWeight: 'bold', fontSize: '22px' }}>MI CELULAR</span>
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
 

                        <option  > Galaxy S5</option>
                           <option >Galaxy S6</option>
                           <option >Galaxy S7</option>
                           <option >Galaxy S8</option>
                           <option >Galaxy S9</option>
                           <option >Galaxy S10</option>
                          <option >Galaxy S10 +</option>
                           <option >Galaxy S20</option>
                          <option >Galaxy S20+</option>
                          <option >Galaxy S20+ Ultra</option>
                           <option >Galaxy A10</option>
                           <option >Galaxy A20</option>
                           <option >Galaxy A30</option>
                           <option >Galaxy A40</option>
                           <option >Galaxy A50</option>
                           <option >Galaxy A60</option>
                           <option >Galaxy A70</option>
                           <option >Galaxy A80</option>
                           <option >Galaxy A90</option>
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

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegistrarCotizacion = () => {

    registrarCotizacion();
  };

  const showAlertCotizacion = () => {
  console.log("ada")
  
    return (
      <Paper mt={4}>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Se ha registrado exitosamente su cotizacion"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleRegistrarCotizacion} color="primary" autoFocus>
            ACEPTAR
              </Button>
        </DialogActions>
        </Dialog>
        </Paper>

  )
     
  };
  
  itemRenderDetallePlan =  RenderDetallePlan(planSeleccionado, subPlanSeleccionado,false)
  itemRenderDetalleSubPlan =   RenderDetalleSubPlan(subPlanSeleccionado)


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





                              <Grid item lg={6}>
                                <h2>RESUMEN</h2>
                              </Grid>
                          
                              <Grid lg={12}  >
                                
                                <Typography variant="h5">
                                  NOMBRE:  {itemDatosAsegurado['nombre_persona']}

                                </Typography>
                                <Typography variant="h5" style={{ marginTop: 6 }}>
                                  EMAIL:  {itemDatosAsegurado['email'] }

                                </Typography>
                                <Typography variant="h5" style={{marginTop:6}}>
                                  {'MARCA CELULAR: ' + itemDatosAsegurado['marca_equipo']}

                                </Typography>
                                <Typography variant="h5" style={{ marginTop: 6 }}>
                                  {'MODELO: ' + itemDatosAsegurado['modelo_equipo']}

                                </Typography>
                                <Typography variant="h5" style={{ marginTop: 6 }}>
                                  {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}

                                </Typography>
                                <Typography variant="h5" style={{ marginTop: 6 }}>
                                  {'IMEI: ' + itemDatosAsegurado['imei']}

                                </Typography>
                                
                                <Typography variant="body2" gutterBottom>
                                  {itemRenderDetalleSubPlan && itemRenderDetallePlan}
                                </Typography>

                              </Grid>

                              <Grid>

                                {itemRenderDetalleSubPlan && itemRenderDetalleSubPlan}

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

  let showButtons = false; 

  itemRenderDetallePlan = RenderDetallePlan(planSeleccionado, subPlanSeleccionado, showButtons)
 

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
                                    <h2>POLIZA EMITIDA</h2>
                                  </Typography>
                            
                                  
                                  <Typography variant="p" gutterBottom>

                                    <span>La poliza ha sido enviada a su correo electronico</span>
                                  </Typography>

                                  <Typography variant="body2" gutterBottom>

                                    <a href="#">DESCARGAR POLIZA</a>
                                  </Typography>

                                </div>
                              </Grid>

                              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                                <Typography variant="h2" gutterBottom>
                                  <h2>RESUMEN</h2>
                                </Typography>
                              </div>

                              <Grid item lg={6}>
                                <Typography variant="caption">CLIENTE</Typography>
                                <Grid style={{ display: 'flex', flexDirection: 'column', marginTop: 6}}>
                                  <span style={{ textTransform: 'uppercase', fontSize: '14px' }}> {'NOMBRE: ' + itemDatosAsegurado['nombre_persona']}
                                  </span>
                                  <span style={{ textTransform: 'uppercase', fontSize: '14px' }}>  {'EMAIL: ' + userAccountData['email']}</span>
                                 
                                </Grid>

                              </Grid>

                              <Grid item lg={6}>
                        
                                <Typography variant="caption">EQUIPO</Typography>
                               

                                <Grid style={{ display: 'flex', flexDirection: 'column' , marginTop:6}}>
                                  <span  style={{ textTransform: 'uppercase', fontSize: '14px' }}>   {'MARCA: ' + itemDatosAsegurado['marca_equipo']}
                                  </span>
                                  <span  style={{ textTransform: 'uppercase', fontSize: '14px' }}> {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}</span>
                                  <span  style={{ textTransform: 'uppercase', fontSize: '14px' }}>  {'IMEI: ' + itemDatosAsegurado['imei']}</span>

                                </Grid>
                              </Grid>
  
                              <Grid item lg={12}>
                                   {itemRenderDetallePlan && itemRenderDetallePlan}
 
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

let fnxCompleteStep = '';

function PlanesForm(props) {


  console.log("prooops", props)
  fnxCompleteStep = props.fn;
  
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
  itemRenderDetallePlan = splan && dplan && RenderDetallePlan(dplan, splan, true)
 


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
                    <Grid item md={12}>
                      <span style={{ fontWeight: 'bold', fontSize: '22px', marginTop: 12 }}> SELECCIONAR PLAN</span>
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>

                              <Grid item md={12}>
                                {itemRender}


                              </Grid>
                              

                              <Grid item md={12}>
                                {itemRenderSubPlan}

                              </Grid>
                              <Grid item xs={12}>
                                   {itemRenderDetalleSubPlan && itemRenderDetallePlan}
                            

 
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
                        name="nombre_persona"
                        label="NOMBRES"

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


                      <form noValidate>
                        <TextField
                          style={{ marginTop: 8 }}
                          id="fecha_nacimiento"
                          label="FECHA NACIMIENTO"
                          type="date"
                          fullWidth
                          value={itemDatosAsegurado['fecha_nacimiento']}
                          onChange={event => SaveValueAccount("fecha_nacimiento", event.target.value)} variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
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


                      <select onChange={event => SaveValue("genero", event.target.value)} style={{ width: '100%', height: '50px' }}>
                        <option > SELECCIONAR GENERO </option>
                        <option value="femenino"> FEMENINO </option>
                        <option value="masculino"> MASCULINO </option>
                      </select>
                    </Grid>
                    <Grid item md={6}>

 
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="calle"
                        label="CALLE "
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['calle']}

                        onChange={event => SaveValueAccount("calle", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>
 


                    <Grid item md={6}>
                      <TextField
                        name="numero_dpto"
                        label="NUMERO DPTO/CASA "
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['numero_dpto']}

                        onChange={event => SaveValueAccount("numero_dpto", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>


                    <Grid item md={6}>
                      <TextField
                        name="comuna"
                        label="COMUNA "
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['comuna']}

                        onChange={event => SaveValueAccount("comuna", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>


                    <Grid item md={6}>
                      <TextField
                        name="ciudad"
                        label="CIUDAD "
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['ciudad']}

                        onChange={event => SaveValueAccount("ciudad", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>


                    <Grid item md={6}>
                      <TextField
                        name="region"
                        label="REGION "
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth

                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['region']}

                        onChange={event => SaveValueAccount("region", event.target.value)} variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="pais"
                        label="PAIS"
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        value={itemDatosAsegurado['pais']}
                        fullWidth

                        onChange={event => SaveValueAccount("pais", event.target.value)} variant="outlined"
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
                    onClick={async (event) => {
                      await Auth.signUp(userAccountData.email, userAccountData.password).then((data) => {
                        console.log("usuarioRegistrado", data)
                        // history.push("/pages/mi_cuenta");
                        // 
                      })
                     }}
                  >
                    GUARDAR
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
        <FlujoTerminadoRender  />

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

function FormularioPlanes(fnCompleteStep) {
  return (
    <Card mb={6}>
      <CardContent>
        <PlanesForm fn={fnCompleteStep}  />

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
  return ['INFORMACION PERSONAL & CELULAR', 'SELECCIONAR PLAN', 'SUBIR FOTOS' , 'COMPRAR SEGURO'];
}

let txBotonContinuar = 'SIGUIENTE'

function getStepContent(step, fnCompleteStep) {

  fnxCompleteStep = fnCompleteStep
  switch (step) {
    case 0:
      txBotonContinuar = 'SELECIONAR PLAN'
      setPImagen('banner_06_on.png')
      setSImagen('banner_07_off.png')
      setTImagen('banner_08_off.png')
       setQImagen('banner_10_off.png')

      return FormulariosIngreso();
    case 1:

      setPImagen('banner_06_off.png')
      setSImagen('banner_07_on.png')
      setTImagen('banner_08_off.png')
       setQImagen('banner_10_off.png')
      
      txBotonContinuar = 'SUBIR FOTO'

      return FormularioPlanes(fnCompleteStep);
    case 2:


      setPImagen('banner_06_off.png')
      setSImagen('banner_07_off.png')
      setTImagen('banner_08_on.png')
       setQImagen('banner_10_off.png')


      txBotonContinuar = 'CONTRATAR'

      return FormularioAnexos();

    case 3:

      setPImagen('banner_06_off.png')
      setSImagen('banner_07_off.png')
      setTImagen('banner_08_off.png')

      setQImagen('banner_10_on.png')


      txBotonContinuar = 'FINALIZAR COMPRA'

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
              <Typography className={classes.instructions}>{getStepContent(activeStep,   handleComplete  )}</Typography>
             
            </div>
         
          )}
      </div>

      {allStepsCompleted() ? (<Grid></Grid>): (
        <div style = {{ display: 'flex' }}>
      <Grid item lg={6} style={{ display: 'flex' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
          ATRAS
              </Button>
      </Grid>
      <Grid item lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Grid>
              {completedSteps() === totalSteps() - 1 ? <AlertCompletarFormulario onClick={handleComplete} /> : <Button variant="contained" color="primary" onClick={handleComplete}> {txBotonContinuar} </Button>}
        </Grid>
      </Grid>
    </div>
      )}

    </div >

      
  );
}



let setPImagen = ''; 
let setSImagen = ''; 
let setTImagen = ''; 
let setCImagen = ''; 
let setQImagen = ''; 


function RenderHeaderSteps() { 


  const [primera, setPrimera] = React.useState('banner_06.png');
  const [segunda, setSegunda] = React.useState('banner_06.png');
  const [tercera, setTercera] = React.useState('banner_06.png');
  const [cuarta, setCuarta] = React.useState('banner_06.png');
  const [quinta, setQuinta] = React.useState('banner_06.png');

  setPImagen = setPrimera;
  setSImagen = setSegunda;
  setTImagen = setTercera;
  setCImagen = setCuarta;
  setQImagen = setQuinta; 

  return (<Grid style={{ marginTop: '12px', display: 'flex' }} item lg={12}>
    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + primera} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>
    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + segunda} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>

    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + tercera} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>

 
    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + quinta} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>
  </Grid>)

}


function FlujoCompra() {

  obtenerListaItems();


  return (
    <React.Fragment>
      <Helmet title="Flujo de compra" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>
        <Typography variant="h3" gutterBottom display="inline">
         CONTRATA TU SEGURO
      </Typography>

        <RenderHeaderSteps />
        <Divider my={6} />
        <HorizontalNonLinearStepper>

        </HorizontalNonLinearStepper>
      </Grid>

    </React.Fragment>
  );
}

export default FlujoCompra;
