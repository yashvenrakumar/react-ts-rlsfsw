import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Chart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    // Define the chart dimensions and margins
    const margin = { top: 10, right: 20, bottom: 50, left: 50 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;

    // Define the data
    const data = [
      {
        date: new Date('2022-01-01'),
        open: 100,
        high: 110,
        low: 90,
        close: 105,
      },
      {
        date: new Date('2022-01-02'),
        open: 105,
        high: 115,
        low: 95,
        close: 100,
      },
      {
        date: new Date('2022-01-03'),
        open: 100,
        high: 105,
        low: 85,
        close: 95,
      },
      { date: new Date('2022-01-04'), open: 95, high: 100, low: 80, close: 90 },
      { date: new Date('2022-01-05'), open: 90, high: 95, low: 75, close: 85 },
      { date: new Date('2022-01-06'), open: 85, high: 90, low: 70, close: 80 },
      { date: new Date('2022-01-07'), open: 80, high: 85, low: 65, close: 75 },
      { date: new Date('2022-01-08'), open: 75, high: 80, low: 60, close: 70 },
      {
        date: new Date('2022-01-09'),
        open: 70,
        high: 175,
        low: 55,
        close: 165,
      },
      {
        date: new Date('2022-01-10'),
        open: 90,
        high: 120,
        low: 80,
        close: 110,
      },
      {
        date: new Date('2022-01-11'),
        open: 60,
        high: 165,
        low: 45,
        close: 155,
      },
      {
        date: new Date('2022-01-12'),
        open: 95,
        high: 125,
        low: 85,
        close: 115,
      },
      {
        date: new Date('2022-01-13'),
        open: 105,
        high: 135,
        low: 95,
        close: 125,
      },
      {
        date: new Date('2022-01-14'),
        open: 155,
        high: 145,
        low: 115,
        close: 135,
      },
      { date: new Date('2022-01-15'), open: 40, high: 45, low: 25, close: 35 },
      { date: new Date('2022-01-16'), open: 35, high: 40, low: 20, close: 30 },
      { date: new Date('2022-01-17'), open: 30, high: 35, low: 15, close: 25 },
      {
        date: new Date('2022-01-18'),
        open: 60,
        high: 165,
        low: 45,
        close: 155,
      },
      {
        date: new Date('2022-01-19'),
        open: 90,
        high: 120,
        low: 80,
        close: 110,
      },
      { date: new Date('2022-01-20'), open: 15, high: 20, low: 0, close: 10 },
      { date: new Date('2022-01-21'), open: 40, high: 45, low: 25, close: 35 },
    ];

    // Define the x and y scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
      .range([height - margin.bottom, margin.top]);

    // Define the x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Create candlestick rectangles
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.date) - 5)
      .attr('y', (d) => yScale(Math.max(d.open, d.close)))
      .attr('width', 10)
      .attr('height', (d) => Math.abs(yScale(d.open) - yScale(d.close)))
      .attr('fill', (d) => (d.open > d.close ? 'red' : 'green'));
    // Create wick lines

    svg
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.date))
      .attr('y1', (d) => yScale(d.high))
      .attr('x2', (d) => xScale(d.date))
      .attr('y2', (d) => yScale(d.low))
      .attr('stroke', (d) => (d.open > d.close ? 'red' : 'green'));

    // Append the x and y axes to the chart
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);
  }, []);

  return <svg ref={chartRef} width={750} height={400}></svg>;
}

export default Chart;
