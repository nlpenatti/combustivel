function calcular() {
    // Captura os valores inseridos pelo usuário
    const distancia = parseFloat(document.getElementById('distancia').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const preco = parseFloat(document.getElementById('preco').value);
    const caminhoDeVolta = document.getElementById('caminhoDeVolta').checked;

    // Verifica se o checkbox está marcado e duplica a distância se necessário
    const distanciaTotal = caminhoDeVolta ? distancia * 2 : distancia;

    // Calcula o consumo total de combustível e o custo total
    const litrosConsumidos = distanciaTotal / consumo;
    const custoTotal = litrosConsumidos * preco;

    // Atualiza a tabela de resultados
    document.getElementById('km').textContent = `${distanciaTotal} km`;
    document.getElementById('litros').textContent = `${litrosConsumidos.toFixed(2)} l`;
    document.getElementById('precoFinal').textContent = `R$ ${custoTotal.toFixed(2)}`;

    // Exibe o resultado
    document.getElementById('resultado').style.display = 'table';
    document.getElementById('resultado-titulo').style.display = 'block'; // Exibe o título "Resultado"
}
