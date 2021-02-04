import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { API } from "aws-amplify";
import moment from 'moment';

import Helmet from "react-helmet";

import {
  CardContent,
  Grid,
  Link,
  Button as MuiButton,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Table,
  Chip as MuiChip,
  Badge as MuiBadge,

  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing, display } from "@material-ui/system";

import {
  Done as DoneIcon,
  Face as FaceIcon,
  NewReleases,
  Notifications,
  BurstMode as BurstModeIcon,
  Description as DescriptionIcon,
  TagFaces as TagFacesIcon,
} from "@material-ui/icons";

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
const Badge = styled(MuiBadge)(spacing);


const ObtenerDetalleSiniestro = () => {

  let { id } = useParams();

  let temId = String(id)
  console.log(id)


  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   detalleSiniestro(numero_siniestro:"${temId}") {
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

    let dataSiniestro = JSON.parse(siniestros['data']['detalleSiniestro']['data_siniestro'])
    console.log("siniestro", dataSiniestro)

    return (


      <Grid container justify="center">
        <Grid container justify="center">
          <Grid item xs={12} lg={10}>
            <Shadow>
              <Grid container justify="center">
                <Grid item xs={12} lg={10}>
                  <Shadow>

                    <Card pb={6} px={6}>
                      <CardContent  >
                        <div>
                          <Typography variant="h2" gutterBottom  >
                            DETALLE SINIESTRO
                                     </Typography>


                          <Grid style={{ display: 'flex', }}>

                            <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                              FECHA DECLARACION
                          </Typography>

                            <Typography variant="h6" gutterBottom  >
                              {moment(dataSiniestro['detalle']['fecha_siniestro']).format("DD-MM-YYYY")}
                            </Typography>
                          </Grid>


                          <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                            {dataSiniestro['detalle']['descripcion_siniestro']}

                          </Typography>
                        </div>

                      </CardContent>
                    </Card>
                  </Shadow>
                </Grid>
              </Grid>  </Shadow>
          </Grid>
        </Grid>
      </Grid>

    )
  } else {

    return siniestros && 'cargando...'

  }



}


function RenderPantall() {

  const [itemRender, setItemRender] = useState('siniestros');


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


let itemRenderDetalle = 'Cargando';

let dataAllSiniestros = 'cargando'
let dataInfoPoliza = 'cargando'
let dataInfoArchivos = 'cargando'
let dataNotificaciones = 'cargando'

function DetalleSiniestro() {



  dataAllSiniestros = ObtenerDetalleSiniestro();
  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />

      <Typography variant="h3" gutterBottom display="inline">
        DETALLE SINIESTRO
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>NUMERO SINIESTRO #0001</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      {DetalleSiniestro}

      <Grid>
        <RenderPantall />
      </Grid>
    </React.Fragment>
  );
}

export default DetalleSiniestro;
