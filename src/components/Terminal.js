import { useState } from 'react';
import '../scss/Terminal.scss';
// configs
import axios from './configs/axios';

function Terminal() {
  // save command from input
  const [command, setCommand] = useState('');
  // incorrect command
  const [error, setError] = useState(false);
  // save result from command
  const [result, setResult] = useState([]);
  // result is procesed or not
  const [processed, setProcessed] = useState(false);

  const commands = {
    ბრძანებები: [
      'ბრძანებები',
      'წაშლა',
      'შესახებ',
      "ნლპ 'სასურველი წინადადება დასამუშავებლად'",
    ],
    გასუფთავება: [],
    შესახებ: [
      'ვებგვერდი წარმოადგენს ქართლი ენის ციფრული დამუშავების ხელსაწყოების ნაკრებს. ტერმინალში შეგიძლიათ შეიყვანოთ სასურველი წინადადება დასამუშავებლად.',
    ],
    ნლპ: ['შეიყვანეთ: ნლპ "სასურველი წინადადება დასამუშავებლად"'],
  };

  const handleComand = (e) => {
    if (e.key === 'Enter') {
      if (commands[command]) {
        setProcessed(false);
        setResult(commands[command]);
        setError(false);
      } else if (command.startsWith('ნლპ ')) {
        const text = command.split('ნლპ ')[1];
        axios
          .get(`/terminal?text=${text}`)
          .then((res) => {
            setProcessed(true);
            setResult(res?.data?.lematization);
          })
          .catch((err) => {
            setProcessed(false);
            setResult([` წინადადება '${text}' დამუშავება ვერ მოხერხდა.`]);
          });
      } else {
        setProcessed(false);
        setResult([
          ` ტერმინი '${command}' არ არის აღიარებული, როგორც ფუნქციის, სკრიპტის ფაილის ან მოქმედი პროგრამის სახელი. შეამოწმეთ სახელის მართლწერა, ან თუ მისამართი იყო ჩასმული, დარწმუნდით, რომ სწორია და ისევ სცადეთ.`,
        ]);
        setError(true);
      }
      setCommand('');
    }
  };

  return (
    <div className='terminal'>
      <div className='terminal__container'>
        <div className='terminal__container__comand'>
          <label htmlFor='terminal'>
            <span>~/ენა</span>
            <span>/ქართული{'>'}</span>
          </label>
          <input
            type='text'
            placeholder="შეიყვანეთ სიტყვა 'ბრძანებები', რომ ნახოთ ბრძანებები"
            autoFocus
            autoComplete='off'
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleComand}
          />
        </div>
        <div className='terminal__result'>
          {processed
            ? result?.map((res) => (
                <p key={res?.id} className='successResult'>
                  <span className='result__arrows'>{'>>>  '}</span>
                  <span className='result__text'>
                    <span style={{ color: res.color }}>{res?.word}</span>
                    {'  -  '}
                    <span>{res?.tags?.map((tag) => `${tag} `)}</span>
                  </span>
                </p>
              ))
            : result?.map((res, index) => (
                <p
                  key={index + 16548}
                  className={error ? 'errorResult' : 'successResult'}
                >
                  <span className='result__arrows'>{'>>>  '}</span>
                  {res}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Terminal;
