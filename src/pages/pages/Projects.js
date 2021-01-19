import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { API } from "aws-amplify";
import Helmet from "react-helmet";
import AppBar from "../presentation/Landing/HomeBar";

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
  Typography as MuiTypography,
} from "@material-ui/core";

import { Route } from 'react-router-dom'
import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";
import { red, green, orange } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`;






function Project({ id, image, title, description, chip }) {
  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>

        {chip}

        <Typography mb={4} component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
        </Typography>


      </CardContent>
      <CardActions>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>

          <Route render={({ history }) => (
            <Button onClick={() => { history.push('/pages/flujo_compras') }} size="small" color="primary">
              COMPRAR
            </Button>
          )} />

          <Route render={({ history }) => (
            <Button onClick={() => { history.push(`/pages/seguros/detalles/${id}`) }} size="small" color="primary">
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

let itemRender = 'cargando';



function Projects() {


  itemRender = ListaRender()

  console.log(itemRender)

  return (
    <React.Fragment>
      <Helmet title="Catalogo" />
      <AppBar />


      <Grid style={{ padding: '22px' }}>
        <Typography variant="h3" gutterBottom display="inline">
          CATALOGO
      </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            KIRAWEBAPP
        </Link>

          <Typography>CATALOGO</Typography>
        </Breadcrumbs>

        <Divider my={6} />

        {itemRender}


        <Grid container spacing={6}>



          <Grid item xs={12} lg={6} xl={6}>
            <Project
              title="New company logo"
              description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
              //chip={<Chip label="On hold" rgbcolor={red[500]} />}
              image="/static/img/unsplash/unsplash-2.jpg"
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
            <Project
              title="Upgrade to latest Maps API"
              description="Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris."
              //  chip={<Chip label="Finished" rgbcolor={green[500]} />}
              image="/static/img/unsplash/unsplash-3.jpg"
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
            <Project
              title="Refactor backend templates"
              description="Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa."
              // chip={<Chip label="On hold" rgbcolor={red[500]} />}
              image="/static/img/unsplash/unsplash-4.jpg"
            />
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment >
  );
}

export default Projects;
