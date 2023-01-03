class Calendar{
	constructor(placeholder,format,minDate,maxDate,multiple,week,next,prev,html,state,component) {
		this.placeholder = placeholder;
		this.format = format;
		this.minDate = minDate;
		this.maxDate = maxDate;
		this.multiple = multiple;
		this.week = week;
		this.state = {};
		this.next = next;
		this.prev = prev;
		this.html = html;
		this.state = state;
		this.component = component;

	}
	createCalendar=()=>{
		const newDiv = document.createElement("div");
		const att = document.createAttribute("class");
		att.value = "calendar";
		newDiv.setAttributeNode(att)
		const $main = document.getElementById(this.html);
		$main.appendChild(newDiv);

	}
	settingCalendar=()=>{
		const formatDate = (date) => date && date?.toISOString()?.split('T')[0];
		const handleNext = (info,context) =>{
			this.next(info,context)
		}
		const handlePrev = (info,context) =>{
			this.prev(info,context)
		}
		const handleChange = (dates, context)=>{
			if(this.component == 'default' || this.multiple){
				this.state =  dates.map(x=>x?._i);
			}else{
				this.state = context.element[0].value;

			}
		}
		const tag = this.component === 'default' ? 'div' : 'input'
		$(`${tag}.calendar`).attr("placeholder", this.placeholder ?? '날짜를 선택해주세요')
		$(`${tag}.calendar`).pignoseCalendar({
			format: this.format ?? 'YYYY-MM-DD',
			minDate : !this.minDate.length ? formatDate(new Date()) : this.minDate,
			maxDate : formatDate(this.maxDate),
			select:handleChange,
			multiple : this.multiple,
			next:handleNext,
			prev : handlePrev,
			 week:this.week ?? 0,

		});
	}
}

class InputCalendar extends Calendar{
	constructor(placeholder,format,minDate,maxDate,multiple,week,next,prev,html,state,component) {
		super(placeholder,format,minDate,maxDate,multiple,week,next,prev,html,state,component);
	}
	createCalendar=()=>{
		const newInput = document.createElement("input");
		const att = document.createAttribute("class");
		att.value = "calendar";
		newInput.setAttributeNode(att);
		const $main = document.querySelector('main');
		$main.appendChild(newInput);

	}
}
export function CalendarComponent(props){
	if(typeof props !== 'object'){
		//object가 아니면 or 전부 디폴트 값으로 할거라면
		props = {
			placeholder : '날짜를 선택해주세요',
			format : 'YYYY-MM-DD',
			minDate : '',
			maxDate : '',
			multiple : false,
			week:0,
			next : ()=>{},
			prev : ()=>{},
			html : 'main',
			state : {},
		}
	}
	const {
		placeholder = '날짜를 선택해주세요',
		format = 'YYYY-MM-DD',
		minDate = '',
		maxDate = '',
		multiple = false,
		week = 0,
		next = ()=>{},
		prev = ()=>{},
		html = 'main',
		state = {},
	} = props;

	const defaultCalendar = new Calendar(
		placeholder,
		format,
		minDate,
		maxDate,
		multiple,
		week,
		next,
		prev,
		html,
		state,
		'default'
	)
	defaultCalendar.createCalendar();
	defaultCalendar.settingCalendar();
}

export function InputComponent(props){
	if(typeof props !== 'object'){
		//object가 아니면 or 전부 디폴트 값으로 할거라면
		props = {
			placeholder : '날짜를 선택해주세요',
			format : 'YYYY-MM-DD',
			minDate : '',
			maxDate : '',
			multiple : false,
			week:0,
			next : ()=>{},
			prev : ()=>{},
			html : 'main',
			state : {},
		}
	}
	let {
		placeholder,
		format = 'YYYY-MM-DD',
		minDate = '',
		maxDate = '',
		multiple = false,
		week = 0,
		next = ()=>{},
		prev = ()=>{},
		html = 'main',
		state = {},
	} = props;

	const Input = new InputCalendar(
		placeholder,
		format,
		minDate,
		maxDate,
		multiple,
		week,
		next,
		prev,
		html,
		state,
		'input',
	)
	Input.createCalendar();
	Input.settingCalendar();
}

