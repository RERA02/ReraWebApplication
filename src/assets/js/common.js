$(function () {
    $.validator.addMethod('date',
    function (value, element) {
        if (this.optional(element)) {
            return true;
        }
        var ok = true;
        try {
            $.datepicker.parseDate('dd/mm/yy', value);
        }
        catch (err) {
            ok = false;
        }
        return ok;
    });
    $(".datefield").datepicker({ dateFormat: 'dd/mm/yy', changeYear: true });
});

function showPDFPopUp(src, title) {
    // if (IsNullOrEmpty(title))
    title = "View Document";

    $('#pdfViewerTitle').text(title);
    var projectId = $(this).attr('data-p-id');
    $('#pdfViewerBody').html('<img src="/Content/images/loading.gif" />');
    var iframe = $("<iframe>", { id: "pdfViewerDocPath", style: "width: 100%;height: 500px" })
    iframe.attr('src', src);
    $('#pdfViewerBody').html(iframe);
    $("#modalPdfViewer").modal({
        backdrop: 'static',
        keyboard: false
    })
}
function fillAddressDDL(parentid, typeid, element) {
    var elemntId = '#' + element;
    if (IsNullOrEmpty(parentid))
        parentid = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Home/GetComponents?parentId=' + parentid + '&typeId=' + typeid,
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}

function fillAddressDDLNew(parentid, typeid, element) {
    var elemntId = '#' + element;
    if (IsNullOrEmpty(parentid))
        parentid = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Home/GetComponentsNew?parentId=' + parentid + '&typeId=' + typeid,
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}

//07-03-2019 fill message template------------------
function fillMessageTemplateDDL(element) {
    var elemntId = '#' + element;
    //if (IsNullOrEmpty(parentid))
    //    parentid = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Admin/Admin/GetTemplates',
        //?parentId=' + parentid + '&typeId=' + typeid,
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}

//16-10-2018 fill project users  GetAllProjectTypeUsers
function fillProjectUser(element) {
    var elemntId = '#' + element;
    //if (IsNullOrEmpty(parentid))
    //    parentid = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Admin/Admin/GetProjectUser',
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}
function fillProjectUserBYRole(element) {
    var elemntId = '#' + element;
    //if (IsNullOrEmpty(parentid))
    //    parentid = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Admin/Admin/GetProjectUserByRole',
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}
function fillProjectName(element, UserId) {
    var elemntId = '#' + element;
    if (IsNullOrEmpty(UserId))
        UserId = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Admin/Admin/GetProjectsFromUserID?UserId=' + UserId,
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}
//fillProjectName(elemntValue, 'ProjectID');


function ValidateFileExtension($this) {
    debugger;
    $this = $($this);
    var allowedFiles = $this.attr('data-allowed-ext');
    var uploaderId = $this.attr('id');
    var errorlbl = $this.attr('data-error-label');
    var imgContanor = $this.attr('data-img-contanor');
    var maxSize = $this.attr('data-max-size');
    if (IsNullOrEmpty(allowedFiles))
        allowedFiles = ".pdf";

    allowedFiles = allowedFiles.split(',');
    var fileUpload = document.getElementById(uploaderId);
    var lblError = document.getElementById(errorlbl);
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (!regex.test(fileUpload.value.toLowerCase())) {
        lblError.innerHTML = "Select a vaild file type " + allowedFiles + ".";
        fileUpload.value = '';
        return false;
    }
    var filename = fileUpload.value.replace(/C:\\fakepath\\/i, '')
    if (filename.length > 50) {
        lblError.innerHTML = "Selected filename has more than 50 characters . Please change file name.";
        fileUpload.value = '';
        return false;
    }
    var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);
    if (parseInt(size) > maxSize) {
        if (maxSize >= 1024)
            lblError.innerHTML = "Select a file with max size of " + (maxSize / 1024).toFixed(2) + " MB";
        else
            lblError.innerHTML = "Select a file with max size of " + maxSize + " KB";
        fileUpload.value = '';
        return false;
    }
    lblError.innerHTML = "";
    if (!IsNullOrEmpty(imgContanor))
        ShowImage(fileUpload, imgContanor);
    return true;
}

function ValidateFileExtensionNEW($this) {
    $this = $($this);
    var allowedFiles = $this.attr('data-allowed-ext');
    var uploaderId = $this.attr('id');
    var errorlbl = $this.attr('data-error-label');
    var imgContanor = $this.attr('data-img-contanor');
    var maxSize = $this.attr('data-max-size');
    //if (IsNullOrEmpty(allowedFiles))
        allowedFiles = ".kmz,kml";

    allowedFiles = allowedFiles.split(',');
    var fileUpload = document.getElementById(uploaderId);
    var lblError = document.getElementById(errorlbl);
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (!regex.test(fileUpload.value.toLowerCase())) {
        lblError.innerHTML = "Select a vaild file type " + allowedFiles + ".";
        fileUpload.value = '';
        return false;
    }
    var filename = fileUpload.value.replace(/C:\\fakepath\\/i, '')
    if (filename.length > 50) {
        lblError.innerHTML = "Selected filename has more than 50 characters . Please change file name.";
        fileUpload.value = '';
        return false;
    }
    var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);
    if (parseInt(size) > maxSize) {
        if (maxSize >= 1024)
            lblError.innerHTML = "Select a file with max size of " + (maxSize / 1024).toFixed(2) + " MB";
        else
            lblError.innerHTML = "Select a file with max size of " + maxSize + " KB";
        fileUpload.value = '';
        return false;
    }
    lblError.innerHTML = "";
    if (!IsNullOrEmpty(imgContanor))
        ShowImage(fileUpload, imgContanor);
    return true;
}
function ShowImage(input, imgContanor) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + imgContanor).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
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
    else if (buttons == "ProceedCancel") {
        $('#modal-confirm-box-button-1').text('Proceed');
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
function DisablePage() {
    $('form input[type="text"]').attr("disabled", true);
    $('textarea').attr("disabled", true);
    $('form input[type="radio"]').attr("disabled", true);
    $('form input[type="checkbox"]').attr("disabled", true);
    $('form select').attr("disabled", true);
}

$(function () {
    // remove .00 from decimal
    $(document).find('.numberdecimal').each(function () {
        var decimalValue = $(this).val();
        if (decimalValue.split('.')[1] == "00") {
            $(this).val(decimalValue.split('.')[0]);
        }
        //if(decimalValue.split('.')[1]==)

    })

    $("input[class*='phone']").mask("9999999999");
    $("input[class*='zip']").mask("999999");
    $("input[class*='aadhar']").mask("9999-9999-9999");
    $('input[class*="fax"]').mask('(999) 999-9999');
    $('input[class*="officeno"]').mask('9999999999?9');
	$('input[class*="landline"]').mask('(9999) 9999-999');
	$('.datetimepicker9').datetimepicker({
		format: 'MM/DD/YYYY'
	});
    $('.datetimepicker4').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    $('.MaxTodayDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date()
    });

    $('#Projectdatetimepicker5').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#Projectdatetimepicker6').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#Projectdatetimepicker3').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#Projectdatetimepicker2').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    //neelam added here
    $('#ProjectRegistrationValidtilldate').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionSoughtuptodate').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#FirstApprovalDtBP').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ApprovalofBuildingPlanValidTilldate').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#LatestFormR1date').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#LatestFormR2date').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#LatestFormR3date').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailFromdate_1').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailTodate_1').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailFromdate_2').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailTodate_2').datetimepicker({
        format: 'DD/MM/YYYY',
    });


    $('#ExtensionAvailFromdate_3').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailTodate_3').datetimepicker({
        format: 'DD/MM/YYYY',
    });


    $('#ExtensionAvailFromdate_4').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailTodate_4').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#Projdatetimepicker1').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#Projdatetimepicker2').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#Projdatetimepicker3').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#Projdatetimepicker4').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#Projdatetimepicker5').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#ExtensionAvailFromdate_5').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#ExtensionAvailTodate_5').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#OpenDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: 'now'
    });
    $('#closedateID').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: 'now'
	});
	$('#OpenDateRetention').datetimepicker({
		format: 'DD/MM/YYYY',
		maxDate: 'now'
	});
	$('#closedateIDRetention').datetimepicker({
		format: 'DD/MM/YYYY',
		maxDate: 'now'
	});
	$('#OpenDatePromoter').datetimepicker({
		format: 'DD/MM/YYYY',
		maxDate: 'now'
	});
	$('#closedateIDPromoter').datetimepicker({
		format: 'DD/MM/YYYY',
		maxDate: 'now'
	});
    var todayDate = new Date().getDate();
    $('#ProjectvaildDateID').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(new Date().setDate(todayDate - 1)),
        //minDate: new Date()
        useCurrent: false,
        //minDate: 'now'
        //maxDate: 'now'
    });
    $('#ProjectvaildDateIDMap').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#APPROVALDATEOFEXISTINGBUILPLANID').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: 'now'
    });
    $('#APPROVALDATEOFREVISEDBUILPLANID').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: 'now'
    });
    $('#appltrID').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: 'now'
    });
    $('#ProjectvaildDateIDD').datetimepicker({
        format: 'DD/MM/YYYY',
        //maxDate: 'now',
        useCurrent: false
    });

    $('#Fromdate').datetimepicker({
        format: 'DD/MM/YYYY',
        // maxDate: 'now',
        useCurrent: false
    });

    $('#Todate').datetimepicker({
        format: 'DD/MM/YYYY',
        //  maxDate: 'now',
        useCurrent: false
    });

    $('#DocumntDate').datetimepicker({
        format: 'DD/MM/YYYY',
        //maxDate: 'now',
        useCurrent: false
    });
    $('#dateofissuetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        // maxDate: 'now',
        useCurrent: false
    });
    //QPR

    $('#ExpDtReceiptO').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#AppPlannedDtO').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDateOfNOCdatetimepicker_0').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDateOfNOCdatetimepicker_1').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDateOfNOCdatetimepicker_2').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDateOfNOCdatetimepicker_3').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#OtherPlannedDateOfNOCdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDtofDrawingsdatetimepicker_1').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDtofDrawingsdatetimepicker_10').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDtofDrawingsdatetimepicker_11').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDtofDrawingsdatetimepicker_12').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDtofDrawingsdatetimepicker_13').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#PlannedDtofDrawingsdatetimepicker_15').datetimepicker({
        format: 'DD/MM/YYYY',
    });

    $('#BPApprovalDt').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#BPRevisedApprovalDt').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#DtÓfApplication').datetimepicker({
		format: 'DD/MM/YYYY',		
    });
    $('#PlanneddtOfApplication').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#R2_DateOfIssue').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#ExpDtReceipt').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#AppPlannedDt').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#ExpDtReceipt_0').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#ExpDtReceipt_1').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#ExpDtReceipt_2').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#ExpDtReceipt_3').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#AppPlannedDt_0').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#AppPlannedDt_1').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#AppPlannedDt_2').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    $('#AppPlannedDt_3').datetimepicker({
        format: 'DD/MM/YYYY',
    });
    //// Miscellaneous
    $('#promoterDateOfApplicationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#promoterPlannedDateOfApplicationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#projectDateOfApplicationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#projectPlannedDateOfApplicationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#dateOfCompletionCertificatedatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#dateOfOccupancyCertificatedatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#completionCertificatePlannedDateOfApplicationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#occupancyCertificatePlannedDateOfApplicationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#dateOfDelayedCompletionDP').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#estimatedFinishDatedatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    /////
    ////Compliances
    $('#dateOfInsurancedatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#plannedDateOfInsurancedatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#dateOfRegistrationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#expectedDateOfRegistrationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#expectedDateOfAssociationFormationdatetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    $('#HearingDate').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false
    });
    /////
    $("#Projectdatetimepicker5").off("dp.change").on("dp.change", function (e) {
        $('#Projectdatetimepicker6').data("DateTimePicker").minDate(e.date);
    });
    $("#Projectdatetimepicker6").off("dp.change").on("dp.change", function (e) {
        $('#Projectdatetimepicker5').data("DateTimePicker").maxDate(e.date);
    });
    $('#NOtifyDateofIssue').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    

    $('.spanINRRupees').html('In( <i class="fa fa-inr" aria-hidden="true"></i> INR)')
    $('.documenthelptext').html("Document support only '.pdf' file format (Max Size 5 MB).")

    $(document).on('blur', '.txtemail', function (e) {
        var email = $(this).val();
        if (!IsNullOrEmpty(email)) {
            if (!CheckValidEmailAddress(email)) {
                Errortoaster('Invalid Email Address');
                $(this).val('');
                $(this).focus();
            }
        }
    });
    $(document).on('blur', '.zip', function (e) {
        var zipValue = $(this).val().substring(0, 2);
        if (!IsNullOrEmpty(zipValue) && (!$(this).hasClass('partnerzip'))) {
            if (parseInt(zipValue) > 29 && parseInt(zipValue) < 35) {
                return true;
            }
            else {
                $(this).focus();
                $(this).val('');
                Errortoaster('Invalid Pin Code', '');
            }
        }
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
                //if (!$(this).hasClass("unique-body"))
                //    $(this).text('Please Wait....');
            })
        }
    });
    //$(document).on('click', '#btnCommonModalClose', function () {
    //    $('.fade').removeClass('in modal-backdrop');
    //})
    $(document).on('keyup', '.pannumber', function (e) {
        //if (e.which >= 97 && e.which <= 122) {
        //    var newKey = e.which - 32;
        //    // I have tried setting those
        //    e.keyCode = newKey;
        //    e.charCode = newKey;
        //}

        $(this).val(($(this).val()).toUpperCase());
    });

    $(document).on('keypress', '.inputwithoutspace', function (e) {
        if (e.which === 32)
            return false;
    });
    $(document).on('keypress', '.number', function (event) {
        if (event.ctrlKey) {
            return true;
        }
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 0) {
            event.preventDefault();
        }
    });
    $(document).on('keypress', '.numberdecimal', function (event) {
        if (event.which == 8 || event.keyCode == 9 || (event.keyCode >= 37 && event.keyCode <= 40))
            return true;
        if (event.which < 46
        || event.which > 59) {
            event.preventDefault();
        } // prevent if not number/dot

        if (event.which == 46
        && $(this).val().indexOf('.') != -1) {
            event.preventDefault();
        } // prevent if already dot
    });

    $(document).on('paste', '.numberdecimal', function (event) {
        if (event.which < 46
        || event.which > 59) {
            event.preventDefault();
        } // prevent if not number/dot

        if (event.which == 46
        && $(this).val().indexOf('.') != -1) {
            event.preventDefault();
        } // prevent if already dot
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
        var mask = new RegExp("(^[a-zA-Z0-9\\-\\s]+$)")
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
        try {

            $form = $(f);
            $form.removeData('validator');
            $form.removeData('unobtrusiveValidation');
            $.validator.unobtrusive.parse($form);
        } catch (err) {
            alert("Input is " + err);
        }
    });
}
function IsNullOrEmpty(item) {
    if (item == null || item == '' || typeof item == "undefined") {
        return true;
    }
    return false;
}
function RebindMaskingAndCalendar() {
    $(document).find('.numberdecimal').each(function () {
        var decimalValue = $(this).val();
        if (decimalValue.split('.')[1] == "00") {
            $(this).val(decimalValue.split('.')[0]);
        }
        //if(decimalValue.split('.')[1]==)

    })
    $("input[class*='phone']").mask("9999999999");
    $("input[class*='zip']").mask("999999");
    $("input[class*='aadhar']").mask("9999-9999-9999");
    $('input[class*="fax"]').mask('(999) 999-9999');
    $('input[class*="officeno"]').mask('9999999999?9');
    $('input[class*="landline"]').mask('(9999) 9999-999');

    $('.datetimepicker4').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    $('.MaxTodayDate').datetimepicker({
        format: 'DD/MM/YYYY',
        maxDate: new Date()
    });
    $('.spanINRRupees').html('In( <i class="fa fa-inr" aria-hidden="true"></i> INR)');

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

function CheckValidEmailAddress(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
        return true;
    }
    else { return false; }
}

function showloading() {
    $('#loadingdiv').html("<span><img src='/Content/images/loadingg.gif' alt='Loading' width='60px' height='60px' /></span>");
    $('#loadingdiv').addClass('loadingdivcls');
}
function hideloading() {
    $('#loadingdiv').html("");
    $('#loadingdiv').removeClass('loadingdivcls');
}

Array.prototype.where = function (obj) {
    return this.filter(function (item) {
        for (var prop in obj)
            if (!(prop in item) || obj[prop] !== item[prop])
                return false;
        return true;
    });
};
$('#DocumntDate1').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DocumntDate2').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DtOfApplicationnew1').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DocumntDate20').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DtOfApplication1').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DocumntDate3').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DocumntDate4').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DocumntDate5').datetimepicker({
	format: 'DD/MM/YYYY',
	//maxDate: 'now',
	useCurrent: false
});
$('#DtÓfApplication1').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$('#DtÓfApplication2').datetimepicker({
    format: 'DD/MM/YYYY',
    //maxDate: 'now',
    useCurrent: false
});
$("#DocumntDate1").off("dp.change").on("dp.change", function (e) {
    $('#DtÓfApplication1').data("DateTimePicker").maxDate(e.date);
});
function fillFinancialyear(element) {
    var elemntId = '#' + element;
    //if (IsNullOrEmpty(parentid))
    //    parentid = "0";

    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/Admin/Admin/GetFinancialyearList',
        dataType: "json",
        success: function (Result) {
            $(elemntId).html('')
            $(elemntId).append($("<option></option>").val('').html('-- All --'));
            $.each(Result, function (key, value) {
                $(elemntId).append($("<option></option>").val(value.Value).html(value.Text));
            });
        },
        error: function (Result) {
            alert("Error");
        }
    });
}


