
import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";


import { spacing } from "@material-ui/system";
import { API } from "aws-amplify";
import { Route } from 'react-router-dom'
import Helmet from "react-helmet";

import {
  Mail as MailIcon,
  Code as CodeIcon,
  Users as UsersIcon,
  Figma as FigmaIcon,
  BookOpen as BookOpenIcon,
  PlusCircle as PlusCircleIcon,
} from "react-feather";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography,
  Box, Container,
  Typography as MuiTypography,
} from "@material-ui/core";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const FeatureWrapper = styled.div`
  display: flex;
  text-align: left;
  padding: 18px 20px;
`;

const FeatureIcon = styled.div`
  svg {
    flex-shrink: 0;
    width: auto;
    height: 32px;
    width: 32px;
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;
const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;
//const Typography = styled(MuiTypography)(spacing);



function Project({ id, image, title, description, chip }) {
  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <CardContent>
        <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', textAlign: 'start' }}>

          <h2>  {title}</h2>

          {chip}

          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          {description}
          </div>

        </div>


      </CardContent>
      <CardActions>



        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Route render={({ history }) => (
            <Button onClick={() => { history.push('/pages/flujo_compras') }} size="large" color="primary">
              COMPRAR
            </Button>
          )} />

          <Route render={({ history }) => (
            <Button onClick={() => { history.push(`/pages/seguros/detalles/${id}`) }} size="large" color="primary">
              DETALLES
            </Button>
          )} />
        </div>

      </CardActions>
    </Card>
  );
}


const ListaRender = () => {
  const [productos, setProductos] = useState('undefined');
  const [error, setError] = useState('undefined');


  // console.log("listaProductos", listaProductos)

  useEffect(async () => {


    const queryListaActividadGraphql = `
 query MyQuery {
   listasProductos {
     id
    anexo_cp
    descripcion
    carta_cp
    descripcion_larga
    fecha_inicio
    fecha_termino
    imagen
    logo
    nombre_comercial
    nombre_tecnico
    periodo
    producto_cp
    valor_minimo
  }
}

`;

    console.log(queryListaActividadGraphql)
    await API.graphql({
      query: queryListaActividadGraphql
    }).then(result => {
      console.log(result);
      setProductos(result);


    }
    )

  }, []);


  if (productos && productos['data']) {

    console.log("productos", productos['data']['listasProductos']);

    let listProductos = productos['data']['listasProductos'];
    console.log("listaProductos", listProductos)

    return <Grid container spacing={6}>

      {
        listProductos.map(item => {
          console.log(item);
          return < Grid item xs={12} lg={6} xl={6} >
            <Project
              id={item['id']}

              title={item['nombre_comercial']}
              description={item['descripcion']}
              //  chip={<Chip label="In progress" rgbcolor={orange[500]} />}
              image={item['imagen']}
            />
          </Grid>
        })
      }
    </Grid >
  } else {

    return productos && 'cargando...'

  }
}







const Feature = ({ Icon, title, description }) => {


  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <FeatureWrapper>
        <FeatureIcon>
          <Icon />
        </FeatureIcon>
        <Box ml={6}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </FeatureWrapper>
    </Grid>
  );
};


let itemRender = 'cargando';


function Features() {


  itemRender = ListaRender()

  console.log(itemRender)


  return (
    <Wrapper py={20}>
      <Container>
        <TypographyOverline variant="body2" gutterBottom>
          NUESTROS PRODUCTOS
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          CONTRATA SEGURO Y RAPIDO
        </Typography>
        <Box mb={8} />


        <Grid>
          {itemRender}
        </Grid>


      </Container>
    </Wrapper>
  );
}

export default Features;

