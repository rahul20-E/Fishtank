import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';

export const ProductStepper = (props) => {
	const { activeStep, steps } = props;

	return (
		<Stepper alternativeLabel nonLinear activeStep={activeStep}>
			{Boolean(steps) && steps.length ? (
				steps.map((label, index) => (
					<Step key={label} completed={index <= activeStep - 1}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))
			) : (
				<></>
			)}
		</Stepper>
	);
};
