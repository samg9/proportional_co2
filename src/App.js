import React from 'react';
import * as d3 from 'd3';
import Cartogram from 'cartogram-chart';
class App extends React.Component {
  getGDPPerCapita({ properties: p }) {
    return p.GDP_MD_EST * 1e6 / p.POP_EST;
}
 constructor(props){
    super(props);
    this.myRef = React.createRef(); 

    // this.dataset = [100, 200, 300, 400, 500];
 }
 componentDidMount(){
    console.log(this.myRef);
    const node  = this.myRef.current;
    const myChart = Cartogram();
    console.log(myChart);
    d3.json('./ne_110m_admin_0_countries.json').then(world => {
      console.log(world.objects);
      world.objects.countries.geometries.splice(
                world.objects.countries.geometries.findIndex(d => d.properties.ISO_A2 === 'AQ'),
                1
            );

            const colorScale = d3.scaleSequential(d3.interpolatePlasma)
                .domain([0, Math.max(...world.objects.countries.geometries.map(this.getGDPPerCapita))]);

            Cartogram()
                .topoJson(world)
                .topoObjectName('countries')
                .value(this.getGDPPerCapita)
                .color(f => colorScale(this.getGDPPerCapita(f)))
                .label(({ properties: p }) => `GDP of ${p.NAME} (${p.ISO_A2})`)
                .units(' per capita')
                .valFormatter(d3.format('$,.0f'))
              (node);
    }).catch((err)=> console.log("incomgin ERr",err));
    // d3.select(this.myRef.current)
    //  .append('p')
    //  .text('Hello from D3');
    //  let size = 500;
    //  let svg = d3.select(this.myRef.current)
    //              .append('svg')
    //              .attr('width', size)
    //              .attr('height', size);
    //              let rect_width = 95;
    //              svg.selectAll('rect')
    //                 .data(this.dataset)
    //                 .enter()
    //                 .append('rect')
    //                 .attr('x', (d, i) => 5 + i*(rect_width + 5))
    //                 .attr('y', d => size - d)
    //                 .attr('width', rect_width)
    //                 .attr('height', d => d)
    //                 .attr('fill', 'teal');
 }
 render(){
  return (
    <div ref={this.myRef}>
      <div className="world"></div>
    </div>
  );
 }
 
}
export default App;