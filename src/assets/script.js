window.onload = function() {

    function start() {
        console.log('start');

        $('#btn-add').click(function() {
            adicionar();
        });

        $(document).on('click', '.btn-excluir', function() {
            excluir($(this).data('id'))
        });

        refresh()
    }

    function adicionar() {

        var tarefa = $('#tarefa-input').val();

        if (tarefa.length) {
            var listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
            listaTarefas.push({ id: listaTarefas.length, descricao: tarefa});
    
            localStorage.setItem('tarefas', JSON.stringify(listaTarefas))

            refresh();

            $('.toast-add').toast('show')
    
        } else {
            alert('Informe uma descrição')
        }
        
    }

    function refresh() {
        
        $('#lista-tarefas tbody').html('');

        var listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        listaTarefas.forEach(tarefa => {
            $('#lista-tarefas tbody').append(`
                <tr>
                    <td scope="row">${tarefa.id}</td>
                    <td>${tarefa.descricao}</td>
                    <td class="text-end">
                        <button type="button" class="btn btn-secondary btn-sm btn-excluir" data-id="${tarefa.id}">Excluir</button>
                    </td>
                </tr>
            `)
        });
    }

    function excluir(id) {
        var listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        listaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id);
        localStorage.setItem('tarefas', JSON.stringify(listaTarefas))

        refresh()
    }

    start();
}