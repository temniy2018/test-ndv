let newRate = {};
const tempExc = document.querySelector('#curExchange');
const selEntry = tempExc.content.querySelector('#entrySelect');
const selRes = tempExc.content.querySelector('#resultSelect');
const root = document.querySelector('#root');

export const setRateExc = (rate) => {
	newRate = rate;
}

const exchange = async () => {
	if ('content' in document.createElement('template')) {
		for (let key in newRate) {
			const opt = document.createElement('option');
			opt.textContent = newRate[key].Name;
			opt.value = key;
			selEntry.appendChild(opt);
			selRes.appendChild(opt.cloneNode(true));
		}

		const clone = document.importNode(tempExc.content, true);
		root.appendChild(clone);
	}
};

export const onExchange = () => {
	const entryValue = root.querySelector('#entrySelect').value;
	const resValue = root.querySelector('#resultSelect').value;
	const entryInputValue = root.querySelector('#entryInput').value;
	const result = root.querySelector('#result');
	if (entryValue === 'RU' && resValue === 'RU') {
		result.textContent = entryInputValue;
	} else if (entryValue === 'RU') {
		result.textContent = entryInputValue / newRate[resValue].Value;
	} else if (resValue === 'RU') {
		result.textContent = entryInputValue * newRate[entryValue].Value;
	} else {
		result.textContent = (newRate[entryValue].Value * entryInputValue) / newRate[resValue].Value;
	}
	if(entryInputValue === '') {
		result.textContent = 0;
	}
};

window.onExchange = onExchange;

export default exchange;