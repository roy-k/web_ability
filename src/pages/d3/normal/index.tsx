import React, { useState, useEffect, useRef } from 'react'
import { fetch_acg17_articleGroupByCategory } from 'fetch/visualization'

import * as d3 from 'd3'

export default function AntdForm() {
    
    const [data, setData] = useState([])
    const chartRef = useRef<any>()

    useEffect(() => {
        fetch_acg17_articleGroupByCategory({}).then(res => {
            // console.log();
            setData(res)
            renderBarChart(res)
        })
    }, [])

    const renderBarChart = (data: any[]) => {
        const values = data.map(value => value.count)
        const height = 368
        const width = chartRef.current?.parentElement?.offsetWidth || 500

        //  the width of each bar and the offset between each bar
        const barWidth = 40
        const barOffset = 20

// var yScale = d3.scale.linear()
//         .domain([0, d3.max(chartdata)])
//         .range([0, height])

        const yScale = d3.scaleLinear().domain([0, d3.max(values)]).range([10, height - 10])

        d3.select('#bar-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#dff0d8')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            // todo 同时设置多个样式
            // .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
            .style('fill', '#3c763d')
            .style('stroke', '#d6e9c6')
            .style('stroke-width', '5')
            .attr('width', barWidth)
            .attr('height', function(data: any) {
                return yScale(data.count)
            })
            .attr('x', function(data, i) {
                return i * (barWidth + barOffset)
            })
            .attr('y', function(data: any) {
                return height - yScale(data.count)
            })
    }

    return (
        <div>
            <div id="bar-chart" ref={chartRef}></div>
        </div>
    )
}
