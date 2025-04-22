var url = "https://pg-restapi-axzt.onrender.com/api/users";
let selectedUserId = null;

function postUser() {
    console.log(url);

    var myName = $('#name').val();
    var myEmail = $('#email').val();
    var myAge = $('#age').val();
    var myComments = $('#comments').val();

    if (!myName || !myEmail || !myAge || !myComments) {
        alert('Por favor completa todos los campos');
        return;
    }

    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };
    console.log(myuser);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(myuser),
        success: function (data) {
            console.log(data);
            alert('Usuario agregado correctamente');
            clearForm();  
            $('#resultado').html(JSON.stringify(data.user));
        },
       
    });
}

function getUsers() {
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border="1">';

        arrUsers.forEach(function(item, index) {
            console.log(item);
            htmlTableUsers += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.age}</td>
                    <td>${item.comments}</td>
                <td>
                <button onclick="deleteUser(${item.id})">Eliminar</button>
                <button onclick="fillForm(${item.id}, '${item.name}', '${item.email}', ${item.age}, '${item.comments}')">Editar</button>

            </td>
        </tr>
    `;
});
     htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });
}

function deleteUser(id) {
    const confirmar = confirm("¿Deseas eliminar este usuario?");
    if (!confirmar) return;

    $.ajax({
        url: `${url}/${id}`,
        type: 'DELETE',
        success: function () {
            alert('Usuario eliminado');
            getUsers();
        },
        error: function (err) {
            console.error('Error al eliminar:', err);
        }
    });
}
function updateUser() {
    if (!selectedUserId) {
        alert("Primero selecciona un usuario con el botón Editar");
        return;
    }

    const name = $('#name').val();
    const email = $('#email').val();
    const age = $('#age').val();
    const comments = $('#comments').val();

    if (!name || !email || !age || !comments) {
        alert("Completa todos los campos para actualizar");
        return;
    }

    const updatedUser = { name, email, age, comments };

    $.ajax({
        url: `${url}/${selectedUserId}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedUser),
        success: function () {
            alert("Usuario actualizado correctamente");
            getUsers();
            clearForm();
            $('#updateBtn').hide(); // ocultar botón actualizar
            selectedUserId = null;
        },
        error: function (err) {
            console.error('Error al actualizar:', err);
        }
    });
}

function fillForm(id, name, email, age, comments) {
    $('#name').val(name);
    $('#email').val(email);
    $('#age').val(age);
    $('#comments').val(comments);
    selectedUserId = id;

    $('#updateBtn').show(); // muestra botón actualizar
}



// Limpiar inputs
function clearForm() {
    $('#name').val('');
    $('#email').val('');
    $('#age').val('');
    $('#comments').val('');
    selectedUserId = null;
    $('#updateBtn').hide(); 
}