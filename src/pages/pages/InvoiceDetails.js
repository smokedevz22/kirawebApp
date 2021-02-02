import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

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

function InvoiceDetails() {
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
          DETALLES SEGURO
        </Link>
        <Typography>SEGURO #0001</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container justify="center">
        <Grid item xs={12} lg={10}>
          <Shadow>
            <Card px={6} pt={6}>
              <CardContent>
                <Grid xl={12} container spacing={6}>
                  <Grid style={{ marginTop: '12px' }}>
                    <div style={{ width: '100%', height: '160px', }}>
                      <img src="https://sfestaticos.blob.core.windows.net/argentina/home/secciones/banner-accidentes-personales-desktop.jpg" style={{ width: '100%', height: '100%' }} />

                    </div>
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
            <Card px={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Material App Theme Customization
                    </TableCell>
                    <TableCell>2</TableCell>
                    <TableCell align="right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Monthly Subscription
                    </TableCell>
                    <TableCell>3</TableCell>
                    <TableCell align="right">$25.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Additional Service
                    </TableCell>
                    <TableCell>2</TableCell>
                    <TableCell align="right">$100.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">$275.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell>Shipping</TableCell>
                    <TableCell align="right">$8.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell>Discount</TableCell>
                    <TableCell align="right">5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell>Total</TableCell>
                    <TableCell align="right">$268.85</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card pb={6} px={6}>
              <CardContent style={{ textAlign: "center" }}>
                <div>
                  <Typography variant="caption" gutterBottom align="center">
                    Extra note: Please send all items at the same time to the
                    shipping address. Thanks in advance.
                  </Typography>
                </div>
                <Button variant="contained" color="primary" mt={2}>
                  IMPRIMIR DETALLE PLAN
                </Button>
              </CardContent>
            </Card>
          </Shadow>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default InvoiceDetails;
