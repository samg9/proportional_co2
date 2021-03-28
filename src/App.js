import React from 'react';
import * as d3 from 'd3';
import Cartogram from 'cartogram-chart';
class App extends React.Component {
  getGDPPerCapita({ properties: p }) {
    // console.log(p,p.POP_EST, p.GDP_MD_EST );
    var v = 0; 
    try {
      v = p[1999].co2*1e6;
    }catch(err){
      console.log(err)
      v = 1e6;
    }
    return v;
}
 constructor(props){
    super(props);
    this.myRef = React.createRef(); 

    // this.dataset = [100, 200, 300, 400, 500];
 }
 componentDidMount(){
    console.log(this.myRef);
    const node  = this.myRef.current;
    d3.json('./countries_with_co2.json').then(world => {
      world.objects.countries.geometries.splice(
        world.objects.countries.geometries.findIndex(d => d.properties.ISO_A2 === 'AQ'), //remove antartica?
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