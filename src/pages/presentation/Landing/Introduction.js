import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  Box,
  Container,
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
  overflow: hidden;
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
  margin-bottom: -100px;
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
        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item xs={12} sm={9} md={8} lg={7}>
            <Content>
              <Title variant="h1" gutterBottom>
                Modern, Flexible and Responsive <span>Material-UI</span> Admin
                Template
              </Title>
              <Grid container justify="center" spacing={4}>
                <Grid item xs={12} lg={10}>
                  <Subtitle color="textSecondary">
                    Material App comes with hundreds of UI elements, forms,
                    tables, charts, pages and icons that helps you to create
                    your web apps or applications faster.
                  </Subtitle>
                </Grid>
              </Grid>

              <Box my={6}>
                <Feature>
                  <FeatureText component="span" variant="h2" mb={1}>
                    400+
                  </FeatureText>
                  <Typography variant="body1">Components</Typography>
                </Feature>
                <Feature>
                  <FeatureText component="span" variant="h2" mb={1}>
                    1200+
                  </FeatureText>
                  <Typography variant="body1">SVG Icons</Typography>
                </Feature>
                <Feature>
                  <FeatureText component="span" variant="h2" mb={1}>
                    50+
                  </FeatureText>
                  <Typography variant="body1">Pages</Typography>
                </Feature>
              </Box>

              <BrandIcons my={4}>
                <Tooltip title="JavaScript">
                  <BrandIcon
                    alt="JavaScript"
                    src="/static/img/brands/javascript.svg"
                    style={{ width: "40px" }}
                  />
                </Tooltip>
                <Tooltip title="TypeScript">
                  <BrandIcon
                    alt="TypeScript"
                    src="/static/img/brands/typescript.svg"
                    style={{ width: "40px", background: "#FFF" }}
                  />
                </Tooltip>
                <Tooltip title="Material-UI">
                  <BrandIcon
                    alt="Material-UI"
                    src="/static/img/brands/material-ui.svg"
                    style={{ width: "40px" }}
                  />
                </Tooltip>
                <Tooltip title="React">
                  <BrandIcon
                    alt="React"
                    src="/static/img/brands/react.svg"
                    style={{ width: "45px" }}
                  />
                </Tooltip>
                <Tooltip title="Redux">
                  <BrandIcon
                    alt="Redux"
                    src="/static/img/brands/redux.svg"
                    style={{ width: "35px" }}
                  />
                </Tooltip>
              </BrandIcons>
            </Content>
            <NavLink to="/dashboard/analytics" target="_blank">
              <ImageWrapper>
                <Image
                  alt="Material App - React Admin Template"
                  src={`/static/img/screenshots/dashboard-analytics-large.jpg`}
                />
              </ImageWrapper>
            </NavLink>
          </Grid>
        </Grid>
      </Container>
      <Shape xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 100">
        <polygon fill="#FFF" points="2560 0 2560 100 0 100"></polygon>
      </Shape>
    </Wrapper>
  );
}

export default Introduction;
