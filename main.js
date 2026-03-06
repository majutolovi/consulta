async function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado!");
            limparCampos();
            return;
        }

        // Preenchendo os campos com os dados da API
        document.getElementById('logradouro').innerText = data.logradouro;
        document.getElementById('bairro').innerText = data.bairro;
        document.getElementById('cidade').innerText = data.localidade;
        document.getElementById('estado').innerText = data.uf;
        document.getElementById('cep-resultado').innerText = data.cep;

    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro ao consultar o servidor.");
    }
}

function limparCampos() {
    document.getElementById('logradouro').innerText = "-";
    document.getElementById('bairro').innerText = "-";
    document.getElementById('cidade').innerText = "-";
    document.getElementById('estado').innerText = "-";
    document.getElementById('cep-resultado').innerText = "-";
}