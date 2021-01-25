import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { API } from "aws-amplify";

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

function DetalleSiniestro() {
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


                        <Typography variant="h6" gutterBottom  >
                          FECHA DECLARACION
                                     </Typography>
                        <Typography variant="body2" gutterBottom  >
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                      </div>

                    </CardContent>
                  </Card>
                </Shadow>
              </Grid>
            </Grid>  </Shadow>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DetalleSiniestro;
