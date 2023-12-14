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

$('#btnAddBotanicGarden').click(function () {
    ClearTextBox();
    $('#BotanicGardenModal').modal('show');
    $('#botId').hide();
    $('#AddBotanicG').css('display', 'block');
    $('#btnUpdateBotanicG').css('display', 'none');
    $('#BotanicGHeading').text('Add Employee Page');
})