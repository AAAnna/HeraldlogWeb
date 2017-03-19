var jRes;
var date;
var api_order;
var every_hour_count;
var ios_version;
var android_version;
var device_distribute;

var APIChart = echarts.init(document.getElementById('API'));

var hourChart=echarts.init(document.getElementById('hour'));

var iosChart=echarts.init(document.getElementById('ios_version'));

var androidChart=echarts.init(document.getElementById('android_version'));


function adddate(){
    date=document.getElementById("datepicker").value;
    console.log(date);
    request();
}
function defaultdate(){
        var myDate = new Date();    
        var y=myDate.getFullYear().toString();
        var month=(myDate.getMonth()+1);
        var m;
        if(month<10)
            m='0'+month.toString();
        else
            m=month.toString();
        var d=(myDate.getDate()-1).toString();
        date=y+m+d;
        request();
}
function request(){
  var turl = "http://139.129.4.159:7000/herald/api/v1/log";
    $.ajax({
        type: 'POST',
        url: turl, 
        crossDomain: true,
        data: {
            "date_start":date,
           // "date_cnt" : 2
        },
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) { 
            jRes = responseData.content;
            api_order = jRes[0]['api_order'];
			every_hour_count = jRes[0]['every_hour_count'];
            ios_version=jRes[0]['ios_version'];
            android_version=jRes[0]['android_version'];
            device_distribute=jRes[0]['device_distribute'];

            API();EveryHour();IOSvertion(); androidVerion();  
},          
            error: function(responseData, textStatus, errorThrown) {
                 alert('POST failed.');
            }
    });
}


function API(){
     APIChart.setOption(
                {
                    grid:{
                        show:true,
                        borderWidth:'#ffe5e5'
                    },
                    title: {
                        textStyle: {
                            color: "#eee",
                            fontFamily: "Microsoft YaHei",
                            fontSize: 30,
                            fontStyle: "normal",
                            fontWeight: "border"
                        },
                        text: '每日API调用',
                        left:'center'
                    },
                    tooltip: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    legend:{
                        textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                        data:['次数'],
                        x:'right'
                    },
                    xAxis: {
                        data: Object.keys(api_order)
                    },
                    yAxis: {},
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            xAxisIndex: [0],
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: [0],
                            left: '93%',
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            start: 0,
                            end: 70
                        },
                        {
                            type: 'inside',
                            yAxisIndex: [0],
                            start: 0,
                            end: 100
                        }
                    ],
                    textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    series: [
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#7ca3b6'},
                                            {offset: 0.5, color: '#507B90'},
                                            {offset: 1, color: '#375462'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#375462'},
                                            {offset: 0.7, color: '#507B90'},
                                            {offset: 1, color: '#7ca3b6'}
                                        ]
                                    )
                                }
                            },
                            data: Object.values(api_order),
                            name:"次数"
                        }
                    ]
            });
}

function EveryHour(){
                hourChart.setOption({
                    title: {
                        textStyle: {
                            color: "#eee",
                            fontFamily: "Microsoft YaHei",
                            fontSize: 18,
                            fontStyle: "normal",
                            fontWeight: "border"
                        },
                        text: '每小时访问量',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        },
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    legend:{
                        textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                        data:['次数']
                    },
                    xAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#eee'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        name:"小时",
                        data: Object.keys(every_hour_count)
                    },
                    yAxis: {},
                    textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                    series:[
                        {
                            type:"line",
                            data:Object.values(every_hour_count),
                            name:"count",
                            smooth:true,
                            itemStyle: {
                                normal: {
                                    color: '#7ca3b6',
                                    lineStyle: {
                                        color: '#507B90'
                                    }
                                    // areaStyle: {
                                    //     color: '#adc6d1'
                                    // }
                                }
                            },
                            animationEasing:"bounceOut"
                        }
                    ]
            })
}
function caculateIos(){
    var v8=[];var v9=[];var v10=[];var value=0;var value1=0;var value2=0;var value3=0;var value4=0;
    var value=[0,0,0,0,0];
        for(var i in ios_version){
            if(/8.0.*/.test(i)){
                value[0]+=ios_version[i];
            }
            if(/8.1.*/.test(i)){
                value[1]+=ios_version[i];
            }
            if(/8.2.*/.test(i)){
                value[2]+=ios_version[i];
            }
            if(/8.3.*/.test(i)){
                value[3]+=ios_version[i];
            }
            if(/8.4.*/.test(i)){
                value[4]+=ios_version[i];
            }
        } 
        for(var i=0;i<value.length;i++){
            if(value[i]!=0&&value[i]>=100)
                v8.push({
                        value:value[i],
                        name:"8."+i+".*"
                });
    }

        value=[0,0,0,0,0];
        for(var i in ios_version){
            if(/9.0.*/.test(i)){
                value[0]+=ios_version[i];
            }
            if(/9.1.*/.test(i)){
                value[1]+=ios_version[i];
            }
            if(/9.2.*/.test(i)){
                value[2]+=ios_version[i];
            }
            if(/9.3.*/.test(i)){
                value[3]+=ios_version[i];
            }
            if(/9.4.*/.test(i)){
                value[4]+=ios_version[i];
            }
        }
        for(var i=0;i<value.length;i++){
            if(value[i]!=0&&value[i]>=100)
                v9.push({
                        value:value[i],
                        name:"9."+i+".*"
                });
    }
        value=[0,0,0,0,0];
        for(var i in ios_version){
            if(/10.0.*/.test(i)){
                value[0]+=ios_version[i];
            }
             if(/10.1.*/.test(i)){
                value[1]+=ios_version[i];
            }
            if(/10.2.*/.test(i)){
                value[2]+=ios_version[i];
            }
            if(/10.3.*/.test(i)){
                value[3]+=ios_version[i];
            }
            if(/10.4.*/.test(i)){
                value[4]+=ios_version[i];
            }
        } 
        
        for(var i=0;i<value.length;i++){
                 if(value[i]!=0&&value[i]>=100)
                    v10.push({
                            value:value[i],
                            name:"10."+i+".*"
                    });
        }
    var res=v8.concat(v9,v10);
    return res;
}
function IOSvertion(){
     var res=caculateIos();
     var legendDate=[];
     for(var i=0;i<res.length;i++){
        legendDate.push(res[i].name);
     }
     console.log(legendDate);
            iosChart.setOption({
                title : {
                    textStyle: {
                            color: "#eee",
                            fontFamily: "Microsoft YaHei",
                            fontSize: 18,
                            fontStyle: "normal",
                            fontWeight: "border"
                        },
                    text: 'IOS版本信息',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                   orient: 'vertical',
                    x: 'right',
                    y:'center',
                    data:legendDate
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                series : [{
                        selectedMode:true,
                        name:'用户数量',
                        type:'pie',
                        radius : [80, 250],
                        //center : ['75%', '50%'],
                        //roseType : 'area',
                        roseType : 'radius',
                        data:res,
                        minAngle:20
                }]
            });
}

function androidVerion(){
    var deviceRes=[];
    for(var i in device_distribute){
        deviceRes.push({
            value:device_distribute[i],
            name:i
         });
    }
    androidChart.setOption({
                title : {
                    textStyle: {
                            color: "#eee",
                            fontFamily: "Microsoft YaHei",
                            fontSize: 18,
                            fontStyle: "normal",
                            fontWeight: "border"
                        },
                    text: '设备信息',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                   textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                   orient: 'vertical',
                    x: 'right',
                    y:'center',
                   data:Object.keys(device_distribute)
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                textStyle: {
                        color: "#eee",
                        fontFamily: "Microsoft YaHei",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: "normal"
                    },
                calculable : true,
                series : [{
                    selectedMode:true,
                        name:'用户数量',
                        type:'pie',
                       // radius:'60%',
                        radius : [40,'60%'],
                        //center : ['75%', '50%'],
                        roseType : 'radius',
                        //roseType : 'angle',
                        minAngle:30,
                        data:deviceRes.sort(function (a, b) { return a.value - b.value})
                }]
                
            });
}