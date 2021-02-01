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

import {
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Chip as MuiChip,
  Avatar,
  Badge as MuiBadge,

  Link,
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
  BurstMode as BurstModeIcon,
  Description as DescriptionIcon,
  TagFaces as TagFacesIcon,
} from "@material-ui/icons";
import { spacing, display } from "@material-ui/system";

const timeOut = (time) => new Promise((res) => setTimeout(res, time));
const Chip = styled(MuiChip)(spacing);

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
        <Grid style={{ marginTop: '12px' }}>
          <div style={{ width: '100%', height: '160px', background: 'red' }}>
            <img src={detalle['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

          </div>
        </Grid>
        <Typography variant="h2" gutterBottom style={{ marginTop: 12 }}>
          {detalle['nombre_plan']} {detalleSub['nombre']}


        </Typography>

        <Typography variant="body2" gutterBottom>
          <p>{detalle['descripcion_comercial_plan']}</p>

        </Typography>
      </Grid>

      <Grid lg={12}>

        <Grid lg={12}>
          <Typography variant="h6" gutterBottom>


            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CAPITAL ASEGURADO : <strong>{detalleSub['capital']} UF</strong></p>
            <h2 style={{
              textTransform: 'uppercase'
            }}>COBERTURAS </h2>
            <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL : </p>
            <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL :  </p>
            <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>PERDIDA : </p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong>{detalleSub['precio_mensual']} UF  </strong></p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>COMPAÑIA ASEGURADORA :<strong> CHUBB DE CHILE COMPAÑIA DE SEGUROS GENERALES S.A</strong></p>


          </Typography>
        </Grid>

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
          document.getElementById('cobertura_total').innerHTML = 'DAÑO TOTAL DEDUCIBLE: <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Daño-Total": item['deducible']
          }
          break;

        case "CL-Daño-Parcial":
          document.getElementById('cobertura_parcial').innerHTML = 'DAÑO PARCIAL DEDUCIBLE : <strong>' + item['deducible'] + ' UF </strong>'
          detallesExtras = {
            ...detallesExtras,
            "CL-Daño-Parcial": item['deducible']
          }
          break;

        case "CL-Robo":
          document.getElementById('cobertura_perdida').innerHTML = 'ROBO DEDUCIBLE :  <strong>' + item['deducible'] + ' UF </strong>'
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
                      <Grid style={{ display: 'flex' }}>


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

                    <Grid lg={12}  >

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


function DetalleSeguro() {
  const [itemRender, setItemRender] = useState('ficha');

  let { id } = useParams();
  let detallePolizaRender = 'cargando';
  obtenerListaItems();


  detallePolizaRender = ObtenerDetallePoliza();



  switch (itemRender) {
    case 'ficha':
      detallePolizaRender = ObtenerDetallePoliza();

      break;
    case 'siniestro':
      detallePolizaRender = 'cargando archivos'
      break;
    case 'archivos':
      detallePolizaRender = 'cargando archivos'

      break;

  }



  let handleClickFicha = () => {
    console.log("clickFicha")
    setItemRender('ficha')
  }


  let handleClickSiniestro = () => {
    console.log("clickSiniestros")

    setItemRender('siniestro')


  }

  let handleClickArchivos = () => {
    console.log("clickArchivos")
    setItemRender('archivos')


  }
  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />

      <Typography variant="h3" gutterBottom display="inline">
        DETALLE SEGURO
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          KIRAWEBAPP
        </Link>
        <Link component={NavLink} exact to="/">
          SEGUROS
        </Link>
        <Link component={NavLink} exact to="/">
          DETALLE
        </Link>
        <Typography>N° {id}</Typography>
      </Breadcrumbs>
      <Grid style={{ marginTop: 22 }} lg={12} >

        <Chip
          avatar={<DescriptionIcon />}
          label="FICHA"
          onClick={handleClickFicha}
          m={1}
        />

        <Chip
          avatar={<FaceIcon />}
          label="SINIESTRO"
          onClick={handleClickSiniestro}
          m={1}
        />
        <Badge badgeContent={'222R'} color="primary" mr={4}>


          <Chip
            avatar={<BurstModeIcon />}
            label="ARCHIVOS"
            onClick={handleClickArchivos}
            m={1}
          />
        </Badge>
      </Grid>



      <Divider my={6} />

      <Grid>
        <Shadow>
          <Card>
            {detallePolizaRender}
          </Card>
        </Shadow>
      </Grid>


    </React.Fragment >
  );
}

export default DetalleSeguro;
