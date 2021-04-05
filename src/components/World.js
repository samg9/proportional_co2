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
            if(p.ISO_A2 === "FK" || p.ISO_A2 === "TF" || p.ISO_A2 === "NC" || p[year].co2===NaN || isNaN(p[year].co2*1)|| p[year].co2*1 === null || p[year].co2*1 === "undefined" || p[year].co2*1===NaN){
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
            
            const colorScale = d3.scaleSequential(d3.interpolatePlasma)
                                .domain([0, Math.max(...world.objects.countries.geometries.map(this.getGDP))]);
            const currYear = this.props.currentYear;
            d3.select("#volume").append('svg');
                Cartogram()
                    // .width(2500)
                    // .height(250)
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
            .style("margin-left","38.5%")
            .style("padding-top","-100%")
            .style("padding-left", "10%")
            .style("padding-right", "10%")
            .style("border", "2px solid black")
            .style("background-clip", "content-box")
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
