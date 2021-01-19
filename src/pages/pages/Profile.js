import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled, { withTheme } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Route } from 'react-router-dom'
import AppBar from "../presentation/Landing/HomeBar";

import Helmet from "react-helmet";

import "../../vendor/roundedBarCharts";
import { Bar } from "react-chartjs-2";

import { red, green, blue } from "@material-ui/core/colors";

import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid as MuiGrid,
  LinearProgress as MuiLinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { AddShoppingCart, NoteAdd, Storefront, LocalHospital, NewReleases, QueuePlayNext, Contacts, PersonAdd, AssignmentInd, Notifications } from "@material-ui/icons";

import {
  Briefcase,
  DollarSign,
  ExternalLink,
  Facebook,
  Home,
  Instagram,
  MapPin,
  ShoppingBag,
  Twitter,
} from "react-feather";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Grid = styled(MuiGrid)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const Spacer = styled.div(spacing);

const Centered = styled.div`
  text-align: center;
`;

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 128px;
  width: 128px;
`;

const AboutIcon = styled.span`
  display: flex;
  padding-right: ${(props) => props.theme.spacing(2)}px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ChartWrapper = styled.div`
  height: 280px;
  position: relative;
`;

const StatsIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 32px;

  svg {
    width: 32px;
    height: 32px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const ProductsChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

function Details() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          PERFIL
        </Typography>

        <Spacer mb={4} />

        <Centered>
          <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-1.jpg" />
          <Typography variant="body2" component="div" gutterBottom>
            <Box fontWeight="fontWeightMedium">Lucy Lavender</Box>
            <Box fontWeight="fontWeightRegular">Lead Developer</Box>
          </Typography>

        </Centered>
      </CardContent>
    </Card>
  );
}

function Skills() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ACTIVIDADES
        </Typography>

        <Spacer mb={4} />

        <Centered>
          <Chip size="small" mr={1} mb={1} label="HTML" color="secondary" />
          <Chip size="small" mr={1} mb={1} label="JavaScript" />
          <Chip size="small" mr={1} mb={1} label="Sass" />
          <Chip size="small" mr={1} mb={1} label="React" />
          <Chip size="small" mr={1} mb={1} label="Redux" />
          <Chip size="small" mr={1} mb={1} label="Next.js" />
          <Chip size="small" mr={1} mb={1} label="Material UI" />
          <Chip size="small" mr={1} mb={1} label="UI" />
          <Chip size="small" mr={1} mb={1} label="UX" />
        </Centered>
      </CardContent>
    </Card>
  );
}

function About() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          CONTACTO
        </Typography>

        <Spacer mb={4} />

        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Home />
            </AboutIcon>
          </Grid>
          <Grid item>
            Lives in{" "}
            <Link href="https://material-app.bootlab.io/">
              San Fransisco, SA
            </Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Briefcase />
            </AboutIcon>
          </Grid>
          <Grid item>
            Works at{" "}
            <Link href="https://material-app.bootlab.io/">Material UI</Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <AboutIcon>
              <MapPin />
            </AboutIcon>
          </Grid>
          <Grid item>
            Lives in <Link href="https://material-app.bootlab.io/">Boston</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Elsewhere() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          REDES SOCIALES
        </Typography>

        <Spacer mb={4} />

        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <ExternalLink />
            </AboutIcon>
          </Grid>
          <Grid item>
            <Link href="https://material-app.bootlab.io/">lucylavender.io</Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Twitter />
            </AboutIcon>
          </Grid>
          <Grid item>
            <Link href="https://material-app.bootlab.io/">Twitter</Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Facebook />
            </AboutIcon>
          </Grid>
          <Grid item>
            <Link href="https://material-app.bootlab.io/">Facebook</Link>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <AboutIcon>
              <Instagram />
            </AboutIcon>
          </Grid>
          <Grid item>
            <Link href="https://material-app.bootlab.io/">Instagram</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Earnings() {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">$ 2.405</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            Total Earnings
          </Typography>

          <StatsIcon>
            <DollarSign />
          </StatsIcon>
          <LinearProgress
            variant="determinate"
            value={75}
            color="secondary"
            mt={4}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function Orders(props) {


  console.log(props)
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">30</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            SEGUROS CONTRATADOS
          </Typography>

          <StatsIcon>
            <LocalHospital />
          </StatsIcon>
          <LinearProgress
            variant="determinate"
            value={30}
            color="secondary"
            mt={4}
          />
          <Button onClick={() => { props.onClick.functionClickListaSeguros() }} size="small" color="primary">
            LISTA DE SEGUROS
            </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

function Revenue(props) {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">1.224</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            SINIESTROS DECLARADOS
          </Typography>

          <StatsIcon>
            <NewReleases />
          </StatsIcon>
          <LinearProgress
            variant="determinate"
            value={50}
            color="secondary"
            mt={4}
          />

          <Button onClick={() => { props.onClick.functionClickListaSiniestros() }} size="small" color="primary">
            LISTA DE SINIESTROS
            </Button>

        </CardContent>
      </Card>
    </Box>
  );
}

const renderLista = (tipoListaRender) => {


  switch (tipoListaRender) {
    case 1:
      return <Seguros />

      break;
    case 2:
      return <Siniestros />

      break;
  }


}

function Seguros() {



  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          SEGUROS CONTRATADOS
        </Typography>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '20%' }}>SEGURO</TableCell>
                <TableCell style={{ width: '20%' }}>ACTIVIDAD</TableCell>
                <TableCell style={{ width: '60%' }}>OPCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '20%' }}>
                  #NOMBRESEGURO
                </TableCell>
                <TableCell style={{ width: '20%' }}>
                  <ProductsChip
                    size="small"
                    label="HTML"
                    rgbcolor={blue[500]}
                  />
                </TableCell>

                <TableCell style={{ width: '60%' }}>
                  <Route style={{ marginRight: '6px' }} render={({ history }) => (
                    <Button onClick={() => { history.push(`/pages/seguros/detalles/000`) }} size="small" color="primary">
                      FICHA
                    </Button>
                  )} />

                  <Route render={({ history }) => (
                    <Button onClick={() => { history.push('/pages/flujo_siniestro') }} size="small" color="primary">
                      NUEVO SINIESTRO
                    </Button>
                  )} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
}

function Siniestros() {



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
                <TableCell style={{ width: '20%' }}>SEGURO</TableCell>
                <TableCell style={{ width: '20%' }}>ESTADO</TableCell>
                <TableCell style={{ width: '20%' }}>FECHA INGRESO</TableCell>
                <TableCell style={{ width: '20%' }}>RESUMEN</TableCell>
                <TableCell style={{ width: '20%' }}>DETALLE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: '20%' }} component="th" scope="row">
                  #SEGURO
                </TableCell>
                <TableCell style={{ width: '20%' }}>
                  <ProductsChip
                    size="small"
                    label="HTML"
                    rgbcolor={blue[500]}
                  />
                </TableCell>
                <TableCell style={{ width: '20%' }} component="th" scope="row">
                  #FECHAINGRESO
                </TableCell>

                <TableCell style={{ width: '40%' }}>Single License</TableCell>
                <TableCell style={{ width: '20%' }}>   <Route style={{ width: '30%' }} render={({ history }) => (
                  <Button onClick={() => { history.push(`/pages/seguros/detalles/000`) }} size="small" color="primary">
                    FICHA
                  </Button>
                )} /></TableCell>


              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
}
const SalesRevenue = withTheme(({ theme }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        hoverBackgroundColor: theme.palette.secondary.main,
        hoverBorderColor: theme.palette.secondary.main,
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.625,
        categoryPercentage: 0.5,
      },
      {
        label: "Revenue",
        backgroundColor: theme.palette.grey[200],
        borderColor: theme.palette.grey[200],
        hoverBackgroundColor: theme.palette.grey[200],
        hoverBorderColor: theme.palette.grey[200],
        data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
        barPercentage: 0.625,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cornerRadius: 2,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          stacked: false,
          ticks: {
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: "transparent",
          },
        },
      ],
    },
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sales / Revenue
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Bar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
});





let itemRender = 'cargando'

function Profile() {
  const [tipoLista, setTipoLista] = useState(1);

  //itemRender = renderLista(1);



  if (tipoLista) {
    itemRender = renderLista(tipoLista)
  }

  const functionClickListaSeguros = () => {
    setTipoLista(1)

  }
  const functionClickListaSiniestros = () => {
    setTipoLista(2)
  }



  return (
    <React.Fragment>
      <Helmet title="Profile" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>
        <Typography variant="h3" gutterBottom display="inline">
          MI CUENTA
      </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            KIRAWEBAPP
        </Link>

          <Typography>MI CUENTA</Typography>
        </Breadcrumbs>

        <Divider my={6} />

        <Grid container spacing={6}>
          <Grid item xs={12} lg={4} xl={3}>
            <Details />
            <About />
            <Elsewhere />
            <Skills />
          </Grid>
          <Grid item xs={12} lg={8} xl={9}>

            <Grid container spacing={6}>

              <Grid item xs={12} lg={6}>
                <Orders onClick={{ functionClickListaSeguros }} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Revenue onClick={{ functionClickListaSiniestros }} />
              </Grid>
            </Grid>
            {itemRender}
          </Grid>
        </Grid>

      </Grid>

    </React.Fragment >
  );
}

export default Profile;
