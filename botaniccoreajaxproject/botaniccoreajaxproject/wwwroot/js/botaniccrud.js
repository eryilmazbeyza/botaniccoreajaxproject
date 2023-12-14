$(document).ready(function () {
    ShowBotanicGData();
});

function ShowBotanicGData() {
    var url = $('#urlBotanicData').val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',

        success: function (result, statu, xhr) {

            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.gardenId + '</td>';
                object += '<td>' + item.gardenName + '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td>' + item.phone + '</td>';
                object += '<td>' + item.email + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.gardenId + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.gardenId + ');">Delete</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }

    });
};

$('#btnAddBotanicGarden').click(function () {
    ClearTextBox();
    $('#BotanicGardenModal').modal('show');
    $('#botId').hide();
    $('#AddBotanicG').css('display', 'block');
    $('#btnUpdateBotanicG').css('display', 'none');
    $('#BotanicGHeading').text('Add Employee Page');
})
function AddBotanicG() {
    var objData = {
        GardenName: $('#GardenName').val(),
        Address: $('#Address').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val()
    }
    $.ajax({
        url: '/BotanicGarden/AddBotanicG',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        datatype: 'json',
        success: function () {
            alert('Registration Successful ');
            ClearTextBox();
            ShowBotanicGData();
            HideModalPopUp();

        },
        error: function () {
            alert("Registration Failed");
        }
    })
}
function ClearTextBox() {
    $('#GardenName').val('');
    $('#Address').val('');
    $('#Phone').val('');
    $('#Email').val('');
    $('#GardenId').val('');
}
function HideModalPopUp() {
    $('#BotanicGardenModal').modal('hide');
}

function Delete(gardenId) {

    if (confirm('Are you sure to delete?')) {
        $.ajax({
            url: '/BotanicGarden/Delete?id=' + gardenId,
            success: function () {
                alert("Succesfully deleted");
                ShowBotanicGData();
            },
            error: function () {
                alert("Delete is failed")
            }

        })
    }
}

    function Edit(gardenId) {
        $.ajax({
            url: '/BotanicGarden/Edit?id=' + gardenId,
            type: 'Get',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (response) {
                $('#BotanicGardenModal').modal('show');
                $('#GardenId').val(response.gardenId);
                $('#GardenName').val(response.gardenName);
                $('#Address').val(response.address);
                $('#Phone').val(response.phone);
                $('#Email').val(response.email);
                $('#AddBotanicG').css('display', 'none');
                $('#btnUpdateBotanicG').css('display', 'block');
                $('#BotanicGHeading').text('Update Botanic Garden Page');
            },
            error: function () {
                alert('The data do not given');
            }

        })

    }

    function UpdateBotanicG() {

        var objData = {


            GardenId: $('#GardenId').val(),
            GardenName: $('#GardenName').val(),
            Address: $('#Address').val(),
            Phone: $('#Phone').val(),
            Email: $('#Email').val(),

        }
        $.ajax({
            url: '/BotanicGarden/Update',
            type: 'Post',
            data: objData,
            contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
            success: function () {

                alert("Data updated");
                HideModalPopUp();
                ShowBotanicGData();
                ClearTextBox();
            },
            error: function () {
                alert("Failed");
            }

        })

    }

