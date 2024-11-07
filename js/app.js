const apiKey = 'afd77d447ddc0c1cb525a824'; // Minha chave da API
const apiURL = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/'; //A Url do site da API

//Vai na APÌ e Pega os códigos das moedas e seus nomes.
const currencyNames = {
    USD: 'Dólar',
    CAD: 'Dólar Canadense',
    AUD: 'Dólar Australiano',
    EUR: 'Euro',
    BRL: 'Real',
    JPY: 'Yen Japonês',
    GBP: 'Libra Esterlina'
};

const flags = {
    USD: "src/imagens/US.png",
    CAD: "src/imagens/CA.png",
    AUD: "src/imagens/AU.png",
    EUR: "src/imagens/UE.png",
    BRL: "src/imagens/BR.png",
    JPY: "src/imagens/JP.png",
    GBP: "src/imagens/IG.png"
};

async function getExchangeRate(from) {
    const response = await fetch(apiURL + from.toUpperCase());
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        throw new Error('Erro ao buscar dados da API: ' + (errorData.message || 'Resposta inválida'));
    }
    const data = await response.json();
    return data.conversion_rates; // Vai procurar as taxa de cambio na APi. E Retornar com todas as taxas de câmbio
}


async function clicar() {
    const valor = parseFloat(document.getElementById('valor').value);
    const fromCurrency = document.getElementById('from').value; 
    const toCurrency = document.getElementById('to').value; 
    const resultadoElement = document.getElementById('local_do_resultado'); // Pega o  resul e vai ser exibido no p.

    // Vai limpa o resultado que anteriormente foi mostrado.
    resultadoElement.innerHTML = '';

    if (isNaN(valor)) {
        resultadoElement.innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    if (fromCurrency === toCurrency) {
        resultadoElement.innerHTML = "As moedas de origem e destino não podem ser iguais.";
        return;
    }

    if (valor < 0.01) {
        resultadoElement.innerHTML = "Valores menores que 1 centavo não podem ser convertidos.";
        return;
    }

    try {
        const conversionRates = await getExchangeRate(fromCurrency);
        const taxa = conversionRates[toCurrency.toUpperCase()]; // Busca a taxa de câmbio na API.
        if (!taxa) {
            throw new Error('Taxa de câmbio não encontrada.');
        }
        const resultado = (valor * taxa).toFixed(2);

        // Obtém os resultados dos nomes das moedas da API.
        const fromCurrencyName = currencyNames[fromCurrency.toUpperCase()];
        const toCurrencyName = currencyNames[toCurrency.toUpperCase()];

        // Vai exibir o resultado da comverção dentro do <p id="local_do_resultado">
        resultadoElement.innerHTML = `${valor} ${fromCurrencyName} (${fromCurrency.toUpperCase()}) = ${resultado} ${toCurrencyName} (${toCurrency.toUpperCase()})`;


    } catch (error) {
        console.error(error);
        resultadoElement.innerHTML = "Ocorreu um erro ao converter a moeda: " + error.message;
    }
}


function loadflag(selectElement, imgId) {
    const selectedCurrency = selectElement.value;
    const imgElement = document.getElementById(imgId); // < - vai acessa o elemento da imagem pelo seu id 

    if(flags[selectedCurrency]) {
        imgElement.src = flags[selectedCurrency]; //Atualiza o estado da img
    } else {
        console.log(`por algum motivo a bandeira n foi encontrada ${selectedCurrency}`)
    }
    console.log(selectedCurrency)
}

let caixaDeChecagem = document.getElementById('caixaDeChecagem');
//Declara aa variavel da caixa de alternação de cor.

let conversor_style = document.getElementById("conversor_style ");
//Mesma premissa só que agora é para o texto não alterar

caixaDeChecagem.addEventListener('change', () => {
    document.body.classList.toggle('dark');
}) 
// Adiciona o evento change e depois verifica nos arquivos atrás da class dark que está presente na class body no css, quando a encontra acontece uma troca de classes onde a class body vira dark.
