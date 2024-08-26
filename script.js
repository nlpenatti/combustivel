 function validarNumeros(input) {
            input.value = input.value.replace(/[^0-9.]/g, ''); // Permite apenas números e ponto
        }

        function calcular() {
            const distancia = document.getElementById('distancia').value;
            const consumo = document.getElementById('consumo').value;
            const preco = document.getElementById('preco').value;
            const caminhoDeVolta = document.getElementById('caminhoDeVolta').checked;

            if (distancia === "" || consumo === "" || preco === "") {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const distanciaNum = parseFloat(distancia);
            const consumoNum = parseFloat(consumo);
            const precoNum = parseFloat(preco);

            const distanciaTotal = caminhoDeVolta ? distanciaNum * 2 : distanciaNum;

            const litrosConsumidos = distanciaTotal / consumoNum;
            const custoTotal = litrosConsumidos * precoNum;

            document.getElementById('km').textContent = `${distanciaTotal} km`;
            document.getElementById('litros').textContent = `${litrosConsumidos.toFixed(2)} l`;
            document.getElementById('precoFinal').textContent = `R$ ${custoTotal.toFixed(2)}`;

            document.getElementById('resultado').style.display = 'table';
            document.getElementById('resultado-titulo').style.display = 'block';
        }
