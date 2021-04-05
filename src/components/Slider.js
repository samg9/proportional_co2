import React from 'react';
// import './ImageLinkForm.css'

const Slider = ({onYearChange, currentYear}) => {

  return (
    <div>
          <input id="sliderbar" style={{ width:'50%', alignItems: 'center', marginLeft: '25%', zIndex:5}}
                type="range" id="volume" min="1809" max="2019"  step="10" onChange={onYearChange}/>
    </div>
  );


}
export default Slider;
