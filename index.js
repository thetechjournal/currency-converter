let btnExchange = document.getElementById("btn-exchange");
let outputText = document.getElementById("output-text");
let spanExchange = document.getElementById("span-exchange");
let originalCurrencyAmount, originalCurrency, exchangeRate;

// Get exchange rate by passing source and target currency units
const getExchangeRate = async (from, to) => {
    let req_url = `https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`;
    let res = await fetch(req_url);
    let data = await res.json();
    console.log('Data', data);
    return data.rates[to];
};

const styleOutputText = () => {
    outputText.style.fontWeight = "bold";
    outputText.style.fontSize = "30px";
    outputText.style.color = "#141878";
    spanExchange.style.display = "inline"
    document.getElementById("exchange-rate").style.display = "inline";
}

//Event Listeners 
btnExchange.addEventListener("click", async function() {
    originalCurrencyAmount = document.getElementById("original-currency-amount").value;
    originalCurrency = document.getElementById("original-currency-unit").value;
    newCurrencyUnit = document.getElementById("new-currency-unit").value;
    
    if(originalCurrencyAmount) 
        {
            styleOutputText();
            const exchangeRate = await getExchangeRate(originalCurrency, newCurrencyUnit);
            document.getElementById("exchange-rate").value = exchangeRate.toFixed(4);
            const val =  (exchangeRate * originalCurrencyAmount).toFixed(4);
            outputText.textContent = `${originalCurrencyAmount} ${originalCurrency} = ${val} ${newCurrencyUnit}` 
           
        }
    else {
            outputText.style.color = "red";
            outputText.textContent = `Please enter the currency value to convert.` 
    }

   
})





