import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Main } from './Main';
import { Footer } from './Footer';
import { useStyles } from './styles';
import { Tank } from '../Tank';
import { articlesData, configs } from '../../config';

export const Dashboard = (props) => {
	const classes = useStyles();
	const [isDashboard, setIsDashboard] = useState(true);
	const handleBuildTankClick = (event) => {
		setIsDashboard(false);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.header} />
				</Grid>
				{/* Main Container Start Here */}
				<Grid item xs={12} style={{ paddingTop: 0 }}>
					<Container fixed>
						<Box mb={1}>
							<Typography className={classes.textColor}>{configs.headerTitle}</Typography>
						</Box>
						{isDashboard ? <Main {...props} handleBuildTankClick={handleBuildTankClick} /> : <Tank {...props} />}
					</Container>
				</Grid>
				{/* Main Container End Here */}
				{isDashboard ? <Footer {...props} articlesData={articlesData} /> : <></>}
			</Grid>
		</div>
	);
};
