const modals =  (state) => {
	// получаем все модальные окна на странице (универсальный скрипт)
	let btnPressed = false;
	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll('[data-modal]'),
			gift = document.querySelector('.fixed-gift'),
			scroll = calcScroll();
		//нажатие на кнопку вызывает событие (forEach, потому что проходимся по 2 модальным окнам во 2 вызове)
		trigger.forEach(item => {
			let event = item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}
				btnPressed = true;
				if (modal.classList.contains('popup_calc_profile')) {
					if (!state.form || !state.height || !state.width) {
						event.removeEventListener();
					}	
				}
				if (modal.classList.contains('popup_calc_end')) {
					if (!state.type || !state.profile || !state.width) {
						event.removeEventListener();
					}
				}
				//при клике на подарок - иконка подарка исчезает
				if(destroy) {
					item.remove();
				}

				//закрытие всех модалок сразу
				windows.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animated', 'fadeIn');
				});
				//показываем модальное окно и запрещаем скролл
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				gift.style.marginRight = `${scroll}px`;
			});
		});
		//закрываем модальное окно и добавляем скролл
		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
				gift.style.marginRight = '0px';

			});
			
	
			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = '0px';
			

		});
		//реализация закрытия модалки при нажатии на обертку модалки
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				windows.forEach(item => {
					item.style.display = 'none';
				});
	
				modal.style.display = 'none';
				document.body.style.overflow = '';
			}
		});
		
	}
	function showModalByTime (selector, time) {
		setTimeout(() => {
			let display;
			document.querySelectorAll('[data-modal').forEach(item => {
				if(getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
			});
			if(!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = 'hidden';   
				let scroll = calcScroll();
				document.body.style.marginRight = `${scroll}px`;
				

			}
		}, time);
	}
	showModalByTime('.popup-consultation', 60000);

	function calcScroll() {
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';
		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	}
	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

			if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= 
				scrollHeight-2)) {
				document.querySelector(selector).click();

			}
		});
	}
	openByScroll('.fixed-gift');

	
	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close ');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

	// bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);

	
};
export default modals;