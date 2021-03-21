import React from 'react';
import * as d3 from 'd3';
import Cartogram from 'cartogram-chart';
class App extends React.Component {
 constructor(props){
    super(props);
    this.myRef = React.createRef(); 

    this.dataset = [100, 200, 300, 400, 500];
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
        
      );

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      console.log("incomgin color sclae", d3.scaleLinear() );
      console.log("incomgin cartogram", Cartogram())
      console.log("incomgin world id",document.getElementById('world'));
          Cartogram()
              .topoJson(world)
              .topoObjectName('countries')
              .iterations(120)
              .value(({ properties }) => properties.POP_EST)
              .color(({ properties: { ISO_A2 } }) => colorScale(ISO_A2))
              .label(({ properties: p }) => `Population of ${p.NAME} (${p.ISO_A2})`)
              .valFormatter(d3.format(".3s"))
              .onClick(d => console.info(d))
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