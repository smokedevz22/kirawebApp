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
                  En que consiste la reposición?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  .
                </Typography>
              </Grid>

            </Grid>

            <Grid item xs={12} xl={12} style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', }}>
                <Typography variant="h4" style={{ textTransform: 'uppercase', color: '#0fb6e9' }}>
                  En que consiste la reposición?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  .
                </Typography>
              </Grid>

            </Grid>

            <Grid item xs={12} xl={12} style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>

              <Grid style={{ display: 'flex', }}>
                <Typography variant="h4" style={{ textTransform: 'uppercase', color: '#0fb6e9' }}>
                  En que consiste la reposición?
                </Typography>
              </Grid>

              <Grid style={{ background: '#0fb6e9', minHeight: 80, padding: 12, display: 'flex', textAlign: 'start', marginTop: 8 }}>
                <Typography variant="p" style={{ color: 'white', }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  .
                </Typography>
              </Grid>

            </Grid>


          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default FAQ;
