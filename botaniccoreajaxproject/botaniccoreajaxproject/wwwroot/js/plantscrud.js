$(document).ready(function () {
    ShowPlantsData();
});
function ShowPlantsData() {
    var url = $('#urlPlantsData').val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',

        success: function (result, statu, xhr) {

            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.plantId + '</td>';
                object += '<td>' + item.plantName + '</td>';
                object += '<td>' + item.plantDescription + '</td>';
                object += '<td>' + item.plantType + '</td>';
                object += '<td>' + item.plantCount + '</td>';
                object += '<td>' + item.plantOrigin + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.plantId + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.plantId + ');">Delete</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }

    });
};

$('#btnAddPlants').click(function () {
    ClearTextBox();
    $('#PlantsModal').modal('show');
    $('#plaId').hide();
    $('#AddPlants').css('display', 'block');
    $('#btnUpdatePlants').css('display', 'none');
    $('#PlantsHeading').text('Add Plant Page');
})

function AddPlants() {
    var objData = {
        PlantName: $('#PlantName').val(),
        PlantDescription: $('#PlantDescription').val(),
        PlantType: $('#PlantType').val(),
        PlantCount: $('#PlantCount').val(),
        PlantOrigin: $('#PlantOrigin').val(),
    }
    $.ajax({
        url: '/Plants/AddPlants',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Registration Successful ');
            ClearTextBox();
            ShowPlantsData();
            HideModalPopUp();

        },
        error: function () {
            alert("Registration Failed");
        }
    })
}
function ClearTextBox() {
    $('#PlantName').val('');
    $('#PlantDescription').val('');
    $('#PlantType').val('');
    $('#PlantCount').val('');
    $('#PlantOrigin').val('');
    $('#PlantId').val('');
}
function HideModalPopUp() {
    $('#PlantsModal').modal('hide');
}

function Delete(plantId) {

    if (confirm('Are you sure to delete?')) {
        $.ajax({
            url: '/Plants/Delete?id=' + plantId,
            success: function () {
                alert("Succesfully deleted");
                ShowPlantsData();
            },
            error: function () {
                alert("Delete is failed")
            }

        })
    }
}
function Edit(plantId) {
    $.ajax({
        url: '/Plants/Edit?id=' + plantId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#PlantsModal').modal('show');
            $('#PlantId').val(response.plantId);
            $('#PlantName').val(response.plantName);
            $('#PlantDescription').val(response.plantDescription);
            $('#PlantType').val(response.plantType);
            $('#PlantCount').val(response.plantCount);
            $('#PlantOrigin').val(response.plantOrigin);
            $('#AddPlants').css('display', 'none');
            $('#btnUpdatePlants').css('display', 'block');
            $('#PlantsHeading').text('Update Plant Page');
        },
        error: function () {
            alert('The data do not given');
        }

    })

}

function UpdatePlants() {

    var objData = {

        PlantId: $('#PlantId').val(),
        PlantName: $('#PlantName').val(),
        PlantDescription: $('#PlantDescription').val(),
        PlantType: $('#PlantType').val(),
        PlantCount: $('#PlantCount').val(),
        PlantOrigin: $('#PlantOrigin').val()

    }
    $.ajax({
        url: '/Plants/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function () {

            alert("Data updated");
            HideModalPopUp();
            ShowPlantsData();
            ClearTextBox();
        },
        error: function () {
            alert("Failed");
        }

    })

}