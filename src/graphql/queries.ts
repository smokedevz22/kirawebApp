/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const detalleCobroPoliza = /* GraphQL */ `
  query DetalleCobroPoliza($id_cobro: Int) {
    detalleCobroPoliza(id_cobro: $id_cobro) {
      fecha_fin
      fecha_inicio
      monto
      nombre_cotizacion
      numero_poliza
      plan
      tipo_actividad
      valor_uf
    }
  }
`;
export const detallePolizaxxx = /* GraphQL */ `
  query DetallePolizaxxx($numero_poliza: String!) {
    detallePolizaxxx(numero_poliza: $numero_poliza) {
      Estado_poliza
      Fecha_emision
      codigo_cobertura
      codigo_producto
      coordenada_final_lat
      coordenada_final_lon
      coordenada_incial_lat
      coordenada_incial_lon
      direccion_final
      direccion_inicial
      fecha_cotizacion
      fecha_fin
      fecha_inicio
      iva
      nombre_comercial
      nombre_cotizacion
      numero_cotizacion
      numero_poliza
      periodo
      plan
      precio_cotizacion
      precio_neto
      rut
      tipo_actividad
      usuario_principal
      valor_minimo
    }
  }
`;
export const detallePolizaFull = /* GraphQL */ `
  query DetallePolizaFull($numero_poliza: Int!) {
    detallePolizaFull(numero_poliza: $numero_poliza) {
      poliza
      response
    }
  }
`;
export const getAccountTypes = /* GraphQL */ `
  query GetAccountTypes {
    getAccountTypes {
      codigo
      nombre
    }
  }
`;
export const getBanks = /* GraphQL */ `
  query GetBanks {
    getBanks {
      id
      codigo_banco
      nombre_banco
    }
  }
`;
export const getCausalesSiniestro = /* GraphQL */ `
  query GetCausalesSiniestro($codigo_producto: String!) {
    getCausalesSiniestro(codigo_producto: $codigo_producto) {
      codigo
      es_cubierta
      glosa
      mensaje
    }
  }
`;
export const getListMediosPago = /* GraphQL */ `
  query GetListMediosPago($rut_usuario: String) {
    getListMediosPago(rut_usuario: $rut_usuario) {
      fecha_vencimiento
      id_medio_pago
      medio_pago
      medio_pago_glosa
      numero_tarjeta
      principal
      tipo_tarjeta
      tipo_tarjeta_glosa
    }
  }
`;
export const getListSiniestroByPoliza = /* GraphQL */ `
  query GetListSiniestroByPoliza($numero_poliza: Int!) {
    getListSiniestroByPoliza(numero_poliza: $numero_poliza) {
      fecha_denuncia
      glosa
      numero_siniestro
    }
  }
`;
export const getMedioDeposito = /* GraphQL */ `
  query GetMedioDeposito($rut_usuario: String) {
    getMedioDeposito(rut_usuario: $rut_usuario) {
      id_medio_deposito
      nombre_banco
      nombre_tipo_cuenta
      numero_cuenta
      rut_cuenta
    }
  }
`;
export const getPrecioCobertura = /* GraphQL */ `
  query GetPrecioCobertura($input: InputPrecioCobertura) {
    getPrecioCobertura(input: $input) {
      response
      success
      valor_uf
    }
  }
`;
export const getPrecioCoberturaAuto = /* GraphQL */ `
  query GetPrecioCoberturaAuto($input: InputPrecioCoberturaAuto) {
    getPrecioCoberturaAuto(input: $input) {
      response
      success
      valor_total_bruto
      valor_total_neto
    }
  }
`;
export const getPrecioMinimoCotizacion = /* GraphQL */ `
  query GetPrecioMinimoCotizacion(
    $codigo_producto: String!
    $id_actividad: Int
    $id_plan: Int
  ) {
    getPrecioMinimoCotizacion(
      codigo_producto: $codigo_producto
      id_actividad: $id_actividad
      id_plan: $id_plan
    ) {
      valor_uf
    }
  }
`;
export const getPrecioMinimoCotizacionAuto = /* GraphQL */ `
  query GetPrecioMinimoCotizacionAuto(
    $id_modelo: Int
    $id_plan: Int
    $year: Int
  ) {
    getPrecioMinimoCotizacionAuto(
      id_modelo: $id_modelo
      id_plan: $id_plan
      year: $year
    ) {
      prima_bruta
      prima_neta
    }
  }
`;
export const getSiniestroDetail = /* GraphQL */ `
  query GetSiniestroDetail($numero_siniestro: Int!) {
    getSiniestroDetail(numero_siniestro: $numero_siniestro) {
      response
      siniestro
    }
  }
`;
export const htmlToPdf = /* GraphQL */ `
  query HtmlToPdf($numero_poliza: Int!) {
    htmlToPdf(numero_poliza: $numero_poliza) {
      base64
      numero_poliza
      pdf_base64
      response
      success
    }
  }
`;
export const listaActividad = /* GraphQL */ `
  query ListaActividad($codigo_producto: String!) {
    listaActividad(codigo_producto: $codigo_producto) {
      codigo_actividad
      codigo_producto
      id_actividad
      logo_actividad
      tipo_actividad
      tipo_riesgo
    }
  }
`;
export const listaCobertura = /* GraphQL */ `
  query ListaCobertura($id_plan: String!) {
    listaCobertura(id_plan: $id_plan) {
      capital_max
      capital_min
      codigo_cobertura
      id_cobertura
      nombre_cobertura
    }
  }
`;
export const listaCobrosPoliza = /* GraphQL */ `
  query ListaCobrosPoliza($rut: String!) {
    listaCobrosPoliza(rut: $rut) {
      fecha_fin
      fecha_inicio
      id_cobro
      monto
      nombre_cotizacion
      numero_poliza
      plan
      tipo_actividad
      valor_uf
    }
  }
`;
export const listaCotizacion = /* GraphQL */ `
  query ListaCotizacion($rut: String!) {
    listaCotizacion(rut: $rut) {
      fecha_cotizacion
      foto
      numero_cotizacion
    }
  }
`;
export const listaMarcaAuto = /* GraphQL */ `
  query ListaMarcaAuto {
    listaMarcaAuto {
      id
      nombre
    }
  }
`;
export const listaModeloPorMarca = /* GraphQL */ `
  query ListaModeloPorMarca($id_marca: Int!) {
    listaModeloPorMarca(id_marca: $id_marca) {
      id
      nombre
    }
  }
`;
export const listaPlan = /* GraphQL */ `
  query ListaPlan($codigo_producto: String!) {
    listaPlan(codigo_producto: $codigo_producto) {
      brief
      caracteristicas
      codigo_producto
      id_plan
      nombre_plan
      plan
    }
  }
`;
export const listaPoliza = /* GraphQL */ `
  query ListaPoliza($rut: String!) {
    listaPoliza(rut: $rut) {
      Estado_poliza
      Fecha_emision
      foto
      nombre_cotizacion
      numero_poliza
      numero_siniestros
      poliza_pdf
    }
  }
`;
export const listaProductos = /* GraphQL */ `
  query ListaProductos {
    listaProductos {
      codigo_producto
      descripcion
      descripcion_larga
      imagen
      logo
      nombre_comercial
      nombre_tecnico
      periodo
      valor_minimo
    }
  }
`;
export const listaTipDia = /* GraphQL */ `
  query ListaTipDia {
    listaTipDia {
      ContenidoTip
      id_tip
    }
  }
`;
export const listaYear = /* GraphQL */ `
  query ListaYear {
    listaYear {
      year
    }
  }
`;
export const login = /* GraphQL */ `
  query Login($clave: String!, $email: String!) {
    login(clave: $clave, email: $email) {
      apellido
      email
      isUnauthorized
      nombre
      rut
      token
    }
  }
`;
export const login2 = /* GraphQL */ `
  query Login2($clave: String!, $email: String!) {
    login2(clave: $clave, email: $email) {
      apellido
      email
      isUnauthorized
      nombre
      rut
      token
    }
  }
`;
export const nuevaQuery = /* GraphQL */ `
  query NuevaQuery {
    nuevaQuery {
      response
      success
    }
  }
`;
export const pausePoliza = /* GraphQL */ `
  query PausePoliza($numero_poliza: Int!, $valor_uf: String!) {
    pausePoliza(numero_poliza: $numero_poliza, valor_uf: $valor_uf) {
      numero_poliza
      response
      total
    }
  }
`;
export const pausePolizaT = /* GraphQL */ `
  query PausePolizaT($numero_poliza: String!, $valor_uf: String!) {
    pausePolizaT(numero_poliza: $numero_poliza, valor_uf: $valor_uf) {
      numero_poliza
      response
      total
    }
  }
`;
export const productByUser = /* GraphQL */ `
  query ProductByUser($rut: String!) {
    productByUser(rut: $rut) {
      anexo_cp
      carta_cp
      codigo_producto
      fecha_inicio
      fecha_termino
      imagen
      logo
      nombre_comercial
      nombre_tecnico
      producto_cp
    }
  }
`;
export const resumenCotizacion = /* GraphQL */ `
  query ResumenCotizacion($numero_cotizacion: String!) {
    resumenCotizacion(numero_cotizacion: $numero_cotizacion) {
      codigo_cobertura
      codigo_producto
      coordenada_final_lat
      coordenada_final_lon
      coordenada_incial_lat
      coordenada_incial_lon
      direccion_final
      direccion_inicial
      fecha_cotizacion
      fecha_fin
      fecha_inicio
      id_marca_auto
      id_modelo_auto
      iva
      marca_auto
      modelo_auto
      nombre_comercial
      nombre_cotizacion
      numero_cotizacion
      periodo
      plan
      precio_cotizacion
      precio_neto
      rut
      tipo_actividad
      usuario_principal
      valor_minimo
      year_auto
    }
  }
`;
export const sendPolizaEmail = /* GraphQL */ `
  query SendPolizaEmail($numero_poliza: Int!) {
    sendPolizaEmail(numero_poliza: $numero_poliza) {
      response
      success
    }
  }
`;
export const testDbConnection = /* GraphQL */ `
  query TestDbConnection($numero_cotizacion: String!) {
    testDBConnection(numero_cotizacion: $numero_cotizacion) {
      response
    }
  }
`;
export const updateSiniestroContactDate = /* GraphQL */ `
  query UpdateSiniestroContactDate(
    $fecha_contacto: String!
    $numero_siniestro: Int!
  ) {
    updateSiniestroContactDate(
      fecha_contacto: $fecha_contacto
      numero_siniestro: $numero_siniestro
    ) {
      fecha_contacto
      numero_siniestro
    }
  }
`;
export const upload64 = /* GraphQL */ `
  query Upload64($base64: String!, $imageName: String!, $rut: String!) {
    upload64(base64: $base64, imageName: $imageName, rut: $rut) {
      url
    }
  }
`;
export const uploadImage64 = /* GraphQL */ `
  query UploadImage64($input: UploadImage64Input!) {
    uploadImage64(input: $input) {
      contadorImagenes
    }
  }
`;
export const uploadMultiple64 = /* GraphQL */ `
  query UploadMultiple64($files: [ImageFilesInput]!, $rut: String!) {
    uploadMultiple64(files: $files, rut: $rut) {
      url
    }
  }
`;
export const user = /* GraphQL */ `
  query User($id: ID!) {
    user(id: $id) {
      apellido
      celular
      clave
      email
      mailrecuperacion
      nombre
      rut
    }
  }
`;
export const listasActividades = /* GraphQL */ `
  query ListasActividades {
    listasActividades {
      id
      data_actividad
    }
  }
`;
export const listasPlanes = /* GraphQL */ `
  query ListasPlanes {
    listasPlanes {
      id
      data_plan
    }
  }
`;
export const listasSubPlanes = /* GraphQL */ `
  query ListasSubPlanes {
    listasSubPlanes {
      id
      id_plan
      data_sub_plan
    }
  }
`;
export const listasPolizas = /* GraphQL */ `
  query ListasPolizas {
    listasPolizas {
      id
      data_poliza
    }
  }
`;
export const listasCotizaciones = /* GraphQL */ `
  query ListasCotizaciones {
    listasCotizaciones {
      id
      data_cotizacion
      numero_cotizacion
    }
  }
`;
export const listasProductos = /* GraphQL */ `
  query ListasProductos {
    listasProductos {
      id
      data_producto
    }
  }
`;
export const listasSiniestros = /* GraphQL */ `
  query ListasSiniestros {
    listasSiniestros {
      id
      data_siniestro
    }
  }
`;
export const listasCoberturas = /* GraphQL */ `
  query ListasCoberturas {
    listasCoberturas {
      id
      id_sub_plan
      data_cobertura
    }
  }
`;
export const listasUsuario = /* GraphQL */ `
  query ListasUsuario {
    listasUsuario {
      apellido
      celular
      clave
      email
      mailrecuperacion
      nombre
      rut
    }
  }
`;
export const detalleCotizacion = /* GraphQL */ `
  query DetalleCotizacion($numero_cotizacion: String!) {
    detalleCotizacion(numero_cotizacion: $numero_cotizacion) {
      id
      data_cotizacion
      numero_cotizacion
    }
  }
`;
export const detallePoliza = /* GraphQL */ `
  query DetallePoliza($numero_poliza: String!) {
    detallePoliza(numero_poliza: $numero_poliza) {
      id
      data_poliza
    }
  }
`;
export const detalleSiniestro = /* GraphQL */ `
  query DetalleSiniestro($numero_siniestro: String!) {
    detalleSiniestro(numero_siniestro: $numero_siniestro) {
      id
      data_siniestro
    }
  }
`;
