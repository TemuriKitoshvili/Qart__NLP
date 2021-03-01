import '../scss/Home.scss';
// components
import Terminal from './Terminal';

function Home() {
  return (
    <div className='home'>
      <div className='home__title'>
        <h1>ქართული ენა ციფრულ სამყაროში</h1>
      </div>
      <div className='home__demo'>
        <div className='home__demo__text'>
          <p>
            პორტალი წარმოადგენს ქართული ენის ციფრული დამუშავების ხელსაწყოების
            ნაკრებს.
          </p>
          {/* <div className='home__demo__text__buttons'>
            <button>რეგისტრაცია</button>
            <button>კონსოლი</button>
          </div> */}
        </div>
        <div className='home__demo__terminal'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default Home;
