import React, { Fragment, useState, Suspense, useEffect, useRef  } from 'react';
import { createStyles, makeStyles, Theme  } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Helmet from "react-helmet";
import * as Yup from "yup";
import styled, { createGlobalStyle } from "styled-components/macro";
 import { Formik } from "formik";
import Amplify, { API, Storage } from "aws-amplify";
 import AppBar from "../presentation/Landing/HomeBar";
 import { Auth } from 'aws-amplify'; 
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
 import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import moment from 'moment';
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/es";



import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CheckCircle as CheckCircle,} from "@material-ui/icons";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
   Divider as MuiDivider,
    CardMedia as MuiCardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Chip as MuiChip,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Select,
} from "@material-ui/core";

import { Alert as MuiAlert } from "@material-ui/lab";
import { DropzoneArea } from "material-ui-dropzone";

import { spacing } from "@material-ui/system";
import { startOfYesterday } from 'date-fns';


moment.locale("es");


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
   },
  sectionA: {
     flex: 1,
    padding: 4,
     fontSize:12
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


const Chip = styled(MuiChip)(spacing);
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

const GlobalStyleDropzone = createGlobalStyle`
  [class^="DropzoneArea-dropZone"] {
    min-height: 160px;
  }
`;

  

let listPlanes = [];
let listSubPlanes = [];
let listCoberturas = [];

let itemRender = 'cargando';
let itemRenderSubPlan = 'cargando';
let itemRenderDetallePlan = 'cargando'
let itemRenderDetalleSubPlan = 'cargando'

let planSeleccionado = undefined;
let subPlanSeleccionado = undefined;


let itemDatosAsegurado = {
  nombre_persona: '',
  email: '',
  telefono: '',
  numero_serie: '',
  imei:''
};
let userAccountData = {};
let detallesExtras = {};
let objectFinalPoliza = {}
let listaImagenesSeguro = {}
let fnxCompleteStep = '';


let txBotonContinuar = 'SIGUIENTE'

let setPImagen = '';
let setSImagen = '';
let setTImagen = '';
let setCImagen = '';
let setQImagen = '';


let statusRegistro = false;

let momentNow = moment().format("DD/MM/YYYY").toString();
let momentNY = moment().add(1, 'years').format("DD/MM/YYYY").toString();

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



const MyDocumentPdf = (props) => {

  let asegurado = props.object['asegurado'];
  let usuario = props.object['user'];
  let plan = props.object['plan'];
  console.log("plaaan", plan)
  let planData = JSON.parse(plan['data_plan'])

  let subplan = props.object['subplan'];
  let subPlanData = JSON.parse(subplan['data_sub_plan'])
  let detalleDeducible = props.object['detalles'];

  console.log("propiedades_", props)


  let contratante = asegurado['nombre_persona'] + ' ' + usuario['apellido_paterno'] + ' ' + usuario['apellido_materno'];
  return (<Document>
    <Page size="A4" style={{ padding: 22 }}>

      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22, textAlign: 'center' }}>
        <Text style={{ textTransform: 'uppercase' }}>POLIZA SEGURO </Text>
      </View>
      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22 }}>
        <Text  >Antecedentes del contratante</Text>
      </View>
      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Contratante</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{contratante}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Rut</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{usuario['rutPersona']}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Domicilio</Text>
        </View>
        <View style={styles.sectionB}>
          <Text  >{usuario['calle'] + ', ' + usuario['ciudad'] + ', ' + usuario['comuna'] + ', ' + usuario['region'] + ', ' + usuario['pais']}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Email</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{usuario['email']}</Text>
        </View>
      </View>




      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22 }}>
        <Text  >Antecedentes del asegurado</Text>
      </View>
      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Asegurado</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{contratante}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Rut</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{usuario['rutPersona']}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Direccion asegurado</Text>
        </View>
        <View style={styles.sectionB}>
          <Text style={{ textTransform: 'uppercase' }}>{usuario['calle'] + ', ' + usuario['ciudad'] + ', ' + usuario['comuna'] + ', ' + usuario['region'] + ', ' + usuario['pais']}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Email</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{usuario['email']}</Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22 }}>
        <Text  >Compañia aseguradora</Text>
      </View>
      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Aseguradora</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>CHUBB CHILE</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Razón social</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>CHUBB CHILE COMPAÑIA DE SEGUROS GENERALES S. A. </Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Rut</Text>
        </View>
        <View style={styles.sectionB}>
          <Text  >99.225.000-3</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Direccion</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>MIRAFLORES 222 PISO 11 EDIF. LAS AMERICAS</Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22 }}>
        <Text  >Antecedentes del intermediario</Text>
      </View>
      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Contratante</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>FRGROUP</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Rut</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>99.999.999-9</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Direccion </Text>
        </View>
        <View style={styles.sectionB}>
          <Text >Direccion FRGROUP</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Email</Text>
        </View>
        <View style={styles.sectionB}>
          <Text> contacto@frgroup.cl </Text>
        </View>
      </View>


      <View style={{ width: '100%', paddingTop: 22, marginBottom: 22 }}>
        <Text style={{ textTransform: 'uppercase' }}>Informacion del seguro</Text>
      </View>
      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Producto</Text>
        </View>
        <View style={styles.sectionB}>
          <Text style={{ textTransform: 'uppercase' }}>{asegurado['marca_equipo'] + ' - ' + asegurado['modelo_equipo'] + ' - ' + asegurado['numero_serie'] + ' - ' + asegurado['imei']}</Text>
        </View>
      </View>


      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Plan</Text>
        </View>
        <View style={styles.sectionB}>
          <Text style={{ textTransform: 'uppercase' }}>{planData['nombre_plan'] + ' - ' + subPlanData['nombre'] + ' ' + subPlanData['capital'] + 'UF'}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Vigencia desde</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>  {momentNow}</Text>
        </View>
      </View>

      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Vigencia hasta</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>  {momentNY}</Text>
        </View>
      </View>
      <View style={styles.page} >
        <View style={styles.sectionA}>
          <Text>Costo seguro</Text>
        </View>
        <View style={styles.sectionB}>
          <Text>{subPlanData['precio_mensual']}</Text>
        </View>
      </View>


      <View style={{ marginTop: 22 }}>






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


 
async function registrarCotizacion() {

  const mutation = `
  mutation MyMutation($bank:registrarNuevaCotizacionInput!) {
  registrarNuevaCotizacion (input:$bank){
    data_cotizacion
  }
}
`;

  let objectoRegistro = JSON.stringify({
    asegurado: itemDatosAsegurado,
    plan: planSeleccionado,
    subplan: subPlanSeleccionado,
    detalles:detallesExtras
  });

  console.log("objecto_cotizacion", objectoRegistro)
  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_cotizacion: objectoRegistro

      }
    }

  });
  console.log("cotizacion_registrada");

}


async function registrarProducto() {

 
  
  objectFinalPoliza ={
    asegurado: itemDatosAsegurado,
      plan: planSeleccionado,
        user: userAccountData,
          subplan: subPlanSeleccionado,
            detalles: detallesExtras,
              imagenes: listaImagenesSeguro
  };


  const mutation = `
  mutation MyMutation($bank:registrarNuevaPolizaInput!) {
  registrarNuevaPoliza (input:$bank){
    data_poliza
  }
}
`;
  
  
  

  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_poliza: JSON.stringify(objectFinalPoliza),
        email: userAccountData['email']

      }
    }

  });
  console.log("USUARIO REGISTRADO EXITOSAMENTE!");

}


async function guardarImagen(item,titulo)
{ 

  console.log("asdads", item)
  if (item[0]) { 
    console.log("asdad", item[0])
    await Storage.put(item[0].name, item[0])
      .then(result => {

        console.log("RESULTTT", result)

        listaImagenesSeguro[titulo] = 'https://kirastoragebucket112236-dev.s3.us-east-2.amazonaws.com/public/' + result['key']


        console.log("lista", listaImagenesSeguro)


      }) // {key: "test.txt"}
      .catch(err => console.log(err));

  }
}

let firstTry = true;
function DefaultDropzone(props) {

  let verticalX = 'bottom';
  let horizontalX = 'right';


  let show = false;
  let mensajeSeleccionX = 'Favor, subir todas las imagenes necesarias';

  console.log(props)
  let formInicial = props.getter
  let setFormInicial = props.setter;

  let fnClickButtonNext = props.clickNext;
  let finishStep = props.completeFn;

  if (firstTry) { firstTry = false } else { 

    if (fnClickButtonNext > 0) {
      console.log("numero", Object.keys(listaImagenesSeguro).length)
      if (Object.keys(listaImagenesSeguro).length > 3) {

        console.log("mensajeRecibido", fnClickButtonNext)
        finishStep()
      } else { 
        show = true
      }
      


    }
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          SUBA LAS SIGUIENTES FOTOS
        </Typography>
       
        <Spacer mb={4} />

        <Grid container lg={12}  >
          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6 }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }} >
                FOTO BOLETA EQUIPO
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }} >
               TOME UNA FOTO DONDE SE VEA CLARAMENTE LA BOLETA DEL EQUIPO
        </Typography>
            <DropzoneArea maxFileSize={30000000} dropzoneText={''}
              onChange={event =>  
                guardarImagen(event,"BOLETA_EQUIPO")
                
            }
              acceptedFiles={['image/*']}  
              filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />



          </Grid>

          <Grid lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
                FOTO NUMERO DE SERIE
            
        </Typography>
            <Typography variant="body2" style={{marginTop:6, marginBottom:6}} >
               PUEDE ENCONTRAR EL NUMERO DE SERIE EN LA CAJA DEL EQUIPO
        </Typography>
            <DropzoneArea maxFileSize={30000000}
              onChange={event =>  
                guardarImagen(event, "NUMERO_SERIE")

              }   dropzoneText={''} acceptedFiles={['image/*']} 
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          <Grid lg={6} style={{ marginTop: '22px', paddingRight: 6  }}>
            <Typography variant="h6" style={{ color: '#0fb6e9' }}  >
              FOTO DE IMEI
            </Typography>
            <Grid style={{ display: 'flex', alignItems: 'center', marginTop: 6, marginBottom: 6}}>
              <span style={{marginRight:6}}>
                PUEDE ENCONTRAR EL IMEI EN LA CAJA DEL EQUIPO
              </span>
           
           </Grid>
            <DropzoneArea maxFileSize={30000000} dropzoneText={''}
              onChange={event =>
                guardarImagen(event, "IMEI")

              }
              acceptedFiles={['image/*']} 
 filesLimit={1} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>

          <Grid lg={6} style={{ marginTop: '22px' }}>
            <Typography variant="h6" style={{ color:'#0fb6e9'}} >
           FOTO DEL EQUIPO
            
        </Typography>
            <Typography variant="body2" style={{ marginTop: 6, marginBottom: 6 }}>
               TOME UNA FOTO DONDE SE VEA CLARAMENTE SU DISPOSITIVO
        </Typography>
            <DropzoneArea maxFileSize={30000000}
              dropzoneText={''} onChange={event => 
                guardarImagen(event, "EQUIPO")

              }                 acceptedFiles={['image/*']} 
 filesLimit={3} showFileNamesInPreview={false} showFileNames={false} />

          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={show}
            message={mensajeSeleccionX}
            key={verticalX + horizontalX}
          />

        </Grid>

        

      </CardContent>
    </Card>
  );
}

function AlertDialogImei() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={4}>
          <span style={{ cursor: 'pointer', color: '#376fd0' }} variant="contained" color="primary" onClick={handleClickOpen}>
            #COMO CONSEGUIR IMEI DEL TELEFONO
          </span>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Buscar el número de serie o el IMEI del Smartphone"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{display:'flex', flexDirection:'column'}}>

                <Grid item lg={12}> 
                {`Para encontrar el IMEI puedes ver el instructivo para buscar el modelo y número de serie del
equipo.
Puedes conseguirlo también marcando el *#06# en tu celular y te aparecerá la información en
pantalla.` }
                
                </Grid>
   
                <Grid item lg={12} style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:20}}> <img style={{ width: 200 }} src="https://elandroidelibre.elespanol.com/wp-content/uploads/2016/10/saber-imei-002.jpg" />
            </Grid>
              
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CERRAR
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card >
  );
}

function AlertDialogImeiFotoDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
   <Grid>
          <span style={{ cursor: 'pointer', color: '#376fd0' }} variant="contained" color="primary" onClick={handleClickOpen}>
            EJEMPLO
          </span>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"IMAGEN DE REFERENCIA"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}> <img style={{ width: 200 }} src="https://elandroidelibre.elespanol.com/wp-content/uploads/2016/10/saber-imei-002.jpg" />
                </Grid>

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CERRAR
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
  );
}

function AlertDialogCotizacion(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleRegistrar = () => {
    registrarCotizacion();
    setOpen(false);
    props.fn();

  };

  const handleModal = () => {
    console.log("haciendo click")
    props.fnFinishStep();
   }

  const handleCancelar = () => {
     setOpen(false);
  };
  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={4}>
        

          <Grid>        <Button variant="contained" color="primary" mt={2} style={{ marginTop: '22px' }} onClick={handleClickOpen}>
            GUARDAR COTIZACION
                                   </Button>

            <Button variant="contained" color="primary" style={{ marginLeft: '22px', marginTop: '22px' }} mt={2} onClick={handleModal}>
              CONTRATAR SEGURO
                                   </Button>
          </Grid>
          <Dialog
            open={open}
            onClose={handleCancelar}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Guardar cotización"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                SE DEJARÁ UNA COTIZACIÓN EN LOS DETALLES DE SU CUENTA
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={handleCancelar} color="primary" autoFocus>
                CANCELAR
              </Button>
              <Button onClick={handleRegistrar} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card >
  );
}

function AlertCompletarFormulario(props) {


  console.log("props",props)
  const [open, setOpen] = React.useState(false);
 

 
  let itemSubPlan = JSON.parse(subPlanSeleccionado['data_sub_plan'])

  const handleClickOpen = () => {

    if (props.isFinish) {
      setOpen(true);

    } else { 
      props.onClick()


    }

   };

  const handleRegistrar = () => {
     setOpen(false);
    props.fnFinish()
    registrarProducto();

   };

  const handleCancelar = () => {
    setOpen(false);
 
  };
  return (
     <Grid>
          <Button variant="contained" color="primary" mt={2} style={{ marginTop: '22px' }} onClick={handleClickOpen}>
            FINALIZAR COMPRA
                                   </Button>
          <Dialog
            open={open}
            onClose={handleCancelar}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"ACEPTACION DE LA POLIZA DE SEGURO"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
            <Grid>
              <Typography   gutterBottom>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}> 
                  La poliza del seguro sera enviada a su correo electronico registrado</p>

                <h4 style={{
                  marginTop:22,
                  textTransform: 'uppercase'
                }}>COBERTURAS (DEDUCIBLE)
 </h4>

                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>CAPITAL ASEGURADO : <strong> {itemSubPlan['capital']} UF</strong></p>
                <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL  ( DEDUCIBLE DE  {detallesExtras['CL-Daño-Total']} UF )</p>
 
                <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL  ( DEDUCIBLE DE {detallesExtras['CL-Daño-Parcial']} UF) </p>
                <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO ( DEDUCIBLE DE  {detallesExtras['CL-Robo']} UF)</p>
               
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong> {itemSubPlan['precio_mensual']} UF  </strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px', marginTop: 22 }}><strong>El riesgo es asegurado por Chubb Compañía de Seguros Generales S.A</strong></p>


              </Typography>
           </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button onClick={handleCancelar} color="primary" autoFocus>
                CANCELAR
              </Button>
              <Button onClick={handleRegistrar} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
    </Grid>

  );
}

function AlertDialogNroSerie() {
  const [openS, setOpenS] = React.useState(false);

  const handleClickOpen = () => {
    setOpenS(true);
  };

  const handleClose = () => {
    setOpenS(false);
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Paper mt={4}>
          <span style={{ cursor: 'pointer', color: '#376fd0' }} variant="contained" color="primary" onClick={handleClickOpen}>
            #COMO CONSEGUIR NRO DE SERIE DEL TELÉFONO
          </span>
          <Dialog
            open={openS}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿Cómo buscar el modelo y el número de serie de mi Smartphone?"}
            </DialogTitle>
            <DialogContent>
            
              <DialogContentText id="alert-dialog-description" style={{ display: 'flex', flexDirection: 'column' }}>

                <Grid item lg={12}>
                  {`Para obtener el número de serie de su teléfono debe ir a:   Configuraciones > Información del teléfono > estado` }
                </Grid>
 
              </DialogContentText>
            
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CERRAR
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                ACEPTAR
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </CardContent>
    </Card >
  );
}

function SaveValue(key, value, setFormInicial) {

  itemDatosAsegurado[key] = value;

  console.log("Registrando elemento" + key + " - "+ value)
  setFormInicial(itemDatosAsegurado)
}
 
const ListaRender = (functionRenderDetalle) => {
  const [productos, setProductos] = useState('undefined');
  
  useEffect(async () => {
    const queryListaActividadGraphql = `
    query MyQuery {
      listasPlanes {
        id
        data_plan
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

    console.log("productos", productos['data']['listasPlanes']);

    let listaPlanes = productos['data']['listasPlanes'];
    listPlanes = listaPlanes;

    console.log("listaProductos", listaPlanes)



    return < select value={planSeleccionado && planSeleccionado['id']} style={{ width: '100%', height: '40px', textTransform: 'uppercase' }} onChange={functionRenderDetalle} >
      < option value="_" > SELECCIONAR PLAN</option >

      {
        listaPlanes.map(item => {
          console.log(item);
          let itemPlan = JSON.parse(item['data_plan'])
          return <option style={{ textTransform: 'uppercase' }} value={item['id']}> {itemPlan['nombre_plan']}</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}

const ListaRenderSubPlan = (functionRenderDetalle) => {
  const [productos, setProductos] = useState('undefined');
  const [error, setError] = useState('undefined');


  // console.log("listaProductos", listaProductos)

  useEffect(async () => {


    const queryListaActividadGraphql = `
 query MyQuery {
    listasSubPlanes {
      id
 data_sub_plan
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

    console.log("productos", productos['data']['listasSubPlanes']);

    let listaSubPlanes = productos['data']['listasSubPlanes'];
    listSubPlanes = listaSubPlanes;
    console.log("listaProductos", listaSubPlanes)



    return < select value={subPlanSeleccionado && subPlanSeleccionado['id']} style={{ width: '100%', height: '40px', textTransform: 'uppercase' }} onChange={functionRenderDetalle} >
      < option value="_"  > SELECCIONAR BANDA</option >

      {
        listaSubPlanes.map(item => {
          console.log(item);
          let itemSubPlan = JSON.parse(item['data_sub_plan'])
          return <option style={{ textTransform: 'uppercase' }} value={item['id']}> {itemSubPlan['nombre']} + {itemSubPlan['capital']} UF</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}


let isloaded = false;

function RenderDetallePlan(item, subplan, showButtons, finishStep) {
  // const [detallePlan, setDetallePlan] = useState({});

  let detalle = JSON.parse(item['data_plan'])
  let detalleSubPlan = JSON.parse(subplan['data_sub_plan'])

  let verticalSucc = "bottom";
  let horizontalSucc = "center";
  let show = false;

  const [renderDD, setRenderDD] = React.useState();

  

  console.log("Render",renderDD)

  
  console.log("DETALLE_PLAN", detalle)

  let functionShowMensaje = () => { 
    show = true
  }
  
  let fnMostrarModal = () => {
    finishStep()
  }
  if (detalle) {
    
    
    if (!isloaded) { 

      cargarDetallesCobertura(subplan, setRenderDD)

    }
    
    

     
    //setDetallePlan(detalle)
    return (<Grid  lg={12}>
     <Grid   lg={12}>
    <Grid item lg={12}>

          <Typography variant="h2" gutterBottom style={{ marginTop: 12 }}>
            {detalle['nombre_plan']}   {detalleSubPlan['nombre']}


          </Typography>

          <Typography variant="body2" gutterBottom>
            <p>El capital asegurado es el valor máximo a cubrir en caso de robo, pérdida parcial o total.</p>

          </Typography>
        </Grid> 

        <Grid item lg={12}>
          <Typography variant="h6" gutterBottom>

            <p style={{ textTransform: 'uppercase', fontSize: '12px' }}></p>
            <Chip
            
              avatar={<CheckCircle style={{ color: 'green' }} />}
              label={`CAPITAL ASEGURADO :  ${detalleSubPlan['capital']} UF `}
               m={1}
            />
          
            <h2 style={{
              textTransform: 'uppercase'
            }}>CARACTERISTICAS </h2>

            <Grid style={{ display: 'flex' }} item lg={12}>
              <Grid item lg={4}>
                <h4> COBERTURAS (DEDUCIBLE) </h4>
                <p id="cobertura_parcial" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO PARCIAL (DEDUCIBLE DE {detallesExtras&&detallesExtras['CL-Daño-Parcial']} UF) </p>
                <p id="cobertura_total" style={{ textTransform: 'uppercase', fontSize: '12px' }}>DAÑO TOTAL (DEDUCIBLE DE {detallesExtras&&detallesExtras['CL-Daño-Total']}  UF)   </p>
                <p id="cobertura_perdida" style={{ textTransform: 'uppercase', fontSize: '12px' }}>ROBO (DEDUCIBLE DE {detallesExtras&&detallesExtras['CL-Robo']}  UF)  </p>
              </Grid>
              <Grid item lg={4}>
                <h4>VIGENCIA</h4>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA INICIO :  <strong>{moment().format("DD/MM/YYYY")}</strong></p>
                <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>FECHA TERMINO : <strong>  {moment().add(1, 'years').format("DD/MM/YYYY")}</strong></p>

              </Grid>
              <Grid item lg={4}>

                <h4>PRIMA</h4>

              <p style={{ textTransform: 'uppercase', fontSize: '12px' }}>PRIMA MENSUAL :  <strong>{detalleSubPlan['precio_mensual']} UF  </strong></p>
             

            </Grid>

            
        </Grid>
          </Typography>
        </Grid>
        <Chip
          style={{ textTransform: 'uppercase', fontSize: '12px', marginTop: 42 }}
          avatar={<CheckCircle style={{ color: 'green' }} />}
          label={`El riesgo es asegurado por Chubb Compañía de Seguros Generales S.A`}
          m={1}
        />

        {showButtons ? <Grid lg={12} >

          <div style={{ display: 'flex', width: '100%' }}>
            <AlertDialogCotizacion fn={functionShowMensaje} fnFinishStep={fnMostrarModal} />
 
          </div>


        </Grid> : ''}

       
      </Grid>
      <Snackbar
        anchorOrigin={{ verticalSucc, horizontalSucc }}
        open={show}
        message="COTIZACION GUARDADA"
        key={verticalSucc + horizontalSucc}
      />


     </Grid>)
  }
  return detalle && 'OBTENIENDO INFORMACION DEL PLAN'
}

async function cargarDetallesCobertura(item, setRenderDx) {


  console.log("listaItems", item)
  
  let listaTemporalCoberturas = []

  let cargarDetalleCob = async function () {
    listCoberturas && listCoberturas.forEach((data) => {

      console.log("cobertura", data)
      console.log("subplan", item)

      if (data['id_sub_plan'] === item['id']) {

        console.log("....---COBERTURAS---...")
        listaTemporalCoberturas.push(data)
      }
    })
  };
 

    await cargarDetalleCob().then((data) => {
      console.log("lista", listaTemporalCoberturas)


      listaTemporalCoberturas.find((item) => {

        switch (item['codigo_cobertura']) {

          case "CL-Daño-Total":
            detallesExtras = {
              ...detallesExtras,
              "CL-Daño-Total": item['deducible']
            }
            break;

          case "CL-Daño-Parcial":
            detallesExtras = {
              ...detallesExtras,
              "CL-Daño-Parcial": item['deducible']
            }
            break;

          case "CL-Robo":

            detallesExtras = {
              ...detallesExtras,
              "CL-Robo": item['deducible']
            }
            break;

        }
      }) 
      
      isloaded = true;
      setRenderDx(detallesExtras)
      return data
  })

}

function BasicForm(props) {
  const inputRef = React.useRef(null)


  console.log(props)
  const formRef = useRef()


  let formInicial = props.getter
  let setFormInicial = props.setter;

  let fnClickButtonNext = props.clickNext;
  let finishStep = props.completeFn;

  if (fnClickButtonNext>0) { 
    console.log("mensajeRecibido", fnClickButtonNext)
     if (inputRef.current) { 
      inputRef.current.click()

    }

  }

  const initialValues = {
    nombre: '' + itemDatosAsegurado['nombre_persona'],
    correo: '' + itemDatosAsegurado['email'],
    telefono: '' + itemDatosAsegurado['telefono'],
    numero_serie: '' + itemDatosAsegurado['numero_serie'],
    imei: ''+itemDatosAsegurado['imei'],
  };
    
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().min(12, "Debes al menos tener 6 caracteres").required("Requerido"),
    correo: Yup.string().email().required("Requerido"),
    telefono: Yup.string().max(9, "xxx").required("Requerido"),
    numero_serie: Yup.string().required("Requerido"),
    imei: Yup.string().required("Requerido"),
  });


  

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {

      console.log("valores_items", values)
      
      itemDatosAsegurado['nombre_persona'] = values.nombre;

      itemDatosAsegurado['email'] = values.correo;

      itemDatosAsegurado['telefono'] = values.telefono;

      itemDatosAsegurado['numero_serie'] = values.numero_serie;

      itemDatosAsegurado['imei'] = values.imei;
       setStatus({ sent: true });
      setSubmitting(false);
      finishStep()
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };


  return (
 
        <Card mb={6}>
      <CardContent>


        < Grid>
          <Formik innerRef={formRef}
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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>


                  <Grid item md={12}>
                    <span style={{ fontWeight: 'bold', fontSize: '22px', marginTop: 12 }}> INFORMACION PERSONAL</span>
                  </Grid>


                  <Grid item md={6}>
                    <TextField
                      name="nombre"
                      label="NOMBRE "
                      defaultValue={values.nombre}
                      fullWidth
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />

                    {errors.nombre ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.nombre}</div> : null}

                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      name="correo"
                      label="CORREO ELECTRONICO "
                      defaultValue={values.correo}
                      onChange={handleChange}

                      fullWidth
                      disabled={false}

                      variant="outlined"
                      my={2}
                    />
                    {errors.correo ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.correo}</div> : null}

                  </Grid>
                  <Grid item md={12}>
                    <span style={{ fontWeight: 'bold', fontSize: '22px' }}>MI CELULAR</span>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="telefono"
                      label="N° CELULAR"
                      fullWidth
                      type="number"
                      defaultValue={values.telefono}
                      onChange={handleChange}

                      variant="outlined"
                      my={2}
                      helperText="EJ : 968776022"

                    />

                    {errors.telefono ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.telefono}</div> : null}

                  </Grid>
                  <Grid item md={6}>
                  </Grid>
                  <Grid item md={6}>


                    <select value={itemDatosAsegurado['marca_equipo']} onChange={event => SaveValue("marca_equipo", event.target.value, setFormInicial)} style={{ width: '100%', height: '40px' }}>
                      <option > SELECCIONAR MARCA </option>
                      <option value="samsung"> SAMSUNG </option>
                    </select>
                  </Grid>


                  <Grid item md={6}>


                    <select value={itemDatosAsegurado['modelo_equipo']} onChange={event => SaveValue("modelo_equipo", event.target.value, setFormInicial)} style={{ width: '100%', height: '40px' }}>
                      <option > SELECCIONAR MODELO </option>


                      <option  > Galaxy S5</option>
                      <option >Galaxy S6</option>
                      <option >Galaxy S7</option>
                      <option >Galaxy S8</option>
                      <option >Galaxy S9</option>
                      <option >Galaxy S10</option>
                      <option >Galaxy S10 +</option>
                      <option >Galaxy S20</option>
                      <option >Galaxy S20+</option>
                      <option >Galaxy S20+ Ultra</option>
                      <option >Galaxy A10</option>
                      <option >Galaxy A20</option>
                      <option >Galaxy A30</option>
                      <option >Galaxy A40</option>
                      <option >Galaxy A50</option>
                      <option >Galaxy A60</option>
                      <option >Galaxy A70</option>
                      <option >Galaxy A80</option>
                      <option >Galaxy A90</option>
                    </select>
                  </Grid>





                  <Grid item md={6}>
                    <TextField
                      name="numero_serie"
                      label="NUMERO DE SERIE"
                      fullWidth
                      defaultValue={values.numero_serie}
                      onChange={handleChange}

                      type="number"
                      variant="outlined"
                      my={2}
                    />

                    {errors.numero_serie ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.numero_serie}</div> : null}

                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      name="imei"
                      label="IMEI"
                      fullWidth
                      type="number"
                      defaultValue={values.imei}
                      onChange={handleChange}

                      variant="outlined"

                      my={2}
                    />
                    {errors.imei ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.imei}</div> : null}

                  </Grid>

                  <Button style={{ display: 'none' }}
                    ref={inputRef}
                    type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    ENVIAR
                </Button>
                </Grid>

              </form>
            )}

          </Formik>
          <Grid style={{ display: 'flex' }} lg={12}>

            <Grid lg={6}>
              <AlertDialogNroSerie />
            </Grid>
            <Grid lg={6}>
              <AlertDialogImei />
            </Grid>

          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
}

function FlujoTerminadoRender() {

  let showButtons = false; 

  itemRenderDetallePlan = RenderDetallePlan(planSeleccionado, subPlanSeleccionado, showButtons)

 
 
  return (
    
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            
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
                                    <h2>POLIZA EMITIDA</h2>
                                  </Typography>
                            
                     
                                  <Typography variant="body2" gutterBottom>

                            <PDFDownloadLink document={<MyDocumentPdf object={objectFinalPoliza} />} fileName="poliza.pdf">
                              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Descargar Poliza')}
                            </PDFDownloadLink>
                                  </Typography>

                                </div>
                      </Grid>
                      

                              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                                <Typography variant="h2" gutterBottom>
                                  <h2>RESUMEN</h2>
                                </Typography>
                              </div>

                              <Grid item lg={6}>
                                <Typography variant="caption">CLIENTE</Typography>
                                <Grid style={{ display: 'flex', flexDirection: 'column', marginTop: 6}}>
                                  <span style={{ textTransform: 'uppercase', fontSize: '14px' }}> {'NOMBRE: ' + itemDatosAsegurado['nombre_persona']}
                                  </span>
                                  <span style={{ textTransform: 'uppercase', fontSize: '14px' }}>  {'EMAIL: ' + userAccountData['email']}</span>
                                 
                                </Grid>

                              </Grid>

                              <Grid item lg={6}>
                        
                                <Typography variant="caption">EQUIPO</Typography>
                               

                                <Grid style={{ display: 'flex', flexDirection: 'column' , marginTop:6}}>
                                  <span  style={{ textTransform: 'uppercase', fontSize: '14px' }}>   {'MARCA: ' + itemDatosAsegurado['marca_equipo']}
                                  </span>
                                  <span  style={{ textTransform: 'uppercase', fontSize: '14px' }}> {'NUMERO SERIE: ' + itemDatosAsegurado['numero_serie']}</span>
                                  <span  style={{ textTransform: 'uppercase', fontSize: '14px' }}>  {'IMEI: ' + itemDatosAsegurado['imei']}</span>

                                </Grid>
                              </Grid>
  
                              <Grid item lg={12}>
                                   {itemRenderDetallePlan && itemRenderDetallePlan}
 
                                </Grid>
                          
                      
                      <Typography variant="body2" gutterBottom>

                        <a href="/pages/login"> Ir a mi cuenta </a>
                      </Typography>


                            </Grid>
                          </CardContent>
                        </Card>
 
                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
          
          </CardContent>
        </Card>
   
  );
}



let estadoGlobal = 0;
let estadoLocal = 0;

function PlanesForm(props) {
  let vertical = 'bottom';
  let horizontal = 'right';


  let show = false;
  let mensajeSeleccion = '';
  

  console.log("prooops", props)

  let fnClickButtonNext = props.clickNext;
  let finishStep = props.completeFn;

  if (fnClickButtonNext > 0) {
    console.log("mensajeRecibido", fnClickButtonNext)
    console.log("ESTADO", estadoLocal)

    if (!planSeleccionado) {
      console.log("SE NECESITA SELECCIONAR UN PLAN")
      mensajeSeleccion = "SE NECESITA SELECCIONAR UN PLAN"
      show = true;
      estadoLocal = 1;

    } else if (!subPlanSeleccionado) {
      console.log("SE NECESITA SELECCIONAR UN SUBPLAN")
      mensajeSeleccion = "DEBES SELECCIONAR UNA BANDA"
      show = true;
      estadoLocal = 2;

    } else if (estadoLocal == 2) {
      console.log("ESTADO", estadoLocal)
     
      estadoLocal = 3;
      
    } else if (
      estadoGlobal == 4
    ) {
      console.log("AQUI")
 
  
     // finishStep();
       

    }
    else if (
      estadoGlobal == 5
    ) {
      console.log("AQUI")

      estadoGlobal =4
      //finishStep();


    }
    else if (
      estadoLocal == 3
    ) {
      finishStep();
      estadoLocal = 4;
      estadoGlobal = 5

    }
      
  } else {

  }
 

  fnxCompleteStep = props.fn;
  
  const [dplan, setDplan] = useState('');
  const [splan, setSplan] = useState('');
  const [changeInfo, setChangeInfo] = useState('');


  function handleChangePlan(event) {
    console.log(event)

    let plan = listPlanes.find((u) => {

      return u['id'] === event.target.value


    });
    console.log("planSeleccionado", plan)
    setDplan(plan)
    planSeleccionado = plan;
    // this.setState({ value: event.target.value });
    // RenderDetallePlan(user)
    itemRenderDetallePlan = null;
  };

  function handleChangeSubPlan(event) {
    console.log(event.target.value)

    let subPlan = listSubPlanes.find((u) =>
      u['id'] === String(event.target.value));
    console.log("subPlaneSeleccionado", subPlan)
    subPlanSeleccionado = subPlan;
    setSplan(subPlan)
    // this.setState({ value: event.target.value });
    // RenderDetallePlan(user)
    itemRenderDetallePlan = null;
    isloaded = false;

  };

 console.log("plan_seleccionado",planSeleccionado)
  console.log("sub_seleccionado", subPlanSeleccionado)

  
  itemRender = ListaRender(handleChangePlan)
  itemRenderSubPlan = ListaRenderSubPlan(handleChangeSubPlan)
  itemRenderDetallePlan = planSeleccionado && subPlanSeleccionado && RenderDetallePlan(planSeleccionado, subPlanSeleccionado, true, props.completeFn,setChangeInfo)
  estadoLocal = 3
 

  if (itemRenderDetallePlan) { 
    setTimeout(() => {

    }, 1000);
  }
 
  return (
    
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


        
                <Grid container spacing={6} justify="center">


                  <Grid container justify="center">
                    <Grid item md={12}>
                      <span style={{ fontWeight: 'bold', fontSize: '22px', marginTop: 12 }}> SELECCIONAR PLAN</span>
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      <Shadow>

                        <Card px={6} pt={6}>
                          <CardContent>
                            <Grid container spacing={6}>

                              <Grid item md={12}>
                                {itemRender}


                              </Grid>
                              

                              <Grid item md={12}>
                                {itemRenderSubPlan}

                              </Grid>
                              <Grid item xs={12}>
                                   {itemRenderDetalleSubPlan && itemRenderDetallePlan}
                            

 
                              </Grid>
                         

                            </Grid>
                          </CardContent>
                        </Card>
                      </Shadow>
                    </Grid>
                  </Grid>

                </Grid>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={show}
           message={mensajeSeleccion}
          key={vertical + horizontal}
        />
     
          </CardContent>
        </Card>
  
  );
}

function RegistrarPerfil(props) {


   const inputRef = React.useRef(null)
  const [selectedDate, handleDateChange] = useState(null);


  console.log(props)
  const formRef = useRef()


  let formInicial = props.getter
  let setFormInicial = props.setter;
  let setterFinish = props.setterFinish;

  

  let fnClickButtonNext = props.finishStepValue;
  

  if (fnClickButtonNext>0) { 
    console.log("mensajeRecibido", fnClickButtonNext)
     if (inputRef.current) { 
      inputRef.current.click()

    }

  }

  const initialValues = {
    rutPersona: ''  ,
    nroSerie: ''  ,
    nombrePersona: '' ,
    fechaNacimiento: ''  ,
    apellidoPaterno: '',
    apellidoMaterno: '',
    calle: '',
    nroDpto: '',
    comuna: '',
    ciudad: '',
    region: '',
    pais: '',
    email: '',
    password: '',
    confirmPassword: '',

  };
    
  const validationSchema = Yup.object().shape({
    rutPersona: Yup.string().required("Requerido"),
    email: Yup.string().email().required("Requerido"),
    nroSerie: Yup.string().required("Requerido"),
    nombrePersona: Yup.string().required("Requerido"),
    apellidoPaterno: Yup.string().required("Requerido"),
    apellidoMaterno: Yup.string().required("Requerido"),
    calle: Yup.string().required("Requerido"),
    nroDpto: Yup.string().required("Requerido"),
    comuna: Yup.string().required("Requerido"),
    ciudad: Yup.string().required("Requerido"),
    region: Yup.string().required("Requerido"),
    pais: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido"),
    confirmPassword: Yup.string().required("Requerido"),


  });


  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      setterFinish(true)

      console.log("valores_items", values)
      userAccountData['rutPersona'] = values.rutPersona;
      userAccountData['email'] = values.email;
      userAccountData['numero_serie'] = values.nroSerie;
      userAccountData['nombre_persona'] = values.nombrePersona;
      userAccountData['apellido_paterno'] = values.apellidoPaterno;
      userAccountData['apellido_materno'] = values.apellidoMaterno;
      userAccountData['calle'] = values.calle;
      userAccountData['numero_departamento'] = values.nroDpto;
      userAccountData['comuna'] = values.comuna;
      userAccountData['ciudad'] = values.ciudad;
      userAccountData['region'] = values.region;
      userAccountData['pais'] = values.pais;

      await Auth.signUp(values.email, values.password).then((data) => {
        console.log("usuarioRegistrado", data)
      })

       setStatus({ sent: true });
      setSubmitting(false);
    //  finishStep()
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };


  
   


  return (
     
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              REGISTRAR CUENTA USUARIO
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginBottom: '60px' }}>
            </Typography>
        < Grid>
          <Formik innerRef={formRef}
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
              <form onSubmit={handleSubmit}>
                <Grid >
                  <Grid container spacing={6}>

                    <Grid item md={6}>
                      <TextField
                        name="rutPersona"
                        label="RUT PERSONA"
                        fullWidth
                        defaultValue={values.rutPersona}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                      {errors.rutPersona ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.rutPersona}</div> : null}

                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="nroSerie"
                        label="NUMERO DE SERIE CARNET"
                        fullWidth
                        variant="outlined"
                        defaultValue={values.nroSerie}
                        onChange={handleChange}
                        my={2}
                      />
                      {errors.nroSerie ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.nroSerie}</div> : null}

                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="nombrePersona"
                        label="NOMBRES"
                        fullWidth
                        defaultValue={values.nombrePersona}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                      {errors.nombrePersona ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.nombrePersona}</div> : null}

                    </Grid>
                    <Grid item md={6}>
                      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="es" >

                      <DatePicker style={{ marginTop: 10 }}
                        autoOk
                        disableFuture
                        fullWidth
                        variant="inline"
                        inputVariant="outlined"
                         label="FECHA NACIMIENTO"
                          format="DD/MM/YYYY"

                        value={selectedDate}
                        onChange={handleDateChange}



                        maxDateMessage="Debe seleccionar una fecha valida"
                      />
                   </MuiPickersUtilsProvider> 
 
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="apellidoPaterno"
                        label="APELLIDO PATERNO "
                        fullWidth
                        defaultValue={values.apellidoPaterno}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                      {errors.apellidoPaterno ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.apellidoPaterno}</div> : null}

                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        name="apellidoMaterno"
                        label="APELLIDO MATERNO "
                        fullWidth
                        defaultValue={values.apellidoMaterno}
                        onChange={handleChange}
                        variant="outlined"
                        my={2}
                      />
                      {errors.apellidoMaterno ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.apellidoMaterno}</div> : null}

                    </Grid>

                    <Grid item md={6}>


                      <select onChange={event => SaveValue("genero", event.target.value, setFormInicial)} style={{ width: '100%', height: '50px' }}>
                        <option > SELECCIONAR GENERO </option>
                        <option value="femenino"> FEMENINO </option>
                        <option value="masculino"> MASCULINO </option>
                      </select>
                    </Grid>
                    <Grid item md={6}>


                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="calle"
                        label="CALLE "
                        fullWidth
                        defaultValue={values.calle}
                        onChange={handleChange}
                        my={2}
                      />
                      {errors.calle ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.calle}</div> : null}

                    </Grid>



                    <Grid item md={6}>
                      <TextField
                        name="nroDpto"
                        label="NUMERO DPTO/CASA "
                        fullWidth
                        defaultValue={values.nroDpto}
                        onChange={handleChange}
                        my={2}
                      />
                      {errors.nroDpto ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.nroDpto}</div> : null}

                    </Grid>


                    <Grid item md={6}>
                      <TextField
                        name="comuna"
                        label="COMUNA "
                        fullWidth
                        defaultValue={values.comuna}
                        onChange={handleChange}
                        my={2}
                      />
                      {errors.comuna ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.comuna}</div> : null}

                    </Grid>


                    <Grid item md={6}>
                      <TextField
                        name="ciudad"
                        label="CIUDAD "
                        fullWidth
                        defaultValue={values.ciudad}
                        onChange={handleChange} my={2}
                      />
                      {errors.ciudad ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.ciudad}</div> : null}

                    </Grid>


                    <Grid item md={6}>
                      <TextField
                        name="region"
                        label="REGION "
                        fullWidth

                        defaultValue={values.region}
                        onChange={handleChange} my={2}
                      />
                      {errors.region ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.region}</div> : null}

                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="pais"
                        label="PAIS"
                        fullWidth

                        defaultValue={values.pais}
                        onChange={handleChange} my={2}
                      />
                      {errors.pais ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.pais}</div> : null}

                    </Grid>



                  </Grid>

                  <Grid>
                    <TextField
                      name="email"
                      label="Email"
                      defaultValue={values.email}
                      onChange={handleChange} fullWidth
                      type="email"
                      variant="outlined"
                      my={2}
                    />
                    {errors.email ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.email}</div> : null}

                  </Grid>



                  <Grid>
                    <TextField
                      name="password"
                      label="Password"
                      fullWidth
                      defaultValue={values.password}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
                    {errors.password ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.password}</div> : null}

                  </Grid>


                  <Grid>
                    <TextField
                      name="confirmPassword"
                      label="Confirm password"
                      fullWidth
                      defaultValue={values.repassword}
                      onChange={handleChange}
                      type="password"
                      variant="outlined"
                      my={2}
                    />
                    {errors.confirmPassword ? <div style={{ marginBottom: '23', color: 'red' }}>*{errors.confirmPassword}</div> : null}

                  </Grid>
                  <Button 

                  style={{display:'none'}}
                    ref={inputRef}
                     type="submit"
                    variant="contained"
                    color="primary"
                    mt={3}
                  >
                    ENVIAR
                </Button>



                </Grid>

              </form >

            )}
          </Formik>
        </Grid>
            
          
          </CardContent>
        </Card>
      )
  
}

function FlujoTerminado() {
  return (
    <Card mb={6}>
      <CardContent>
        <FlujoTerminadoRender  />

      </CardContent>
    </Card>
  );
}

function FormularioPerfil(formInicial, setFormInicial, fnClickNext, fnCompleteStep, nextFinish, setIsFinish) {
  return (
    <Card mb={6}>
      <CardContent>
        <RegistrarPerfil
          getter={formInicial}
          setter={setFormInicial}
          clickNext={fnClickNext}
          completeFn={fnCompleteStep}
          finishStepValue={nextFinish}
          setterFinish={setIsFinish}
        />

      </CardContent>
    </Card>
  );
}

function FormularioAnexos(formInicial, setFormInicial, fnClickNext, fnCompleteStep)  {
  return (
    <Card mb={6}>
      <CardContent>
        <DefaultDropzone getter={formInicial} setter={setFormInicial} clickNext={fnClickNext} completeFn={fnCompleteStep} />

      </CardContent>
    </Card>
  );
}

function FormularioPlanes(fnClickNext, fnCompleteStep) {
  return (
    <Card mb={6}>
      <CardContent>
        <PlanesForm  clickNext={fnClickNext} completeFn={fnCompleteStep}   />

      </CardContent>
    </Card>
  );
}

function FormulariosIngreso(formInicial, setFormInicial, fnClickNext, fnCompleteStep) {


  return (
    <Card mb={6}>
      <CardContent>
        <BasicForm getter={ formInicial} setter={setFormInicial} clickNext={fnClickNext} completeFn={fnCompleteStep} />
      </CardContent>
    </Card>
  );
}

function getSteps() {
  return ['INFORMACION PERSONAL & CELULAR', 'SELECCIONAR PLAN', 'SUBIR FOTOS' , 'COMPRAR SEGURO'];
}


function getStepContent(step, fnClickButtonNext, fnCompleteStep, formInicial, setFormInicial, nextFinish, setIsFinish){

  fnxCompleteStep = fnCompleteStep
  
  switch (step) {
    case 0:
      txBotonContinuar = 'SELECIONAR PLAN'
      setPImagen('banner_06_on.png')
      setSImagen('banner_07_off.png')
      setTImagen('banner_08_off.png')
       setQImagen('banner_10_off.png')

      return FormulariosIngreso(formInicial, setFormInicial, fnClickButtonNext, fnCompleteStep);
    case 1:

      setPImagen('banner_06_off.png')
      setSImagen('banner_07_on.png')
      setTImagen('banner_08_off.png')
       setQImagen('banner_10_off.png')
      
      txBotonContinuar = 'SUBIR FOTO'

      return FormularioPlanes(fnClickButtonNext, fnCompleteStep);
    case 2:


      setPImagen('banner_06_off.png')
      setSImagen('banner_07_off.png')
      setTImagen('banner_08_on.png')
       setQImagen('banner_10_off.png')


      txBotonContinuar = 'COMPLETAR INFORMACION'

      return FormularioAnexos(formInicial, setFormInicial, fnClickButtonNext, fnCompleteStep);

    case 3:

      setPImagen('banner_06_off.png')
      setSImagen('banner_07_off.png')
      setTImagen('banner_08_off.png')

      setQImagen('banner_10_on.png')


      txBotonContinuar = 'FINALIZAR COMPRA'

      return FormularioPerfil(formInicial, setFormInicial, fnClickButtonNext, fnCompleteStep, nextFinish, setIsFinish);

    default:
      return 'Unknown step';
  }
}



async function ObtenerDetalleCotizacion(setFormInicialx, handleComplete )  {

  let { id } = useParams();

  let temId = String(id)
  console.log(id)


 
 
    const queryListaActividadGraphql = `
 query MyQuery {
   detalleCotizacion(numero_cotizacion:"${temId}") {
     id
    data_cotizacion
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
 
  

  console.log("polizaaa", data)
  if (data && data['data']) {
    console.log("productos", data['data']['detalleCotizacion']['data_cotizacion']);
    let listProductos = JSON.parse(data['data']['detalleCotizacion']['data_cotizacion']);

    console.log("listproduct", listProductos);
    itemDatosAsegurado = listProductos['asegurado']

    setFormInicialx(itemDatosAsegurado)
    planSeleccionado = listProductos['plan'];
    subPlanSeleccionado = listProductos['subplan'];
    detallesExtras = listProductos['detalles'];

    console.log("subPlanSeleccionado", subPlanSeleccionado)

    handleComplete();
   
    
    //let itemSubPlanData = JSON.parse(subPlanSeleccionado['data_sub_plan'])

    //itemRenderDetallePlan = RenderDetallePlan(planSeleccionado)
    //itemRenderDetalleSubPlan = RenderDetalleSubPlan(subPlanSeleccionado)

   
   }
   
   return true
}



function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formInicial, setFormInicial] = useState({});
  const [nextEvent, setNextEvent] = useState(0);
  const [nextFinish, setNextFinish] = useState(0);
  const [isFinish, setIsFinish] = useState(false);



  

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
    if (completedSteps() === totalSteps()) {

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


  const handleClickButtonComplete = () => {
     setNextEvent(Math.random())

  };




  const handleClickCompleteAll = () => {
 
    setNextFinish(Math.random())

    //handleComplete()
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

  console.log("formInicial", formInicial)
  if (Object.keys(formInicial).length == 0) {
    console.log("itemS")

    ObtenerDetalleCotizacion(setFormInicial, handleComplete)
  } else {

    console.log("xxxx")
    itemDatosAsegurado = formInicial;
   // handleComplete()

  }


  return (
    <div className={classes.root}>

      <div style={{ marginTop: '16px', marginBottom: '10px', display: 'flex', flexDirection: 'row', }}>
       
      </div>

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
              <Typography className={classes.instructions}>{getStepContent(activeStep, nextEvent, handleComplete, formInicial, setFormInicial, nextFinish , setIsFinish )}</Typography>
             
            </div>
         
          )}
      </div>

      {allStepsCompleted() ? (<Grid></Grid>): (
        <div style = {{ display: 'flex' }}>
      <Grid item lg={6} style={{ display: 'flex' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
          ATRAS
              </Button>
      </Grid>
      <Grid item lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Grid>
              {completedSteps() === totalSteps() - 1 ? <AlertCompletarFormulario isFinish={isFinish} onClick={handleClickCompleteAll} fnFinish={handleComplete} /> : <Button variant="contained" color="primary" onClick={handleClickButtonComplete}> {txBotonContinuar} </Button>}
        </Grid>
      </Grid>
    </div>
      )}

    </div >

      
  );
}


function RenderHeaderSteps() { 


  const [primera, setPrimera] = React.useState('banner_06.png');
  const [segunda, setSegunda] = React.useState('banner_06.png');
  const [tercera, setTercera] = React.useState('banner_06.png');
  const [cuarta, setCuarta] = React.useState('banner_06.png');
  const [quinta, setQuinta] = React.useState('banner_06.png');

  setPImagen = setPrimera;
  setSImagen = setSegunda;
  setTImagen = setTercera;
  setCImagen = setCuarta;
  setQImagen = setQuinta; 

  
  return (<Grid style={{ marginTop: '12px', display: 'flex' }} item lg={12}>
    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + primera} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>
    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + segunda} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>

    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + tercera} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>

 
    <Grid item style={{ flex: 1, padding: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '120px', height: '110px', }}>
        <img src={'/static/img/' + quinta} style={{ width: '100%', height: '100%' }} />

      </div>
    </Grid>
  </Grid>)

}
 

async function obtenerListaItems() {

  listCoberturas = []
  const queryListaActividadGraphql = `
 query MyQuery {
   listasCoberturas{
     id
     id_sub_plan
    data_cobertura
  }
}

`;

  console.log(queryListaActividadGraphql)
  const data = await API.graphql({
    query: queryListaActividadGraphql
  });
  console.log("data from GraphQL:", data);

  let listasProductos = data['data']['listasCoberturas'];
  listasProductos && listasProductos.forEach(element => {

    let itemPlan = JSON.parse(element['data_cobertura'])
    let itemCobertura = {
      ...itemPlan,
      id: element['id'],
      id_sub_plan: element['id_sub_plan']

    }
    console.log(itemCobertura);
    listCoberturas.push(itemCobertura);

  });
  console.log(listCoberturas)


  return true;
}


function FlujoCompra() {
   
  const classes = useStyles();
  obtenerListaItems();
   return (
     <React.Fragment>
 
      <Helmet title="Flujo de compra" />
      <AppBar />

      <Grid style={{ padding: '22px' }}>
        <Typography variant="h3" gutterBottom display="inline">
         CONTRATA TU SEGURO
      </Typography>

        <RenderHeaderSteps />
        <Divider my={6} />
        <HorizontalNonLinearStepper>

         </HorizontalNonLinearStepper>

    
         </Grid>

       
     </React.Fragment>
  );
}

export default FlujoCompra;
