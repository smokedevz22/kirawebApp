import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled, { withTheme } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Route } from 'react-router-dom'
import AppBar from "../presentation/Landing/HomeBar";
import { API } from "aws-amplify";

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
    <Card mb={6} style={{ background: '#0fb6e9' }}>
      <CardContent >


        <Spacer mb={4} />

        <Centered>
          <Avatar alt="Lucy Lavender" src="/static/img/profile.jpg" />
          <Typography variant="body2" component="div" gutterBottom>
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
            <Box fontWeight="fontWeightRegular">0</Box>
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
            <Box fontWeight="fontWeightRegular">0</Box>
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

function CotizacionesCard(props) {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">0</Box>
          </Typography>
          <Typography variant="body2" style={{ textTransform: 'uppercase' }} gutterBottom mt={3} mb={0}>
            Cotizaciones Realizadas
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

          <Button onClick={() => { props.onClick.functionClickListaCotizaciones() }} size="small" color="primary">
            LISTA DE COTIZACINES
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
    case 3:
      return <Cotizaciones />

      break;
  }


}



const ListaRenderCotizaciones = (obtenerListaProductos) => {
  const [polizas, setPolizas] = useState('undefined');



  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   listasCotizaciones {
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
    setPolizas(data)

  }, [])

  console.log("polizaaa", polizas)

  if (polizas && polizas['data']) {

    console.log("productos", polizas['data']['listasCotizaciones']);

    let listProductos = polizas['data']['listasCotizaciones'];
    console.log("listaProductos", listProductos)

    return <TableBody style={{ width: '100%' }}>

      {listProductos &&
        listProductos.map((item, index) => {
          console.log(item);

          let itemTemporal = JSON.parse(item['data_cotizacion']);
          let itemPlan = JSON.parse(itemTemporal['plan']['data_plan'])
          let itemSubPlan = JSON.parse(itemTemporal['subplan']['data_sub_plan'])

          console.log(item)

          return (<TableRow style={{ width: '100%' }} key={index}>
            <TableCell style={{ width: '5%' }}>
              <ProductsChip
                size="small"
                label="ACTIVO"
                rgbcolor={blue[500]}
              />
            </TableCell>
            <TableCell component="th" scope="row" style={{ width: '40%' }}>
              <Typography variant="body2" gutterBottom>
                {itemTemporal['asegurado']['marca_equipo'] + ' - ' + itemTemporal['asegurado']['modelo_equipo']}
              </Typography>
            </TableCell>

            <TableCell component="th" scope="row" style={{ width: '40%' }}>
              <Typography style={{
                textTransform: 'uppercase'
              }} variant="body2" gutterBottom>
                {itemPlan['nombre_plan'] + " " + itemSubPlan['nombre']}
              </Typography>
            </TableCell>


            <TableCell component="th" scope="row" style={{ width: '15%' }}>
              <Route style={{ marginRight: '6px' }} render={({ history }) => (
                <Button onClick={() => { history.push(`/pages/cotizaciones/${item['id']}`) }} size="small" color="primary">
                  COMPRAR
                </Button>

              )} />

            </TableCell>
          </TableRow>
          )
        })
      }
    </TableBody>
  } else {

    return polizas && 'cargando...'

  }



}


const ListaRenderPolizas = (obtenerListaProductos) => {
  const [polizas, setPolizas] = useState('undefined');



  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   listasPolizas {
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
    setPolizas(data)

  }, [])

  console.log("polizaaa", polizas)

  if (polizas && polizas['data']) {

    console.log("productos", polizas['data']['listasPolizas']);

    let listProductos = polizas['data']['listasPolizas'];
    console.log("listaProductos", listProductos)

    return <TableBody style={{ width: '100%' }}>

      {listProductos &&
        listProductos.map((item, index) => {
          console.log(item);

          let itemTemporal = JSON.parse(item['data_poliza']);
          let itemPlan = JSON.parse(itemTemporal['plan']['data_plan'])
          let itemSubPlan = JSON.parse(itemTemporal['subplan']['data_sub_plan'])


          console.log(itemTemporal)

          return (<TableRow style={{ width: '100%' }} key={index}>
            <TableCell >
              <ProductsChip
                size="small"
                label="ACTIVO"
                rgbcolor={blue[500]}
              />
            </TableCell>

            <TableCell component="th" scope="row"  >
              <Typography gutterBottom style={{ fontSize: 12, textTransform: 'uppercase' }}>
                {itemTemporal['asegurado']['marca_equipo'] + ' - ' + itemTemporal['asegurado']['modelo_equipo']}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row" >
              <Typography style={{ fontSize: 12, textTransform: 'uppercase' }} gutterBottom>
                {itemPlan['nombre_plan']}
              </Typography>
            </TableCell>


            <TableCell component="th" scope="row" >

              <Grid style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Route style={{ marginRight: '6px' }} render={({ history }) => (
                  <Button onClick={() => { history.push(`/pages/polizas/${item['id']}`) }} size="small" color="primary">
                    FICHA
                  </Button>
                )} />

                <Route render={({ history }) => (
                  <Button onClick={() => { history.push('/pages/flujo_siniestro') }} size="small" color="primary">
                    SINIESTRO
                  </Button>
                )} />

              </Grid>
            </TableCell>
          </TableRow>
          )
        })
      }
    </TableBody >
  } else {

    return polizas && 'cargando...'

  }



}



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
  } else {

    return siniestros && 'cargando...'

  }



}

function Seguros() {

  let data = ListaRenderPolizas();


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
                <TableCell style={{ width: '5%' }}>ESTADO</TableCell>
                <TableCell style={{ width: '70%' }}>EQUIPO</TableCell>
                <TableCell style={{ width: '20%' }}>PLAN</TableCell>
                <TableCell style={{ width: '10%' }}>OPCIONES</TableCell>
              </TableRow>
            </TableHead>


            {data}


          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
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
            {data}

          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
}

function Cotizaciones() {

  let data = ListaRenderCotizaciones();


  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          COTIZACIONES REALIZADAS
        </Typography>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '5%' }}>ESTADO</TableCell>
                <TableCell style={{ width: '40%' }}>EQUIPO</TableCell>
                <TableCell style={{ width: '40%' }}>PLAN</TableCell>
                <TableCell style={{ width: '15%' }}>DETALLE</TableCell>
              </TableRow>
            </TableHead>
            {data}

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

  const functionClickListaCotizaciones = () => {
    setTipoLista(3)
  }

  return (
    <React.Fragment>
      <Helmet title="Profile" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>
        <Typography variant="h3" gutterBottom display="inline">
          MI CUENTA
      </Typography>



        <Divider my={6} />

        <Grid container spacing={6}>

          <Grid item lg={12}  >

            <Grid container item lg={12} spacing={12}>

              <Grid item xs={12} lg={4}>
                <Orders onClick={{ functionClickListaSeguros }} />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Revenue onClick={{ functionClickListaSiniestros }} />
              </Grid>

              <Grid item xs={12} lg={4}>
                <CotizacionesCard onClick={{ functionClickListaCotizaciones }} />
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
