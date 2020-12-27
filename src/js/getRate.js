let newRate = {};
let liked = JSON.parse(localStorage.getItem('liked')) || [];

const setLiked = (name) => {
	liked.push(name);
	localStorage.removeItem('liked');
	localStorage.setItem('liked', JSON.stringify(liked));
	liked = JSON.parse(localStorage.getItem('liked')) || [];
	getRate();
};

const deleteLiked = (name) => {
	liked.splice(liked.indexOf(name), 1);
	localStorage.removeItem('liked');
	localStorage.setItem('liked', JSON.stringify(liked));
	liked = JSON.parse(localStorage.getItem('liked')) || [];
	getRate();
};

window.setLiked = setLiked;
window.deleteLiked = deleteLiked;

export const setRate = (rate) => {
	newRate = rate;
};

const getRate = () => {
	if ('content' in document.createElement('template')) {
		const root = document.querySelector('#root');
		root.innerHTML = null;
		const tempExc = document.querySelector('#getRate');
		const exc = tempExc.content.querySelector('.exchange');
		exc.innerHTML = null;

		for (let key in newRate) {
			const p = document.createElement('p');
			p.textContent = newRate[key].Name + ': ';
			const span = document.createElement('span');
			span.textContent = newRate[key].Value;
			p.appendChild(span);
			if (liked.find((el) => el === key)) {
				const like = document.createElement('span');
				like.innerHTML = `<span class='liked' onclick={deleteLiked('${key}')}>Избранное</span>`
				p.appendChild(like);
				exc.prepend(p);
			} else {
				const like = document.createElement('span');
				like.innerHTML = `<span class='like' onclick={setLiked('${key}')}>В избранное</span>`
				p.appendChild(like);
				exc.append(p);
			}
		}

		const clone = document.importNode(tempExc.content, true);
		root.appendChild(clone);
	}
};

export default getRate;
