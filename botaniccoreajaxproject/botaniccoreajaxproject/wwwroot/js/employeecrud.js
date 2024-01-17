$(document).ready(function () {
    ShowEmployeeData();
});
function ShowEmployeeData() {
    var url = $('#urlEmployeeData').val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',

        success: function (result, statu, xhr) {

            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.employeeId + '</td>';
                object += '<td>' + item.nameSurname + '</td>';
                object += '<td>' + item.title + '</td>';
                object += '<td>' + item.age + '</td>';
                object += '<td>' + item.phone + '</td>';
                object += '<td>' + item.email + '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.employeeId + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.employeeId + ');">Delete</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }

    });
};

$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeModal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdateEmployee').css('display', 'none');
    $('#EmployeeHeading').text('Add Employee Page');
})

function AddEmployee() {
    var objData = {
        NameSurname: $('#NameSurname').val(),
        Title: $('#Title').val(),
        Age: $('#Age').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val()
    }
    $.ajax({
        url: '/Employee/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Registration Successful ');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();

        },
        error: function () {
            alert("Registration Failed");
        }
    })
}
function ClearTextBox() {
    $('#NameSurname').val('');
    $('#Title').val('');
    $('#Age').val('');
    $('#Phone').val('');
    $('#Email').val('');
    $('#Address').val('');
    $('#EmployeeId').val('');
}
function HideModalPopUp() {
    $('#EmployeeModal').modal('hide');
}

function Delete(employeeId) {

    if (confirm('Are you sure to delete?')) {
        $.ajax({
            url: '/Employee/Delete?id=' + employeeId,
            success: function () {
                alert("Succesfully deleted");
                ShowEmployeeData();
            },
            error: function () {
                alert("Delete is failed")
            }

        })
    }
}
function Edit(employeeId) {
    $.ajax({
        url: '/Employee/Edit?id=' + employeeId,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeModal').modal('show');
            $('#EmployeeId').val(response.employeeId);
            $('#NameSurname').val(response.nameSurname);
            $('#Title').val(response.title);
            $('#Age').val(response.age);
            $('#Phone').val(response.phone);
            $('#Email').val(response.email);
            $('#Address').val(response.address);
            $('#AddEmployee').css('display', 'none');
            $('#btnUpdateEmployee').css('display', 'block');
            $('#EmployeeHeading').text('Update Employee Page');
        },
        error: function () {
            alert('The data do not given');
        }

    })

}
function UpdateEmployee() {

    var objData = {

        EmployeeId: $('#EmployeeId').val(),
        NameSurname: $('#NameSurname').val(),
        Title: $('#Title').val(),
        Age: $('#Age').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        Address: $('#Address').val()

    }
    $.ajax({
        url: '/Employee/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        success: function () {

            alert("Data updated");
            HideModalPopUp();
            ShowEmployeeData();
            ClearTextBox();
        },
        error: function () {
            alert("Failed");
        }

    })

}