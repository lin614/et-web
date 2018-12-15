import echarts from 'echarts'
export default {
    backgroundColor: "#1b1b1b",
    title: {
        text: "",
        textStyle: {
            fontWeight: "normal",
            fontSize: 12,
            color: "#F1F1F3"
        },
        left: "6%"
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            lineStyle: {
                color: "#57617B"
            }
        }
    },
    grid: {
        show: false
    },
    xAxis: [{
        show: false,
        type: "category",
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: "#57617B"
            }
        },
        data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
        ],
        axisLabel: {
            interval: 0,
            rotate: 50,
            textStyle: {
                fontSize: 12
            }
        }
    }],
    yAxis: [{
        show: false,
        type: "value",
        interval: 40,
        max: 120,
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#57617B"
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: 12
            }
        },
        splitLine: {
            lineStyle: {
                color: "#57617B"
            }
        }
    }],
    series: [{
        name: "党费",
        type: "line",
        smooth: true,
        lineStyle: {
            normal: {
                width: 1
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [{
                            offset: 0,
                            color: "rgba(82, 191, 255, 0.3)"
                        },
                        {
                            offset: 0.8,
                            color: "rgba(82, 191, 255, 0)"
                        }
                    ],
                    false
                ),
                // shadowColor: "rgba(228, 139, 76, 0.1)",
                // shadowBlur: 10
            }
        },
        symbolSize: 4,
        itemStyle: {
            normal: {
                color: "rgb(82, 191, 255)",
                borderColor: "#e48b4c"
            }
        },
        // data: datas
    }]
}