import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Card = styled(MuiCard)(spacing);
const timeOut = (time) => new Promise((res) => setTimeout(res, time));



const initialValues = {
  firstName: "Lucy",
  lastName: "Lavender",
  email: "lucylavender@gmail.com",
  password: "mypassword123",
  confirmPassword: "mypassword123",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(12, "Must be at least 12 characters")
    .max(255)
    .required("Required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});

function BasicForm() {
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      await timeOut(1500);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6}>
                    <Grid item md={6}>
                      <TextField
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    variant="outlined"
                    my={2}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    variant="outlined"
                    my={2}
                  />

                  <TextField
                    name="confirmPassword"
                    label="Confirm password"
                    value={values.confirmPassword}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    variant="outlined"
                    my={2}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    Save changes
                </Button>
                </form>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}


function EmptyCard() {
  return (
    <Card mb={6}>
      <CardContent>
        <BasicForm />
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
  return ['DATOS DEL ASEGURADO', 'METODO DE PAGO', 'RESUMEN DEL PRODUCTO', 'PRECIOS', 'CONTRATO', 'POLIZA'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return EmptyCard();
    case 1:
      return EmptyCard();
    case 2:
      return EmptyCard();
    case 3:
      return EmptyCard();
    case 4:
      return EmptyCard();
    case 5:
      return EmptyCard();
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
            <Card mb={6}>
              <CardContent>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography className={classes.instructions}>
                    Formulario completo
            </Typography>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleReset}>Reiniciar</Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  ATRAS
              </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  SIGUIENTE
              </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Paso {activeStep + 1} completado
                    </Typography>
                  ) : (
                      <Button variant="contained" color="primary" onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1 ? 'Finalizar' : 'Completar paso'}
                      </Button>
                    ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}


function FlujoCompra() {
  return (
    <React.Fragment>
      <Helmet title="Flujo de compra" />
      <Typography variant="h3" gutterBottom display="inline">
        Flujo de compra
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          KIRAWEBAPP
        </Link>
        <Link component={NavLink} exact to="/">
          SEGUROS
        </Link>
        <Typography>FLUJO DE COMPRA</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <HorizontalNonLinearStepper>

      </HorizontalNonLinearStepper>

    </React.Fragment>
  );
}

export default FlujoCompra;
