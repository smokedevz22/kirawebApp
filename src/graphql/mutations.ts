/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBank = /* GraphQL */ `
  mutation CreateBank($input: BankInput) {
    createBank(input: $input) {
      id
      codigo_banco
      nombre_banco
    }
  }
`;
export const createCuentaDeposito = /* GraphQL */ `
  mutation CreateCuentaDeposito($input: CreateCuentaDepositoInput!) {
    createCuentaDeposito(input: $input) {
      response
      success
    }
  }
`;
export const createMedioPago = /* GraphQL */ `
  mutation CreateMedioPago($input: CreateMedioPagoInput!) {
    createMedioPago(input: $input) {
      fecha_vencimiento
      id_medio_pago
      medio_pago
      numero_tarjeta
      principal
      rut_usuario
      tipo_tarjeta
    }
  }
`;
export const createPoliza = /* GraphQL */ `
  mutation CreatePoliza($input: CreatePolizaInput!) {
    createPoliza(input: $input) {
      Estado_poliza
      Fecha_emision
      cod_prod
      codigo_cotizacion
      direccion_poliza
      email
      iva
      medioPago
      numero_cotizacion
      numero_poliza
      plan
      poliza_pdf
      prima_bruta
      prima_neta
      rut
      tipo_actividad
      usuario_principal
    }
  }
`;
export const createSiniestro = /* GraphQL */ `
  mutation CreateSiniestro($input: CreateSiniestroInput!) {
    createSiniestro(input: $input) {
      codigo_estado
      fecha_contacto
      numero_siniestro
    }
  }
`;
export const deleteCuentaDeposito = /* GraphQL */ `
  mutation DeleteCuentaDeposito($id_cuenta_deposito: Int!) {
    deleteCuentaDeposito(id_cuenta_deposito: $id_cuenta_deposito) {
      deleted
      response
    }
  }
`;
export const deleteMedioPago = /* GraphQL */ `
  mutation DeleteMedioPago($id_medio_pago: Int!, $rut_usuario: String!) {
    deleteMedioPago(id_medio_pago: $id_medio_pago, rut_usuario: $rut_usuario) {
      deleted
      response
    }
  }
`;
export const deletePoliza = /* GraphQL */ `
  mutation DeletePoliza($numero_poliza: String!) {
    deletePoliza(numero_poliza: $numero_poliza) {
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
export const deletePoliza2 = /* GraphQL */ `
  mutation DeletePoliza2($input: DeletePoliza!) {
    deletePoliza2(input: $input) {
      Estado_poliza
      Fecha_emision
      cod_prod
      codigo_cotizacion
      direccion_poliza
      email
      iva
      medioPago
      numero_cotizacion
      numero_poliza
      plan
      poliza_pdf
      prima_bruta
      prima_neta
      rut
      tipo_actividad
      usuario_principal
    }
  }
`;
export const desestimarSiniestro = /* GraphQL */ `
  mutation DesestimarSiniestro($numero_siniestro: Int!) {
    desestimarSiniestro(numero_siniestro: $numero_siniestro) {
      codigo_estado
    }
  }
`;
export const finishUploadCotizacion = /* GraphQL */ `
  mutation FinishUploadCotizacion($numero_cotizacion: String!) {
    finishUploadCotizacion(numero_cotizacion: $numero_cotizacion) {
      completada
      completado
    }
  }
`;
export const finishUploadSiniestro = /* GraphQL */ `
  mutation FinishUploadSiniestro($numero_siniestro: String!) {
    finishUploadSiniestro(numero_siniestro: $numero_siniestro) {
      completada
      completado
    }
  }
`;
export const registerCobertura = /* GraphQL */ `
  mutation RegisterCobertura($input: RegisterCoberturaInput!) {
    registerCobertura(input: $input) {
      afecta_iva
      capital_max
      capital_min
      cobertura_pdf
      codigo_cobertura
      codigo_producto
      fecha_inicio
      fecha_termino
      nombre_cobertura
      pol_cad_cobertura
      ramo_eerr
      ramo_fecu
      tabla_tarificacion
      tasa_por_mil
      tipo_riesgo
      tipo_tarificacion
      tramo_por_cargas
    }
  }
`;
export const registerCotizacion = /* GraphQL */ `
  mutation RegisterCotizacion($input: RegisterCotizacionInput!) {
    registerCotizacion(input: $input) {
      numero_cotizacion
    }
  }
`;
export const registerMultimedia = /* GraphQL */ `
  mutation RegisterMultimedia($input: RegisterMultimediaInput!) {
    registerMultimedia(input: $input) {
      foto
      nombre
    }
  }
`;
export const registerPoliza = /* GraphQL */ `
  mutation RegisterPoliza($input: RegisterPolizaInput!) {
    registerPoliza(input: $input) {
      Estado_poliza
      Fecha_emision
      cod_prod
      codigo_cotizacion
      direccion_poliza
      email
      iva
      medioPago
      numero_cotizacion
      numero_poliza
      plan
      poliza_pdf
      prima_bruta
      prima_neta
      rut
      tipo_actividad
      usuario_principal
    }
  }
`;
export const registerUser = /* GraphQL */ `
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
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
export const startPoliza = /* GraphQL */ `
  mutation StartPoliza($numero_poliza: String!) {
    startPoliza(numero_poliza: $numero_poliza) {
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
export const registerSubPlan = /* GraphQL */ `
  mutation RegisterSubPlan($input: InputRegisterSubPlan!) {
    registerSubPlan(input: $input) {
      id
      id_plan
      data_sub_plan
    }
  }
`;
export const registerPlan = /* GraphQL */ `
  mutation RegisterPlan($input: InputRegisterPlan!) {
    registerPlan(input: $input) {
      id
      data_plan
    }
  }
`;
export const registerCoberturas = /* GraphQL */ `
  mutation RegisterCoberturas($input: InputRegisterCobertura!) {
    registerCoberturas(input: $input) {
      id
      id_sub_plan
      data_cobertura
    }
  }
`;
export const registerSiniestro = /* GraphQL */ `
  mutation RegisterSiniestro($input: InputRegisterSiniestro!) {
    registerSiniestro(input: $input) {
      nombre
    }
  }
`;
export const registerActividad = /* GraphQL */ `
  mutation RegisterActividad($input: InputRegisterActividad!) {
    registerActividad(input: $input) {
      id
      data_actividad
    }
  }
`;
export const registerProducto = /* GraphQL */ `
  mutation RegisterProducto($input: InputRegisterProducto!) {
    registerProducto(input: $input) {
      id
      data_producto
    }
  }
`;
export const registrarNuevaPoliza = /* GraphQL */ `
  mutation RegistrarNuevaPoliza($input: registrarNuevaPolizaInput) {
    registrarNuevaPoliza(input: $input) {
      id
      data_poliza
    }
  }
`;
export const registrarNuevaCotizacion = /* GraphQL */ `
  mutation RegistrarNuevaCotizacion($input: registrarNuevaCotizacionInput) {
    registrarNuevaCotizacion(input: $input) {
      id
      data_cotizacion
      numero_cotizacion
    }
  }
`;
export const registrarNuevoSiniestro = /* GraphQL */ `
  mutation RegistrarNuevoSiniestro($input: registrarNuevoSiniestroInput) {
    registrarNuevoSiniestro(input: $input) {
      id
      data_siniestro
    }
  }
`;
