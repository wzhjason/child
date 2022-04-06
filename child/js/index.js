//当前时间
var year;
var month;
var nyr;
var ny;
function getDate(){
	var rq = document.getElementById("rq");
	var date = new Date();
	year = date.getFullYear();
	month = date.getMonth() + 1;
	var day = date.getDate();
	var time = "";
	var c = ":";   
	var month_s;
	var day_s;
	
	if(month<10){
		month_s="0"+month;
	}
	if(day<10){
		day_s="0"+day;
	}
	
	nyr = year+'-'+month_s+'-'+day_s;
	ny = year+'-'+month_s;
	$("#rq").attr("value",ny)
	$("#now").attr("value",nyr)
}

function init(){
	getDate();
	createLeftE6();
}

function query(){
	createLeftE6();
	alert("查询完成")
}

function getData(key){
	return localStorage.getItem(key);
}

function save(key, para){
	localStorage.setItem(key, para);
}

function submit(){
	var key = $("#now").val();
	var tw = $("#wd").val();
	var chose = $("#chose option:selected").val();
	
	var para = {
			"tw":tw,
			"chose":chose
		};
	para = JSON.stringify(para);
	save(key, para);
	alert("提交成功");
}

function createLeftE6(){
	var label = new Array();
	var data_1 = new Array();
	var label_2 = new Array();
	
	var choseDate = $("#rq").val();
	var year_cx = choseDate.substring(0,4);
	var month_cx = choseDate.substring(5);

	var day1 = new Date(year_cx, month_cx, 0);
	var day_num = day1.getDate();

	var d_cx;
	for(i=1;i<=day_num;i++){
		label.push(i);
		
		if(i<10){
			d_cx="0"+i;
		}else{
			d_cx = i;
		}
		var key = year_cx+'-'+month_cx+'-'+d_cx
		var para = JSON.parse(getData(key));
		if(para == null || para == '' || para == 'null'){
			data_1.push(30);
		    label_2.push('')
		}else{
			var tw_cx = para['tw'];
			var chose_cx = para['chose'];
			
			if(chose_cx == '1'){
				label_2.push('')
			}else if(chose_cx == '2'){
				label_2.push('◆')
			}else{
				label_2.push('▲')
			}
			
			if(tw_cx == '' || tw_cx == null){
				tw_cx = 30;
			}
			data_1.push(tw_cx);
		}
	}
	
	var chartDom = document.getElementById("tw");
	var myChart = echarts.init(chartDom); 
	option = {
		legend:{
			show:false,
			textStyle:{
				color:"#FFF"
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params){
				return params[0].value+"℃"
			}
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					formatter: '{value}',
					fontSize: 14,
					margin: 20,
					textStyle: {
						color: 'black',
					},
				},
				axisLine: {
					lineStyle: {
						color: '#243753'
					},
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'blue',
					},
				},
				axisTick: {
					show: true,
				},
				data: label,
			},{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					formatter: '{value}',
					fontSize: 14,
					margin: 20,
					textStyle: {
						color: 'black',
					},
				},
				axisLine: {
					lineStyle: {
						color: '#243753'
					},
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'blue',
					},
				},
				axisTick: {
					show: true,
				},
				data: label_2,
			}
		],
		yAxis: [
			{
				interval:0.5,
				min:30,
				max:40,
				boundaryGap: true,
				type: 'value',
				axisLabel: {
					textStyle: {
						color: 'black',
					},
					formatter: '{value}'+'℃',
				},
				nameTextStyle: {
					color: '#fff',
					fontSize: 12,
					lineHeight: 40,
				},
				splitLine: {
					lineStyle: {
						color: 'blue'
					},
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#283352'
					},
				},
				axisTick: {
					show: true,
				},
			},
		],
		series: [
			{
				name: '体温',
				type: 'line',
				smooth: true,
				showSymbol: true,
				symbolSize: 8,
				zlevel: 3,
				itemStyle: {
					color: '#EB982B',
					borderColor: '#a3c8d8',
				},
				lineStyle: {
					normal: {
						width: 2,
						color: '#EB982B',
					},
				},
				data: data_1,
			}
		],
	};

	myChart.setOption(option);
}