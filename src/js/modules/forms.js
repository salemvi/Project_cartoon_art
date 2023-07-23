// import checkNumInputs from './checkNumInputs';

const forms = () => {

	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]'),
		windows = document.querySelectorAll('[data-modal]');


	// checkNumInputs('input[name="user_phone"]');


	const message = {
		loading: 'Загрузка...',
		success: 'Мы скоро с вами свяжемся!',
		failure: 'Что-то пошло не так',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png',
	}; 
	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	};

	const  postData = async (url, data) => {
		const result = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await result.text();
	};
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		});
	};
	//динамически меняем надпись после добавления изображения
	upload.forEach(item => {
		item.addEventListener('input', () => {
			console.log(item.files[0]);
			let dots;
			const arr = item.files[0].name.split('.');
			arr[0].length > 6 ? dots = '...' : dots = '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			statusMessage.appendChild(textMessage);

			const formData = new FormData(item);
			let api;
			item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
			console.log(api);
		
			postData(api, formData)
				.then(result => {
					console.log(result);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				}).catch(() => {
					statusImg.setAttribute('src' ,message.fail);
					textMessage.textContent = message.failure;
				}).finally(() => {
					clearInputs();
					// for(let key in modalState) {
					// 	delete modalState[key];
					// }
					setTimeout( () => {
						statusMessage.remove();
						item.style.display = 'block';
						item.classList.remove('fadeOutUp');
						item.classList.remove('fadeInUp');


						windows.forEach(item => {
							item.style.display = 'none';
						});
						document.body.style.overflow = 'visible';
					}, 3000);
				});
		});
	});

    

};
export default forms;