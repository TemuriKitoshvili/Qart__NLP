import { useState } from 'react';
import '../../scss/Lemetize.scss';
// components
import PopoverModule from '../Material-UI/PopoverModule';
import LemetizeWord from './LemetizeWord';
import Statistics from './Statistics';

function Lemetize({ lematization, statistics }) {
  const [lemWordData, setLemWordData] = useState(null);

  return (
    <div className='lematization'>
      <div className='lematization__text'>
        <h2>ტექსტის ლემატიზაცია</h2>
        <div className='lematization__text__container'>
          {lematization?.map((word) => (
            <div key={word.id}>
              <PopoverModule
                word={word}
                setLemWordData={setLemWordData}
              ></PopoverModule>
              <span> </span>
            </div>
          ))}
        </div>
        {lemWordData && (
          <LemetizeWord
            lemWordData={lemWordData}
            setLemWordData={setLemWordData}
          />
        )}
      </div>

      <div className='lematization__rightSidebar'>
        <h2>სტატისტიკა</h2>
        <Statistics statistics={statistics} />
      </div>
    </div>
  );
}

export default Lemetize;
