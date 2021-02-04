import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Helmet from "react-helmet";
import { Formik } from "formik";
import { API } from "aws-amplify";
import { Route } from 'react-router-dom'
import AppBar from "../presentation/Landing/HomeBar";
import moment from 'moment';
import * as Yup from "yup";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";

import {
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Chip as MuiChip,
  Avatar,
  Badge as MuiBadge,
  Fab,
  Link,
  TextField as MuiTextField,
  Button as MuiButton,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography as MuiTypography,
} from "@material-ui/core";

import {
  Done as DoneIcon,
  Face as FaceIcon,
  NewReleases,
  Notifications,
  BurstMode as BurstModeIcon,
  Description as DescriptionIcon,
  TagFaces as TagFacesIcon,
} from "@material-ui/icons";
import { spacing, display } from "@material-ui/system";
import { red, green, blue } from "@material-ui/core/colors";


import {

  CheckCircle as CheckCircle,

} from "@material-ui/icons";

import SendIcon from "@material-ui/icons/Send";

const timeOut = (time) => new Promise((res) => setTimeout(res, time));
const Chip = styled(MuiChip)(spacing);
const Spacer = styled.div(spacing);
const TextField = styled(MuiTextField)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

const Card = styled(MuiCard)`
  ${spacing};

  box-shadow: none;
`;

const Divider = styled(MuiDivider)(spacing);

const Shadow = styled.div`
  box-shadow: ${(props) => props.theme.shadows[1]};
`;
const Badge = styled(MuiBadge)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

const Typography = styled(MuiTypography)(display);

const ProductsChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;
const ChatContainer = styled(Grid)`
  width: 100%;
  height: 65vh;
`;

const ChatSidebar = styled(Grid)`
  border-right: 1px solid ${(props) => props.theme.palette.divider};
`;

const ChatMain = styled(Grid)``;

const ChatMessages = styled.div`
  overflow-y: scroll;
  height: calc(65vh - 94px);
`;

const ChatMessage = styled.div`
  margin: 30px;
  text-align: ${(props) => props.position};
`;

const ChatMessageInner = styled.div`
  display: inline-block;
`;

const ChatMessageTime = styled(Typography)`
  text-align: right;
  opacity: 0.8;
`;

const ChatMessageAvatar = styled(Avatar)`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
`;

const ChatMessageBubble = styled.div`
  display: inline-block;
  margin-right: auto;
  background: ${(props) =>
    props.highlighted
      ? props.theme.palette.secondary.main
      : props.theme.palette.action.hover};
  color: ${(props) =>
    props.highlighted
      ? props.theme.palette.common.white
      : props.theme.palette.text.primary};
  border-radius: 3px;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-bottom: ${(props) => props.theme.spacing(1)}px;
  ${(props) => props.theme.shadows[1]};
`;

const ChatMessageBubbleName = styled(Typography)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const ChatInput = styled(Grid)`
  min-height: 94px;
  padding: ${(props) => props.theme.spacing(5)}px;
`;

const Online = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)}px;
  span {
    background-color: ${(props) =>
    props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;
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

function RenderDetallePlan(item, subplan) {
  // const [detallePlan, setDetallePlan] = useState({});

  let detalle = JSON.parse(item['data_plan'])
  console.log("DETALLE_PLAN", detalle)

  let detalleSub = JSON.parse(subplan['data_sub_plan'])

  cargarDetallesCobertura(detalleSub)


  console.log("DETALLE_SUBPLAN", detalleSub)


  if (detalle) {
    //setDetallePlan(detalle)
    return (<Grid>
      <Grid>
       
        <Typography variant="h2" gutterBottom style={{ marginTop: 12 }}>
          {detalle['nombre_plan']} {detalleSub['nombre']}


        </Typography>

        <Typography variant="body2" gutterBottom>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>                 La poliza del seguro sera enviada a su correo electronico registrado
</p>
        </Typography>
      </Grid>

      <Grid lg={12}>

        <Grid lg={12}>
  
              <p style={{ textTransform: 'uppercase', fontSize: '12px' }}></p>
              <Chip

                avatar={<CheckCircle style={{ color: 'green' }} />}
            label={`CAPITAL ASEGURADO :  ${detalleSub['capital']} UF `}
                m={1}
              />

              <h2 style={{
                textTransform: 'uppercase'
              }}>CARACTERISTICAS </h2>

              <Grid style={{ display: 'flex' }} item lg={12}>
                <Grid item lg={4}>
                  <h4>COBERTURA</h4>


                  <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL  </p>
                  <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL    </p>
                  <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO   </p>

                </Grid>
                <Grid item lg={4}>
                  <h4>VIGENCIA</h4>
                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>

                </Grid>
                <Grid item lg={4}>

                  <h4>PRIMA</h4>

              <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong>{detalleSub['precio_mensual']} UF  </strong></p>


                </Grid>


              </Grid>
        </Grid>
        <Chip
          style={{ textTransform: 'uppercase', fontSize: '12px', marginTop: 42 }}
          avatar={<CheckCircle style={{ color: 'green' }} />}
          label={`El riesgo es asegurado por Chubb Compañía de Seguros Generales S.A`}
          m={1}
        />
      </Grid>
    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}


function cargarDetallesCobertura(item) {
  let listaTemporalCoberturas = []

  let cargarDetalleCob = async function () {
    listCoberturas && listCoberturas.forEach((data) => {

      console.log("cobertura", data)
      console.log("subplan", item)

      if (data['id_sub_plan'] === item['id']) {

        listaTemporalCoberturas.push(data)
      }
    })
  };

  cargarDetalleCob().then((data) => {
    console.log("lista", listaTemporalCoberturas)


    listaTemporalCoberturas.find((item) => {

      switch (item['codigo_cobertura']) {

        case "CL-Daño-Total":
          document.getElementById('cobertura_total').innerHTML = 'DAÑO TOTAL  : <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Daño-Total": item['deducible']
          }
          break;

        case "CL-Daño-Parcial":
          document.getElementById('cobertura_parcial').innerHTML = 'DAÑO PARCIAL   : <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Daño-Parcial": item['deducible']
          }
          break;

        case "CL-Robo":
          document.getElementById('cobertura_perdida').innerHTML = 'ROBO   :  <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Robo": item['deducible']
          }
          break;

      }
    })
  })

}




const ObtenerDetallePoliza = () => {

  let { id } = useParams();

  let temId = String(id)
  console.log(id)


  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   detallePoliza(numero_poliza:"${temId}") {
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
    setSiniestros(data)

  }, [])

  console.log("polizaaa", siniestros)
  if (siniestros && siniestros['data']) {

    let dataSiniestro = JSON.parse(siniestros['data']['detallePoliza']['data_poliza'])
    console.log("siniestro", dataSiniestro)

    itemDatosAsegurado = dataSiniestro['asegurado']
    itemRenderDetallePlan = RenderDetallePlan(dataSiniestro['plan'], dataSiniestro['subplan'])


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


    obtenerListaItems();

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
                  <Grid container   >
                    <Grid lg={12}  >

                      <Grid lg={12} style={{ display: 'flex', marginTop: 12 }}>
                        <Typography variant="caption">CLIENTE</Typography>

                      </Grid>
                      <Grid style={{ display: 'flex', marginTop: 8 }}>


                        <Grid lg={3}>
                          <Typography variant="h5">
                            RUT:  {itemDatosAsegurado['rut_persona']}

                          </Typography>
                        </Grid>


                        <Grid lg={6}>

                          <Typography variant="h5" style={{ textTransform: 'uppercase' }}>
                            NOMBRE:  {itemDatosAsegurado['nombre_persona'] + ' ' + itemDatosAsegurado['apellido_paterno'] + ' ' + itemDatosAsegurado['apellido_materno']}

                          </Typography>
                        </Grid>



                      </Grid>
                    </Grid>

                    <Grid lg={12} style={{ marginTop: 8 }} >

                      <Grid lg={12} style={{ display: 'flex', }}>
                        <Typography variant="caption">EQUIPO</Typography>

                      </Grid>

                      <Grid style={{ display: 'flex', marginTop: 8 }} lg={12} >


                        <Grid lg={3}>
                          <Typography variant="h5" style={{ textTransform: 'uppercase' }} >
                            {'MARCA: ' + itemDatosAsegurado['marca_equipo']}

                          </Typography>
                        </Grid>
                        <Grid lg={4}>
                          <Typography variant="h5" style={{ textTransform: 'uppercase' }} >
                            {'MODELO: ' + itemDatosAsegurado['modelo_equipo']}

                          </Typography>
                        </Grid>
                        <Grid lg={3}>
                          <Typography variant="h5" style={{ textTransform: 'uppercase' }} >
                            {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}

                          </Typography>
                        </Grid>
                        <Grid lg={2}>
                          <Typography variant="h5" style={{ textTransform: 'uppercase' }}>
                            {'IMEI: ' + itemDatosAsegurado['imei']}

                          </Typography>
                        </Grid>




                      </Grid>
                    </Grid>

                    <Grid lg={12}  style={{marginTop:22}} >

                      <Grid>

                        {itemRenderDetallePlan && itemRenderDetallePlan}


                      </Grid>
                    </Grid>

                  </Grid>
                )}
            </CardContent>
          </Card>
        )
        }
      </Formik >)


  } else {

    return siniestros && 'cargando...'

  }



}

const ObtenerListaSiniestros = () => {
  const [siniestroxs, setSiniestroxs] = React.useState();


  useEffect(async () => {
    const myqueryDemo = `
 query MyQuery {
   listasSiniestros {
     id
    data_siniestro
  }
}

`;

    console.log(myqueryDemo)
    const datax= await API.graphql({
      query: myqueryDemo
    });
    console.log("data from GraqweqweqwehQL:", datax);
    setSiniestroxs(datax)

  }, [])

  console.log("poliiiizaaa", siniestroxs)
  if (siniestroxs && siniestroxs['data']) {
    console.log("productos", siniestroxs['data']['listasSiniestros']);
    let listProductos = siniestroxs['data']['listasSiniestros'];
    console.log("listaProductos", listProductos)

    return (
      <Card mb={6} >
        <CardContent>
          <Typography variant="h2" gutterBottom>
            SINIESTROS DECLARADOS
        </Typography>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '5%' }}>ESTADO</TableCell>
                  <TableCell style={{ width: '20%' }}>FECHA INGRESO</TableCell>
                  <TableCell style={{ width: '60%' }}>RESUMEN</TableCell>
                  <TableCell style={{ width: '10%' }}>DETALLE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ width: '100%' }}>

                {listProductos &&
                  listProductos.map((item, index) => {
                    console.log(item);

                    let itemTemporal = JSON.parse(item['data_siniestro']);
                    console.log(itemTemporal)

                    return (


                      <TableRow style={{ width: '100%' }} key={index}>
                        <TableCell  >
                          <ProductsChip
                            size="small"
                            label="ACTIVO"
                            rgbcolor={blue[500]}
                          />
                        </TableCell>

                        <TableCell component="th" scope="row"  >
                          <Typography variant="body2" gutterBottom>
                            {itemTemporal['detalle']['fecha_siniestro']}
                          </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row" s >
                          <Typography variant="body2" gutterBottom>
                            {itemTemporal['detalle']['descripcion_siniestro']}
                          </Typography>
                        </TableCell>

                        <TableCell component="th" scope="row" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <Route style={{ marginRight: '6px' }} render={({ history }) => (
                            <Button onClick={() => { history.push(`/pages/siniestros/${item['id']}`) }} size="small" color="primary">
                              FICHA
                            </Button>
                          )} />

                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableWrapper>
        </CardContent >
      </Card >
    )
  } else {

    return siniestroxs && 'cargando...'
  }


}

 

const ObtenerListaArchivos = () => {

  let { id } = useParams();

  let temId = String(id)
  console.log(id)


  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   detallePoliza(numero_poliza:"${temId}") {
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
    setSiniestros(data)

  }, [])

  console.log("polizaaa", siniestros)
  if (siniestros && siniestros['data']) {

    let dataSiniestro = JSON.parse(siniestros['data']['detallePoliza']['data_poliza'])
    console.log("siniestro", dataSiniestro)

    itemDatosAsegurado = dataSiniestro['asegurado']
    itemRenderDetallePlan = RenderDetallePlan(dataSiniestro['plan'], dataSiniestro['subplan'])


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


    obtenerListaItems();

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
                  <Grid container   >
                <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Lista Archivos
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
            <DropzoneArea dropzoneText={''}                       acceptedFiles={['image/*']}  
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
            <DropzoneArea  dropzoneText={''}                       acceptedFiles={['image/*']} 
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
            <DropzoneArea dropzoneText={''}   acceptedFiles={['image/*']} 
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
 dropzoneText={''}                       acceptedFiles={['image/*']} 
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

        </Grid>


      </CardContent>
    </Card>
 
                  </Grid>
                )}
            </CardContent>
          </Card>
        )
        }
      </Formik >)


  } else {

    return siniestros && 'cargando...'

  }



}



function ChatMessageComponent({
  name,
  message,
  time,
  avatar,
  position = "left",
}) {
  return (
    <ChatMessage position={position}>
      <ChatMessageInner>
        <ChatMessageAvatar alt="Lucy Lavender" src={avatar} />
        <ChatMessageBubble highlighted={position === "right"}>
          <Box>
            <ChatMessageBubbleName variant="body1">
           FRDIRECT
            </ChatMessageBubbleName>
          </Box>
          <Typography variant="body2">{message}</Typography>
        </ChatMessageBubble>
       </ChatMessageInner>
    </ChatMessage>
  );
}



const ObtenerListaNotificaciones = () => {

  let { id } = useParams();

  let temId = String(id)
  console.log(id)


  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   detallePoliza(numero_poliza:"${temId}") {
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
    setSiniestros(data)

  }, [])

  console.log("polizaaa", siniestros)
  if (siniestros && siniestros['data']) {

   
    return (

      <ChatContainer container component={Card}>
         
        <ChatMain item   lg={12}>
          <ChatMessages>
            <ChatMessageComponent
              name="Remy Sharp"
              avatar="https://image.freepik.com/vector-gratis/logo-empresa-diseno-avatar_1465-2.jpg"
              message="Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo."
              time="20 minutes ago"
              position="left"
            />
          
            <ChatMessageComponent
              name="Remy Sharp"
              avatar="https://image.freepik.com/vector-gratis/logo-empresa-diseno-avatar_1465-2.jpg"
              message="Cum ea graeci tractatos. 😄"
              time="8 minutes ago"
              position="left"
            />
           
            <ChatMessageComponent
              name="Remy Sharp"
              avatar="https://image.freepik.com/vector-gratis/logo-empresa-diseno-avatar_1465-2.jpg"
              message="Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix."
              time="3 minutes ago"
              position="left"
            />
          </ChatMessages>
            
        </ChatMain>
      </ChatContainer>
      
    )
  } else {

    return siniestros && 'cargando...'

  }



}

function RenderDetalleSiniestro() {


  return 'cargando... '
}

let itemRenderDetalle = 'Cargando';



const ListaRenderSiniestros = (obtenerListaProductos) => {
  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   listasSiniestros {
     id
    data_siniestro
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
    setSiniestros(data)

  }, [])

  console.log("polizaaa", siniestros)
  if (siniestros && siniestros['data']) {
    console.log("productos", siniestros['data']['listasSiniestros']);
    let listProductos = siniestros['data']['listasSiniestros'];
    console.log("listaProductos", listProductos)

    return <TableBody style={{ width: '100%' }}>

      {listProductos &&
        listProductos.map((item, index) => {
          console.log(item);

          let itemTemporal = JSON.parse(item['data_siniestro']);


          console.log(itemTemporal)

          return (<TableRow style={{ width: '100%' }} key={index}>
            <TableCell  >
              <ProductsChip
                size="small"
                label="ACTIVO"
                rgbcolor={blue[500]}
              />
            </TableCell>

            <TableCell component="th" scope="row"  >
              <Typography variant="body2" gutterBottom>
                {itemTemporal['detalle']['fecha_siniestro']}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row" s >
              <Typography variant="body2" gutterBottom>
                {itemTemporal['detalle']['descripcion_siniestro']}
              </Typography>
            </TableCell>

            <TableCell component="th" scope="row"  >
              <Route style={{ marginRight: '6px' }} render={({ history }) => (
                <Button onClick={() => { history.push(`/pages/siniestros/${item['id']}`) }} size="small" color="primary">
                  FICHA
                </Button>
              )} />

            </TableCell>
          </TableRow>
          )
        })
      }
    </TableBody>
  } else {

    return siniestros && 'cargando...'

  }



}

function Siniestros() {

  let data = ListaRenderSiniestros();


  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          SINIESTROS DECLARADOS
        </Typography>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '5%' }}>ESTADO</TableCell>
                <TableCell style={{ width: '20%' }}>FECHA INGRESO</TableCell>
                <TableCell style={{ width: '60%' }}>RESUMEN</TableCell>
                <TableCell style={{ width: '10%' }}>DETALLE</TableCell>
              </TableRow>
            </TableHead>
            {dataAllSiniestros}
            </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
}




function RenderPantall() {

  const [itemRender, setItemRender] = useState('ficha');


  let handleClickFicha = () => {

    setItemRender('ficha')

  }

  let handleClickSiniestro = () => {

    setItemRender('siniestros')

  }


  let handleClickArchivos = () => {

    setItemRender('archivos')

  }

  let handleClickNotificaciones = () => {

    setItemRender('notificaciones')

  }



  switch (itemRender) {

    case 'ficha':
      itemRenderDetalle = itemRender && dataInfoPoliza
      break;

    case 'siniestros':
      itemRenderDetalle = itemRender && dataAllSiniestros

      break;

    case 'archivos':
      itemRenderDetalle = itemRender && dataInfoArchivos
      break;

    case 'notificaciones':
      itemRenderDetalle = itemRender && dataNotificaciones
      break;
  }

  if (itemRender) {
    return (
      <Grid>
        <Grid style={{ marginTop: 22 }} lg={12} >

          <Chip
            avatar={<DescriptionIcon />}
            label="FICHA"
            onClick={handleClickFicha}
            m={1}
          />

          <Chip
            avatar={<NewReleases />}
            label="SINIESTRO"
            onClick={handleClickSiniestro}
            m={1}
          />


          <Chip
            avatar={<BurstModeIcon />}
            label="ARCHIVOS"
            onClick={handleClickArchivos}
            m={1}
          />


          <Chip
            avatar={<Notifications />}
            label="NOTIFICACIONES"
            onClick={handleClickNotificaciones}
            m={1}
          />
          <Badge badgeContent={''} color="secondary" mr={4}>


          </Badge>
        </Grid>



        <Divider my={6} />

        <Grid>
          <Shadow>
            <Card>
              {itemRenderDetalle}
            </Card>
          </Shadow>
        </Grid>
      </Grid>
    )
  } else { 
    return itemRender && "Cargando detalle poliza"
  }


  
}

let dataAllSiniestros = 'cargando'
let dataInfoPoliza = 'cargando'
let dataInfoArchivos = 'cargando'
let dataNotificaciones = 'cargando'

function DetalleSeguro() {

  let { id } = useParams();
  obtenerListaItems();

  dataInfoPoliza = ObtenerDetallePoliza();
  dataAllSiniestros =  ListaRenderSiniestros();
  dataInfoArchivos = ObtenerListaArchivos();
  dataNotificaciones = ObtenerListaNotificaciones();
  
  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />

      <Typography variant="h3" gutterBottom display="inline">
        DETALLE SEGURO <Typography>NUMERO DE POLIZA {id}</Typography>
      </Typography>

   
      <Grid>
        <RenderPantall />
      </Grid>

    </React.Fragment >
  );
}

export default DetalleSeguro;
