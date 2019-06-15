var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function(){
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes");

    xhr.send();

    xhr.addEventListener("load", function(){
       
        var mensagemErro = document.querySelector("#erro-ajax");

        if(xhr.status == 200) {
            mensagemErro.classList.add("invisivel");
            var resposta = xhr.responseText;

            var pacientes = JSON.parse(resposta);
    
            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        }else {
            mensagemErro.classList.remove("invisivel");
        }
    });

});