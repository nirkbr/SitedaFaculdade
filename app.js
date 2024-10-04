const apiKey = 'afd77d447ddc0c1cb525a824'; // Minha chave da API
const apiURL = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/'; //A Url do site da API

// Pegando os códigos das moedas e seus nomes.
const currencyNames = {
    USD: 'Dólar',
    CAD: 'Dólar Canadense',
    AUD: 'Dólar Australiano',
    NZD: 'Dólar Neozelandês',
    BRL: 'Real',
    JPY: 'Yen Japonês',
    CNH: 'Yuan Chinês'
};

const currencyFlags = {
    USD: 'path/to/flags/usd.png',
    CAD: 'path/to/flags/cad.png',
    AUD: 'path/to/flags/aud.png',
    NZD: 'path/to/flags/nzd.png',
    BRL: 'path/to/flags/brl.png',
    JPY: 'path/to/flags/jpy.png',
    CNH: 'path/to/flags/cnh.png'
}

async function getExchangeRate(from) {
    const response = await fetch(apiURL + from.toUpperCase());
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        throw new Error('Erro ao buscar dados da API: ' + (errorData.message || 'Resposta inválida'));
    }
    const data = await response.json();
    return data.conversion_rates; // Retorna todas as taxas de câmbio
}

async function clicar() {
    const valor = parseFloat(document.getElementById('valor').value);
    const fromCurrency = document.getElementById('from').value; 
    const toCurrency = document.getElementById('to').value; 
    const resultadoElement = document.getElementById('local_do_resultado'); // Pega o elemento onde o resultado será exibido.

    

    // Limpa o resultado anterior
    resultadoElement.innerHTML = '';

    if (isNaN(valor)) {
        resultadoElement.innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    if (fromCurrency === toCurrency) {
        resultadoElement.innerHTML = "As moedas de origem e destino não podem ser iguais.";
        return;
    }

    try {
        const conversionRates = await getExchangeRate(fromCurrency);
        const taxa = conversionRates[toCurrency.toUpperCase()]; // Busca a taxa de câmbio
        if (!taxa) {
            throw new Error('Taxa de câmbio não encontrada.');
        }
        const resultado = (valor * taxa).toFixed(2);

        // Obtém os nomes das moedas
        const fromCurrencyName = currencyNames[fromCurrency.toUpperCase()];
        const toCurrencyName = currencyNames[toCurrency.toUpperCase()];

        // Exibe o resultado dentro do elemento <p id="local_do_resultado">
        resultadoElement.innerHTML = `${valor} ${fromCurrencyName} (${fromCurrency.toUpperCase()}) = ${resultado} ${toCurrencyName} (${toCurrency.toUpperCase()})`;


    } catch (error) {
        console.error(error);
        resultadoElement.innerHTML = "Ocorreu um erro ao converter a moeda: " + error.message;
    }
}

let caixaDeChecagem = document.getElementById('caixaDeChecagem');

let conversor_style = document.getElementById("conversor_style ");

caixaDeChecagem.addEventListener('change', () => {
    document.body.classList.toggle('dark');
})

conversor_style.addEventListener('change', () => {
    document.conversor_style.classList.toggle('escuro');
})