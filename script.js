function calcular() {

    const distancia = parseFloat(document.getElementById('distancia').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const preco = parseFloat(document.getElementById('preco').value);
    const caminhoDeVolta = document.getElementById('caminhoDeVolta').checked;

    if (distancia === "" || consumo === "" || preco === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const distanciaTotal = caminhoDeVolta ? distancia * 2 : distancia;

    const litrosConsumidos = distanciaTotal / consumo;
    const custoTotal = litrosConsumidos * preco;

    document.getElementById('km').textContent = `${distanciaTotal} km`;
    document.getElementById('litros').textContent = `${litrosConsumidos.toFixed(2)} l`;
    document.getElementById('precoFinal').textContent = `R$ ${custoTotal.toFixed(2)}`;

    document.getElementById('resultado').style.display = 'table';
    document.getElementById('resultado-titulo').style.display = 'block'; // Exibe o título "Resultado"
}
