import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Box,
  Container,
  Avatar,
  Button as MuiButton,
  Grid,
  Tooltip,

  Typography as MuiTypography,
} from "@material-ui/core";


import {

  CheckCircle as CheckCircle,

} from "@material-ui/icons";



import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);
const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding-top: 3.5rem;
  position: relative;
  text-align: center;
 `;

const Content = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px 0;
  line-height: 150%;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18, 38, 63, 0.075);
  border-radius: 5px;
 `;

const ImageWrapper = styled.div`
  &:before {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.03));
    bottom: 0;
    left: 0;
    position: absolute;
    content: " ";
    z-index: 0;
    display: block;
    width: 100%;
    height: 250px;
  }
`;

const Title = styled(Typography)`
  opacity: 0.9;
  line-height: 1.4;
  font-size: 1.75rem;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};

  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 2rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 2.5rem;
  }

  span {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.spacing(2)}px 0;
`;

const BrandIcons = styled.div(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  margin-right: ${(props) => props.theme.spacing(3)}px;
  height: auto;
`;

const Feature = styled.div`
  display: inline-block;
  padding: 0 ${(props) => props.theme.spacing(3)}px;
  text-align: left;
`;

const FeatureText = styled(Typography)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

const Shape = styled.svg`
  position: absolute;
  bottom: 0;
  z-index: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: -1px;
`;

function Introduction() {
  return (
    <Wrapper>
      <Container>
        <Grid container >
          <Grid item xs={12} sm={9} md={8} lg={12}>
            <Content>

              <Grid style={{ display: 'flex', textAlign: 'start', display: 'flex', flexDirection: 'column' }}>

                <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                  <Grid>

                    <span gutterBottom style={{ background: '#0fb6e9', fontSize: 32, fontWeight: 'bold', color: 'white', padding: 6 }}>
                      NUESTRA EXPERIENCIA ES SU RESPALDO
                     </span>
                  </Grid>


                </Grid>

              </Grid>


            </Content>
            <Grid lg={12} style={{ display: 'flex', textAlign: 'start', display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', flexDirection: 'column' }} lg={12}>
                <Grid lg={12} style={{ display: 'flex', height: '250px' }}>

                  <div style={{ width: '100%', height: '220px', background: '#0fb6e9', position: 'absolute' }}></div>

                  <Grid lg={6} style={{ display: 'flex', zIndex: '999', paddingLeft: 12, justifyContent: 'center', flexDirection: 'column' }}>
                    <Grid style={{ paddingLeft: 12 }}>

                      <span gutterBottom style={{ fontSize: 32, color: 'white', fontWeight: 'bold' }}>
                        PROTEGE TU
              </span></Grid>

                    <Grid style={{ paddingLeft: 12 }}>

                      <span gutterBottom style={{ fontSize: 48, color: 'white', fontWeight: 'bold' }}>
                        CELULAR
              </span>
                    </Grid>
                    <Grid style={{ paddingLeft: 12 }}>

                      <span gutterBottom style={{ fontSize: 22, color: 'white', fontWeight: 'lighter' }}>
                        100% ONLINE
              </span>
                    </Grid>
                  </Grid>

                  <Grid lg={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ImageWrapper style={{ padding: 16 }}>


                      <Avatar style={{ height: 250, width: 250, marginTop: 120 }} alt="Remy Sharp" src={`/static/logo_cinco.png`} />

                    </ImageWrapper>

                  </Grid>


                </Grid>


              </Grid>

            </Grid>

          </Grid>

        </Grid>
     

        <Grid lg={12} style={{ display: 'flex', marginTop: 160 }}>
          <Grid lg={5}>

            <Grid style={{ display: 'flex', textAlign: 'start', display: 'flex', flexDirection: 'column' }}>

              <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid>

                  <span gutterBottom style={{ background: '#0fb6e9', fontSize: 32, fontWeight: 'bold', padding: 4, color: 'white' }}>
                    ASEGURA TU CELULAR
                    

              </span></Grid>

                <Grid style={{ marginTop: 6 }}>


                </Grid>
              </Grid>

            </Grid>

            <Grid style={{ display: 'flex', textAlign: 'start', flexDirection: 'column', paddingTop: 22, alignItems: 'center' }}>


              <Grid style={{ paddingLeft: 12, paddingRight: 12, }}>

                <Typography style={{ color: 'black', fontSize: 22, marginTop: 8, marginLeft: 4 }}  gutterBottom>
                  Reposición de tu equipo por:
                 </Typography>

                <Grid style={{ display: 'flex', alignItems: 'center' }}>

                  <CheckCircle style={{ color: 'black', fontSize: 22 }}></CheckCircle>
                  <Typography style={{ color: 'black', fontSize: 22, marginTop: 8, marginLeft: 4 }} gutterBottom>
                    Robo
                  </Typography>
                </Grid>


                <Grid style={{ display: 'flex', alignItems: 'center' }}>

                  <CheckCircle style={{ color: 'black', fontSize: 22 }}></CheckCircle>
                  <Typography style={{ color: 'black', fontSize: 22, marginTop: 8, marginLeft: 4 }} gutterBottom>
                    Pérdida total por accidente
                  </Typography>
                </Grid>


                <Grid style={{ display: 'flex', alignItems: 'center' }}>

                  <CheckCircle style={{ color: 'black', fontSize: 22 }}></CheckCircle>
                  <Typography style={{ color: 'black', fontSize: 22, marginTop: 8, marginLeft: 4 }} gutterBottom>
                    Pérdida parcial por accidente
                  </Typography>
                </Grid>


              </Grid>
              <Grid>

                <Button
                  style={{ marginTop: 12, marginBottom: 16, zIndex: 999 }}
                  ml={2}
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/pages/flujo_compras"
                >
                  COTIZAR
              </Button>
              </Grid>
            </Grid>

          </Grid>
          <Grid lg={1}>


          </Grid>

          <Grid lg={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ImageWrapper>

              <Image
                alt="Material App - React Admin Template"
                src={`/static/img/segunda_imagen_landing.jpg`}
              />


            </ImageWrapper>
          </Grid>
        </Grid >

      </Container>



    </Wrapper >
  );
}

export default Introduction;
