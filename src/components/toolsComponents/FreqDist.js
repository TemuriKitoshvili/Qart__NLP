import { useState } from 'react';
import '../../scss/FreqDist.scss';

// Material UI
import { Slider } from '@material-ui/core';

function FreqDist({ freqDist }) {
  const [slaiderValue, setslaiderValue] = useState(0);

  return (
    <div className='freqDist'>
      <div className='freqDist_data'>
        <h2>სიხშირის განაწილება</h2>
        {freqDist
          ?.filter((word) => word.frequency <= slaiderValue)
          .map((word) => (
            <p key={word.id}>
              <span>{word.word}</span>
              <span>{word.frequency}</span>
            </p>
          ))}
      </div>

      <div className='freqDist_rightSidebar'>
        <h2>ფილტრი</h2>
        <div className='freqDist__dataFilters'>
          <div className='slider'>
            <span>{freqDist && freqDist[freqDist?.length - 1].frequency}</span>
            <Slider
              defaultValue={10}
              getAriaValueText={(value) => setslaiderValue(value)}
              aria-labelledby='discrete-slider'
              valueLabelDisplay='auto'
              step={1}
              marks
              min={freqDist && freqDist[freqDist?.length - 1].frequency}
              max={freqDist && freqDist[0].frequency}
            />
            <span>{freqDist && freqDist[0].frequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreqDist;

// todo
// სიტყვაზე დაკლიკებით გვაჩვენოს მხოლოდ ის წინადადებები, სადაც ეს სიტყვა არის გამოყენებული
