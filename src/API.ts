/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type BankInput = {
  id: string,
  codigo_banco?: string | null,
  nombre_banco?: string | null,
};

export type CreateCuentaDepositoInput = {
  codigo_banco?: string | null,
  codigo_tipo_cuenta?: string | null,
  numero_cuenta?: string | null,
  rut_cuenta?: string | null,
  rut_usuario?: string | null,
};

export type CreateMedioPagoInput = {
  fecha_vencimiento?: string | null,
  medio_pago?: string | null,
  numero_tarjeta?: string | null,
  principal?: boolean | null,
  rut_usuario?: string | null,
  tipo_tarjeta?: string | null,
};

export type CreatePolizaInput = {
  numero_cotizacion?: string | null,
};

export type CreateSiniestroInput = {
  codigo_causal: string,
  descripcion: string,
  fecha_siniestro: string,
  numero_poliza: number,
  rut_usuario: string,
};

export type DeletePoliza = {
  id: string,
};

export type RegisterCoberturaInput = {
  afecta_iva?: string | null,
  capital_max?: number | null,
  capital_min?: number | null,
  cobertura_pdf?: string | null,
  codigo_cobertura?: string | null,
  codigo_producto?: string | null,
  fecha_inicio?: string | null,
  fecha_termino?: string | null,
  nombre_cobertura?: string | null,
  pol_cad_cobertura?: string | null,
  ramo_eerr?: string | null,
  ramo_fecu?: string | null,
  tabla_tarificacion?: string | null,
  tasa_por_mil?: string | null,
  tipo_riesgo?: string | null,
  tipo_tarificacion?: string | null,
  tramo_por_cargas?: string | null,
};

export type RegisterCotizacionInput = {
  capital?: string | null,
  cobertura?: string | null,
  codigo_cobertura?: string | null,
  codigo_producto?: string | null,
  coordenada_final_lat?: string | null,
  coordenada_final_lon?: string | null,
  coordenada_inicial_lat?: string | null,
  coordenada_inicial_lon?: string | null,
  direccion_final?: string | null,
  direccion_inicial?: string | null,
  fecha_cotizacion?: string | null,
  fecha_fin?: string | null,
  fecha_inicio?: string | null,
  id_marca_auto?: number | null,
  id_modelo_auto?: number | null,
  iva?: string | null,
  nombre_cotizacion?: string | null,
  plan?: string | null,
  precio_cotizacion?: string | null,
  precio_neto?: string | null,
  rut: string,
  tipo_actividad?: string | null,
  usuario_principal?: string | null,
  year_auto?: number | null,
};

export type RegisterMultimediaInput = {
  foto?: string | null,
  nombre?: string | null,
  numero_cotizacion?: string | null,
};

export type RegisterPolizaInput = {
  direccion_poliza?: string | null,
  email?: string | null,
  medioPago?: string | null,
  numero_cotizacion?: string | null,
  numero_poliza?: string | null,
  plan?: string | null,
  prima_bruta?: number | null,
  prima_neta?: number | null,
  rut?: string | null,
  tipo_actividad?: string | null,
  usuario_principal?: string | null,
};

export type RegisterUserInput = {
  apellido: string,
  celular?: string | null,
  clave: string,
  email: string,
  mailrecuperacion?: string | null,
  nombre: string,
  rut: string,
};

export type InputRegisterSubPlan = {
  id_plan?: string | null,
  data_sub_plan?: string | null,
};

export type InputRegisterPlan = {
  data_plan?: string | null,
};

export type InputRegisterCobertura = {
  id_sub_plan?: string | null,
  data_cobertura?: string | null,
};

export type InputRegisterSiniestro = {
  data_siniestro?: string | null,
};

export type InputRegisterActividad = {
  data_actividad?: string | null,
};

export type InputRegisterProducto = {
  data_producto?: string | null,
};

export type registrarNuevaPolizaInput = {
  data_poliza?: string | null,
};

export type registrarNuevaCotizacionInput = {
  data_cotizacion?: string | null,
};

export type registrarNuevoSiniestroInput = {
  data_siniestro?: string | null,
};

export type InputPrecioCobertura = {
  codigo_producto?: string | null,
  fecha_fin?: string | null,
  fecha_inicio: string,
  id_actividad?: number | null,
  id_plan?: number | null,
};

export type InputPrecioCoberturaAuto = {
  codigo_producto?: string | null,
  fecha_fin?: string | null,
  fecha_inicio: string,
  id_modelo?: number | null,
  id_plan?: number | null,
  year?: number | null,
};

export type UploadImage64Input = {
  image?: ImageFilesInput | null,
  numero_cotizacion?: string | null,
  numero_siniestro?: number | null,
  rut?: string | null,
  tipo?: string | null,
};

export type ImageFilesInput = {
  base64: string,
  imageName: string,
  type: string,
};

export type CreateBankMutationVariables = {
  input?: BankInput | null,
};

export type CreateBankMutation = {
  createBank:  {
    __typename: "Bank",
    id: string | null,
    codigo_banco: string | null,
    nombre_banco: string | null,
  },
};

export type CreateCuentaDepositoMutationVariables = {
  input: CreateCuentaDepositoInput,
};

export type CreateCuentaDepositoMutation = {
  createCuentaDeposito:  {
    __typename: "CreateCuentaDepositoResponse",
    response: string | null,
    success: boolean | null,
  } | null,
};

export type CreateMedioPagoMutationVariables = {
  input: CreateMedioPagoInput,
};

export type CreateMedioPagoMutation = {
  createMedioPago:  {
    __typename: "CreateMedioPagoResponse",
    fecha_vencimiento: string | null,
    id_medio_pago: number | null,
    medio_pago: string | null,
    numero_tarjeta: string | null,
    principal: boolean | null,
    rut_usuario: string | null,
    tipo_tarjeta: string | null,
  } | null,
};

export type CreatePolizaMutationVariables = {
  input: CreatePolizaInput,
};

export type CreatePolizaMutation = {
  createPoliza:  {
    __typename: "Poliza",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    cod_prod: string | null,
    codigo_cotizacion: string | null,
    direccion_poliza: string | null,
    email: string | null,
    iva: string | null,
    medioPago: string | null,
    numero_cotizacion: string | null,
    numero_poliza: string | null,
    plan: string | null,
    poliza_pdf: string | null,
    prima_bruta: number | null,
    prima_neta: number | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
  } | null,
};

export type CreateSiniestroMutationVariables = {
  input: CreateSiniestroInput,
};

export type CreateSiniestroMutation = {
  createSiniestro:  {
    __typename: "CreateSiniestroResponse",
    codigo_estado: string | null,
    fecha_contacto: string | null,
    numero_siniestro: string | null,
  } | null,
};

export type DeleteCuentaDepositoMutationVariables = {
  id_cuenta_deposito: number,
};

export type DeleteCuentaDepositoMutation = {
  deleteCuentaDeposito:  {
    __typename: "ReponseDeleteCuentaDeposito",
    deleted: boolean | null,
    response: string | null,
  } | null,
};

export type DeleteMedioPagoMutationVariables = {
  id_medio_pago: number,
  rut_usuario: string,
};

export type DeleteMedioPagoMutation = {
  deleteMedioPago:  {
    __typename: "ReponseDeleteMedioPago",
    deleted: boolean | null,
    response: string | null,
  } | null,
};

export type DeletePolizaMutationVariables = {
  numero_poliza: string,
};

export type DeletePolizaMutation = {
  deletePoliza:  {
    __typename: "DetallePoliza",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    codigo_cobertura: string | null,
    codigo_producto: string | null,
    coordenada_final_lat: string | null,
    coordenada_final_lon: string | null,
    coordenada_incial_lat: string | null,
    coordenada_incial_lon: string | null,
    direccion_final: string | null,
    direccion_inicial: string | null,
    fecha_cotizacion: string | null,
    fecha_fin: string | null,
    fecha_inicio: string | null,
    iva: string | null,
    nombre_comercial: string | null,
    nombre_cotizacion: string | null,
    numero_cotizacion: string | null,
    numero_poliza: string | null,
    periodo: string | null,
    plan: string | null,
    precio_cotizacion: string | null,
    precio_neto: string | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
    valor_minimo: string | null,
  } | null,
};

export type DeletePoliza2MutationVariables = {
  input: DeletePoliza,
};

export type DeletePoliza2Mutation = {
  deletePoliza2:  {
    __typename: "Poliza",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    cod_prod: string | null,
    codigo_cotizacion: string | null,
    direccion_poliza: string | null,
    email: string | null,
    iva: string | null,
    medioPago: string | null,
    numero_cotizacion: string | null,
    numero_poliza: string | null,
    plan: string | null,
    poliza_pdf: string | null,
    prima_bruta: number | null,
    prima_neta: number | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
  } | null,
};

export type DesestimarSiniestroMutationVariables = {
  numero_siniestro: number,
};

export type DesestimarSiniestroMutation = {
  desestimarSiniestro:  {
    __typename: "DesestimarSiniestroResponse",
    codigo_estado: string | null,
  } | null,
};

export type FinishUploadCotizacionMutationVariables = {
  numero_cotizacion: string,
};

export type FinishUploadCotizacionMutation = {
  finishUploadCotizacion:  {
    __typename: "FinishCotizacionResponse",
    completada: boolean | null,
    completado: boolean | null,
  } | null,
};

export type FinishUploadSiniestroMutationVariables = {
  numero_siniestro: string,
};

export type FinishUploadSiniestroMutation = {
  finishUploadSiniestro:  {
    __typename: "FinishCotizacionResponse",
    completada: boolean | null,
    completado: boolean | null,
  } | null,
};

export type RegisterCoberturaMutationVariables = {
  input: RegisterCoberturaInput,
};

export type RegisterCoberturaMutation = {
  registerCobertura:  {
    __typename: "coberturaProducto",
    afecta_iva: string | null,
    capital_max: number | null,
    capital_min: number | null,
    cobertura_pdf: string | null,
    codigo_cobertura: string | null,
    codigo_producto: string | null,
    fecha_inicio: string | null,
    fecha_termino: string | null,
    nombre_cobertura: string | null,
    pol_cad_cobertura: string | null,
    ramo_eerr: string | null,
    ramo_fecu: string | null,
    tabla_tarificacion: string | null,
    tasa_por_mil: string | null,
    tipo_riesgo: string | null,
    tipo_tarificacion: string | null,
    tramo_por_cargas: string | null,
  } | null,
};

export type RegisterCotizacionMutationVariables = {
  input: RegisterCotizacionInput,
};

export type RegisterCotizacionMutation = {
  registerCotizacion:  {
    __typename: "Cotizacion",
    numero_cotizacion: string | null,
  } | null,
};

export type RegisterMultimediaMutationVariables = {
  input: RegisterMultimediaInput,
};

export type RegisterMultimediaMutation = {
  registerMultimedia:  {
    __typename: "Multimedia",
    foto: string | null,
    nombre: string | null,
  } | null,
};

export type RegisterPolizaMutationVariables = {
  input: RegisterPolizaInput,
};

export type RegisterPolizaMutation = {
  registerPoliza:  {
    __typename: "Poliza",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    cod_prod: string | null,
    codigo_cotizacion: string | null,
    direccion_poliza: string | null,
    email: string | null,
    iva: string | null,
    medioPago: string | null,
    numero_cotizacion: string | null,
    numero_poliza: string | null,
    plan: string | null,
    poliza_pdf: string | null,
    prima_bruta: number | null,
    prima_neta: number | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
  } | null,
};

export type RegisterUserMutationVariables = {
  input: RegisterUserInput,
};

export type RegisterUserMutation = {
  registerUser:  {
    __typename: "User",
    apellido: string | null,
    celular: string | null,
    clave: string | null,
    email: string | null,
    mailrecuperacion: string | null,
    nombre: string | null,
    rut: string | null,
  } | null,
};

export type StartPolizaMutationVariables = {
  numero_poliza: string,
};

export type StartPolizaMutation = {
  startPoliza:  {
    __typename: "DetallePoliza",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    codigo_cobertura: string | null,
    codigo_producto: string | null,
    coordenada_final_lat: string | null,
    coordenada_final_lon: string | null,
    coordenada_incial_lat: string | null,
    coordenada_incial_lon: string | null,
    direccion_final: string | null,
    direccion_inicial: string | null,
    fecha_cotizacion: string | null,
    fecha_fin: string | null,
    fecha_inicio: string | null,
    iva: string | null,
    nombre_comercial: string | null,
    nombre_cotizacion: string | null,
    numero_cotizacion: string | null,
    numero_poliza: string | null,
    periodo: string | null,
    plan: string | null,
    precio_cotizacion: string | null,
    precio_neto: string | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
    valor_minimo: string | null,
  } | null,
};

export type RegisterSubPlanMutationVariables = {
  input: InputRegisterSubPlan,
};

export type RegisterSubPlanMutation = {
  registerSubPlan:  {
    __typename: "SubPlan",
    id: string | null,
    id_plan: string | null,
    data_sub_plan: string | null,
  } | null,
};

export type RegisterPlanMutationVariables = {
  input: InputRegisterPlan,
};

export type RegisterPlanMutation = {
  registerPlan:  {
    __typename: "Plan",
    id: string | null,
    data_plan: string | null,
  } | null,
};

export type RegisterCoberturasMutationVariables = {
  input: InputRegisterCobertura,
};

export type RegisterCoberturasMutation = {
  registerCoberturas:  {
    __typename: "Cobertura",
    id: string | null,
    id_sub_plan: string | null,
    data_cobertura: string | null,
  } | null,
};

export type RegisterSiniestroMutationVariables = {
  input: InputRegisterSiniestro,
};

export type RegisterSiniestroMutation = {
  registerSiniestro:  {
    __typename: "Siniestro",
    nombre: string | null,
  } | null,
};

export type RegisterActividadMutationVariables = {
  input: InputRegisterActividad,
};

export type RegisterActividadMutation = {
  registerActividad:  {
    __typename: "Actividad",
    id: string | null,
    data_actividad: string | null,
  } | null,
};

export type RegisterProductoMutationVariables = {
  input: InputRegisterProducto,
};

export type RegisterProductoMutation = {
  registerProducto:  {
    __typename: "Producto",
    id: string | null,
    data_producto: string | null,
  } | null,
};

export type RegistrarNuevaPolizaMutationVariables = {
  input?: registrarNuevaPolizaInput | null,
};

export type RegistrarNuevaPolizaMutation = {
  registrarNuevaPoliza:  {
    __typename: "NuevaPoliza",
    id: string | null,
    data_poliza: string | null,
  } | null,
};

export type RegistrarNuevaCotizacionMutationVariables = {
  input?: registrarNuevaCotizacionInput | null,
};

export type RegistrarNuevaCotizacionMutation = {
  registrarNuevaCotizacion:  {
    __typename: "NuevaCotizacion",
    id: string | null,
    data_cotizacion: string | null,
    numero_cotizacion: string | null,
  } | null,
};

export type RegistrarNuevoSiniestroMutationVariables = {
  input?: registrarNuevoSiniestroInput | null,
};

export type RegistrarNuevoSiniestroMutation = {
  registrarNuevoSiniestro:  {
    __typename: "NuevoSiniestro",
    id: string | null,
    data_siniestro: string | null,
  } | null,
};

export type DetalleCobroPolizaQueryVariables = {
  id_cobro?: number | null,
};

export type DetalleCobroPolizaQuery = {
  detalleCobroPoliza:  {
    __typename: "DetalleCobroPoliza",
    fecha_fin: string | null,
    fecha_inicio: string | null,
    monto: string | null,
    nombre_cotizacion: string | null,
    numero_poliza: string | null,
    plan: string | null,
    tipo_actividad: string | null,
    valor_uf: string | null,
  } | null,
};

export type DetallePolizaxxxQueryVariables = {
  numero_poliza: string,
};

export type DetallePolizaxxxQuery = {
  detallePolizaxxx:  Array< {
    __typename: "DetallePoliza",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    codigo_cobertura: string | null,
    codigo_producto: string | null,
    coordenada_final_lat: string | null,
    coordenada_final_lon: string | null,
    coordenada_incial_lat: string | null,
    coordenada_incial_lon: string | null,
    direccion_final: string | null,
    direccion_inicial: string | null,
    fecha_cotizacion: string | null,
    fecha_fin: string | null,
    fecha_inicio: string | null,
    iva: string | null,
    nombre_comercial: string | null,
    nombre_cotizacion: string | null,
    numero_cotizacion: string | null,
    numero_poliza: string | null,
    periodo: string | null,
    plan: string | null,
    precio_cotizacion: string | null,
    precio_neto: string | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
    valor_minimo: string | null,
  } | null > | null,
};

export type DetallePolizaFullQueryVariables = {
  numero_poliza: number,
};

export type DetallePolizaFullQuery = {
  detallePolizaFull:  {
    __typename: "DetallePolizaFull",
    poliza: string | null,
    response: string | null,
  } | null,
};

export type GetAccountTypesQuery = {
  getAccountTypes:  Array< {
    __typename: "ResponseAccountTypes",
    codigo: string | null,
    nombre: string | null,
  } | null > | null,
};

export type GetBanksQuery = {
  getBanks:  Array< {
    __typename: "Bank",
    id: string | null,
    codigo_banco: string | null,
    nombre_banco: string | null,
  } | null > | null,
};

export type GetCausalesSiniestroQueryVariables = {
  codigo_producto: string,
};

export type GetCausalesSiniestroQuery = {
  getCausalesSiniestro:  Array< {
    __typename: "GetCausalesSiniestroResponse",
    codigo: string | null,
    es_cubierta: boolean | null,
    glosa: string | null,
    mensaje: string | null,
  } | null > | null,
};

export type GetListMediosPagoQueryVariables = {
  rut_usuario?: string | null,
};

export type GetListMediosPagoQuery = {
  getListMediosPago:  Array< {
    __typename: "ListMedioPagoResponse",
    fecha_vencimiento: string | null,
    id_medio_pago: string | null,
    medio_pago: string | null,
    medio_pago_glosa: string | null,
    numero_tarjeta: string | null,
    principal: boolean | null,
    tipo_tarjeta: string | null,
    tipo_tarjeta_glosa: string | null,
  } | null > | null,
};

export type GetListSiniestroByPolizaQueryVariables = {
  numero_poliza: number,
};

export type GetListSiniestroByPolizaQuery = {
  getListSiniestroByPoliza:  Array< {
    __typename: "ResponseListSiniestro",
    fecha_denuncia: string | null,
    glosa: string | null,
    numero_siniestro: number | null,
  } | null > | null,
};

export type GetMedioDepositoQueryVariables = {
  rut_usuario?: string | null,
};

export type GetMedioDepositoQuery = {
  getMedioDeposito:  Array< {
    __typename: "GetMedioDepositoResponse",
    id_medio_deposito: string | null,
    nombre_banco: string | null,
    nombre_tipo_cuenta: string | null,
    numero_cuenta: string | null,
    rut_cuenta: string | null,
  } | null > | null,
};

export type GetPrecioCoberturaQueryVariables = {
  input?: InputPrecioCobertura | null,
};

export type GetPrecioCoberturaQuery = {
  getPrecioCobertura:  {
    __typename: "ResponsePrecioCobertura",
    response: string | null,
    success: boolean | null,
    valor_uf: string | null,
  } | null,
};

export type GetPrecioCoberturaAutoQueryVariables = {
  input?: InputPrecioCoberturaAuto | null,
};

export type GetPrecioCoberturaAutoQuery = {
  getPrecioCoberturaAuto:  {
    __typename: "ResponsePrecioCoberturaAuto",
    response: string | null,
    success: boolean | null,
    valor_total_bruto: string | null,
    valor_total_neto: string | null,
  } | null,
};

export type GetPrecioMinimoCotizacionQueryVariables = {
  codigo_producto: string,
  id_actividad?: number | null,
  id_plan?: number | null,
};

export type GetPrecioMinimoCotizacionQuery = {
  getPrecioMinimoCotizacion:  {
    __typename: "ResponsePrecioMinimo",
    valor_uf: string | null,
  } | null,
};

export type GetPrecioMinimoCotizacionAutoQueryVariables = {
  id_modelo?: number | null,
  id_plan?: number | null,
  year?: number | null,
};

export type GetPrecioMinimoCotizacionAutoQuery = {
  getPrecioMinimoCotizacionAuto:  {
    __typename: "ResponsePrecioMinimoAuto",
    prima_bruta: number | null,
    prima_neta: number | null,
  } | null,
};

export type GetSiniestroDetailQueryVariables = {
  numero_siniestro: number,
};

export type GetSiniestroDetailQuery = {
  getSiniestroDetail:  {
    __typename: "SiniestroDetailResponse",
    response: number | null,
    siniestro: string | null,
  } | null,
};

export type HtmlToPdfQueryVariables = {
  numero_poliza: number,
};

export type HtmlToPdfQuery = {
  htmlToPdf:  {
    __typename: "ResponsePdf",
    base64: string | null,
    numero_poliza: number | null,
    pdf_base64: string | null,
    response: string | null,
    success: boolean | null,
  } | null,
};

export type ListaActividadQueryVariables = {
  codigo_producto: string,
};

export type ListaActividadQuery = {
  listaActividad:  Array< {
    __typename: "actividades",
    codigo_actividad: string | null,
    codigo_producto: string | null,
    id_actividad: string | null,
    logo_actividad: string | null,
    tipo_actividad: string | null,
    tipo_riesgo: string | null,
  } | null > | null,
};

export type ListaCoberturaQueryVariables = {
  id_plan: string,
};

export type ListaCoberturaQuery = {
  listaCobertura:  Array< {
    __typename: "ListarCoberturas",
    capital_max: string | null,
    capital_min: string | null,
    codigo_cobertura: string | null,
    id_cobertura: string | null,
    nombre_cobertura: string | null,
  } | null > | null,
};

export type ListaCobrosPolizaQueryVariables = {
  rut: string,
};

export type ListaCobrosPolizaQuery = {
  listaCobrosPoliza:  Array< {
    __typename: "ListaPagosPoliza",
    fecha_fin: string | null,
    fecha_inicio: string | null,
    id_cobro: number | null,
    monto: number | null,
    nombre_cotizacion: string | null,
    numero_poliza: string | null,
    plan: string | null,
    tipo_actividad: string | null,
    valor_uf: string | null,
  } | null > | null,
};

export type ListaCotizacionQueryVariables = {
  rut: string,
};

export type ListaCotizacionQuery = {
  listaCotizacion:  Array< {
    __typename: "ListarCotizaciones",
    fecha_cotizacion: string | null,
    foto: string | null,
    numero_cotizacion: string | null,
  } | null > | null,
};

export type ListaMarcaAutoQuery = {
  listaMarcaAuto:  Array< {
    __typename: "marcasAuto",
    id: number | null,
    nombre: string | null,
  } | null > | null,
};

export type ListaModeloPorMarcaQueryVariables = {
  id_marca: number,
};

export type ListaModeloPorMarcaQuery = {
  listaModeloPorMarca:  Array< {
    __typename: "ModeloAuto",
    id: number | null,
    nombre: string | null,
  } | null > | null,
};

export type ListaPlanQueryVariables = {
  codigo_producto: string,
};

export type ListaPlanQuery = {
  listaPlan:  Array< {
    __typename: "ListarPlanes",
    brief: string | null,
    caracteristicas: string | null,
    codigo_producto: string | null,
    id_plan: string | null,
    nombre_plan: string | null,
    plan: string | null,
  } | null > | null,
};

export type ListaPolizaQueryVariables = {
  rut: string,
};

export type ListaPolizaQuery = {
  listaPoliza:  Array< {
    __typename: "ListarPolizas",
    Estado_poliza: number | null,
    Fecha_emision: string | null,
    foto: string | null,
    nombre_cotizacion: string | null,
    numero_poliza: string | null,
    numero_siniestros: string | null,
    poliza_pdf: string | null,
  } | null > | null,
};

export type ListaProductosQuery = {
  listaProductos:  Array< {
    __typename: "ListarProductos",
    codigo_producto: string | null,
    descripcion: string | null,
    descripcion_larga: string | null,
    imagen: string | null,
    logo: string | null,
    nombre_comercial: string | null,
    nombre_tecnico: string | null,
    periodo: string | null,
    valor_minimo: number | null,
  } | null > | null,
};

export type ListaTipDiaQuery = {
  listaTipDia:  Array< {
    __typename: "UserTip",
    ContenidoTip: string | null,
    id_tip: string | null,
  } | null > | null,
};

export type ListaYearQuery = {
  listaYear:  Array< {
    __typename: "ModeloYear",
    year: number | null,
  } | null > | null,
};

export type LoginQueryVariables = {
  clave: string,
  email: string,
};

export type LoginQuery = {
  login:  {
    __typename: "UserAuth",
    apellido: string | null,
    email: string | null,
    isUnauthorized: boolean | null,
    nombre: string | null,
    rut: string | null,
    token: string | null,
  } | null,
};

export type Login2QueryVariables = {
  clave: string,
  email: string,
};

export type Login2Query = {
  login2:  {
    __typename: "UserAuth",
    apellido: string | null,
    email: string | null,
    isUnauthorized: boolean | null,
    nombre: string | null,
    rut: string | null,
    token: string | null,
  } | null,
};

export type NuevaQueryQuery = {
  nuevaQuery:  {
    __typename: "ResponseSendMail",
    response: string | null,
    success: boolean | null,
  } | null,
};

export type PausePolizaQueryVariables = {
  numero_poliza: number,
  valor_uf: string,
};

export type PausePolizaQuery = {
  pausePoliza:  {
    __typename: "PauseResponse",
    numero_poliza: string | null,
    response: string | null,
    total: number | null,
  } | null,
};

export type PausePolizaTQueryVariables = {
  numero_poliza: string,
  valor_uf: string,
};

export type PausePolizaTQuery = {
  pausePolizaT:  {
    __typename: "PauseResponseT",
    numero_poliza: string | null,
    response: string | null,
    total: number | null,
  } | null,
};

export type ProductByUserQueryVariables = {
  rut: string,
};

export type ProductByUserQuery = {
  productByUser:  {
    __typename: "Productos",
    anexo_cp: string | null,
    carta_cp: string | null,
    codigo_producto: string | null,
    fecha_inicio: string | null,
    fecha_termino: string | null,
    imagen: string | null,
    logo: string | null,
    nombre_comercial: string | null,
    nombre_tecnico: string | null,
    producto_cp: string | null,
  } | null,
};

export type ResumenCotizacionQueryVariables = {
  numero_cotizacion: string,
};

export type ResumenCotizacionQuery = {
  resumenCotizacion:  Array< {
    __typename: "ResumenCotizacion",
    codigo_cobertura: string | null,
    codigo_producto: string | null,
    coordenada_final_lat: string | null,
    coordenada_final_lon: string | null,
    coordenada_incial_lat: string | null,
    coordenada_incial_lon: string | null,
    direccion_final: string | null,
    direccion_inicial: string | null,
    fecha_cotizacion: string | null,
    fecha_fin: string | null,
    fecha_inicio: string | null,
    id_marca_auto: number | null,
    id_modelo_auto: number | null,
    iva: string | null,
    marca_auto: string | null,
    modelo_auto: string | null,
    nombre_comercial: string | null,
    nombre_cotizacion: string | null,
    numero_cotizacion: string | null,
    periodo: string | null,
    plan: string | null,
    precio_cotizacion: string | null,
    precio_neto: string | null,
    rut: string | null,
    tipo_actividad: string | null,
    usuario_principal: string | null,
    valor_minimo: string | null,
    year_auto: number | null,
  } | null > | null,
};

export type SendPolizaEmailQueryVariables = {
  numero_poliza: number,
};

export type SendPolizaEmailQuery = {
  sendPolizaEmail:  {
    __typename: "ResponseSendMail",
    response: string | null,
    success: boolean | null,
  } | null,
};

export type TestDbConnectionQueryVariables = {
  numero_cotizacion: string,
};

export type TestDbConnectionQuery = {
  testDBConnection:  {
    __typename: "TestResponse",
    response: string | null,
  } | null,
};

export type UpdateSiniestroContactDateQueryVariables = {
  fecha_contacto: string,
  numero_siniestro: number,
};

export type UpdateSiniestroContactDateQuery = {
  updateSiniestroContactDate:  {
    __typename: "ResponseUpdateContactDate",
    fecha_contacto: string | null,
    numero_siniestro: number | null,
  } | null,
};

export type Upload64QueryVariables = {
  base64: string,
  imageName: string,
  rut: string,
};

export type Upload64Query = {
  upload64:  {
    __typename: "S3response",
    url: string | null,
  } | null,
};

export type UploadImage64QueryVariables = {
  input: UploadImage64Input,
};

export type UploadImage64Query = {
  uploadImage64:  {
    __typename: "UploadImage64Response",
    contadorImagenes: string | null,
  } | null,
};

export type UploadMultiple64QueryVariables = {
  files: Array< ImageFilesInput | null >,
  rut: string,
};

export type UploadMultiple64Query = {
  uploadMultiple64:  {
    __typename: "S3response",
    url: string | null,
  } | null,
};

export type UserQueryVariables = {
  id: string,
};

export type UserQuery = {
  user:  {
    __typename: "User",
    apellido: string | null,
    celular: string | null,
    clave: string | null,
    email: string | null,
    mailrecuperacion: string | null,
    nombre: string | null,
    rut: string | null,
  } | null,
};

export type ListasActividadesQuery = {
  listasActividades:  Array< {
    __typename: "Actividad",
    id: string | null,
    data_actividad: string | null,
  } | null > | null,
};

export type ListasPlanesQuery = {
  listasPlanes:  Array< {
    __typename: "Plan",
    id: string | null,
    data_plan: string | null,
  } | null > | null,
};

export type ListasSubPlanesQuery = {
  listasSubPlanes:  Array< {
    __typename: "SubPlan",
    id: string | null,
    id_plan: string | null,
    data_sub_plan: string | null,
  } | null > | null,
};

export type ListasPolizasQuery = {
  listasPolizas:  Array< {
    __typename: "NuevaPoliza",
    id: string | null,
    data_poliza: string | null,
  } | null > | null,
};

export type ListasCotizacionesQuery = {
  listasCotizaciones:  Array< {
    __typename: "NuevaCotizacion",
    id: string | null,
    data_cotizacion: string | null,
    numero_cotizacion: string | null,
  } | null > | null,
};

export type ListasProductosQuery = {
  listasProductos:  Array< {
    __typename: "Producto",
    id: string | null,
    data_producto: string | null,
  } | null > | null,
};

export type ListasSiniestrosQuery = {
  listasSiniestros:  Array< {
    __typename: "NuevoSiniestro",
    id: string | null,
    data_siniestro: string | null,
  } | null > | null,
};

export type ListasCoberturasQuery = {
  listasCoberturas:  Array< {
    __typename: "Cobertura",
    id: string | null,
    id_sub_plan: string | null,
    data_cobertura: string | null,
  } | null > | null,
};

export type ListasUsuarioQuery = {
  listasUsuario:  Array< {
    __typename: "User",
    apellido: string | null,
    celular: string | null,
    clave: string | null,
    email: string | null,
    mailrecuperacion: string | null,
    nombre: string | null,
    rut: string | null,
  } | null > | null,
};

export type DetalleCotizacionQueryVariables = {
  numero_cotizacion: string,
};

export type DetalleCotizacionQuery = {
  detalleCotizacion:  {
    __typename: "NuevaCotizacion",
    id: string | null,
    data_cotizacion: string | null,
    numero_cotizacion: string | null,
  } | null,
};

export type DetallePolizaQueryVariables = {
  numero_poliza: string,
};

export type DetallePolizaQuery = {
  detallePoliza:  {
    __typename: "NuevaPoliza",
    id: string | null,
    data_poliza: string | null,
  } | null,
};

export type DetalleSiniestroQueryVariables = {
  numero_siniestro: string,
};

export type DetalleSiniestroQuery = {
  detalleSiniestro:  {
    __typename: "NuevoSiniestro",
    id: string | null,
    data_siniestro: string | null,
  } | null,
};
