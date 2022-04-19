/*var JKSelectInstances = [];

class cJKSelect {

    constructor(options) {
        this.id = options.id;
        this.valueControl = $('#' + this.id);
        this.searchControl = null;
        this.menuControl = null;
        this.caretControl = null;
        this.cleanControl = null;
        this.onSelectItem = function () { };

        if (typeof options.onrequest != "undefined")
            this.onrequest = options.onrequest;
        else
            this.onrequest = function () { };

        this.menu = null;
        this.ajaxurl = options.url;

        this.transform = function (data) {
            //console.log(data);
            return data;
        }.bind(this);

        if (typeof options.transform !== "undefined")
            this.transform = options.transform;

        if (typeof options.onSelectItem !== "undefined")
            this.onSelectItem = options.onSelectItem;

        this.keytimer = null;
        this.blurtimer = null;

        let s = '<div class="input-group">' +
            '  <input type="text" id="' + this.id + '_JKSEARCH' + '" name="' + this.valueControl.attr('name') + '_JKSEARCH' + '" class="borderform form-control dropdown-toggle" aria-haspopup="true" aria-expanded="false" autocomplete="off" />' +
            '  <ul class="dropdown-menu dropdown-menu-right" id="' + this.id + '_JKMENU' + '" style="left:0px; min-width: 100%;"></ul>' +
            '  <div class="input-group-append">' +
            '    <button type="button" class="btn btn-primary boton1 " id="' + this.id + '_JKBTNCARET' + '"><span class="fa fa-caret-down"></span></button>' +
            '  </div>' +
            '  <div class="input-group-append">' +
            '    <button type="button" class="btn btn-danger boton1 " id="' + this.id + '_JKBTNCLEAN' + '"><span class="fa fa-times"></span></button>' +
            '  </div>' +
            '</div>' +
            '<style>#' + this.id + '_JKMENU li:hover{background-color:#4d4d4d;} #' + this.id + '_JKMENU a{display:block;}  #' + this.id + '_JKMENU a:hover{color:#fff;}</style>';

        let hidden = '<input type="hidden" name="' + this.valueControl.attr('name') + '" id="' + this.id + '" value="' + this.valueControl.val() + '" />';

        this.keyup = function () {
            let s = this.searchControl.val();
            if (s.length > 2) {
                clearTimeout(this.keytimer);
                this.keytimer = setTimeout(this.search, 300);
            } else {
                this.menuControl.hide();
            }
        }.bind(this);

        this.blur = function () {
            this.blurtimer = setTimeout(this.cancel, 300);
        }.bind(this);

        this.focus = function () {
            //timerblurbarrio = setTimeout(this.cancel, 300);
        }.bind(this);

        this.cancel = function () {
            if (this.valueControl.val() == '') {
                this.searchControl.val('');
            }
            this.menuControl.hide();
        }.bind(this);

        this.selectItem = function (value, text) {
            clearTimeout(this.blurtimer);
            this.valueControl.val(value);
            this.searchControl.val(text);
            this.onSelectItem(value, text);
            this.searchControl.attr("readonly", "readonly");
            this.searchControl.attr("disabled", "disabled");
            this.menuControl.hide();
        }.bind(this);

        this.clean = function () {
            this.valueControl.val('0');
            this.searchControl.val('');
            this.searchControl.removeAttr("readonly");
            this.searchControl.removeAttr("disabled");
            this.searchControl.focus();
            //this.search();
            this.cancel();
        }.bind(this);

        this.select = function () {
            id = option.dataitemid;
            text = option.dataitemtext;
            this.selectItem(id, text);
        }.bind(this);

        this.succesSearch = function (response) {
            let data = $.parseJSON(response);
            this.menuControl.find('li').remove();
            for (let idx in data) {
                let item = this.transform(data[idx]);
                let item_a = $("<a style='text-decoration:none;color:#666;' id='" + this.id + "_ITEMID_" + item.id + "' href='#' data-itemid='" + item.id + "' data-itemtext='" + item.text + "' data-iteminstance='" + this.id + "'>" + item.text + "</a>").click(function () {
                    let itemid = $(this).data("itemid");
                    let itemtext = $(this).data("itemtext");
                    let iteminstance = $(this).data("iteminstance");
                    let jkinstance = JKSelectInstances[iteminstance];
                    jkinstance.selectItem(itemid, itemtext);
                });
                let item_li = $("<li style='overflow:hidden;padding-left: 15px;'></li>");
                item_li.append(item_a);
                item = this.menuControl.append(item_li);
            }
            this.menuControl.show();
        }.bind(this);

        this.search = function () {
            clearTimeout(this.blurtimer);
            let q = this.searchControl.val();
            if (this.ajaxurl != "")
                $.ajax({
                    url: this.ajaxurl + q,
                    type: "GET",
                    success: this.succesSearch,
                    error: function (response) {
                        alert("error : " + response);
                    }
                });
        }.bind(this);

        this.valueControl.replaceWith(hidden);
        this.valueControl = $('#' + this.id);
        this.valueControl.before(s);
        this.searchControl = $('#' + this.id + '_JKSEARCH');
        this.menuControl = $('#' + this.id + '_JKMENU');
        this.caretControl = $('#' + this.id + '_JKBTNCARET');
        this.cleanControl = $('#' + this.id + '_JKBTNCLEAN');
        this.searchControl.keyup(this.keyup);
        this.searchControl.blur(this.blur);
        this.searchControl.focus(this.focus);
        this.caretControl.click(this.search);
        this.cleanControl.click(this.clean);

        JKSelectInstances[this.id] = this;
    }



}


function dataSourceJKSelect(codProcesoSistemaControl) {
    return urlBase + '/DatosController/getBusquedaDinamica';
}*/

var JKSelectInstances = [];

class cJKSelect {

    constructor(options) {
        this.id = options.id;
        this.valueControl = $('#' + this.id);
        this.searchControl = null;
        this.menuControl = null;
        this.caretControl = null;
        this.cleanControl = null;

        if (typeof options.onrequest != "undefined")
            this.onrequest = options.onrequest;
        else
            this.onrequest = function () { };

        this.menu = null;
        this.ajaxurl = options.url;

        this.transform = function (data) {
            return data;
        }.bind(this);

        if (typeof options.transform !== "undefined")
            this.transform = options.transform;

        this.keytimer = null;
        this.blurtimer = null;

        this.onSelectItem = function (value, text) { }.bind(this);

        if (typeof options.onSelectItem !== "undefined")
            this.onSelectItem = options.onSelectItem;

        this.filtros = {};
        if (typeof options.filtros !== "undefined")
            this.filtros = options.filtros;

        let s = '<div class="input-group">' +
            '  <input type="text" id="' + this.id + '_JKSEARCH' + '" name="' + this.valueControl.attr('name') + '_JKSEARCH' + '" class="borderform form-control dropdown-toggle" aria-haspopup="true" aria-expanded="false" autocomplete="off" />' +
            '  <ul class="dropdown-menu dropdown-menu-right" id="' + this.id + '_JKMENU' + '" style="left:0px; min-width: 100%; max-height: 250px; overflow: auto;"></ul>' +
            '  <div class="input-group-append">' +
            '    <button type="button" class="btn btn-primary boton1 " id="' + this.id + '_JKBTNCARET' + '"><span class="fa fa-caret-down"></span></button>' +
            '  </div>' +
            '  <div class="input-group-append">' +
            '    <button type="button" class="btn btn-danger boton1 " id="' + this.id + '_JKBTNCLEAN' + '"><span class="fa fa-times"></span></button>' +
            '  </div>' +
            '</div>' +
            '<style>#' + this.id + '_JKMENU li:hover{background-color:#4d4d4d;} #' + this.id + '_JKMENU a{display:block;}  #' + this.id + '_JKMENU a:hover{color:#fff;}</style>';

        let hidden = '<input type="hidden" name="' + this.valueControl.attr('name') + '" id="' + this.id + '" value="' + this.valueControl.val() + '" />';

        this.valueControl.replaceWith(hidden);
        this.valueControl = $('#' + this.id);
        this.valueControl.before(s);
        this.searchControl = $('#' + this.id + '_JKSEARCH');
        this.menuControl = $('#' + this.id + '_JKMENU');
        this.caretControl = $('#' + this.id + '_JKBTNCARET');
        this.cleanControl = $('#' + this.id + '_JKBTNCLEAN');
        this.searchControl.keyup(this.keyup);
        this.searchControl.blur(this.blur);
        this.searchControl.focus(this.focus);
        this.caretControl.click(this.search);
        this.cleanControl.click(this.clean);

        JKSelectInstances[this.id] = this;
    }

    keyup = function () {
        let s = this.searchControl.val();
        if (s.length > 2) {
            clearTimeout(this.keytimer);
            this.keytimer = setTimeout(this.search, 300);
        } else {
            this.menuControl.hide();
        }
    }.bind(this);

    blur = function () {
        this.blurtimer = setTimeout(this.cancel, 300);
    }.bind(this);

    focus = function () {
        //timerblurbarrio = setTimeout(this.cancel, 300);
    }.bind(this);

    cancel = function () {
        if (this.valueControl.val() == '') {
            this.searchControl.val('');
        }
        this.menuControl.hide();
    }.bind(this);

    selectItem = function (value, text) {
        clearTimeout(this.blurtimer);
        this.valueControl.val(value);
        this.searchControl.val(text);
        this.searchControl.attr("readonly", "readonly");
        //this.searchControl.attr("disabled", "disabled");
        this.searchControl.focus();

        this.menuControl.hide();
        this.onSelectItem(value, text);
    }.bind(this);

    clean = function () {
        this.valueControl.val('0');
        this.searchControl.val('');
        this.searchControl.removeAttr("readonly");
        this.searchControl.removeAttr("disabled");
        this.searchControl.focus();
        //this.search();
        this.onSelectItem('', '');
        this.cancel();
    }.bind(this);

    select = function () {
        id = option.dataitemid;
        text = option.dataitemtext;
        this.selectItem(id, text);
    }.bind(this);

    succesSearch = function (response) {
        let data = [];
        if (Array.isArray(response)) {
            data = response;
        } else {
            if (typeof response == 'string') {
                response = $.parseJSON(response);
            }
            if (Array.isArray(response)) {
                data = response;
            } else {
                if (typeof response.resultado !== "undefined") {
                    if (Array.isArray(response.resultado)) {
                        data = response.resultado;
                    } else {
                        let resultado = [];
                        if (typeof response.resultado == "string") {
                            resultado = $.parseJSON(response.resultado);
                        } else {
                            resultado = response.resultado;
                        }
                        let tabla = typeof resultado.Table !== "undefined" ? resultado.Table : (typeof resultado.table !== "undefined" ? resultado.table : []);
                        data = tabla;
                    }
                }
                else
                    return false;

            }

        }


        this.menuControl.find('li').remove();
        for (let idx in data) {
            let item = this.transform(data[idx]);
            let item_a = $("<a style='text-decoration:none;color:#666;' id='" + this.id + "_ITEMID_" + item.id + "' href='javascript:void(0)' data-itemid='" + item.id + "' data-itemtext='" + item.text + "' data-iteminstance='" + this.id + "'>" + item.text + "</a>").click(function () {
                let itemid = $(this).data("itemid");
                let itemtext = $(this).data("itemtext");
                let iteminstance = $(this).data("iteminstance");
                let jkinstance = JKSelectInstances[iteminstance];
                jkinstance.selectItem(itemid, itemtext);
            });
            let item_li = $("<li style='overflow:hidden;padding-left: 15px;'></li>");
            item_li.append(item_a);
            item = this.menuControl.append(item_li);
        }
        this.menuControl.show();
    }.bind(this);

    search = function () {
        clearTimeout(this.blurtimer);
        let q = this.searchControl.val();
        if (this.ajaxurl != "") {
            let url = this.ajaxurl + q;
            if (Object.keys(this.filtros).length > 0) {
                let query = ABMForm.encodeQueryData(this.filtros);
                url = url + '&' + query;
            }
            $.ajax({
                url: url,
                type: "GET",
                success: this.succesSearch,
                error: function (response) {
                    alert("error : " + response);
                }
            });
        }
    }.bind(this);

}

function dataSourceJKSelect(codProcesoSistemaControl) {
    return urlBase + '/DatosController/getBusquedaDinamica';
}