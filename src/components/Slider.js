import React from 'react';
// import './ImageLinkForm.css'

const Slider = ({onYearChange}) => {

  return (
    <div>
      <b className=' w-80 f1 white '>Couleur</b>
      <h4 className='light-purple'>Displays color palette for each post on a public instagram account</h4>
      <b className=' w-80 f3 white '>
        Enter instagram username
      </b>


      <div className='center'>
        <div className='form  center pa4 br3 shadow-5'>
          <input className=' f4 pa3 w-70 center' type='tex' onChange={onInputChange} />

          <select className="form-control form-control-lg" defaultValue="6" onChange={onPaletteSizeChange}>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
          <button className=' w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >
            Detect
      </button>
        </div>
      </div>
    </div>
  );


}
export default Slider;
