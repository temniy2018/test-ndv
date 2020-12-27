import exchange, { setRateExc } from './exchange.js';
import getRate, { setRate } from './getRate.js';

const root = document.querySelector('#root');
let rate = {};

export const onClickExchange = () => {
	root.innerHTML = null;
	exchange();
};

export const onClickCurExchange = () => {
	getRate();
};

window.onClickCurExchange = onClickCurExchange;
window.onClickExchange = onClickExchange;

export const getNewRate = async () => {
	const responce = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
	const json = await responce.json();
	rate = json.Valute;
	setRateExc(rate);
	setRate(rate);
};

getNewRate().then(() => onClickExchange());
