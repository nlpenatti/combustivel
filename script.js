function calcular() {
    // Captura os valores inseridos pelo usuário
    const distancia = document.getElementById('distancia').value;
    const consumo = document.getElementById('consumo').value;
    const preco = document.getElementById('preco').value;
    const caminhoDeVolta = document.getElementById('caminhoDeVolta').checked;

    // Verifica se todos os campos estão preenchidos
    if (distancia === "" || consumo === "" || preco === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Converte os valores para números
    const distanciaNum = parseFloat(distancia);
    const consumoNum = parseFloat(consumo);
    const precoNum = parseFloat(preco);

    // Verifica se o checkbox está marcado e duplica a distância se necessário
    const distanciaTotal = caminhoDeVolta ? distanciaNum * 2 : distanciaNum;

    // Calcula o consumo total de combustível e o custo total
    const litrosConsumidos = distanciaTotal / consumoNum;
    const custoTotal = litrosConsumidos * precoNum;

    // Atualiza a tabela de resultados
    document.getElementById('km').textContent = `${distanciaTotal} km`;
    document.getElementById('litros').textContent = `${litrosConsumidos.toFixed(2)} l`;
    document.getElementById('precoFinal').textContent = `R$ ${custoTotal.toFixed(2)}`;

    // Exibe o resultado
    document.getElementById('resultado').style.display = 'table';
    document.getElementById('resultado-titulo').style.display = 'block';
}
