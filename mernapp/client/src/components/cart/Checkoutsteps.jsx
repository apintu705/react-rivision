import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function Checkoutsteps({activestep}) {
    const steps=['Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',]
  return (
    <>
    <div className="roller">
    <Stepper activeStep={1} alternativeLabel>
        {steps.map((label,index) => (
          <Step
          active={activestep === index ? true : false}
            completed={activestep >= index ? true : false}
           key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
    </>
  )
}

export default Checkoutsteps