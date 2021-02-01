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



function DetalleSiniestro() {



  let DetalleSiniestro = ObtenerDetalleSiniestro()
  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />

      <Typography variant="h3" gutterBottom display="inline">
        DETALLE SINIESTRO
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          KIRAWEBAPP
        </Link>
        <Link component={NavLink} exact to="/">
          SEGUROS
        </Link>
        <Link component={NavLink} exact to="/">
          DETALLES SINIESTRO
        </Link>
        <Typography>N° #0001</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      {DetalleSiniestro}

    </React.Fragment>
  );
}

export default DetalleSiniestro;
