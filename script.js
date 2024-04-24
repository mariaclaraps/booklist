const form = document.getElementById('form-livro');
const tableBody = document.querySelector('#tabela-livros tbody');

let livros = [];

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
                    <button class="btn-js" onclick="editLivro(${index})"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn-js" onclick="deleteLivro(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function editLivro(index) {
    const livro = livros[index];
    const novoTitulo = prompt('Digite o novo titulo:', livro.titulo);
    const novoAutor = prompt('Digite o novo autor:', livro.autor);
    const novaNota = parseInt(prompt('Digite a nova nota:', livro.nota));
   
    if (novoTitulo !=='' && novoAutor !=='' && !isNaN(novaNota) && novaNota >= 1 && novaNota <= 5) {
        livros[index].titulo = novoTitulo;
        livros[index].autor = novoAutor;
        livros[index].nota = novaNota;
        renderTable();
    } else {
        alert('Erro! Tente Novamente!');
    }
}
function deleteLivro(index) {
    const confirmation = confirm('Realmente deseja excluir este livro?');
    if (confirmation) {
        livros.splice(index, 1);
        renderTable();
    }
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
    for (let i = 1; i <= 5; i++) {
        if (i <= nota) {
            estrelas += '★';
        } else {
            estrelas += '☆';
        }
    }
    return estrelas;
}
