class Component {
	$target;
	$state;

	constructor($target) {
		this.$target = $target;
		this.setup();
		this.render();
	}
	setup() {}
	template() {
		return false;
	}
	render() {
		this.$target.innerHTML = this.template();
		hljs.highlightAll();
		this.setEvent();
	}
	setEvent() {}
	setState(newState) {
		this.$state = { ...this.$state, ...newState };
		console.log('####:', this.$state);
		this.render();
	}
}

class App extends Component {
	setup() {
		this.$state = {
			select: '1_html',
			changeMonth: [false, false, false, false],
			items: [
				{
					title: '기본',
					className: `basic`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `$(function() {
						        $('.basic .calendar').pignoseCalendar();
						 });`,
					option: {},
				},
				{
					title: '범위로 날짜 지정하기',
					className: `multiple`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `$(function() {
					                $('.basic .calendar').pignoseCalendar({
					                    multiple: true
								    });
								});`,
					option: {
						multiple: true,
					},
				},
				{
					title: '특정 날짜 선택하지 못하게 하기',
					className: `notSelectedDate`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `
							$(function() {
						        $('.calendar').pignoseCalendar({
						            disabledDates: [moment().add(-1, 'd').format('YYYY-MM-DD')],
						        });
							});
						`,
					option: {
						disabledDates: [moment().add(-1, 'd').format('YYYY-MM-DD')],
					},
				},
				{
					title: '주말 선택 불가하게 하기',
					className: `notSelectedWeekend`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `$(function() {
						        $('.calendar').pignoseCalendar(
						        {
						            disabledWeekdays: [0, 6]    
						        });
							});
						`,
					option: {
						disabledWeekdays: [0, 6],
					},
				},
				{
					title: '오늘 날짜 비활성화',
					className: `disabledToday`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `
							$(function() {
						        $('.calendar').pignoseCalendar({
						            format: 'YYYY.MM.DD',
						            disabledDates: [moment().format('YYYY-MM-DD')],
						        });
							});
						`,
					option: {
						format: 'YYYY.MM.DD',
						disabledDates: [moment().format('YYYY-MM-DD')],
					},
				},
				{
					title: '최소, 최대 구간 정하고 날짜 지정하기',
					className: `minMax`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `
							$(function() {
						        $('.calendar').pignoseCalendar({
						            minDate: moment().add(-1, 'd').format('YYYY-MM-DD'),
						            maxDate: moment().add(7, 'd').format('YYYY-MM-DD'),
						        });
							});
						`,
					option: {
						minDate: moment().add(-1, 'd').format('YYYY-MM-DD'),
						maxDate: moment().add(7, 'd').format('YYYY-MM-DD'),
					},
				},
				{
					title: '한주 단위로 선택하기',
					className: `oneWeek`,
					html: `<xmp><div class="calendar"></div></xmp>`,
					js: `
							$(function() {
						        $('.calendar').pignoseCalendar({
						            pickWeeks: true,
						            multiple: true,
						        });
							});
						`,
					option: {
						pickWeeks: true,
						multiple: true,
					},
				},
				{
					title: 'input 태그로 눌러서 달력 열기',
					className: `input`,
					html: `<xmp><input class="calendar" /></xmp>`,
					js: `
							$(function() {
						        $('input.calendar').pignoseCalendar();
							});
						`,
					option: {},
				},
				// {
				// 	title: '기본',
				// 	className: `basic`,
				// 	html: `<xmp><div class="calendar"></div></xmp>`,
				// 	js: `
				// 			$(function() {
				// 		        $('.basic .calendar').pignoseCalendar();
				// 			});
				// 		`,
				// 	option: {},
				// },
				// {
				// 	title: '기본',
				// 	className: `basic`,
				// 	html: `<xmp><div class="calendar"></div></xmp>`,
				// 	js: `
				// 			$(function() {
				// 		        $('.basic .calendar').pignoseCalendar();
				// 			});
				// 		`,
				// 	option: {},
				// },
			],
		};
	}
	template() {
		const { items, select } = this.$state;
		const [optionIdx, option] = select.split('_');
		return items
			.map((item, idx) => {
				return `<section class="${item.className}">
				<h2>${item.title}</h2>
				<div class="code-section">
					<ul class="tab">
						<li class="" value="${idx}_html">HTML</li>
						<li class="active" value="${idx}_js">Java Script</li>
					</ul>
					<div>
						<pre>
							<code class="language-javascript">${idx == optionIdx && option == 'html' ? item.html : item.js.replace(/\t/g, '')}</code>
						</pre>
					</div>
				</div>
			</section>
			`;
			})
			.join('');
	}
	calendarTemplate() {
		const changeCalendar = this.$state.changeMonth;
		const $monthTag = this.$target.getElementsByClassName('pignose-calendar-top-month');
		for (let i = 0; i < changeCalendar.length; i++) {
			if (!changeCalendar[i]) continue;
			const $select = document.createElement('select');

			for (let i = 0; i < 12; i++) {
				let $option = document.createElement('option');
				$option.value = `${i}`;
				$option.innerHTML = `${i}`;
				$select.appendChild($option);
			}
			$monthTag[0].appendChild($select);
			console.log('들어옴', $monthTag[0], $select);
		}
	}
	createSelect() {
		const $monthTag = this.$target.getElementsByClassName('pignose-calendar-top-month');
		const $select = document.createElement('select');
		const changeMonth = this.$state.changeMonth;
		for (let i = 0; i < 12; i++) {
			let $option = document.createElement('option');
			$option.value = `${i}`;
			$option.innerHTML = `${i}`;
			$select.appendChild($option);
		}
		for (let month = 0; month < $monthTag.length; month++) {
			$monthTag[month].addEventListener('click', () => {
				if (!$monthTag[month].querySelector('select')) {
					const newChangeMonth = [...changeMonth];
					newChangeMonth[month] = true;
					this.setState({
						changeMonth: newChangeMonth,
					});
					$monthTag[month].appendChild($select);
				}
			});
		}

		// if(selectFlag){
		// 	$monthTag[0].appendChild($select)
		// }
	}
	setIndexList() {
		const $liList = document.querySelectorAll('main > ul > li');
		for (let i = 0; i < $liList.length; i++) {
			$liList[i].addEventListener('click', function () {
				window.scrollTo({
					top: $sectionList[i]?.offsetTop - 50,
					behavior: 'smooth',
				});
			});
		}
	}
	setEvent() {
		const $tabList = this.$target.querySelectorAll('ul li');
		const $sectionList = this.$target.querySelectorAll('section');
		const selectedItem = this.$state.items;

		const [index, option] = this.$state.select.split('_');
		const handleActive = (toggle) => {
			$tabList[2 * Number(index) + 1].setAttribute('class', toggle ? 'active' : '');
			$tabList[2 * Number(index)].setAttribute('class', toggle ? '' : 'active');
		};

		for (let i = 0; i < $sectionList.length; i++) {
			const tag = $sectionList[i].className === 'input' ? 'input' : 'div';
			const element = document.createElement(tag);
			element.setAttribute('class', 'calendar');
			$sectionList[i].insertBefore(element, $sectionList[i].childNodes[2]);
			(function () {
				$(`.${$sectionList[i].className} .calendar`).pignoseCalendar(selectedItem[i].option);
			})();
		}
		for (let i = 0; i < $tabList.length; i++) {
			$tabList[i].addEventListener('click', () => {
				this.setState({
					select: $tabList[i].attributes['value'].value,
				});
			});
		}
		handleActive(option === 'js');
		this.createSelect();
	}
}
new App(document.querySelector('section'));
/*

CalendarComponent : 일반 달력 형태
InputComponent : input 태그를 눌렀을 때 나오는 팝업 형태

기능
placeholder
format : 포맷 날짜 설정하기
multiple : 처음~마지막날까지 범위 고르기
minDate : 최소 선택가능한 날짜
maxDate : 최대 선택 가능할 날짜
week : 무슨 요일부터 시작할지

default 값
* placeholder : 날짜를 선택해주세요
* format : YY-MM-DD
* multiple : false
* minDate : 오늘날짜부터 고르기 가능
* maxDate : default 없음
* week : 일요일부터 시작
* html : main

옵션은 객체 형태로 넣어주기

* */

// CalendarComponent() // 전부 디폴트값으로 들어감
//
// InputComponent({
// 	state : state, // 선택한 날짜값 return 받는 넣어주는 객체 넣기
// 	placeholder : '날짜 선택',
// 	format : 'YY-MM-DD', // default 형태는 YYY-MM-DD
// 	multiple:false,
// 	minDate : '2023-01-06', // YYY-MM-DD 형식에 맞춰서 쓰기 default로는 오늘부터~ 선택 가능
// 	maxDate : '', // YYY-MM-DD
// 	week : 0, // 0[sun]~6까지
// 	next : function (...props){
// 		//props 0에 {type: 'next', year: 2023, month: 2, day: 1} 로 정보를 받아올 수 있음
// 		console.log({props})
// 	},
// 	prev : function (...props){
// 		//props 0에 {type: 'next', year: 2023, month: 2, day: 1} 로 정보를 받아올 수 있음
// 		console.log({props})
// 	},
// 	html : 'main' // 이 달력을 붙이려는 부모 tag 적어주기
// })
