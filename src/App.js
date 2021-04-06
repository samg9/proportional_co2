import React from 'react';
import Slider from './components/Slider.js';
import World from './components/World.js';

const initialState = {
  year: 1809
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState;
 }
  onYearChange = (event) => {
   
    this.setState({ year: event.target.value });

    setTimeout(function(){ window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    })}
    , 850);
  }
  
  getGDPPerCapita({ properties: p }) {
    return p.GDP_MD_EST * 1e6 / p.POP_EST;
  }
 render(){
  return (
    <div ref={this.myRef}>
      
      <div><h3 style={{textAlign: 'center', marginBottom:'-10%', marginLeft: '80px',backgroundColor: 'white'}}>Countries scaled by co2 emission</h3></div>
      <World getGDPPerCapita={this.getGDPPerCapita} currentYear={this.state.year}/>
      
      <div style={{marginTop: '-8%'}}>
      <h5 style={{textAlign: 'center',marginTop: '-12%'}}>Year: {this.state.year}</h5>
      <Slider onYearChange={this.onYearChange} currentYear={this.state.year}/>
      </div>
    </div>
  );
 }
 
}
export default App;