// import { useState } from "react";
import { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import '../scss/Console.scss';
// configs
import axios from './configs/axios';
import noty from './configs/noty';
// state
import { useStateValue } from './state/stateProvider';
// Conponents
import Project from './Project';
import Loading from './helper/Loading';
// Material UI
import AddProject from './AddProject';
import { actionTypes } from './state/actionTypes';
import { auth } from './configs/firebase';

function Console() {
  const [{ user, projects }, dispatch] = useStateValue();
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(user, projects);

  useEffect(() => {
    setLoading(true);
    console.log('დარეფრეშდა', refresh);
    if (user) {
      auth.currentUser
        ?.getIdToken()
        .then((idToken) => {
          return idToken;
        })
        .then((token) => {
          return axios.get('/projects', {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        })
        .then((res) => {
          dispatch({
            type: actionTypes.SET_PROJECTS,
            payload: {
              projects: res.data,
            },
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: actionTypes.SET_PROJECTS,
            payload: {
              projects: [],
            },
          });
          setLoading(false);
          noty('პროექტების ჩატვირთვისას დაფიქსირდა შეცდომა', 'error');
          // სავააუდოდ ან სეთთაიმაუთი გავუწეროთ
          history.push('/');
        });
    } else {
      // ეს ალბათ უნდა ამოვშალო პროექტები ისედაც ცარიელი ერეია
      dispatch({
        type: actionTypes.SET_PROJECTS,
        payload: {
          projects: [],
        },
      });
    }
  }, [refresh, user]);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  return (
    <div className='console'>
      {/* test */}
      <div className='console__background'></div>

      <div className='console__container'>
        <div className='console__addProject'>
          <div className='console__createProject'>
            <AddProject refresh={refresh} setRefresh={setRefresh} />
          </div>
          <Link to='/'>
            <h3>დემო პროექტი</h3>
          </Link>
        </div>

        {projects?.length > 0 ? (
          projects?.map((project) => (
            <div key={project.id}>
              <Link to={`/dashboard/${project.id}`}>
                <Project
                  key={project.id}
                  data={project.data}
                  createdAt={project.createdAt}
                />
              </Link>
            </div>
          ))
        ) : (
          <Loading open={loading} />
        )}
      </div>
    </div>
  );
}

export default Console;
