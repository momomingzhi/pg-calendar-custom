import {CalendarComponent,InputComponent} from "./calendar";

let state = {};
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

CalendarComponent() // 전부 디폴트값으로 들어감

InputComponent({
	state : state, // 선택한 날짜값 return 받는 넣어주는 객체 넣기
	placeholder : '날짜 선택',
	format : 'YY-MM-DD', // default 형태는 YYY-MM-DD
	multiple:false,
	minDate : '2023-01-06', // YYY-MM-DD 형식에 맞춰서 쓰기 default로는 오늘부터~ 선택 가능
	maxDate : '', // YYY-MM-DD
	week : 0, // 0[sun]~6까지
	next : function (...props){
		//props 0에 {type: 'next', year: 2023, month: 2, day: 1} 로 정보를 받아올 수 있음
		console.log({props})
	},
	prev : function (...props){
		//props 0에 {type: 'next', year: 2023, month: 2, day: 1} 로 정보를 받아올 수 있음
		console.log({props})
	},
	html : 'main' // 이 달력을 붙이려는 부모 tag 적어주기
})

