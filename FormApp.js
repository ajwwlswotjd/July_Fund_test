class FormApp {
	constructor(fundList){
		this.fundList = fundList;
		this.numberList = [];
		this.fundList.forEach(x=>{
			this.numberList.push(x.num);
		});

		$("#fund-num").val(this.getRandomFundNum());
		$('#tlqkf').on("click",()=>{
			this.registerFund();
		});
		$("#fund-total").on("keydown",(e)=>{
			if(e.keyCode==110||e.keyCode==190){
				return false;
			}
		});
	}

	getRandomFundNum(){
		let value="";
		while(true){
			value="";
			let checked = true;
			value+=String.fromCharCode(Math.floor(Math.random()*26)+65);
			for(let i=0; i<4;i++){
				value+=Math.floor(Math.random()*10);
			}
			this.numberList.forEach(x=>{
				if(value==x){
					checked=false;
				}
			});
			if(checked){
			 	break;
			}
		}
		return value;
	}

	registerFund(){ // 유효성 검사
		let today = new Date();
		let value = $('#fund-date').val();
		if($("#fund-name").val()==""){
			this.toast("펀드 이름이 누락되었습니다.");
			$("#fund-name").focus();
			return;
		}
		if(value==""){
			this.toast("펀드 모집 날짜가 누락되었습니다.");
			$("#fund-date").focus();
			return;
		}
		if (today > new Date(value)) {
			this.toast("펀드 모집 날짜가 지났습니다.");
			$("#fund-date").focus();
			return;
		}
		if($("#fund-total").val()==""){
			this.toast("펀드 모집 금액이 누락되었습니다.");
			$("#fund-total").focus();
			return;
		}
		if($("#fund-detail").val()==""){
			this.toast("펀드 상세설명이 누락되었습니다.");
			$("#fund-detail").focus();
			return;
		}
		if($("#fund-file").val()==""){
			this.toast("펀드 이미지파일이 누락되었습니다.");
			let bool = false;
			let cnt = 0;
			let frame = setInterval(()=>{
				bool=!bool;
				cnt++;
				if(bool){
					$(".label-container").css({transform : "scale(1.12)"});
				}else {
					$(".label-container").css({transform : "scale(1.0)"});
				}
				if(cnt==10) clearInterval(frame);
			},400);
			return;
		}
		let file = document.querySelector("#fund-file").files[0];
		let type = file['type'].split("/")[0];
		if(type!="image"){
			this.toast("이미지파일만 업로드 할수 있습니다.");
			let bool = false;
			let cnt = 0;
			let frame = setInterval(()=>{
				bool=!bool;
				cnt++;
				if(bool){
					$(".label-container").css({transform : "scale(1.12)"});
				}else {
					$(".label-container").css({transform : "scale(1.0)"});
				}
				if(cnt==10) clearInterval(frame);
			},400);
			return;
		}
		if(file['size'] > 5*1024*1024){
			this.toast("파일 용량이 너무 큽니다 .(5MB이하)");
			return;
		}
		if(!this.checkSpecial($("#fund-name").val())){
			this.toast("펀드명은 특수문자를 포함할 수 없습니다.");
			return;
		}

		//여기서부터 통과

	}

	toast(msg){
		let toast = document.createElement("div");
		toast.classList.add('toast');
		toast.innerHTML = `<div class="toast-close">&times;</div><p>${msg}</p>`;
		document.querySelector(".toast-wrapper").prepend(toast);
		toast.querySelector(".toast-close").addEventListener("click",()=>{
			toast.style.display = "none";
		});
		setTimeout(()=>{
			toast.querySelector(".toast-close").click();
		},3000);
	}

	checkSpecial(value){
		let pat = /[~!@#$%^&*()_+|<>?:{}]/;
		return !pat.test(value);
	}
}


window.onload = function(){
	let fundList = [];
	$.getJSON('/js/fund.json',function(data) {
		$.each(data,function(index, value) {
			fundList.push(new Fund(value.number,value.name,value.current,value.endDate,value.total,value.investorList));
		});
		let formApp = new FormApp(fundList);
	});	
}


function log(c){
	console.log(c);
}