import React from 'react';

const Slider = ({onYearChange}) => {

  return (
    <div>
          <input id="sliderbar" style={{ width:'50%', alignItems: 'center', marginLeft: '25%'}}
                type="range" id="volume" min="1809" max="2019"  step="10" onChange={onYearChange}/>
    </div>
  );


}
export default Slider;
