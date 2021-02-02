import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { API } from "aws-amplify";
import {

  CheckCircle as CheckCircle,

} from "@material-ui/icons";

import Helmet from "react-helmet";
import moment from 'moment';

import {
  CardContent,
  Grid,
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

import { spacing, display } from "@material-ui/system";

const Card = styled(MuiCard)`
  ${spacing};

  box-shadow: none;
`;

const Divider = styled(MuiDivider)(spacing);

const Shadow = styled.div`
  box-shadow: ${(props) => props.theme.shadows[1]};
`;

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

const Typography = styled(MuiTypography)(display);




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



function RenderDetallePlan(item) {
  // const [detallePlan, setDetallePlan] = useState({});

  let detalle = JSON.parse(item['data_plan'])
  console.log("DETALLE_PLAN", detalle)

  if (detalle) {
    //setDetallePlan(detalle)
    return (<Grid>
      <Grid>
        <Grid style={{ marginTop: '12px' }}>
          <div style={{ width: '100%', height: '160px', }}>
            <img src={detalle['imagen_comercial_plan']} style={{ width: '100%', height: '100%' }} />

          </div>
        </Grid>
        <Typography variant="h2" gutterBottom style={{ marginTop: 12 }}>
          {detalle['nombre_plan']}


        </Typography>

        <Typography variant="body2" gutterBottom>
          <p>{detalle['descripcion_comercial_plan']}</p>

        </Typography>
      </Grid>
    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
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


function RenderDetalleSubPlan(item) {
  // const [detallePlan, setDetallePlan] = useState({});


  let detalle = JSON.parse(item['data_sub_plan'])

  cargarDetallesCobertura(item)


  console.log("DETALLE_SUBPLAN", detalle)

  if (detalle) {

    //setDetallePlan(detalle)
    return (<Grid lg={12}>

      <Grid lg={12}>
        <Typography variant="h6" gutterBottom>

          <h2 style={{
            textTransform: 'uppercase'
          }}>SUBPLAN : {detalle['nombre']}</h2>

          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CAPITAL ASEGURADO : <strong>{detalle['capital']} UF</strong></p>
          <h2 style={{
            textTransform: 'uppercase'
          }}>COBERTURAS </h2>
          <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL : </p>
          <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL :  </p>
          <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>PERDIDA : </p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong>{detalle['precio_mensual']} UF  </strong></p>
          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>COMPAÑIA ASEGURADORA :<strong> CHUBB DE CHILE COMPAÑIA DE SEGUROS GENERALES S.A</strong></p>


        </Typography>
      </Grid>

    </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}

const ObtenerDetalleCotizacion = (obtenerListaProductos) => {

  let { id } = useParams();

  let temId = String(id)
  console.log(id)


  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   detalleCotizacion(numero_cotizacion:"${temId}") {
     id
    data_cotizacion
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
    console.log("productos", siniestros['data']['detalleCotizacion']['data_cotizacion']);
    let listProductos = JSON.parse(siniestros['data']['detalleCotizacion']['data_cotizacion']);

    console.log("listproduct", listProductos);
    itemDatosAsegurado = listProductos['asegurado']

    planSeleccionado = listProductos['plan'];
    subPlanSeleccionado = listProductos['subplan'];

    console.log("subPlanSeleccionado", subPlanSeleccionado)

    itemRenderDetallePlan = RenderDetallePlan(planSeleccionado)
    itemRenderDetalleSubPlan = RenderDetalleSubPlan(subPlanSeleccionado)

    console.log("detalleAsegurado", listProductos)
    console.log("listaProductos", listProductos)

    return (


      <Grid container justify="center">


        <Grid container justify="center">
          <Grid item xs={12} lg={10}>
            <Shadow>

              <Card px={6} pt={6}>
                <CardContent>
                  <Grid container spacing={6}>





                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                      <Typography variant="h2" gutterBottom>
                        <h2>RESUMEN COTIZACION</h2>
                      </Typography>
                    </div>

                    <Grid item lg={6}>
                      <Typography variant="caption">CLIENTE</Typography>
                      <Typography variant="h4">
                        {'RUT: ' + itemDatosAsegurado['rut_persona']}
                        <br />

                        {'NOMBRE: ' + itemDatosAsegurado['nombre_persona'] + ' ' + itemDatosAsegurado['apellido_paterno'] + ' ' + itemDatosAsegurado['apellido_materno']}
                        <br />
                        {'EMAIL: ' + userAccountData['email']}
                        <br />
                        <br />
                      </Typography>

                    </Grid>

                    <Grid item lg={6}>

                      <Typography variant="caption">EQUIPO</Typography>
                      <Typography variant="h4">

                        {'MARCA: ' + itemDatosAsegurado['marca_equipo']}
                        <br />
                        {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}
                        <br />
                        {'IMEI: ' + itemDatosAsegurado['imei']}
                        <br />
                      </Typography>
                    </Grid>


                    <Typography variant="body2" gutterBottom>
                      {itemRenderDetalleSubPlan && itemRenderDetallePlan}
                    </Typography>

                    {itemRenderDetalleSubPlan && itemRenderDetalleSubPlan}



                  </Grid>
                </CardContent>
              </Card>

            </Shadow>
          </Grid>
        </Grid>



      </Grid>

    )
  } else {

    return siniestros && 'cargando...'

  }



}






function DetalleCotizacion() {

  let data = ObtenerDetalleCotizacion();
  obtenerListaItems();

  let { id } = useParams();

  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />

      <Typography variant="h3" gutterBottom display="inline">
        DETALLE COTIZACION
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          KIRAWEBAPP
        </Link>
        <Link component={NavLink} exact to="/">
          SEGUROS
        </Link>
        <Link component={NavLink} exact to="/">
          COTIZACION
        </Link>
        <Typography>N° {id}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      {data}

    </React.Fragment>
  );
}

export default DetalleCotizacion;
