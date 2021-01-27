import React from "react";
import styled from "styled-components/macro";

import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Container,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Spacer = styled.div(spacing);

const Wrapper = styled.div`
  ${spacing};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const Accordion = styled(MuiAccordion)`
  border: 1px solid
    ${(props) =>
    props.theme.palette.type === "dark"
      ? `rgba(255, 255, 255, .15)`
      : `rgba(0, 0, 0, .15)`};
  border-radius: 6px;
  box-shadow: 0;
  text-align: left;
  margin: 16px 0 !important;

  &:before {
    display: none;
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  padding: 0 16px;
  box-shadow: 0;
  min-height: 48px !important;

  .MuiAccordionSummary-content {
    margin: 12px 0 !important;
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
  padding-left: 16px;
  padding-right: 16px;
`;

function FAQ() {
  return (
    <Wrapper pt={20} pb={16}>
      <Container>


        <Grid container>

          <Grid item xs={12} xl={10} style={{ display: 'flex' }}>
            <Typography variant="h2" component="h3" gutterBottom>
              PREGUNTAS FRECUENTES
        </Typography>

          </Grid>
        </Grid>

        <Spacer mb={8} />

        <Grid container alignItems="center" >
          <Grid item xs={12} xl={10}>
            <Grid item xs={12} xl={12} style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', }}>
                <Typography variant="h4" style={{ textTransform: 'uppercase', color: '#0fb6e9' }}>
                  ¿Qué se entiende por robo?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Se entiende como pérdida total por robo cuando el teléfono haya sido objeto de un robo con violencia en las personas o fuerza en las cosas, y en ambos casos no existieren antecedentes que hicieren factible su pronta recuperación.
                </Typography>
              </Grid>

            </Grid>

            <Grid item xs={12} xl={12} style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', }}>
                <Typography variant="h4" style={{ textTransform: 'uppercase', color: '#0fb6e9' }}>
                  ¿Qué se entiende por daño accidental?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Se entiende como daño accidental el daño provocado fortuitamente (excluyendo todo daño por el uso regular o habitual del teléfono según su manual de funcionamiento), que afecte al normal funcionamiento del equipo. </Typography>
              </Grid>

            </Grid>

            <Grid item xs={12} xl={12} style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', }}>
                <Typography variant="h4" style={{ textTransform: 'uppercase', color: '#0fb6e9' }}>
                  ¿Qué se entiende por pérdida total?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Se entenderá que existe pérdida total por daño accidental, cuando los gastos de reparación del equipo celular igualan o excedan el 75% del valor de reposición del mismo..
                </Typography>
              </Grid>

            </Grid>

            <Grid item xs={12} xl={12} style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', }}>
                <Typography variant="h4" style={{ textTransform: 'uppercase', color: '#0fb6e9' }}>
                  ¿Qué se entiende por similar a nuevo?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Se entiende por “equipo similar a nuevo” un equipo que ha sido inspeccionado, probado y restaurado en una fábrica o centro de servicio autorizado y que se encuentra certificado para su utilización.                </Typography>
              </Grid>

            </Grid>


          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default FAQ;
