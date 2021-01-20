let currencyAmtSelector = document.getElementById("original-currency-amount");
let originalCurrencySelector =  document.getElementById("original-currency-unit");
let newCurrencyUnitSelector = document.getElementById("new-currency-unit");
let exchangeRateSelector = document.getElementById("exchange-rate");
let btnExchange = document.getElementById("btn-exchange");
let outputText = document.getElementById("output-text");
let spanExchange = document.getElementById("span-exchange");
let originalCurrencyAmount, originalCurrencyUnit;
let options, exchangeRates;

const select = document.querySelectorAll('select')

async function getExchangeRate(){

    let response = await fetch ('https://api.exchangeratesapi.io/latest?base=USD')
    let data = await response.json()
    const currencyUnits = Object.keys(data.rates)
    const rates = data.rates 

    currencyUnits.map((currency) => {
        options += `<option value=${currency}>${currency}</option>`;
    })

    originalCurrencySelector.innerHTML = options;
    newCurrencyUnitSelector.innerHTML = options;

    exchangeRates = rates;
}

getExchangeRate();

const styleOutputText = () => {
    outputText.style.fontWeight = "bold";
    outputText.style.fontSize = "30px";
    outputText.style.color = "#141878";
    spanExchange.style.display = "inline"
    document.getElementById("exchange-rate").style.display = "inline";
}

async function currencyConversion() {
    originalCurrencyAmount = currencyAmtSelector.value;
    originalCurrencyUnit = originalCurrencySelector.value;
    newCurrencyUnit = newCurrencyUnitSelector.value;

    if(!originalCurrencyAmount) {
        outputText.style.color = "red";
        outputText.textContent = `Please enter the currency value to convert.` 
    }
    else 
        {
            styleOutputText();
            const rate1 = exchangeRates[originalCurrencyUnit];
            const rate2 = exchangeRates[newCurrencyUnit];
            exchangeRate = (rate2/rate1).toFixed(4);
            totalAmt = (originalCurrencyAmount * exchangeRate).toFixed(4)
            exchangeRateSelector.value = (rate2/rate1).toFixed(4);
            outputText.textContent = `${originalCurrencyAmount} ${originalCurrencyUnit} = ${totalAmt} ${newCurrencyUnit}` 
           
        }
}

//Event Listeners 
btnExchange.addEventListener("click", currencyConversion);







