import React, { useEffect, useRef } from 'react'

import * as d3 from 'd3'
import { Row, Col } from 'antd'

export interface D3StepProps {}
function D3Step(props: D3StepProps) {
    const aRef = useRef<any>()
    useEffect(() => {
        const margin = { top: 60, bottom: 60, left: 60, right: 60 }
        const dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20]

        const ctx = d3.select('.a')

        const ContainerWidth = aRef.current?.parentElement?.offsetWidth || 500
        const ContainerHeight = 380

        const width = ContainerWidth - margin.left - margin.right
        const height = ContainerHeight - margin.top - margin.bottom

        const chart = ctx
            .append('svg')
            .attr('width', ContainerWidth)
            .attr('height', ContainerHeight)

        var xScale = d3
            .scaleBand()
            .domain(d3.range(dataset.length) as any)
            .rangeRound([0, width])

        var xAxis = d3.axisBottom(xScale)

        var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(dataset)!])
            .range([height, 0])

        var yAxis = d3.axisLeft(yScale)

        chart
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(yAxis)

        chart
            .append('g')
            .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
            .call(xAxis)

        var gs = chart
            .selectAll('.rect')
            .data(dataset)
            .enter()
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        var rectPadding = 20 //矩形之间的间隙

        gs.append('rect')
            .attr('x', function(d, i) {
                return (xScale('' + i) || 0) + rectPadding / 2
            })
            .attr('y', function(d) {
                // y 是反着算的
                return yScale(d)
            })
            .attr('width', function() {
                return xScale.step() - rectPadding
            })
            .attr('height', function(d) {
                return height - yScale(d)
            })
            .attr('fill', 'blue')

        gs.append('text')
            .attr('x', function(d, i) {
                return xScale('' + i)! + rectPadding / 2
            })
            .attr('y', function(d) {
                return yScale(d)
            })
            .attr('dx', function() {
                console.log(xScale.step(), ( xScale.step() - rectPadding) / 2);
                // 定位为中心, 但是还没有计算文字宽度
                return ( xScale.step() - rectPadding) / 2
            })
            .attr('dy', -10)
            .text(function(d) {
                return d
            })

    }, [])

    return (
        <div>
            <Row gutter={20}>
                <Col span={12}>
                    <div ref={aRef} className='a' style={{backgroundColor: '#ccc'}}></div>
                </Col>
                <Col span={12}></Col>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Row>
        </div>
    )
}

export default D3Step
