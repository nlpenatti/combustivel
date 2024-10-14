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

document.getElementById('distanciaTotal').textContent = `${distanciaTotal.toFixed(2)} km`;
document.getElementById('combustivelConsumido').textContent = `${litrosConsumidos.toFixed(2)} L`;
document.getElementById('custoTotal').textContent = `R$ ${custoTotal.toFixed(2)}`;

document.getElementById('resultado').style.display = 'block';

    // Gráfico de Distribuição de Custos
    const ctxDistribuicao = document.getElementById('graficoDistribuicao').getContext('2d');
    new Chart(ctxDistribuicao, {
        type: 'doughnut',
        data: {
            labels: ['Custo de Combustível', 'Outros Custos Estimados'],
            datasets: [{
                data: [custoTotal, custoTotal * 0.2], // Estimativa de outros custos como 20% do custo de combustível
                backgroundColor: ['#4e73df', '#1cc88a'],
                hoverBackgroundColor: ['#2e59d9', '#17a673'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

    // Gráfico de Eficiência
    const ctxEficiencia = document.getElementById('graficoEficiencia').getContext('2d');
    new Chart(ctxEficiencia, {
        type: 'bar',
        data: {
            labels: ['Sua Viagem', 'Média Nacional'],
            datasets: [{
                label: 'Eficiência (km/R$)',
                data: [distanciaTotal / custoTotal, 8], // 8 km/R$ é um valor hipotético para média nacional
                backgroundColor: ['#36b9cc', '#e74a3b'],
                hoverBackgroundColor: ['#2c9faf', '#be2617'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
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
                display: false
            },
        },
    });

   // Avaliação de Eficiência
const efficiencyRating = consumo; // Agora usando diretamente o consumo em km/l
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

// Atualizar o gráfico de eficiência
graficoEficiencia.data.datasets[0].data = [efficiencyRating, 12]; // 12 km/l como benchmark
graficoEficiencia.data.labels = ['Seu Veículo', 'Benchmark'];
graficoEficiencia.options.scales.yAxes[0].scaleLabel = {
display: true,
labelString: 'Consumo (km/l)'
};
graficoEficiencia.update();
}