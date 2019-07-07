class App {
	constructor(fundList){
		this.fundList = fundList;
	}
}

window.onload = function(){
	let fundList = [];
	$.getJSON('/js/fund.json',function(data) {
			$.each(data,function(index,value) {
				let fund = new Fund(value.number,value.name,value.current,value.endDate,value.total,value.investorList);
				fundList.push(fund);
			});
		});
	let app = new App(fundList);
}

function log(c){
	console.log(c);
}