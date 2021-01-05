import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function EmptyCard() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Empty card
        </Typography>
        <Typography variant="body2" gutterBottom>
          Empty card
        </Typography>
      </CardContent>
    </Card>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return EmptyCard();
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
              </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
              </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                      <Button variant="contained" color="primary" onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                      </Button>
                    ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}


function Blank() {
  return (
    <React.Fragment>
      <Helmet title="Blank" />
      <Typography variant="h3" gutterBottom display="inline">
        Blank
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Pages
        </Link>
        <Typography>Blank</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <HorizontalNonLinearStepper>

      </HorizontalNonLinearStepper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EmptyCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Blank;
