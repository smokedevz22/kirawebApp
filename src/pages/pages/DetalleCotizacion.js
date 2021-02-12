import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { API } from "aws-amplify";
import AppBar from "../presentation/Landing/HomeBar";
import { Link } from "react-router-dom";

import {

  CheckCircle as CheckCircle,

} from "@material-ui/icons";

import Helmet from "react-helmet";
import moment from 'moment';

import {
  CardContent,
  Grid,
  Button as MuiButton,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Chip as MuiChip,

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

const Chip = styled(MuiChip)(spacing);




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
          }}>SUBPLAN : {detalle['nombre']}</h2>

          <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CAPITAL ASEGURADO : <strong>{detalle['capital']} UF</strong></p>
          <h2 style={{
            textTransform: 'uppercase'
          }}>COBERTURAS (DEDUCIBLE) </h2>
          <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL (DEDUCIBLE DE UF) </p>
          <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL (DEDUCIBLE DE UF)   </p>
          <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO (DEDUCIBLE DE UF) : </p>
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
    detallesExtras = listProductos['detalles'];

    console.log("subPlanSeleccionado", subPlanSeleccionado)

    let itemSubPlanData = JSON.parse(subPlanSeleccionado['data_sub_plan'])

    itemRenderDetallePlan = RenderDetallePlan(planSeleccionado)
    itemRenderDetalleSubPlan = RenderDetalleSubPlan(subPlanSeleccionado)

    console.log("detalleAsegurado", listProductos)
    console.log("listaProductos", listProductos)

    return (


      <Grid container justify="center">

        <Grid item lg={12}>



          <Grid>

            <Typography variant="h2" gutterBottom style={{ marginTop: 12 }}>
              {itemRenderDetallePlan['nombre_plan']}   {itemRenderDetalleSubPlan['nombre']}


            </Typography>

            <Typography variant="body2" gutterBottom>
              <p>El capital asegurado es el valor máximo a cubrir en caso de robo, pérdida parcial o total.</p>

            </Typography>
          </Grid>

          <Grid >
            <Typography variant="h6" gutterBottom>

              <p style={{ textTransform: 'uppercase', fontSize: '12px' }}></p>
              <Chip

                avatar={<CheckCircle style={{ color: 'green' }} />}
                label={`CAPITAL ASEGURADO : ${itemSubPlanData['capital']} UF `}
                m={1}
              />

              <h2 style={{
                textTransform: 'uppercase'
              }}>CARACTERISTICAS </h2>

              <Grid style={{ display: 'flex' }} item lg={12}>
                <Grid item lg={4}>
                  <h4>COBERTURAS (DEDUCIBLE)</h4>


                  <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL (DEDUCIBLE DE {detallesExtras['CL-Daño-Parcial']}  UF) </p>
                  <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL (DEDUCIBLE DE {detallesExtras['CL-Daño-Total']}  UF)  </p>
                  <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO    (DEDUCIBLE DE {detallesExtras['CL-Robo']}  UF)  </p>

                </Grid>
                <Grid item lg={4}>
                  <h4>VIGENCIA</h4>
                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>

                </Grid>
                <Grid item lg={4}>

                  <h4>PRIMA</h4>

                  <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong> {itemSubPlanData['precio_mensual']} UF  </strong></p>


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


          <Button
            style={{ marginLeft: '22px', marginTop: '37px' }}
            ml={2}
            color="primary"
            variant="contained"
            component={Link}
            to={"/pages/flujo_compras/" + idCaso}
          >
            CONTRATAR SEGURO
              </Button>




        </Grid>

      </Grid >

    )
  } else {

    return siniestros && 'cargando...'

  }



}



let idCaso = ''


function DetalleCotizacion() {

  let data = ObtenerDetalleCotizacion();

  let { id } = useParams();
  idCaso = id;

  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />
      <AppBar />
      <Typography variant="h3" gutterBottom display="inline">
        DETALLE COTIZACION
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>

        <Typography>NUMERO COTIZACION {id}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      { data}

    </React.Fragment >
  );
}

export default DetalleCotizacion;
