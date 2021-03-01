import { useState } from 'react';
import '../scss/AddProject.scss';
// configs
import axios from './configs/axios';
import noty from './configs/noty';
import { auth } from './configs/firebase';
// state
import { useStateValue } from './state/stateProvider';
// Components
import ModalBox from './Material-UI/ModalBox';
// Material UI
import AddIcon from '@material-ui/icons/Add';
// import { Redirect } from "react-router-dom";

function AddProject({ refresh, setRefresh }) {
  const [{ user, projects }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectFile, setProjectFile] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('შემოვიდა და რა შემოვიდსაააა');

    if (user) {
      const formData = new FormData();
      formData.append('name', projectName);
      formData.append('description', projectDescription);
      formData.append('file', projectFile);

      console.log(formData);

      auth.currentUser
        ?.getIdToken()
        .then((idToken) => {
          return idToken;
        })
        .then((token) => {
          return axios.post(`/addProject`, formData, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
        })
        .then((res) =>
          res.status === 201
            ? noty(`პროექტი ' ${projectName} ' წარმატებით აიტვირთა`, 'info')
            : noty('დაფიქსირდა შეცდომა', 'warning')
        )
        .catch((err) => noty('დაფიქსირდა შეცდომა', 'error'));
    }

    setRefresh(!refresh);
    setOpen(false);
    setActiveStep(0);
    setProjectName('');
    setProjectDescription('');
    setProjectFile(null);
  };

  // const fileRef = storageRef
  //   .ref(`${user}/${projectFile.name}`)
  //   .put(projectFile);
  // fileRef.on(
  //   'state_changed',
  //   (snapshot) => {},
  //   (error) => console.log(error),
  //   () => {}
  // );

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("შემოვიდა და რა შემოვიდსაააა");

  //   if (user) {
  //     const fileRef = storageRef
  //       .ref(`${user}/${projectFile.name}`)
  //       .put(projectFile);
  //     fileRef.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       (error) => console.log(error),
  //       () => {}
  //     );

  //     auth.currentUser
  //       ?.getIdToken()
  //       .then((idToken) => {
  //         return idToken;
  //       })
  //       .then((token) => {
  //         return axios.post(
  //           `/addProject`,
  //           {
  //             projectName,
  //             projectFile: projectFile.name,
  //             projectDescription,
  //           },
  //           {
  //             headers: {
  //               authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //       })
  //       .then((res) =>
  //         res.status === 201
  //           ? noty(`პროექტი ' ${projectName} ' წარმატებით აიტვირთა`, "info")
  //           : noty("დაფიქსირდა შეცდომა", "warning")
  //       )
  //       .catch((err) => noty("დაფიქსირდა შეცდომა", "error"));

  //     setOpen(false);
  //     setActiveStep(0);
  //     setProjectName("");
  //     setProjectFile(null);
  //     setRefresh(!refresh);
  //   }
  // };

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        <AddIcon />
        <span>პროექტის დამატება</span>
      </button>
      <ModalBox
        open={open}
        setOpen={setOpen}
        projectName={projectName}
        setProjectName={setProjectName}
        projectDescription={projectDescription}
        setProjectDescription={setProjectDescription}
        projectFile={projectFile}
        setProjectFile={setProjectFile}
        submitHandler={submitHandler}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </>
  );
}

export default AddProject;
