import '../../scss/LemetizeWord.scss';

// Material UI
import CloseIcon from '@material-ui/icons/Close';

function LemetizeWord({ lemWordData, setLemWordData }) {
  return (
    <div className='lemetizeWord'>
      <div className='lemetizeWord__data'>
        <p>სიტყვა: {lemWordData.word}</p>
        <p>ლემა: {lemWordData.lem}</p>
        <p>მორფოლოგია: {lemWordData.tags?.map((tag) => `${tag} `)}</p>
      </div>

      <div className='lemetizeWord__close__button'>
        <CloseIcon onClick={() => setLemWordData(null)} />
      </div>
    </div>
  );
}

export default LemetizeWord;
