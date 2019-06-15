var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function (event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensagemDeErro(erros);        
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();

    var mensagemDeErro = document.querySelector("#mensagem-erro");
    mensagemDeErro.innerHTML = "";



});

function adicionaPacienteNaTabela (paciente) {
    var pacienteTr = montaTr(paciente)
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function validaPaciente (paciente) {

    var erros = [];

    if(!validaPeso(paciente.peso)){
        erros.push("Peso Inválido!");
    }
    if(!validaAltura(paciente.altura)){
        erros.push("Altura Inválida!");
    }
    if(paciente.nome == 0) {
        erros.push("Nome não pode ser em branco!");
    }
    if(paciente.peso == 0) {
        erros.push("Peso não pode ser em branco!");
    }
    if(paciente.altura == 0) {
        erros.push("Altura não pode ser em branco!");
    }
    if(paciente.gordura == 0) {
        erros.push("Gordura não pode ser em branco!");
    }

    return erros;
    
}

function exibeMensagemDeErro (erros) {
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";
    
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario (form) {
    
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr (paciente) {
    
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    var nomeTd = montaTd(paciente.nome, "info-nome");
    var pesoTd = montaTd(paciente.peso, "info-peso");
    var alturaTd = montaTd(paciente.altura, "info-altura");
    var gorduraTd = montaTd(paciente.gordura, "info-gordura");
    var imcTd = montaTd(paciente.imc, "info-imc")

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr;

}

function montaTd (dado, classe) {

    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);    

    return td;
}