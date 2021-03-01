import { useState } from 'react';
import '../../scss/SearchWord.scss';

function SearchWord({ sentences }) {
  const [word, setWord] = useState('');

  return (
    <div className='searchWord'>
      <input
        type='text'
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />

      {sentences
        ?.filter((sentence) => sentence.includes(word))
        ?.map((sentence, index) => (
          <p key={index + 100}>{sentence}</p>
        ))}
    </div>
  );
}

export default SearchWord;

// todo
// ტეიბლი უნდა შევქმნათ და იმაში ჩაჯდეს
