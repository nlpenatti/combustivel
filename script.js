let graficoDistribuicao, graficoEficiencia;

document.getElementById('calculadoraForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calcular();
});

function calcular() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const preco = parseFloat(document.getElementById('preco').value);
    const caminhoDeVolta = document.getElementById('caminhoDeVolta').checked;

    const distanciaTotal = caminhoDeVolta ? distancia * 2 : distancia;
    const litrosConsumidos = distanciaTotal / consumo;
    const custoTotal = litrosConsumidos * preco;

    // Exibindo os valores
    document.getElementById('distanciaTotal').textContent = `${distanciaTotal.toFixed(2)} km`;
    const mensagemDistancia = caminhoDeVolta
        ? `Sua viagem, considerando ida e volta, terá aprox ~ ${distanciaTotal.toFixed(2)} km.`
        : `Sua viagem de ida terá aprox~ ${distanciaTotal.toFixed(2)} km.`;
    document.getElementById('distanciaMensagem').textContent = mensagemDistancia;

    document.getElementById('combustivelConsumido').textContent = `${litrosConsumidos.toFixed(2)} L`;
    document.getElementById('combustivelMensagem').textContent = `Você consumirá aprox ~ ${litrosConsumidos.toFixed(2)}l de combustível.`;

    document.getElementById('custoTotal').textContent = `R$ ${custoTotal.toFixed(2)}`;
    document.getElementById('custoMensagem').textContent = `O custo total será de aprox ~ R$ ${custoTotal.toFixed(2)}.`;

    // Cálculo do custo por km
    const custoPorKm = custoTotal / distanciaTotal;
    document.getElementById('custoPorKm').textContent = `O custo por km é de R$ ${custoPorKm.toFixed(2)}.`;

    // Comparação com veículo mais eficiente
    const economia = (distanciaTotal / 20 * preco) - custoTotal; // Exemplo: 20 km/l como referência
    document.getElementById('economia').textContent = `Você economizaria R$ ${economia.toFixed(2)} se seu carro fizesse 20 km/l.`;

    document.getElementById('resultado').style.display = 'block';

    salvarHistorico(distancia, consumo, preco, caminhoDeVolta);

    // Destruir gráficos antigos, se já existirem
    if (graficoDistribuicao) {
        graficoDistribuicao.destroy();
    }
    if (graficoEficiencia) {
        graficoEficiencia.destroy();
    }

    // Gráfico de Distribuição de Custos
    const ctxDistribuicao = document.getElementById('graficoDistribuicao').getContext('2d');
    graficoDistribuicao = new Chart(ctxDistribuicao, {
        type: 'doughnut',
        data: {
            labels: ['Custo de Combustível', 'Outros Custos Estimados'],
            datasets: [{
                data: [custoTotal, custoTotal * 0.2], // Estimativa de outros custos como 20% do custo de combustível
                backgroundColor: ['#4e73df', '#1cc88a'],
            }],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            cutoutPercentage: 80,
        },
    });
    document.getElementById('mensagemGraficoDistribuicao').textContent = "O gráfico mostra a proporção entre o custo de combustível e outros custos estimados.";

    // Gráfico de Eficiência
    const ctxEficiencia = document.getElementById('graficoEficiencia').getContext('2d');
    graficoEficiencia = new Chart(ctxEficiencia, {
        type: 'bar',
        data: {
            labels: ['Sua Viagem', 'Média Nacional', 'Carro Elétrico', 'Carro Híbrido'],
            datasets: [{
                label: 'Eficiência (km/R$)',
                data: [distanciaTotal / custoTotal, 8, 20, 15], // 8 km/R$ é um valor hipotético para média nacional
                backgroundColor: ['#36b9cc', '#e74a3b', '#1cc88a', '#f6c23e'],
            }],
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: true
            },
        },
    });
    document.getElementById('mensagemGraficoEficiencia').textContent = "O gráfico compara a eficiência do seu veículo com outras referências, como a média nacional e veículos elétricos ou híbridos.";

    // Avaliação de Eficiência
    const efficiencyRating = consumo;
    const efficiencyMessage = document.getElementById('efficiencyMessage');
    const efficiencyFill = document.getElementById('efficiencyFill');

    let message = '';
    let fillWidth = '';
    let fillColor = '';

    if (efficiencyRating > 15) {
        message = 'Excelente eficiência! Seu veículo tem um consumo muito econômico.';
        fillWidth = '100%';
        fillColor = '#1cc88a';
    } else if (efficiencyRating >= 12) {
        message = 'Boa eficiência. Seu veículo tem um consumo econômico.';
        fillWidth = '75%';
        fillColor = '#4e73df';
    } else if (efficiencyRating >= 8) {
        message = 'Eficiência moderada. Considere maneiras de melhorar o consumo do seu veículo.';
        fillWidth = '50%';
        fillColor = '#f6c23e';
    } else {
        message = 'Baixa eficiência. Recomendamos revisar as condições do veículo ou considerar alternativas mais econômicas.';
        fillWidth = '25%';
        fillColor = '#e74a3b';
    }

    efficiencyMessage.textContent = message;
    efficiencyFill.style.width = fillWidth;
    efficiencyFill.style.backgroundColor = fillColor;
}

function salvarHistorico(distancia, consumo, preco, caminhoDeVolta) {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const novaEntrada = {
        distancia,
        consumo,
        preco,
        caminhoDeVolta,
        data: new Date().toLocaleString()
    };
    historico.push(novaEntrada);
    localStorage.setItem('historico', JSON.stringify(historico));
}

function exibirHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const historicoContainer = document.getElementById('historico');
    historicoContainer.innerHTML = '';
    historico.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('historico-item');
        div.innerHTML = `Distância: ${item.distancia} km, Consumo: ${item.consumo} km/l, Preço: R$ ${item.preco}, Data: ${item.data}`;
        historicoContainer.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', exibirHistorico);
