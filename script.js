//Variables
const currencySelectorFrom = document.querySelector(".currency__selector-from");
const currencySelectorTo = document.querySelector(".currency__selector-to");

const currencyAmountFrom = document.querySelector(".currency__amount-from");
const currencyAmountTo = document.querySelector(".currency__amount-to");

const swapButton = document.querySelector(".swap-rate-container__btn");
const rateText = document.querySelector(".rate");

calculate();

//Fetch exchange rates using the API and update DOM
function calculate() {
	const currencyFrom = currencySelectorFrom.value;
	const currencyTo = currencySelectorTo.value;

	fetch(`https://prime.exchangerate-api.com/v5/3a537a00bedaf46af0a81856/latest/${currencyFrom}`)
		.then(res => res.json())
		.then(data => {
			const rate = data.conversion_rates[currencyTo];
			rateText.innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}`;
			currencyAmountTo.value = (currencyAmountFrom.value * rate).toFixed(2);
		});

}

//Event Listeners
currencySelectorFrom.addEventListener("change", calculate);
currencySelectorTo.addEventListener("change", calculate);
currencyAmountFrom.addEventListener("input", calculate);
currencyAmountTo.addEventListener("input", calculate);
swapButton.addEventListener("click", e => {
	const temp = currencySelectorFrom.value;
	currencySelectorFrom.value = currencySelectorTo.value;
	currencySelectorTo.value = temp;
	calculate();
});