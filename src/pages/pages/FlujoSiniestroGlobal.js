import React, { Fragment, useState, Suspense, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";
import * as Yup from "yup";
import styled, { createGlobalStyle } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { API } from "aws-amplify";
import { Route } from 'react-router-dom'
import AppBar from "../presentation/Landing/HomeBar";
 import Amplify, { Storage } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/es";


import {
  CheckCircle as CheckCircle,
} from "@material-ui/icons";


import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Paper as MuiPaper,

  TextField as MuiTextField,
  Typography,
  Select,
} from "@material-ui/core";

import { color, spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


moment.locale("es");


const Spacer = styled.div(spacing);
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Shadow = styled.div`
  box-shadow: ${(props) => props.theme.shadows[1]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  sectionA: {
    flex: 1,
    padding: 4,
    fontSize: 12
  },
  sectionB: {
    flex: 2,
    padding: 4,
    fontSize: 12

  },
  texto: {

    fontSize: 12

  }
});


const timeOut = (time) => new Promise((res) => setTimeout(res, time));


const MyDocumentPdf = (props) => {

  let asegurado = props.object;

  console.log("SINIESTRO", asegurado)

  let fechaSiniestro = moment(itemDatosAsegurado['fecha_siniestro']).format("DD-MM-YYYY").toString();

  return (<Document>
    <Page size="A4" style={{ padding: 22 }}>

      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22, textAlign: 'center' }}>
        <Text style={{ textTransform: 'uppercase' }}>DETALLE SINIESTRO</Text>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>FECHA DECLARACION</Text>
        </View>
        <View style={styles.sectionB}>
          <Text style={{ textTransform: 'uppercase' }}>
            {fechaSiniestro}
          </Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>MI CELULAR</Text>
        </View>
        <View style={styles.sectionB}>
          <Text style={{ textTransform: 'uppercase' }}>
            {asegurado['polizaItem']}

          </Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>RESUMEN</Text>
        </View>
        <View style={styles.sectionB}>
          <Text style={{ textTransform: 'uppercase' }}>
            {asegurado['detalle']['descripcion_siniestro']}

          </Text>
        </View>
      </View>

    </Page>
    <Page size="A4" style={{ padding: 22 }}>

      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22, textAlign: 'center' }}>
        <Text style={{ textTransform: 'uppercase' }}>SEGURO TELÉFONOS MOVILES</Text>
      </View>
      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>EQUIPO ASEGURADO</Text>
      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            TELÉFONOS MÓVILES ADQUIRIDOS, EN CUALQUIER PUNTO DE VENTA A LO LARGO DEL TERRITORIO DE CHILE, Y RESPECTO DE LOS CUALES SE HAYA CONTRATADO EL PRESENTE SEGURO.

            PARA EFECTOS DE ESTE SEGURO, NO SE CONSIDERARÁN PARTE DEL EQUIPO ASEGURADO O DE LA MATERIA ASEGURADA, NINGÚN COMPONENTE O ACCESORIO DE LOS TELÉFONOS MÓVILES, TALES COMO CARGADORES, PROTECTORES, BLUETOOTH, MANOS LIBRES, O SIMILARES E INFORMACIÓN CONTENIDA EN CUALQUIER MEMORIA DEL APARATO. POR CONSIGUIENTE, NINGUNA PÉRDIDA O DAÑO DE TALES ELEMENTOS SERÁ INDEMNIZABLE.

          </Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>DETALLE DE LAS COBERTURAS</Text>
        <Text style={{ textTransform: 'uppercase' }}>PÉRDIDA TOTAL EN CASO DE ROBO</Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            LA COMPAÑÍA DE SEGUROS (EN ADELANTE LA “COMPAÑÍA) INDEMNIZARÁ AL ASEGURADO, PREVIO PAGO DEL DEDUCIBLE, CON LA REPOSICIÓN DE LOS TELÉFONOS MÓVILES, QUE HAYAN SUFRIDO LA PÉRDIDA TOTAL DE SUS EQUIPOS A CONSECUENCIA DE ROBO (EXCLUYE EL HURTO).

            SE ENTIENDE COMO PÉRDIDA TOTAL POR ROBO CUANDO EL TELÉFONO HAYA SIDO OBJETO DE UN ROBO CON VIOLENCIA EN LAS PERSONAS O FUERZA EN LAS COSAS, Y EN AMBOS CASOS NO EXISTIEREN ANTECEDENTES QUE HICIEREN FACTIBLE SU PRONTA RECUPERACIÓN.

          </Text>
        </View>
      </View>

      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>PÉRDIDA TOTAL EN CASO DE DAÑOS ACCIDENTALES</Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            LA COMPAÑÍA INDEMNIZARÁ AL ASEGURADO, PREVIO PAGO DEL DEDUCIBLE, CON LA REPOSICIÓN DE LOS TELÉFONOS MÓVILES, QUE HAYAN SUFRIDO LA PÉRDIDA TOTAL DE SUS EQUIPOS A CONSECUENCIA DE DAÑO ACCIDENTAL.

            PARA EFECTOS DEL SEGURO, SE ENTIENDE COMO DAÑO ACCIDENTAL EL DAÑO PROVOCADO FORTUITAMENTE (EXCLUYENDO TODO DAÑO POR EL USO REGULAR O HABITUAL DEL TELÉFONO SEGÚN SU MANUAL DE FUNCIONAMIENTO), QUE AFECTE AL NORMAL FUNCIONAMIENTO DEL EQUIPO.

            SE ENTENDERÁ QUE EXISTE PÉRDIDA TOTAL POR DAÑO ACCIDENTAL, CUANDO LOS GASTOS DE REPARACIÓN DEL EQUIPO CELULAR IGUALAN O EXCEDAN EL 75% DEL VALOR DE REPOSICIÓN DEL MISMO

          </Text>
        </View>
      </View>

      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>PÉRDIDA PARCIAL EN CASO DE DAÑOS ACCIDENTALES</Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            LA COMPAÑÍA INDEMNIZARÁ AL ASEGURADO, CON LA REPARACIÓN DE LOS TELÉFONOS MÓVILES, QUE HAYAN SUFRIDO LA PÉRDIDA PARCIAL DE SUS EQUIPOS A CONSECUENCIA DE DAÑO ACCIDENTAL.

            PARA EFECTOS DEL SEGURO, SE ENTIENDE COMO DAÑO ACCIDENTAL EL DAÑO PROVOCADO FORTUITAMENTE (EXCLUYENDO TODO DAÑO POR EL USO REGULAR O HABITUAL DEL TELÉFONO SEGÚN SU MANUAL DE FUNCIONAMIENTO), QUE AFECTE AL NORMAL FUNCIONAMIENTO DEL EQUIPO.

            NO SE ENTENDERÁ CONFIGURADO UN DAÑO ACCIDENTAL LOS DAÑOS O PÉRDIDAS CAUSADOS POR EL USO U OPERACIÓN ORDINARIA DE LOS EQUIPOS ASEGURADOS, TALES COMO DESGASTE, DEFORMACIÓN, CORROSIÓN, HERRUMBRE Y DETERIORO POR FALTA DE USO O PROVENIENTE DE LAS CONDICIONES ATMOSFÉRICAS NORMALES, COMO TAMBIÉN CUALQUIER OTRO ASÍ DESCRITO EN SU MANUAL DE FUNCIONAMIENTO Y QUE AFECTE AL NORMAL FUNCIONAMIENTO DEL EQUIPO ASEGURADO.

          </Text>
        </View>
      </View>



      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>DEDUCIBLE</Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            PARA LAS COBERTURAS DE PERDIDA TOTAL DE EQUIPOS APLICA DEDUCIBLE DEL 25% DEL VALOR LISTA DEL EQUIPO DE REEMPLAZO AL MOMENTO DE LA INDEMNIZACION, EN TODA Y CADA PERDIDA, VALOR QUE DEBERA SER PAGADO POR EL ASEGURADO PARA TENER DERECHO A LA INDEMINIZACION CORRESPONDIENTE.

            PARA LA COBERTURA DE PERDIDA PARCIAL DE EQUIPOS APLICA DEDUCIBLE DEL 15% DEL VALOR LISTA DEL EQUIPO DE REEMPLAZO AL MOMENTO DE LA INDEMNIZACION, EN TODA Y CADA PERDIDA, VALOR QUE DEBERA SER PAGADO POR EL ASEGURADO PARA TENER DERECHO A LA INDEMINIZACION CORRESPONDIENTE.

          </Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>LÍMITE MÁXIMO DE EVENTOS </Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            HASTA UN MÁXIMO DE 2 EVENTOS PARA LA COBERTURA DE DAÑO Y 1 EVENTO PARA LA COBERTURA DE ROBO DURANTE EL PERÍODO DE VIGENCIA LUEGO DE CONSUMIDO EL NÚMERO DE EVENTOS MÁXIMOS POR CADA ASEGURADO, SE EXTINGUE LA PÓLIZA RESPECTO DE DICHOS ASEGURADOS.
          </Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>LÍMITE MÁXIMO DE INDEMNIZACIÓN
 </Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            EL LÍMITE MÁXIMO DE INDEMNIZACIÓN POR CADA EVENTO ES EL VALOR EQUIPO ASEGURADO. PARA TODAS LAS COBERTURAS, LA REPOSICIÓN DEL EQUIPO ASEGURADO SERÁ REALIZADA CON UN “EQUIPO NUEVO O SIMILAR A NUEVO” EN CONDICIONES Y CARACTERÍSTICAS SIMILARES.

            PARA EFECTOS DEL PRESENTE SEGURO, SE ENTIENDE POR “EQUIPO SIMILAR A NUEVO”  A AQUEL EQUIPO QUE HA SIDO INSPECCIONADO, PROBADO Y RESTAURADO EN UNA FÁBRICA O CENTRO DE SERVICIO AUTORIZADO Y QUE SE ENCUENTRA CERTIFICADO PARA SU UTILIZACIÓN.
          </Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, }}>
        <Text style={{ textTransform: 'uppercase' }}>EXCLUSIONES POL 120200020</Text>

      </View>
      <View style={styles.page} >

        <View  >
          <Text style={styles.texto}>
            DAÑOS O PÉRDIDAS QUE EXPERIMENTEN LOS COMPONENTES O ACCESORIOS TALES COMO TRANSFORMADORES, CARGADORES, CABLES ELÉCTRICOS, BLUETOOTH, MANOS LIBRES, PEN DRIVES, ADEMÁS DE LOS DAÑOS O PERDIDAS DE LAS BATERÍAS, ASÍ COMO TAMBIÉN PARTES O PIEZAS NO ORIGINALES O NO AUTORIZADAS POR EL FABRICANTE.
            DAÑOS O PÉRDIDAS POR LAS QUE EL FABRICANTE, PROVEEDOR, VENDEDOR O EMPRESA DE REPARACIONES O DE MANTENIMIENTO RESPONDEN LEGAL O CONTRACTUALMENTE.
            DAÑOS O PÉRDIDAS QUE DIRECTA O INDIRECTAMENTE SEAN CONSECUENCIA DE FALLAS O DEFECTOS QUE YA EXISTÍAN AL MOMENTO DE CONTRATARSE EL SEGURO.
            DAÑOS O PÉRDIDAS CAUSADOS POR EL USO U OPERACIÓN ORDINARIA DE LA MATERIA ASEGURADA, TALES COMO DESGASTE, DEFORMACIÓN, CORROSIÓN, HERRUMBRE Y DETERIORO POR FALTA DE USO O PROVENIENTE DE LAS CONDICIONES ATMOSFÉRICAS NORMALES O CUALQUIER DAÑO COSMÉTICO A LA MATERIA ASEGURADA, DE MANERA TAL QUE NO AFECTE LA FUNCIONALIDAD DEL MISMO. ALGUNOS TIPOS EXCLUIDOS DE PÉRDIDA INCLUYEN, DE MANERA ENUNCIATIVA MÁS NO LIMITATIVA, RASGUÑOS, DAÑOS SUPERFICIALES, GRIETAS Y CAMBIOS O MEJORA EN COLOR TEXTURA O TERMINADO SOBRE LA MATERIA ASEGURADA QUE NO AFECTEN LA FUNCIÓN DE LA MISMA.
            DAÑOS O PÉRDIDAS CAUSADOS DIRECTA O INDIRECTAMENTE POR ACTOS INTENCIONALES O CONSTITUTIVOS DE CULPA GRAVE COMETIDOS POR EL ASEGURADO, POR SUS MANDATARIOS O POR LAS PERSONAS A QUIENES SE HAYA CONFIADO LA MATERIA ASEGURADA.
            PÉRDIDAS DE BENEFICIOS, LUCRO CESANTE Y OTROS PERJUICIOS INDIRECTOS DE CUALQUIER TIPO.
            DAÑOS O PÉRDIDAS CAUSADOS DIRECTA O INDIRECTAMENTE POR REACCIÓN NUCLEAR, RADIACIÓN NUCLEAR O CONTAMINACIÓN RADIOACTIVA, O AGRAVADOS POR ESTOS EVENTOS.
            PÉRDIDA O DAÑO DIRECTO O INDIRECTO QUE OCURRA EN RELACIÓN CON ACTIVIDAD SÍSMICA.
            PÉRDIDA DEL EQUIPO A CONSECUENCIA DE EXTRAVÍO.
            DAÑOS DE EQUIPOS CON MAL USO O INTENTO DE REPARACIONES POR CUENTA DEL ASEGURADO SIN SUPERVISIÓN DEL FABRICANTE.
            CUALQUIER DAÑO O PERDIDA DE INFORMACIÓN ALMACENADA EN EL EQUIPO ASEGURADO O DE SOFTWARE INSTALADOS EN EL MISMO.
            CUALQUIER EQUIPO CUYO NÚMERO DE IDENTIFICACIÓN (IMEI O ESN, ENTRE OTROS) HAYA SIDO ALTERADO, DAÑADO O REMOVIDO.
            CUALQUIER EQUIPO QUE EN EL MOMENTO DE LA PÉRDIDA NO ESTÉ CONECTADO A LA RED DE VOZ Y DATOS DEL OPERADOR DE SERVICIOS INALÁMBRICO A LA RED DEL CONTRATANTE.
            PÉRDIDA CAUSADA O DERIVADA DE LA OMISIÓN A REALIZAR LO RAZONABLEMENTE NECESARIO PARA MINIMIZAR O EVITAR LA PÉRDIDA Y PROTEGER LA MATERIA ASEGURADA DE CUALQUIER PERDIDA O PÉRDIDA ADICIONAL.
            CUANDO LA MATERIA ASEGURADA ES TRANSPORTADA EN CALIDAD DE CARGA EN POSESIÓN DE TERCEROS (EJEMPLO: MUDANZA, CORREO, ETC.) A BORDO DE AERONAVES, NAVES, O CUALQUIER TIPO DE EMBARCACIONES GRANDES O MENORES. ESTA EXCLUSIÓN NO ALCANZA LA PÉRDIDA QUE PUEDA PRODUCIRSE CUANDO LA MATERIA ASEGURADA ES TRANSPORTADA POR EL ASEGURADO EN OCASIÓN DE UN VIAJE EN ALGUNO DE LOS MEDIOS DESCRITOS DENTRO DE ÁREA GEOGRÁFICA AMPARADA.
</Text>
        </View>
      </View>

    </Page>



  </Document>)


};

let listPlanes = [];
let listSubPlanes = [];

let itemRender = 'cargando';
let itemRenderSubPlan = 'cargando';
let itemRenderDetallePlan = 'cargando'
let itemRenderDetalleSubPlan = 'cargando'

let planSeleccionado = {};
let subPlanSeleccionado = {};


let itemDatosAsegurado = {};
let userAccountData = {};
let listaImagenesSeguro = {}

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

function DefaultDropzone() {
  return (
      <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          SUBIR FOTOS
        </Typography>
       

        <Spacer mb={4} />

        <Grid container lg={12}  >
         

          {itemDatosAsegurado['tipo_siniestro'] === 'parcial' ? (<Grid item lg={12} style={{display:'flex'}}>
        
        
         <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO DETALENTERA CI
            
                </Typography>
            
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_DELANTERA")

                        }                 acceptedFiles={['image/*']}  
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
<Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO TRASERA CI
            
                </Typography>
            
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_TRASERA")

                        }                 acceptedFiles={['image/*']} 
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

            <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO DEL EQUIPO
            
                </Typography>
            
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
                          guardarImagen(event, "EQUIPO")

                        }                 acceptedFiles={['image/*']}  
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                 C SERVICIO TECNICO
            
        </Typography>
             
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
              guardarImagen(event, "SERVICIO_TECNICO")

            }     acceptedFiles={['image/*']}   
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
              </Grid>
          ):''}

       

          {itemDatosAsegurado['tipo_siniestro'] === 'total' ? (<Grid item lg={12} style={{ display: 'flex' }}>
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO DETALENTERA CI
            
                </Typography>
            
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_DELANTERA")

                        }                 acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>
            
<Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
              FOTO TRASERA CI
            
                </Typography>
            
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
                          guardarImagen(event, "CARNET_TRASERA")

                        }                 acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
            filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                COTIZACIONES SERVICIO TECNICO
            
        </Typography>
             
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
              guardarImagen(event, "SERVICIO_TECNICO")

            }     acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
              </Grid>
          ):''}
          
    
          {itemDatosAsegurado['tipo_siniestro'] === 'robo' ? (<Grid  lg={12} style={{display:'flex', flexDirection:'row'}}>
 
            <Grid item lg={6} style={{ marginTop: '22px', paddingRight: 6,  }}>
              <Typography variant="h6" style={{ color: '#0fb6e9', textTransform: 'uppercase' }}  >
                Foto Delantera CI 
                 
             </Typography>
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
              guardarImagen(event, "CARNET_DELANTERA")

            }                    acceptedFiles={['image/*']} dropzoneClass={{background:'red'}}
              filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>
            

                     

            <Grid  item lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' , textTransform:'uppercase'}}  >
                Foto Trasera CI
                 
        </Typography>
            
              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
              guardarImagen(event, "CARNET_TRASERA")

            }              acceptedFiles={['image/*']}  
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>
            



            <Grid lg={6} style={{ marginTop: '22px' }}>
              <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                PARTE POLICIAL

        </Typography>

              <DropzoneArea maxFileSize={30000000} dropzoneText={''} onChange={event =>
                guardarImagen(event, "PARTE_POLICIAL")

              } acceptedFiles={['image/*']} 
                filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

            </Grid>

              </Grid>
          ):''}
            

        </Grid>


      </CardContent>
    </Card>
  
  );
}

async function guardarImagen(item, titulo) {

  console.log("asdads", item)
  if (item[0]) {
    console.log("asdad", item[0])
    await Storage.put(item[0].name, item[0])
      .then(result => {

        console.log("RESULTTT", result)
        listaImagenesSeguro[titulo] = 'https://kirastoragebucket112236-dev.s3.us-east-2.amazonaws.com/public/' + result['key']
        console.log("lista", listaImagenesSeguro)


      }) 
      .catch(err => console.log(err));

  }
}

function SaveValue(key, value) {
  itemDatosAsegurado[key] = value
}
 
function BasicForm() {
  let data = ListaRenderPolizas();

  const [selectedDate, handleDateChange] = useState(null);
  itemDatosAsegurado['fecha_siniestro'] = selectedDate;
  


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
                    <Grid item md={12}>

                      <h4>¿En qué póliza deseas registrar un siniestro?</h4>

                      {data}
                    </Grid>
                    <Grid item md={6}>

                      <h4>¿Cuando ocurrió?</h4>

                      

                      <form noValidate>
                        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="es" >

                        <DatePicker style={{ marginTop: 10}}
                          autoOk
                           disableFuture
                          fullWidth
                          variant="inline"
                          inputVariant="outlined"
                             format="DD/MM/YYYY"

                            value={selectedDate}
                          onChange={handleDateChange}
 
                          maxDateMessage = "Debe seleccionar una fecha valida"
                         />
</MuiPickersUtilsProvider>

                        
                      </form>
                    </Grid>
                    <Grid item md={6}>

                      <h4>¿Qué ocurrió?</h4>

                      <select style={{ height: 50, width:'100%', marginTop:10, padding:6 }}
                        onChange={event => SaveValue("tipo_siniestro", event.target.value)}
                      >
                        <option  >SELECCIONAR OCURRIDO</option>

                        <option value="parcial">DAÑO PARCIAL</option>
                        <option value="total">DAÑO TOTAL</option>
                        <option value="robo">ROBO</option>

                      </select>
                    </Grid>
                    <Grid item md={12}>

                      <h4>Describa lo ocurrido</h4>

                      <TextareaAutosize
                        rows="12"
                        placeholder="Ingrese descripcion de lo ocurrido..."
                        style={{ width: '100%', padding: 12, fontSize: 13, border: 'none', width:'100%'}}
                        name="descripcion_siniestro"
                        fullWidth
                        style={{fontSize:16}}
                        variant="body2"
                        defaultValue={itemDatosAsegurado['descripcion_siniestro']}
                        onBlur={handleBlur}
                        onChange={event => SaveValue("descripcion_siniestro", event.target.value)}

                      />
                    </Grid>



                  </Grid>


                </form>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function ResumenDetail() {

  console.log("itemAsegurado", itemDatosAsegurado)
  
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


  console.log("listaIMAGENES", listaImagenesSeguro)
  console.log("itemDatosAsegurado", itemDatosAsegurado)
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
                <Grid container spacing={6} justify="center">



                  <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>
                              <Grid item md={12}>
                                <Typography variant="h3" gutterBottom>
                                  {'DECLARACION DE SINIESTRO:  ' + moment(itemDatosAsegurado['fecha_siniestro']).format('DD-MM-YYYY')}
                                </Typography>
                              </Grid>



                              <Grid item xs={12}>

                                <Grid item lg={12}>
                                  <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '22px', marginTop: 12 }}>    RESUMEN SINIESTRO</span>

                                    <Grid style={{ marginTop: 22 }}>

                                      <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                        MI CELULAR
                          </Typography>

                                      <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                        SAMSUNG - GALAXY S20  
                                      </Typography>
                                    </Grid>

                                    <Grid style={{ marginTop: 22 }}>

                                      <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                        FECHA DECLARACION
                          </Typography>

                                      <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                        {moment(itemDatosAsegurado['fecha_siniestro']).format("DD-MM-YYYY")}
                                      </Typography>
                                    </Grid>



                                  </div>
                                </Grid>

                                <Grid item lg={12} style={{ paddingLeft: 6, marginTop: 32 }}>

                                  <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                    FOTOS ADJUNTAS
                          </Typography></Grid>
                                <Grid item lg={12} style={{ display: 'flex',   marginTop: 22 }} >


                                  {itemDatosAsegurado['tipo_siniestro'] === 'parcial' ? (<Grid lg={12} style={{ display: 'flex' }}><Grid lg={3} style={{ paddingRight: 2 }}>
                                    <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                      <img style={{ width: '100%', height: '100%' }} style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['EQUIPO']} />
                                    </div>
                                  </Grid>
                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['SERVICIO_TECNICO']} />
                                      </div>
                                    </Grid>

                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['CARNET_DELANTERA']} />
                                      </div>
                                    </Grid>


                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['CARNET_TRASERA']} />
                                      </div>
                                    </Grid>
                                  </Grid>
                                  ) : ''}




                                  {itemDatosAsegurado['tipo_siniestro'] === 'total' ? (<Grid lg={12} style={{ display: 'flex' }}>

                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['SERVICIO_TECNICO']} />
                                      </div>
                                    </Grid>

                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['CARNET_DELANTERA']} />
                                      </div>
                                    </Grid>


                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['CARNET_TRASERA']} />
                                      </div>
                                    </Grid>
                                  </Grid>
                                  ) : ''}




                                  {itemDatosAsegurado['tipo_siniestro'] === 'robo' ? (<Grid lg={12} style={{ display: 'flex' }}>

                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['PARTE_POLICIAL']} />
                                      </div>
                                    </Grid>

                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['CARNET_DELANTERA']} />
                                      </div>
                                    </Grid>


                                    <Grid item lg={3} style={{ paddingRight: 2 }}>
                                      <div style={{ height: '120px', paddingRight: 2, border: '1px dashed black' }}>

                                        <img style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['CARNET_TRASERA']} />
                                      </div>
                                    </Grid>
                                  </Grid>
                                  ) : ''}



                                </Grid>


                              </Grid>

                              <Grid style={{ marginTop: 22, paddingLeft: 12}} item lg={12}>

                                <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                  RESUMEN
                          </Typography>
                                <TextareaAutosize
                                  disabled readonly rows="14"
                    
                                  style={{ marginTop: 6, width: '100%', border: 'none', background: 'transparent', fontSize:16}}  
                                  defaultValue={itemDatosAsegurado['descripcion_siniestro']}

                               /> 


                              </Grid>


                            </Grid>



                          </CardContent>
                        </Card>
                    
                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

function FlujoTerminadoRender() {
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
                <Grid container spacing={6} justify="center">



                  <Grid container justify="center">
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>



                              <Grid item xs={12} >

                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                                  <Typography variant="h2" gutterBottom>
                                    <CheckCircle style={{ color: 'green', fontSize: 80 }}></CheckCircle>
                                  </Typography>

                                  <Typography variant="h2" gutterBottom>
                                    <h2>SINIESTRO INGRESADO</h2>
                                  </Typography>
                                  
                          

                                  <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                      ml={2}
                                       component={Link}
                                      variant="contained"
                                      color="primary"

                                      to="/pages/mi_cuenta"
                                    >
                                     IR A MI CUENTA
                                   </Button>
                                  </Grid>


                                 
                                </div>
                              </Grid>

                            </Grid>
                          </CardContent>
                        </Card>

                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
              )}
          </CardContent>
        </Card>
      )
      }
    </Formik >
  );
}


function ResumenSeguro() {

  itemFinal = {
    detalle: itemDatosAsegurado,
    imagenes: listaImagenesSeguro,
    idPoliza: idPoliza,
    polizaItem: polizaItem
  };
  
  return (
    <Card mb={6}>
      <CardContent>
        <ResumenDetail />

      </CardContent>
    </Card>
  );
}

function FlujoTerminado() {
  return (
    <Card mb={6}>
      <CardContent>
        <FlujoTerminadoRender />

      </CardContent>
    </Card>
  );
}
 


function FormularioAnexos() {
  return (
    <Card mb={6}>
      <CardContent>
        <DefaultDropzone />

      </CardContent>
    </Card>
  );
}



function FormulariosIngreso() {



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
  return ['INGRESAR SINIESTRO', 'SUBIR FOTOS', ' RESUMEN SINIESTRO'];
}


let mensajeBotonSiguiente = 'SUBIR FOTOS'

function getStepContent(step) {
  switch (step) {
    case 0:
      mensajeBotonSiguiente = 'SUBIR FOTOS'
      return FormulariosIngreso();

    case 1:
      mensajeBotonSiguiente = 'RESUMEN SINIESTRO'
      return FormularioAnexos();
    case 2:
      mensajeBotonSiguiente = 'FINALIZAR DECLARACION'

      return ResumenSeguro();

    default:
      return 'Unknown step';
  }
}

let registroRealizado = false;

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

  let reg
  const allStepsCompleted = () => {
    if (completedSteps() === totalSteps()) {

      if (!registroRealizado) { 
        registrarProducto()
   registroRealizado = true
      }
      return true
    }

    return false
  };



  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);

    console.log("itemdatosasegurados", itemDatosAsegurado)
    console.log("planSeleccionado", planSeleccionado)
    console.log("subPlanSeleccionado", subPlanSeleccionado)
    console.log("userAccountLogin", userAccountData)


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
                <FlujoTerminado />
              </CardContent>
            </Card>

            <Button onClick={handleReset}>Reiniciar</Button>
          </div>
        ) : (
            <div  >


              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </div>
          )}
      </div>
      {allStepsCompleted() ? (<Grid></Grid>) : (
        
        <div style={{display: 'flex'}}>
          <Grid item lg={6}>

          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
            ATRAS
              </Button>
          </Grid>

          <Grid item lg={6} style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" color="primary" onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'FINALIZAR DECLARACION' : mensajeBotonSiguiente }
            </Button>
          </Grid>

        </div>
      )}

    </div>
  );
}


let idPoliza = 0;
let polizaItem = '';
let itemFinal = {}



async function registrarProducto() {

  const mutation = `
  mutation MyMutation($bank:registrarNuevoSiniestroInput!) {
  registrarNuevoSiniestro (input:$bank){
    data_siniestro
  }
}
`;




  let dataSave = JSON.stringify(itemFinal);
  console.log("save", dataSave)
  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_siniestro: dataSave,
        idPoliza: idPoliza

      }
    }

  });
  console.log("SINIESTRO REGISTRADO EXITOSAMENTE!");

}

let functionSetPoliza = (event) => { 

  console.log("evento", event)
  idPoliza = event.target.value;

  var index = event.nativeEvent.target.selectedIndex;
 
  
  polizaItem = event.nativeEvent.target[index].text;
} 


let functionSetPolizaItem = (poliza) => {

  console.log("evento", poliza)
  polizaItem = poliza;
} 
const ListaRenderPolizas = (obtenerListaProductos) => {
  const [polizas, setPolizas] = useState('undefined');



  useEffect(async () => {
    let temId = ''


    await Auth.currentAuthenticatedUser().then((user) => {
      console.log('user email = ' + user.attributes.email);
      temId = user.attributes.email;
    });

    const queryListaActividadGraphql = `
 query MyQuery {
   listasPolizas(email:"${temId}") {
     id
    data_poliza
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
    setPolizas(data)

  }, [])

  console.log("polizaaa", polizas)

  if (polizas && polizas['data']) {

    console.log("productos", polizas['data']['listasPolizas']);

    let listProductos = polizas['data']['listasPolizas'];
    console.log("listaProductos", listProductos)

    return <select style={{ width: '100%', height: 40, textTransform: 'uppercase' }} onChange={functionSetPoliza} >
      <option  >SELECCIONAR POlIZA</option>

      {listProductos &&
        listProductos.map((item, index) => {
          console.log(item);

          let itemTemporal = JSON.parse(item['data_poliza']);
          let itemPlan = JSON.parse(itemTemporal['plan']['data_plan'])
          let itemSubPlan = JSON.parse(itemTemporal['subplan']['data_sub_plan'])


          console.log(itemTemporal)

          return (<option  style={{ textTransform: 'uppercase' }} value={item['id']}>
            {item['id']+ ' - '+itemTemporal['asegurado']['marca_equipo'] + ' - ' + itemTemporal['asegurado']['modelo_equipo'] + " - " + itemSubPlan['nombre']}

          </option>)
        })
      }
    </select>
  } else {

    return polizas && 'cargando...'

  }



}

function DeclaracionSiniestroGlobal() {


  return (
    <React.Fragment>
      <Helmet title="Flujo de compra" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>

        <Typography variant="h3" gutterBottom display="inline">
          DECLARACION DE SINIESTRO
      </Typography>

     
        <Grid style={{ marginTop: '12px' }}>
          <div style={{ width: '100%', height: '210px',    }}>
            <img src="/static/img/imagen_prote.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          </div>
        </Grid>
        <Divider my={6} />
        <HorizontalNonLinearStepper>

        </HorizontalNonLinearStepper>

      </Grid>
    </React.Fragment>
  );
}

export default DeclaracionSiniestroGlobal;
