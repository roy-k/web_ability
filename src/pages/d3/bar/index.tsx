import React, { useState, useEffect, useRef } from 'react'
import { fetch_acg17_articleGroupByCategory } from 'fetch/visualization'

import * as d3 from 'd3'
import d3tip from 'd3-tip'

interface CategoryDataItem {
    category: string
    count: number
    average: number
}

export default function AntdForm() {
    const [data, setData] = useState<CategoryDataItem[]>([])
    const chartRef = useRef<any>()

    useEffect(() => {
        fetch_acg17_articleGroupByCategory({}).then(res => {
            // console.log();
            setData(res)
            renderBarChart(res)
        })
    }, [])

    const renderBarChart = (data: CategoryDataItem[]) => {
        const margin = { top: 30, bottom: 20, left: 50, right: 20 }

        const len = data.length
        const keys = data.map(value => value.category)
        const values = data.map(value => value.average)

        const containerHeight = 368
        const containerWidth = chartRef.current?.parentElement?.offsetWidth || 500
        const height = containerHeight - margin.top - margin.bottom
        const width = containerWidth - margin.left - margin.bottom

        const barRoomWith = width / len
        const barOffset = 20
        const barWidth = barRoomWith - barOffset

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(values)!])
            .range([height, 0])
        const yAxis = d3.axisLeft(yScale)

        const xScale = d3


            .scaleBand()
            .domain(keys)
            .rangeRound([0, width])
        const xAxis = d3.axisBottom(xScale)

        const chart = d3
            .select('#bar-chart')
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .style('background', '#dff0d8')

        // tip
        // const tip = (d3tip as any)()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0])
        //     .html(function(d: any, i: number) {
        //         return (
        //             '<strong>星期' +
        //             i +
        //             "<br>空置率:</strong> <span style='color:#ffeb3b'>" +
        //             (i * 100).toFixed(2) +
        //             '%</span>'
        //         )
        //     })

        // 用于生成背景柱
        const stepArray = d3.ticks(0, d3.max(values)!, 10) // 用于生成背景柱
        const colors = ['#ccc', '#ddd']
        chart
            .append('g')
            .attr('class', 'bar-bg-bar')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .selectAll('rect')
            .data(d3.range(stepArray.length - 1))
            .enter()
            .append('rect')
            .attr('fill', (d, i) => {
                return colors[i % 2]
            })
            .attr('x', 1)
            .attr('y', (d, i) => {
                return yScale((i + 1) * stepArray[1])
            })
            .attr('width', width)
            .attr('height', function(d, i) {
                return yScale(stepArray[i]) - yScale(stepArray[i + 1])
            })
        

        // var colors = d3.scaleLinear()
        // .domain([0, data.length*.33, data.length*.66, data.length])
        // .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1'])

        chart
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            // todo 同时设置多个样式
            // .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
            .style('fill', '#3c763d')

            .style('stroke', '#d6e9c6')
            .style('stroke-width', '2')
            .attr('width', barRoomWith - barOffset)
            .attr('x', function(data, i) {
                return i * barRoomWith + barOffset / 2
            })
            .attr('height', function(data: any) {
                return 0
            })
            .attr('y', function(data: any) {
                const min = yScale.domain()[0]
                return yScale(min)
            })
            .on('mouseover', function() {
                d3.select(this)
                    .transition()
                    .duration(200) //当鼠标放在矩形上时，矩形变成黄色
                    .style('fill', 'yellow')
            })
            .on('mouseout', function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style('fill', '#3c763d')
            })
            .transition()
            .duration(700)
            .delay((d, i) => {
                return i * 100
            })
            .attr('height', function(data: any) {
                return height - yScale(data.average)
            })
            .attr('y', function(data: any) {
                return yScale(data.average)
            })
        //   .on('mouseout', tip.hide)
        // chart
        chart.append('g').attr('class', 'bar-tip')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .html(function(d, i) {
                return (
                    '<strong>星期' +
                    i +
                    "<br>空置率:</strong> <span style='color:#ffeb3b'>" +
                    (i * 100).toFixed(2) +
                    '%</span>'
                )
            })

        // 坐标轴
        chart
            .append('g')
            .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
            .call(xAxis)
        chart
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(yAxis)

        chart
            .append('g')
            .attr('class', 'bar-text')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('fill', 'orange')
            .attr('font-size', '14px')
            .attr('text-anchor', 'middle')
            .on('mouseover', () => {
                console.log('over')
            })
            .attr('x', (data, i) => {
                return xScale(data.category) as any
            })
            .attr('y', data => {
                const min = yScale.domain()[0]
                return yScale(min)
            })
            .attr('dx', barWidth + barWidth / 2) // barOffset / 2
            .attr('dy', '1em')
            .text(data => {
                return data.average + '条记录'
            })
            .transition()
            .duration(700)
            .delay((d, i) => {
                return i * 100
            })
            .attr('y', data => {
                return yScale(data.average)
            })
    }

    return (
        <div>
            <div id="bar-chart" ref={chartRef}></div>
        </div>
    )
}
