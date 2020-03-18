import React, { useState, useEffect, useRef } from 'react'
import { fetch_acg17_articleGroupByCategory } from 'fetch/visualization'

import * as d3 from 'd3'
import d3tip from 'd3-tip'

interface CategoryDataItem {
    category: string
    count: number
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
        const values = data.map(value => value.count)

        const containerHeight = 368
        const containerWidth = chartRef.current?.parentElement?.offsetWidth || 500
        const height = containerHeight - margin.top - margin.bottom
        const width = containerWidth - margin.left - margin.bottom

        const barRoomWith = width / len
        const barOffset = 20
        const barWidth = barRoomWith - barOffset

        //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
        var colorScale = d3
            .scaleOrdinal()
            .domain(d3.range(data.length) as any)
            .range(d3.schemeCategory10)

        const pie = d3.pie()

        const innerRadius = 50
        const outerRadius = 150
        const arc_generator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        const pieData = pie(values)

        console.log(pieData)

        const chart = d3
            .select('#bar-chart')
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .style('background', '#dff0d8')

        var gs = chart
            .selectAll('.g')
            .data(pieData)
            .enter()
            .append('g')
            .attr('transform', 'translate(' + containerWidth / 2 + ',' + containerHeight / 2 + ')')

        gs.append('path')
            .attr('d', function(data) {
                return arc_generator(data as any)
            })
            .attr('fill', function(d, i) {
                return colorScale('' + i) as any
            })

        gs.append('text')
            .attr('transform', function(data) {
                return `translate(${arc_generator.centroid(data as any)})`
            })
            .attr('text-anchor', 'middle')
            .text(function(data, i) {
                return data.data as any // `${keys[i]}`
            })
    }

    return (
        <div>
            <div id="bar-chart" ref={chartRef}></div>
        </div>
    )
}
