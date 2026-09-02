function slimScroll() {
    //$('.details').slimScroll({
    //    height: '450px',
    //});

    //$('.details-big').slimScroll({
    //    height: '650px',
    //});
}
//calender JS
function onCalendarClose() {
    $('.bootstrap-datetimepicker-widget').remove();
    setTimeout(function () {
        $('.form-control').blur();
    }, 100);
    //alert($('.date > .form-control').val());
}
// Find the right method, call on correct element
function launchFullscreen(element) {
    $(".full-on").hide();
    $(".full-off").css("display", "block");
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
function exitFullscreen() {
    $(".full-on").css("display", "block");
    $(".full-off").hide();
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
function dumpFullscreen() {
    console.log("document.fullscreenElement is: ", document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    console.log("document.fullscreenEnabled is: ", document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
}
// Events
document.addEventListener("fullscreenchange", function (e) {
    console.log("fullscreenchange event! ", e);
});
document.addEventListener("mozfullscreenchange", function (e) {
    console.log("mozfullscreenchange event! ", e);
});
document.addEventListener("webkitfullscreenchange", function (e) {
    console.log("webkitfullscreenchange event! ", e);
});
document.addEventListener("msfullscreenchange", function (e) {
    console.log("msfullscreenchange event! ", e);
});
// Add different events for fullscreen
/*---------------------------------------*/
// select2
if ($.isFunction($.fn.select2)) {
    $("#s2example-1").select2({
        placeholder: 'Select your country...',
        allowClear: true
    }).on('select2-open', function () {
        // Adding Custom Scrollbar
        $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
    });
    $(".s2example-2").select2({
        placeholder: 'Choose your favorite US Countries',
        allowClear: true
    }).on('select2-open', function () {
        // Adding Custom Scrollbar
        $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
    });
    $("#s2example-4").select2({
        minimumInputLength: 1,
        placeholder: 'Search',
        ajax: {
            url: "data/select2-remote-data.php",
            dataType: 'json',
            quietMillis: 100,
            data: function (term, page) {
                return {
                    limit: -1,
                    q: term
                };
            },
            results: function (data, page) {
                return {
                    results: data
                }
            }
        },
        formatResult: function (student) {
            return "<div class='select2-user-result'>" + student.name + "</div>";
        },
        formatSelection: function (student) {
            return student.name;
        }
    });
}
/*------------------------------------*/
$.fn.extend({
    treed: function (o) {
        var openedClass = 'fa-minus';
        var closedClass = 'fa-plus';
        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator fa " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().toggle();
                }
            })
            branch.children().children().toggle();
        });
        //fire event from the dynamically added icon
        tree.find('.branch .indicator').each(function () {
            $(this).on('click', function () {
                $(this).closest('li').click();
            });
        });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find('.branch>a').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});
//Initialization of treeviews
function LoadTree(selector) {
    $(selector).treed({ openedClass: 'fa-minus', closedClass: 'fa-plus' });
}
function checkAllChecked() {
    var countno = 1;
    $('.chb-assign').each(function () {
        if (!$(this).is(':checked')) {
            countno = 0;
            return false;
        }
    });
    if (countno == 1) {
        $('.headercheck').prop('checked', true);
    }
    else {
        $('.headercheck').prop('checked', false);
    }
}
function AjaxFormPost(formId, url, gridId, event, buttonId, callBack, scrollTop) {
    var result = 0;
    alert('heyyaa');
    if (event.handled !== true) {
        if (IsNullOrEmpty(buttonId)) {
            buttonId = "btnCommonModalSubmit";
            alert(formId);
            alert($("#" + formId).valid());

        }
        if ($("#" + formId).valid()) {
            var data = $("#" + formId).serialize();
            //$('#' + buttonId).button('loading');
            $.post(url, data, function (result) {
                console.log(result);
                if (result["Type"] == "Success") {
                    if (!IsNullOrEmpty(gridId))
                        $('#' + gridId + ' .ds4u-reload-ico').click();
                    Successtoaster(result["Message"], "Success");
                    $("#admin-common-modal").modal('hide');
                    $("#admin-common-modal-lg").modal('hide');
                    $('.modal-body').text('Please Wait....');
                    if (scrollTop != false)
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    if (!IsNullOrEmpty(callBack)) {
                        callBack(result);
                    }
                }
                else {
                    Errortoaster(result["Message"], "Error");
                }
                //$('#' + buttonId).button('reset');
            });
        }
        event.handled = true;
        $('#' + buttonId).unbind();
        return result;
    }
}
function showAlertMessage(message) {
    $('#modal-alert-box-message').html(message);
    $('#modal-alert-box').modal('show');
}
function showConfirmBox(message, buttons, callBack) {
    $('#modal-confirm-box-message').html(message);
    if (buttons == "YesNo") {
        $('#modal-confirm-box-button-1').text('Yes');
        $('#modal-confirm-box-button-2').text('No');
    }
    else if (buttons == "OkCancel") {
        $('#modal-confirm-box-button-1').text('Ok');
        $('#modal-confirm-box-button-2').text('Cancel');
    }
    $('#modal-confirm-box').modal('show');
    $('#modal-confirm-box-button-1').click(function (e) {
        if (!e.handled) {
            closeConfirmModal();
            callBack(true);
            e.handled = true;
        }
        $('#modal-confirm-box-button-1').unbind();
        $('#modal-confirm-box-button-2').unbind();
    });
    $('#modal-confirm-box-button-2').click(function (e) {
        if (!e.handled) {
            closeConfirmModal();
            callBack(false);
            e.handled = true;
        }
        $('#modal-confirm-box-button-1').unbind();
        $('#modal-confirm-box-button-2').unbind();
    });
}
function closeConfirmModal() {
    $('#modal-confirm-box').modal('hide');
}
$(function () {
    //$('.jqdate').datepicker();
    $(document).on("click", ".btnROSPlus", function () {
        var $rostxt = $(this).parents('span').siblings('input[type="text"]');
        $rostxt.css("border", "2px solid #d9534f");
        $rostxt.removeClass('rosminus');
        $rostxt.addClass('rosplus');
        $(this).removeClass("btn-default");
        $(this).addClass("btn-danger");
        $(this).parents('span').siblings('span').find('.btnROSMinus').removeClass("btn-danger");
        $(this).parents('span').siblings('span').find('.btnROSMinus').addClass("btn-default");

    });
    $(document).on("click", ".btnROSMinus", function () {
        var $rostxt = $(this).parents('span').siblings('input[type="text"]');
        $rostxt.css("border", "2px solid #00bf4f");
        $rostxt.removeClass('rosplus');
        $rostxt.addClass('rosminus');
        $(this).removeClass("btn-default");
        $(this).addClass("btn-success");
        $(this).parents('span').siblings('span').find('.btnROSPlus').removeClass("btn-success");
        $(this).parents('span').siblings('span').find('.btnROSPlus').addClass("btn-default");
    });
    $(document).on('click', '.headercheck', function (event) {
        if (event.handled !== true) {
            var type = $(this).prop('checked');
            $('[class*=chb-assign]').each(function () {
                $(this).prop('checked', type);
            })
            event.handled = true;
        }
    });
    $(document).on('click', '.chb-assign', function (event) {
        checkAllChecked();
    })
    $('button[type=submit]').click(function () {
        var ret = true;
        $(this).parents('form').find('.jqdate').each(function () {
            var txtVal = $(this).val();
            var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
            if (txtVal != '' && txtVal != undefined) {
                var result = ValidateDate(txtVal);
                if (!result) {
                    $('#modal-body-msg').text('Invalid date format.');
                    $('#model-head-title').text('Error Message');
                    $('#modalbtnclose').addClass('btn-danger');
                    $('#myModal').modal('show');
                    $(this).val('');
                    ret = result;
                    return false;
                }
            }
        })
        return ret;
    });
    $(document).on('keypress', 'input[type=number]', function (e) {
        //$('input[type=number]').keypress(function () {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $(document).on('click', 'button[data-dismiss]', function () {
        if (!$(this).hasClass('unique-modal')) {
            $('.modal-body').each(function () {
                console.log($(this).hasClass("unique-body"));
                if(!$(this).hasClass("unique-body"))
                    $(this).text('Please Wait....');
            })
        }
    });
    $(document).on('click', '#btnCommonModalClose', function () {
        $('.fade').removeClass('in modal-backdrop');
    })
    $(document).on('keypress', '.number', function (event) {
        if (event.ctrlKey) {
            return true;
        }
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 0) {
            event.preventDefault();
        }
    });
    $(document).on('paste', '.number', function (e) {
        var pastedData = e.originalEvent.clipboardData.getData('text');
        var intRegex = /^\d+$/;
        if (intRegex.test(pastedData)) {
            return true;
        }
        else {
            alert('Only digits are allowed !');
            return false;
        }
    });
    $(document).on('keypress', '.character', function (event) {
        var mask = new RegExp('^[a-zA-Z]+$')
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
    $(document).on('paste', '.character', function (e) {
        var pastedData = e.originalEvent.clipboardData.getData('text');
        var intRegex = /^[a-zA-Z]+$/;
        if (intRegex.test(pastedData)) {
            return true;
        }
        else {
            alert('Only alphabets are allowed !');
            return false;
        }
    });
    $(document).on('keypress', '.characterWithSpace', function (event) {
        var mask = new RegExp('^[a-zA-Z ]+$')
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
    $(document).on('paste', '.characterWithSpace', function (e) {
        var pastedData = e.originalEvent.clipboardData.getData('text');
        var intRegex = /^[a-zA-Z\s]+$/;
        if (intRegex.test(pastedData)) {
            return true;
        }
        else {
            alert('Only alphabets are allowed !');
            return false;
        }
    });
    $(document).on('keypress', '.decimal', function (event) {
        //$(document).find('.decimal').on("keypress", (function (event) {
        var alloweddigit = 2;
        var allowed = $(this).attr('data-allowed-digit');
        if (!IsNullOrEmpty(allowed))
            alloweddigit = allowed;
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) &&
      ((event.which < 48 || event.which > 57) &&
        (event.which != 0 && event.which != 8))) {
            event.preventDefault();
        }
        var text = $(this).val();
        if ((text.indexOf('.') != -1) &&
      (text.substring(text.indexOf('.')).length > alloweddigit) &&
      (event.which != 0 && event.which != 8)) {
            event.preventDefault();
        }
    });
    $(document).on("keypress", ".alphanumeric", function (event) {
        var mask = new RegExp('^[A-Za-z0-9]*$')
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
    $(document).on("paste", ".alphanumeric", function (e) {
        var pastedData = e.originalEvent.clipboardData.getData('text');
        var intRegex = new RegExp('^[A-Za-z0-9]*$');
        if (intRegex.test(pastedData)) {
            return true;
        }
        else {
            alert('Only alphanumric characters are allowed !');
            return false;
        }
    });
    $(document).on("keypress", '.alphanumericWithSpace', function (event) {
        var mask = new RegExp("([a-zA-Z0-9.&' -]+)")
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
});
function ValidateDate(dtValue) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(dtValue);
}
function RebindValidation() {
    $('form').each(function (i, f) {
        $form = $(f);
        $form.removeData('validator');
        $form.removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse($form);
    });
}
function IsNullOrEmpty(item) {
    if (item == null || item == '' || typeof item == "undefined") {
        return true;
    }
    return false;
}
function RebindMaskingAndCalendar() {
    $("input[class*='ssn']").mask("999-99-9999");
    $("input[class*='zip']").mask("99999?-9999");
    $("input[class*='npi']").mask("9999-99-9999");
    $("input[class*='phone']").mask("(999) 999-9999");
    $('input[class*="fax"]').mask('(999) 999-9999');

    $('input[class*="fadraltaxId"]').mask('99-9999999');
    $('.datetimepicker4').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $("#datetimepicker5").off("dp.change").on("dp.change", function (e) {
        $('#datetimepicker6').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker6").off("dp.change").on("dp.change", function (e) {
        $('#datetimepicker5').data("DateTimePicker").maxDate(e.date);
    });

    $(".datetimepicker5").off("dp.change").on("dp.change", function (e) {
        $('.datetimepicker6').data("DateTimePicker").minDate(e.date);
    });
    $(".datetimepicker6").off("dp.change").on("dp.change", function (e) {
        $('.datetimepicker5').data("DateTimePicker").maxDate(e.date);
    });
    //$("#datetimepicker7").off("dp.change").on("dp.change", function (e) {
    //    $('#datetimepicker7').data("DateTimePicker").maxDate(e.date);
    //});
    //$("#datetimepicker8").off("dp.change").on("dp.change", function (e) {
    //    $('#datetimepicker8').data("DateTimePicker").minDate(e.date);
    //});

    $('#datetimepicker7').datetimepicker({
        format: 'MM/DD/YYYY'
    });

    $('#datetimepicker8').datetimepicker({
        format: 'MM/DD/YYYY'
    });
    $('#datetimepicker9').datetimepicker({
        format: 'MM/DD/YYYY'
    });
    // its for work schedule
    $(".startingDate").off("dp.change").on("dp.change", function (e) {
        $('#datetimepicker9').data("DateTimePicker").minDate(e.date);
        $('#datetimepicker6').data("DateTimePicker").minDate(e.date);
    });
}

function ReBindChosen(selectorClass) {
    $("." + selectorClass).select2({
        placeholder: 'Choose ',
        allowClear: true
    }).on('select2-open', function () {

    });
}
function GenerageRandomUserId(fieldId) {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
    var string_length = 12;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    $('#' + fieldId).val(randomstring);
    return randomstring;
}
function BindGenderInGrid(dataRow) {
    return dataRow.Gender == 1 ? "Male" : dataRow.Gender == 2 ? "Female" : "Other";
}
function CalculateDatesDurationInMinutes(start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    var diffMs = (endDate - startDate); // milliseconds between now & Christmas
    //var diffDays = Math.floor(diffMs / 86400000); // days
    //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //alert(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas 2009 =)");
    var minutes = Math.floor((diffMs / 1000) / 60);
    return minutes;
}
function CalculateAge(dob) {
    dob = new Date(dob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
}


Array.prototype.where = function (obj) {
    return this.filter(function (item) {
        for (var prop in obj)
            if (!(prop in item) || obj[prop] !== item[prop])
                return false;
        return true;
    });
};



