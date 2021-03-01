import { useState } from 'react';

// Material UI
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ViewListIcon from '@material-ui/icons/ViewList';
import TranslateIcon from '@material-ui/icons/Translate';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const AccordionModule = ({ setTool }) => {
  const [expandedGroupe, setExpandedGroupe] = useState('morphology');

  const AccordionHandler = (panel) => (e, isExpanded) => {
    setExpandedGroupe(isExpanded ? panel : false);
  };

  const toolHandler = (e) => {
    e.preventDefault();
    setTool(e.currentTarget.value);
  };

  return (
    <Accordion
      className='accordionModule'
      expanded={expandedGroupe === 'morphology'}
      onChange={AccordionHandler('morphology')}
    >
      <AccordionSummary
        className='accordionModule__summary'
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography>მორფოლოგია</Typography>
      </AccordionSummary>
      <AccordionDetails className='accordionModule__details'>
        <button value='lematization' onClick={toolHandler}>
          <TranslateIcon /> <span>ლემატიზაცია</span>
        </button>
        <button value='freqDist' onClick={toolHandler}>
          <ViewListIcon /> <span>სიხშირის განაწილება</span>
        </button>
        <button>
          <AccountTreeIcon /> <span>დამოკიდებულების ხე</span>
        </button>
        <button value='searchWord' onClick={toolHandler}>
          <FindInPageIcon /> <span>ძიება</span>
        </button>
        <button>
          <TranslateIcon /> <span>თარგმნა</span>
        </button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionModule;
