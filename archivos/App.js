//globales
var _titulo_benef = "";
var _editando = false;
var _id_editando;
var _precio_cotiz;
var _cuotas_cotiz;
var _cod_plan_global;
var _anticipo_global;
var _titular;
var _cotitular;
var _monto_cuotas_global;
var _orden_beneficiario = 0;
var _total_beneficiarios = 0;
var _titular_tel_fijo = "";
var _titular_tel_movil = "";
var _titular_email = "";
var _titular_altura = "";
var _titular_observaciones = "";
var _titular_barrio = "";
var _titular_calle = "";
var _titular_codbarrio = "";
var _titular_codcalle = "";
var _titular_codlocalidad = "";
var _titular_codprovincia = "";
var _titular_localidad = "";
var _titular_provincia = "";
var _caracteres_orden = [];

//OBJETO general*********************************************************************************************************
var AppMaster = {
    /*function AJAX para llamado asincrono */
    Ajax: function (httpMethod, url, data, type, successCallBack, async, cache) {
        if (typeof async == "undefined") {
            async = true;
        }
        if (typeof cache == "undefined") {
            cache = false;
        }

        var ajaxObj = $.ajax({
            type: httpMethod.toUpperCase(),
            url: url,
            data: data,
            dataType: type,
            async: async,
            cache: cache,
            success: successCallBack,
            error: function (err, type, httpStatus) {
                AppMaster.AjaxFailureCallback(err, type, httpStatus);
            },
            beforeSend: function () {
                $(".spinner").css("display", "block");
            },
            complete: function () {
                $(".spinner").css("display", "none");
            }
        });

        return ajaxObj;
    },
    AjaxFailureCallback: function (err, type, httpStatus) {
        var failureMessage = 'Error en la llamada asíncrona' + err.status + " - " + err.responseText + " - " + httpStatus;
        console.log(failureMessage);
    },


    /*LLAMADAS AJAX**************************/
    /*obtener detalles del plan*/
    getDetallesPlan: function (codigo_plan) {
        /* url*/
        var url = '../planesmov/GetDetallesPlan';
        /* parametros */
        var parametros = {
            cod_plan: codigo_plan
        };
        /*llamada ajax*/
        AppMaster.Ajax('GET', url, parametros, 'html', getDetallesPlan_SuccessHandler);
    },
    /*obtener listado de planes por cod grupo*/
    getObtenerPlanes: function (id) {
        /* url*/
        var url = '../planesmov/PostPlanesMovxGrupo';
        /* parametros */
        var parametros = {
            cod_grupo: id
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'html', getObtenerPlanes_SuccessHandler);
    },
    /*obtener listado de planes por cod grupo*/
    getObtenerInfoGrupo: function (id) {
        /* url*/
        var url = '../planesmov/PostGrupoPlan';
        /* parametros */
        var parametros = {
            cod_grupo: id
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'html', function (response) {

        });
    },
    /*obtener parentescos*/
    GetParentescos: function () {
        /* url*/
        var url = '../precontrato/GetParentescos';
        /* parametros */
        var parametros = {};
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'html', GetParentescos_SuccessHandler);
    },
    /*obtener caracteres*/
    GetCaracteresTitular: function (_tipo) {
        /* url*/
        var url = '../precontrato/GetCaracteresTitular';
        /* parametros */
        var parametros = {
            tipo: _tipo
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'html', GetCaracteresTitular_SuccessHandler);
    },
    /*obtener tipo documentos*/
    GetTiposDocumentos: function () {
        /* url*/
        var url = '../precontrato/GetTiposDocumentos';
        /* parametros */
        var parametros = {};
        /*llamada ajax*/
        AppMaster.Ajax('GET', url, parametros, 'html', GetTiposDocumentos_SuccessHandler);
    },
    /*guardar el precontrato*/
    SetPrecontrato: function () {
        /* url*/
        var url = '../precontrato/SetPrecontrato';
        /* parametros */
        var parametros = {
            cod_parcela: 0,
            importe_base: 0
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', SetPrecontrato_SuccessHandler);
    },
    /*agregar beneficiario a sesion*/
    AgregarBeneficiarioSesion: function () {
        var tipo_de_caracter = "";
        var _cod_pais = "";
        var _provincia = "";
        var _localidad = "";
        var _direccion = "";

		//tipo_caracter = $("#slCaracter  option:selected").text();
			
        if (_titular == "-1") {
            tipo_de_caracter = _caracteres_orden[0];
        } else {
            tipo_de_caracter = _titular;
        }




        if ($("#txtCodPais").length) {
            _cod_pais = $("#txtCodPais").val();
        }

        if ($("#txtProvincia").length) {
            _provincia = $("#txtProvincia").val();
        }

        if ($("#txtLocalidad").length) {
            _localidad = $("#txtLocalidad").val();
        }

        if ($("#txtDireccionManual").length) {
            _direccion = $("#txtDireccionManual").val();
        }

        if (validarDatos()) {
            var _tipo = 0;
            var _id = 0;
            if (_editando) {
                _tipo = 1;
                _id = _id_editando;
                _orden_beneficiario = _id-1;
            }else
                _orden_beneficiario = _id;
            /* url*/
            var url = '../precontrato/AgregarBeneficiarioSesion';
            /* parametros */
            var parametros = {
                tipo: _tipo,
                id: _id,
                cod_cliente:  $("#COD_CLIENTE").val(),
                orden: _orden_beneficiario,
                apellido: $("#txtApellido").val(),
                nombre: $("#txtNombre").val(),
                tipo_doc: $("#slTipoDoc :selected").text(),
                nro_doc: $("#txtNroDocumento").val(),
                fecha_nac: moment($("#txtFechaNac").val(),'DD/MM/YYYY').format("YYYY-MM-DD"),
                tel_fijo: $("#txtTelFijo").val(),
                tel_movil: $("#txtTelMovil").val(),
                email: $("#txtEmail").val(),
                domicilio: $("#txtDomicilio").val(),
                categoria: $("#slCaracter").val(),
                cat_nombre: $("#slCaracter option:selected").text(),
                edad: $("#txtEdad").val(),
                cod_caracter_titular: $("#slCaracter").val(),
                tipo_caracter: tipo_de_caracter,
                parentesco: $("#slParentescos").val(),
                cod_parentezco: $("#slParentescos").val(),
                parentesco_nombre: $("#slParentescos option:selected").text(),
                cod_domicilio: 1,
                cod_barrio: $("#txtCodBarrio").val(),
                barrio: $("#txtCodBarrio_JKSEARCH").val(),
                cod_calle: $("#txtCodCalle").val(),
                calle: $("#txtCodCalle_JKSEARCH").val(),
                altura: $("#txtAltura").val(),
                cod_pais: _cod_pais,
                cod_provincia: $("#txtCodProvincia").val(),
                provincia: $("#txtCodProvincia_JKSEARCH").val(),
                cod_localidad: $("#txtCodLocalidad").val(),
                localidad: $("#txtCodLocalidad_JKSEARCH").val(),
                direccion: _direccion
            };
            //guardar datos del titular
            _titular_tel_fijo = $("#txtTelFijo").val();
            _titular_tel_movil = $("#txtTelMovil").val();
            _titular_email = $("#txtEmail").val();
            _titular_altura = $("#txtAltura").val();
            _titular_observaciones = $("#txtDomicilio").val();
            _titular_barrio = $("#txtCodBarrio_JKSEARCH").val();
            _titular_codbarrio = $("#txtCodBarrio").val();
            _titular_calle = $("#txtCodCalle_JKSEARCH").val();
            _titular_codcalle = $("#txtCodCalle").val();
            _titular_localidad = $("#txtCodLocalidad_JKSEARCH").val();
            _titular_codlocalidad = $("#txtCodLocalidad").val();			
            /*llamada ajax*/
            AppMaster.Ajax('POST', url, parametros, 'json', AgregarBeneficiarioSesion_SuccessHandler);
        }

    },
    setFirmaSesion: function (_firma) {
        /* url*/
        var url = '../precontrato/setFirmaSesion';
        /* parametros */
        var parametros = {
            firma: _firma
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', setFirmaSesion_SuccessHandler);
    },
    setParcelaSesion: function (_codParcela) {
        /* url*/
        var url = '../precontrato/setParcelaSesion';
        /* parametros */
        var parametros = {
            parcela: _codParcela
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', setParcelaSesion_SuccessHandler);
    },
    setPrecontratoClientes: function () {
        /* url*/
        var url = '../precontrato/setPrecontratoClientes';
        /* parametros */
        var parametros = {};
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', setPrecontratoClientes_SuccessHandler);
    },
    setfirmacontrato: function () {
        /* url*/
        var url = '../precontrato/setfirmacontrato';
        /* parametros */
        var parametros = {};
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', setfirmacontrato_SuccessHandler);
    },
    /*obtener la lista de beneficiarios añadidos*/
    ObtenerListaBeneficiarioSesion: function () {
        /* url*/
        var url = '../precontrato/ObtenerListaBeneficiarioSesion';
        /* parametros */
        var parametros = {};
        /*llamada ajax*/
        AppMaster.Ajax('GET', url, parametros, 'html', ObtenerListaBeneficiarioSesion_SuccessHandler);
    },
    getCotizarPlan: function (_cod_plan, _monto, _cod_plan_venta_modelo) {
        console.log(_cod_plan);
        var cadena_valores = $("#COD_CONDICION_VENTA-" + _cod_plan).val();
        console.log(cadena_valores);
        var valores = cadena_valores.split('#');

        _precio_cotiz = valores[4];
        _cuotas_cotiz = valores[0];
        _cod_plan_global = _cod_plan;
        _anticipo_global = valores[2];
        _monto_cuotas_global = valores[5];

        /* url*/
        var url = '../planesmov/PostCotizacionPlan';
        /* parametros */
        var parametros = {
            cod_plan: _cod_plan,
            cod_cond_venta: valores[1],
            cod_plan_venta_modelo: _cod_plan_venta_modelo,
            cuotas: valores[0],
            reconocimiento: 0,
            descuento: valores[3],
            anticipo: valores[2],
            montoplanventamodelo: _monto,
            monto_cuotas: _monto_cuotas_global,
            precio_plan: _precio_cotiz,
            tipo_interes: valores[6],
            tiempo_interes: valores[7],
            tasa_interes: valores[8]
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', getCotizarPlan_SuccessHandler);
    },
    /*borrar beneficiario de la lista*/
    QuitarBeneficiarioSesion: function (item) {

        BSConfirm('¿Está seguro que desea quitar esta persona?', function () {
            /* url*/
            var url = '../precontrato/QuitarBeneficiarioSesion';
            /* parametros */
            var parametros = {
                id: item
            };
            /*llamada ajax*/
            AppMaster.Ajax('POST', url, parametros, 'json', QuitarBeneficiarioSesion_SuccessHandler);
        });

    },
    /*guardar sesion del nombre del plan*/
    GuardarSesionDatosPlan: function (_cod_plan, _desc) {
        var _nombre = $("#_nombre_plan_" + _cod_plan).val();

        /* url*/
        var url = '../planesmov/GuardarSesionDatosPlan';
        /* parametros */
        var parametros = {
            nombre: _nombre,
            cod_plan: _cod_plan,
            desc: _desc
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', GuardarSesionDatosPlan_SuccessHandler);
    },
    /*cargar los datos que estan en sesion del beneficiario seleccionado*/
    CargarDatosBeneficiarioSesion: function (item) {
        /* url*/
        var url = '../precontrato/CargarDatosBeneficiarioSesion';
        /* parametros */
        var parametros = {
            id: item
        };
        /*llamada ajax*/
        AppMaster.Ajax('POST', url, parametros, 'json', CargarDatosBeneficiarioSesion_SuccessHandler);
    },
    /*FIN LLAMADAS AJAX**************************/
    accionAgregarBeneficiario: function () {
        _titulo_benef = $("#_titulo_accion_benef").html();
        $("#_titulo_accion_benef").html('Nuevo beneficiario');
        $("#_acciones_benef").show();
        $("#modalNuevoBenef").modal('show');


        console.log(_titular);
        if (_titular.toUpperCase() == "BENEFICIARIO" || _titular.toUpperCase() != "TITULAR") {
            $(".opcChk").show();
            $("#btnAgregarBenef").html('Agregar ' + _titular);
            activarTelefonoFijo();
            activarTelMovil();
            activarEmailPersona();
            activarAlturaDomicilio();
            activarDomicilioPersona();
            activarBarrioDomicilio();
            activarCalleDomicilio();
            activarLocalidadDomicilio();
            activarProvinciaDomicilio();
        } else {
            $(".opcChk").hide();
            $("#btnAgregarBenef").html('Agregar ' + _titular);
            $("#_content_tipo_caracter").html('Datos ' + _titular);
        }
        $("#modalNuevoBenef").modal('show');
    },
    accionCancelarBeneficiario: function () {
        $("#_titulo_accion_benef").html(_titulo_benef);
        $("#_acciones_benef").hide();

        $("#btnAgregarBenef").attr("disabled", false);
        $("#formdatosafiliados")[0].reset();
        _editando = 0;
        _id_editando = 0;
    }
} //FIN OBJETO**********************************************************************************************************



/*........*/



/*HANDLERS***************************************************************************/
function getObtenerPlanes_SuccessHandler(response) {
    $("#cotizacionsf").html(response);
}

function getDetallesPlan_SuccessHandler(response) {
    $("#modal-plan").html(response);
    $("#modal-plan").modal('show');
}
function GetParentescos_SuccessHandler(response) {
    $("#_content_parentesco").html(response);
}
function GetCaracteresTitular_SuccessHandler(response) {
    $("#_content_caracteres").html(response);
	if ($("#slCaracter").val() == -1){
		$('#_content_caracteres select option[value="-1"]').html("Co-Titular");
		$('#_content_caracteres select option[value="-1"]').attr("value","2");
	}
}
function GetTiposDocumentos_SuccessHandler(response) {
    $("#_content_tip_doc").html(response);
	$("#slTipoDoc").val("D.N.I.");
}
function AgregarBeneficiarioSesion_SuccessHandler(response) {
    if (response != "Error") {
		location.reload();
        /*AppMaster.Obte(nerListaBeneficiarioSesion();
        //$("#_acciones_benef").hide();
        _editando = false;
        //_total_beneficiarios = response;
        _id_editando = 0;
        $("#_titulo_accion_benef").html('');
        _titular = response;
        if (_titular == "Beneficiario") {
            $("#modalNuevoBenef").modal('hide');
        }

        AppMaster.GetCaracteresTitular(_titular.toUpperCase());
        $("#formdatosafiliados")[0].reset();
        if (_titular == "Beneficiario") {
            $(".opcChk").show();
            $("#modalNuevoBenef").modal('hide');
            $("#btnAgregarBenef").html('Agregar un Beneficiario');
        } else {
            $(".opcChk").hide();
            $("#btnAgregarBenef").html('Agregar ' + _titular );
            $("#_content_tipo_caracter").html('Datos ' + _titular);
        }

        activarTelefonoFijo();
        activarTelMovil();
        activarEmailPersona();
        activarAlturaDomicilio();
        activarDomicilioPersona();
        activarBarrioDomicilio();
        activarCalleDomicilio();
        activarLocalidadDomicilio();
        activarProvinciaDomicilio();*/
    } else {
        alert("Ocurrió un error al guardar");
    }
}
function ObtenerListaBeneficiarioSesion_SuccessHandler(response) {
    $("#_content_lista_benef").html(response);
}
function QuitarBeneficiarioSesion_SuccessHandler(response) {
    if (response != "Error") {
        /*_total_beneficiarios = response;

        _titular = response;
        AppMaster.GetCaracteresTitular(_titular.toUpperCase());
        $("#formdatosafiliados")[0].reset();
        if (_titular == "Beneficiario") {
            $("#btnAgregarBenef").html('Agregar un Beneficiario');
        } else {
            $("#btnAgregarBenef").html('Agregar ' + _titular);
            $("#_content_tipo_caracter").html('Datos ' + _titular);
        }

        AppMaster.ObtenerListaBeneficiarioSesion();*/
		
		location.reload();
    } else {
        alert("Ocurrió un error al guardar");
    }
}
function CargarDatosBeneficiarioSesion_SuccessHandler(response) {
    console.log(response);
    AppMaster.GetCaracteresTitular(response.TIPO_CARACTER.toUpperCase());

    $("#_content_tipo_caracter").html('Datos ' + _titular);
    if (_titular == "Beneficiario") {
        $(".opcChk").show();
        $("#btnAgregarBenef").html('Agregar un Beneficiario');
    } else {
        $(".opcChk").hide();
        $("#btnAgregarBenef").html('Agregar ' + _titular);
    }

    $("#txtApellido").val(response.APELLIDO);
    $("#txtNombre").val(response.NOMBRE);
    $("#slTipoDoc").val(response.TIPO_DOCUMENTO);
    $("#txtNroDocumento").val(response.NRO_DOCUMENTO);
    $("#txtFechaNac").val(moment(response.FECHA_NACIMIENTO,'YYYY-MM-DD').format('DD/MM/YYYY'));
    $("#txtTelFijo").val(response.TEL_FIJO);
    $("#txtTelMovil").val(response.TEL_MOVIL);
    $("#txtEmail").val(response.EMAIL);
    //$("#txtBarrio").val(response.BARRIO);
    $("#txtDomicilio").val(response.DOMICILIO);
    $("#slParentescos").val(response.PARENTESCO);
    $("#slCaracter").val(response.CATEGORIA);
    $("#txtEdad").val(response.EDAD);
    if (typeof JKSelectInstances["txtCodBarrio"] !== "undefined")
        JKSelectInstances["txtCodBarrio"].selectItem(response.COD_BARRIO, response.BARRIO);
    if (typeof JKSelectInstances["txtCodCalle"] !== "undefined")
        JKSelectInstances["txtCodCalle"].selectItem(response.COD_CALLE, response.CALLE);
    if (typeof JKSelectInstances["txtCodProvincia"] !== "undefined")
        JKSelectInstances["txtCodProvincia"].selectItem(response.COD_PROVINCIA, response.PROVINCIA);
    if (typeof JKSelectInstances["txtCodLocalidad"] !== "undefined")
        JKSelectInstances["txtCodLocalidad"].selectItem(response.COD_LOCALIDAD, response.LOCALIDAD);
    $("#txtAltura").val(response.ALTURA);
    $("#txtDomicilio").val(response.DOMICILIO);


    $("#_titulo_accion_benef").html(response.APELLIDO + " " + response.NOMBRE);
    $("#_acciones_benef").show();

    _editando = true;
    _id_editando = response.ID;

    $("#modalNuevoBenef").modal('show');

    $("#btnAgregarBenef").attr("disabled", true);

}
function getCotizarPlan_SuccessHandler(response) {
    $("#precio-" + _cod_plan_global).html("<div class= 'row'><div class='col text-left'><b>Precio:</b></div><div class='col text-right'>" + numeric.parseFloat(_precio_cotiz).toFixed(2) + "</div></div><hr style='margin-top:0; margin-bottom:0' /><div id='_content_anticipo' class= 'row'><div class='col text-left'><b>Anticipo:</b></div><div class='col text-right'>" + numeric.parseFloat(_anticipo_global).toFixed(2) + "</div></div><hr style='margin-top:0; margin-bottom:0' /><div class= 'row'><div class='col text-left'><b>Plazos:</b></div><div class='col text-right'>" + _cuotas_cotiz + "</div></div><hr style='margin-top:0; margin-bottom:0' /><div id='_content_anticipo' class= 'row'><div class='col text-left'><b>Monto Ct.:</b></div><div class='col text-right'>" + numeric.parseFloat(_monto_cuotas_global).toFixed(2) + "</div></div>");
}
function GuardarSesionDatosPlan_SuccessHandler(response) {
    location.href = 'clientes';
}
function SetPrecontrato_SuccessHandler(response) {
    AppMaster.setPrecontratoClientes();
}
function setFirmaSesion_SuccessHandler(response) {
    location.href = urlBase + "/cotizacion/cotizacion";
}
function setParcelaSesion_SuccessHandler(response) {
    location.href = urlBase + "/cotizacion/cotizacion";
}
function setPrecontratoClientes_SuccessHandler(response) {
    AppMaster.setfirmacontrato();
}
function setfirmacontrato_SuccessHandler() {

}
/*fin handlers*******************************************************************/



/*modales********************************************************/
function BSAlert(mensaje, tipo) {
    if (typeof tipo === "undefined") tipo = "info";
    titulo = "";
    icono = '';
    if (tipo === "info") {
        titulo = "Informaci&oacute;n";
        icono = 'fa fa-info-circle fa-3x';
    }
    if (tipo === "error") {
        titulo = "Error";
        icono = 'fa fa-exclamation-circle fa-3x';
    }
    $('#bsmsg-alert .bsmsg-titulo').html(titulo);
    $('#bsmsg-alert .bsmsg-icono').attr('class', 'bsmsg-icono ' + icono);
    $('#bsmsg-alert .bsmsg-mensaje').html(mensaje);
    $('#bsmsg-alert').modal("show");
}

function BSConfirm(mensaje, onconfirm, oncancel) {
    if (typeof oncancel === "undefined") {
        oncancel = function () { };
    }
    titulo = "Confirmaci&oacute;n";
    icono = 'fa fa-question-circle fa-3x';
    $('#bsmsg-confirm .bsmsg-titulo').html(titulo);
    $('#bsmsg-confirm .bsmsg-icono').attr('class', 'bsmsg-icono ' + icono);
    $('#bsmsg-confirm .bsmsg-mensaje').html(mensaje);
    callbackConfirm = onconfirm;
    callbackCancel = oncancel;
    BSConfirmResponseVar = -1;
    $("#bsmsg-confirm").unbind();
    $('#bsmsg-confirm').on('hidden.bs.modal', function (e) {
        if (BSConfirmResponseVar === 1)
            callbackConfirm();
        else
            callbackCancel();
    });
    $('#bsmsg-confirm').modal();
}

function BSConfirmResponse(response) {
    BSConfirmResponseVar = response;
    $('#bsmsg-confirm').modal('hide');
}

function BSNotify(mensaje, tipo) {

    if (typeof tipo === "undefined") tipo = "info";
    titulo = "";
    icono = '';
    if (tipo === "info") {
        titulo = "Informaci&oacute;n";
        icono = 'fa fa-info-circle';
    }
    if (tipo === "error") {
        titulo = "Error";
        icono = 'fa fa-exclamation-circle fa-3x';
    }
    if (tipo === "wait") {
        titulo = "Procesando..";
        icono = 'fa fa-spin fa-spinner';
    }
    $('#bs-toast-icon').attr("class", icono);
    $('#bs-toast .bsnotify-titulo').html(titulo);
    $('#bs-toast .bsnotify-msg').html(mensaje);
    $('#bs-toast').toast("show");
}
/*fin modales****************************************************/