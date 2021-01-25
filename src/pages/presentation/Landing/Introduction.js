import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  Box,
  Container,
  Avatar,
  Grid,
  Tooltip,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

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
                <Grid lg={12} style={{ background: '#0fb6e9', display: 'flex', height: '250px' }}>

                  <Grid lg={6} style={{ display: 'flex', paddingLeft: 12, justifyContent: 'center', flexDirection: 'column' }}>
                    <Grid style={{ paddingLeft: 12 }}>

                      <span gutterBottom style={{ background: '#0fb6e9', fontSize: 48, color: 'white', fontWeight: 'bold' }}>
                        PROTEGE TU
              </span></Grid>

                    <Grid style={{ paddingLeft: 12 }}>

                      <span gutterBottom style={{ background: '#0fb6e9', fontSize: 48, color: 'white', fontWeight: 'bold' }}>
                        CELULAR
              </span>
                    </Grid>
                  </Grid>

                  <Grid lg={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <NavLink to="/dashboard/analytics" target="_blank">
                      <ImageWrapper style={{ padding: 16 }}>


                        <Avatar style={{ height: 225, width: 225 }} alt="Remy Sharp" src={`/static/img/screenshots/dashboard-analytics-large.jpg`} />

                      </ImageWrapper>
                    </NavLink>
                  </Grid>
                </Grid>


              </Grid>

            </Grid>

          </Grid>

        </Grid>
        <Grid item xs={12} xl={10} style={{ display: 'flex', marginTop: 42 }}>
          <Typography variant="h2" component="h3" gutterBottom>
            NUESTROS SEGUROS
        </Typography>

        </Grid>


        <Grid lg={12} style={{ display: 'flex', marginTop: 42 }}>
          <Grid lg={5}>

            <Grid style={{ display: 'flex', textAlign: 'start', display: 'flex', flexDirection: 'column' }}>

              <Grid style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid>

                  <span gutterBottom style={{ background: '#0fb6e9', fontSize: 32, fontWeight: 'bold', padding: 4, color: 'white' }}>
                    PROTEGE TU
              </span></Grid>

                <Grid style={{ marginTop: 6 }}>

                  <span gutterBottom style={{ background: '#0fb6e9', fontSize: 32, fontWeight: 'bold', padding: 4, color: 'white' }}>
                    CELULAR
              </span>
                </Grid>
              </Grid>

            </Grid>

            <Grid style={{ display: 'flex', textAlign: 'start' }}>
              <Subtitle color="textSecondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. <br /> when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Subtitle>
            </Grid>

          </Grid>
          <Grid lg={1}>


          </Grid>

          <Grid lg={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <NavLink to="/dashboard/analytics" target="_blank">
              <ImageWrapper>

                <Image
                  alt="Material App - React Admin Template"
                  src={`/static/img/screenshots/dashboard-analytics-large.jpg`}
                />


              </ImageWrapper>
            </NavLink>
          </Grid>
        </Grid >

      </Container>



    </Wrapper >
  );
}

export default Introduction;
