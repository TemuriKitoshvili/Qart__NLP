import { useEffect, useState } from 'react';
import '../scss/Dashboard.scss';
import { useParams, Redirect, useHistory } from 'react-router-dom';
// hooks
import { useLocalStorage } from '../hooks/useLocalStorage';
// configs
import axios from './configs/axios';
import noty from './configs/noty';
import { auth } from './configs/firebase';
// state
import { useStateValue } from './state/stateProvider';
// components
import Lemetize from './toolsComponents/Lemetize';
import FreqDist from './toolsComponents/FreqDist';
import SearchWord from './toolsComponents/SearchWord';
import Loading from './helper/Loading';
// Material UI
import SelectForm from './Material-UI/SelectForm';
import AccordionModule from './Material-UI/AccordionModule';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SettingsIcon from '@material-ui/icons/Settings';

function Dashboard() {
  const [{ user, projects }, dispatch] = useStateValue();
  const { id } = useParams();
  const history = useHistory();
  // ? არ მინდა რო localstorage ში შეინახოს
  const [data, setData] = useLocalStorage('projectData', []);
  // const [data, setData] = useState([]);
  const [tool, setTool] = useState('lematization');
  // style states
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fileUrl = projects?.filter((project) => project.id === id)[0]?.data
      .projectFile;

    if (user) {
      auth.currentUser
        ?.getIdToken()
        .then((idToken) => {
          return idToken;
        })
        .then((token) => {
          return axios.get(`/processing?fileUrl=${fileUrl}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        })

        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          noty('პროექტის ჩატვირთვისას დაფიქსირდა შეცდომა', 'error');
          history.push('/dashboard');
        });
    }
  }, [id]);

  // for page refresh
  useEffect(() => {
    setLoading(false);
  }, []);

  return !loading ? (
    <div className='dashboard'>
      <div
        className={
          toggleSidebar
            ? 'dashboard__leftSidebar toggle'
            : 'dashboard__leftSidebar'
        }
      >
        <div className='project__lists'>
          <SelectForm id={id} />
        </div>

        <div className='project__tools'>
          <AccordionModule setTool={setTool} />
        </div>

        <div
          className='dashboard__toggleButon'
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <ArrowBackIosIcon />
        </div>
      </div>

      <div className='dashboard__mainContainer'>
        {tool === 'lematization' && (
          <Lemetize
            lematization={data['lematization']}
            statistics={data['statistics']}
          />
        )}
        {tool === 'freqDist' && <FreqDist freqDist={data['freqDist']} />}
        {tool === 'searchWord' && <SearchWord sentences={data['sentences']} />}

        <div className='sidebar__toggleButton'>
          <SettingsIcon onClick={() => setToggleSidebar(!toggleSidebar)} />
        </div>
      </div>
    </div>
  ) : (
    <Loading open={loading} />
  );
}

export default Dashboard;
