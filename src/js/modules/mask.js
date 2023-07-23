const mask = (selector) => {
// 1 арг - позиция, 2 арг - элементо, который сейчас в работе
	let setCursorPosition = (position, element) =>{
		//установили фокус на элементе
		element.focus;
		//если у браузера есть этот метож
		if(element.setSelectionRange) {
			//начальная и конечная позиция
			element.setSelectionRange(position, position);
			//если у браузера нет метода, то используем аналогичный, более старый
		} else if (element.createTextRange) {
			//устанавливаем диапазон на основе нашего элемента
			let range = element.createTextRange();
			// объединяем 1 и последнюю позицию диапазона 
			range.collapse(true);
			//устанавливаем конечную точку выделения, 1 арг - сам сивол, 2 арг - его позиция
			range.moveEnd('character', position);
			//устанавливаем начальную точку выделения, 1 арг - сам сивол, 2 арг - его позиция
			range.moveStart('character', position);
			//устанавливаем курсор и выделяем сформированное значение 2 арг выше (end и start)
			range.select();
		}
	};
	function createMask(event) {
		let matrix = '+7 (___) ___ __ __',
			iterator = 0,
			def = matrix.replace(/\D/g, ''),
			value = this.value.replace(/\D/g, '');

		if(def.length >= value.length) {
			value = def;
		}
		this.value = matrix.replace(/./g, (a) => {
			return /[_\d]/.test(a) && iterator < value.length ? value.charAt(iterator++) : iterator >= value.length ? '' : a;
		});
		//если пользователь перестал что-то вводить
		if (event.type === 'blur') {
			//если кол-во символов = 2, очищаем input пользователя
			if (this.value.length === 2) {
				this.value = '';
			}
			// если произошло событие focus или input (пользователь наведен)
		} else {
			// устанавливаем позицию курсора, 1 арг - кол-во символов в инпуте, 2 арг - ссылка на элемент, который находится в работе
			setCursorPosition(this.value.length, this);
		}
	}
	let inputs = document.querySelectorAll(selector);
	//навешиваем все нужные обработчики событий
	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
		input.addEventListener('keypress', createMask);

        
	});
    
    
};
export default mask;