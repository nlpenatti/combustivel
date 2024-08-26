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

            document.getElementById('resultado-container').style.display = 'block';
        }
