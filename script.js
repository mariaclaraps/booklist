const form = document.getElementById('form-livro');
const tableBody = document.querySelector('#tabela-livros tbody');

let livros = [];


//CREATE
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const nota = document.querySelector('input[name="nota"]:checked').value;

    livros.push({ titulo, autor, nota });
    renderTable();
    form.reset();
});


function renderTable() {
    tableBody.innerHTML = '';
    livros.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.titulo}</td>
                <td>${item.autor}</td>
                <td>${renderStars(item.nota)}</td>
                <td>
                    <button class="btn-js" onclick="editItem(${index})"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn-js" onclick="deleteItem(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function getCheckedStars() {
    const checkboxes = document.querySelectorAll('input[name="nota"]');
    let nota = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            nota = parseInt(checkbox.value);
        }
    });
    return nota;
}


function renderStars(nota) {
    let estrelas = '';
    for (let i = 0; i < nota; i++) {
        estrelas += '★';
    }
    return estrelas;
}


var stars = document.querySelectorAll('star-icon');
document.addEventListener('click', function(e){
    var classStar = e.target.classList;
    if(!classStar.contains('ativo')){
        stars.forEach(function(star){
            star.classList('ativo');
        });
        classStar.add('ativo');
    }

});

function editItem(index) {
    const item = livros[index];
    const newTitle = prompt('Digite o novo titulo:', item.titulo);
    const newAuthor = prompt('Digite o novo autor:', item.autor);
    const newRating = parseInt(prompt('Digite a nova nota:', item.nota));
    if (newTitle !== null && newAuthor !== null && !isNaN(newRating) && newRating >= 1 && newRating <= 5) {
        livros[index].titulo = newTitle;
        livros[index].autor = newAuthor;
        livros[index].nota = newRating;
        renderTable();
    } else {
        alert('Invalid input. Please try again.');
    }
}

document.querySelector('.listaDePosts').addEventListener('input', function (infosDoEvento) {
    console.log('Houve uma digitação');
    const elementoAtual = infosDoEvento.target;
    const id = elementoAtual.parentNode.getAttribute('data-id');

    miniRedeSocial.atualizaContentDoPost(id, elementoAtual.innerText)
});

function deleteItem(index) {
    const confirmation = confirm('Realmente deseja excluir este livro?');
    if (confirmation) {
        livros.splice(index, 1);
        renderTable();
    }
}
