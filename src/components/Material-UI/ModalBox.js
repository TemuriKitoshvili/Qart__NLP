// Material UI
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core';

export default function ModalBox({
  open,
  setOpen,
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projectFile,
  setProjectFile,
  submitHandler,
  activeStep,
  setActiveStep,
}) {
  const steps = [
    {
      label: 'პროექტის დასახელება',
      stepText: `პროექტის სახელის მინიჭება არის აუცილებელი და არის პროექტის იდენტიფიკატორი. მისი შეცვლა არ არის შესაძლებელი.`,
      required: projectName,
    },
    {
      label: 'პროექტის აღწერა',
      stepText: `შეგიძლიათ დაამატოთ პროექტის აღწერა.`,
      required: true,
    },
    {
      label: 'ფაილი',
      stepText: `შესაძლებელია ატვირთოთ .txt, .pdf გაფართოვების ფაილები. თითო პროექტზე შესაძლებელია მხოლოდ ერთ ფაილის ატვირთვა`,
      required: projectFile,
    },
  ];

  const getStepFields = (index) => {
    switch (index) {
      case 0:
        return (
          <TextField
            id='standard-required'
            label='პროექტის სახელი'
            required
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        );
      case 1:
        return (
          <textarea
            name='projectDescription'
            id='projectDescription'
            cols='30'
            rows='10'
            // required
            placeholder='პროექტის აღწერა'
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
            }}
          ></textarea>
        );
      case 2:
        return (
          <input
            type='file'
            name=''
            id=''
            onChange={(e) => setProjectFile(e.target.files[0])}
          />
        );
      default:
        return;
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className='modal'
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='addProject__form'>
            <form method='post' onSubmit={submitHandler}>
              <Stepper
                activeStep={activeStep}
                orientation='vertical'
                className='stepper'
              >
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel className='stepper__label'>
                      {step.label}
                    </StepLabel>
                    <StepContent className='stepper__context'>
                      <Typography>{step.stepText}</Typography>
                      <div className='stepContent__fields'>
                        {getStepFields(index)}
                      </div>
                      <div className='stepper__buttons'>
                        <Button
                          disabled={activeStep === 0}
                          onClick={() =>
                            setActiveStep(
                              (prevActiveStep) => prevActiveStep - 1
                            )
                          }
                        >
                          უკან
                        </Button>
                        <Button
                          disabled={step?.required ? false : true}
                          variant='contained'
                          color='primary'
                          onClick={() =>
                            setActiveStep(
                              (prevActiveStep) => prevActiveStep + 1
                            )
                          }
                        >
                          {activeStep === steps.length - 1
                            ? 'დადასტურება'
                            : 'შემდეგი'}
                        </Button>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length && (
                <Paper
                  square
                  elevation={0}
                  className='stepper__upload__container'
                >
                  <Typography>ყველა საფეხური შესრულებულია</Typography>
                  <button type='submit'>ატვირთვა</button>
                </Paper>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
