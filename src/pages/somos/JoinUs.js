import React from "react";
import styled from "styled-components/macro";

import {
  Button,
  Container,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const Typography = styled(MuiTypography)(spacing);

const Wrapper = styled.div`
  ${spacing};
  text-align: center;
  position: relative;
  background: #181d2d;
  color: ${(props) => props.theme.palette.common.white};
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  opacity: 0.75;
`;

const Shape = styled.svg`
  position: absolute;
  transform: rotate(180deg);
  top: 0;
  z-index: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -1px;
`;

function JoinUs() {
  return (
    <Wrapper pt={24} pb={16}>
      <Shape xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 100">
        <polygon fill="#F7F9FC" points="2560 0 2560 100 0 100"></polygon>
      </Shape>
      <Container>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h2" gutterBottom>
              Get Material App and start saving time
            </Typography>
            <Subtitle variant="h5" gutterBottom>
              Stop wasting time building your application from scratch. Material
              App is fast, extendable and fully customizable.
            </Subtitle>
            <Spacer mb={4} />

            <Button
              href="/pages/flujo_compra"
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
            >
              CONTRATAR SEGURO
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default JoinUs;
