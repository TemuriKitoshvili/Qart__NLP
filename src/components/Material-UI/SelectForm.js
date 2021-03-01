import { Link } from 'react-router-dom';
// state
import { useStateValue } from '../state/stateProvider';
// Material UI
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectForm({ id }) {
  const [{ user, projects }, dispatch] = useStateValue();

  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>
          {projects?.filter((project) => project.id === id)[0]?.data.name}
        </InputLabel>
        <Select labelId='demo-simple-select-label' id='demo-simple-select'>
          {projects?.map((project) => (
            <Link key={project.id} to={`/dashboard/${project.id}`}>
              <MenuItem value={project.data.name}>{project.data.name}</MenuItem>
            </Link>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectForm;
