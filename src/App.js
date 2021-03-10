import React, { Fragment } from 'react';
import { Dashboard } from './components/Dashboard';

export const App = (props) => {
	return (
		<Fragment>
			<Dashboard {...props} />
		</Fragment>
	);
};
