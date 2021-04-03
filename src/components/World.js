import React, {Component} from 'react';
import * as d3 from 'd3';
import Cartogram from 'cartogram-chart';



export default class World extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    getGDP({properties:p}){
        return p.GDP_MD_EST * 1e6 / p.POP_EST;
    }

    getYearCo2({properties:p}, year){
        if(!year){
            year = this.props.currentYear;
        }
        
        
        try{
            if(p[year].co2===NaN || isNaN(p[year].co2*10)|| p[year].co2*10 === null || p[year].co2*10 === "undefined" || p[year].co2*10===NaN){
                console.log("No co2 data for year", year, "country:", p.NAME);
                return 1;
            }else{
                return p[year].co2*1;
            }
            
            
        }catch (err){
            return 1;
        }
    }

    renderMap(){
        const node  = this.myRef.current;
        d3.json('./countries_with_co2.json').then(world => {
            world.objects.countries.geometries.splice(
                world.objects.countries.geometries.findIndex(d => d.properties.ISO_A2 === 'AQ'), //remove antartica?
                1
            );
            console.log("incoming world", world);
            d3.select(node).on("click", function(){
                console.log("clicked on this",this)
            })
            
            const colorScale = d3.scaleSequential(d3.interpolatePlasma)
                                .domain([0, Math.max(...world.objects.countries.geometries.map(this.getGDP))]);
            const currYear = this.props.currentYear;
            d3.select("#volume").append('svg');
                Cartogram()
                    .topoJson(world)
                    .topoObjectName('countries')
                    .value(p => this.getYearCo2(p,this.props.year))
                    .color(f => colorScale(this.getGDP(f)))
                    .label(({ properties: p }) => `co2 produced by ${p.NAME} (${p.ISO_A2})`)
                    .units(' Million tons')
                    .valFormatter(d3.format('.0f'))
                    (node)
            d3.select(node).append("text")      // text label for the x axis
            .style("text-anchor", "middle")
            .style("margin-left","48.5%")
            .style("margin-bottom","5%")
            .text(`${this.props.currentYear}`);
            
        }).catch((err)=> console.log("incomgin ERr",err));
    }
    
    
    componentDidMount(){
        this.renderMap();
    }

    componentDidUpdate(){
        this.renderMap();
    }

    



    render(){
        return (
          <div ref={this.myRef}>
          </div>
        );
    }
}
