import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { finalPageContent } from '../../config';

export const Congrats = (props) => {
	const { classes } = props;

	return (
		<Box className='congrats-main'>
			<Typography variant='h5' style={{ fontWeight: 'bold' }}>
				{finalPageContent.title}
			</Typography>
			{/* <Typography variant='body1'>{finalPageContent.subTitle}</Typography> */}
			<Box className={classes.heroBanner}>
				<Box className='banner-content'>
					<Typography
						component='div'
						className='banner-title'
						variant='h3'
						style={{ textAlign: 'center', fontWeight: 'bold' }}
					>
						{finalPageContent.bannerTitle}
					</Typography>
					<Typography
						component='div'
						className='banner-title'
						variant='h3'
						style={{ textAlign: 'center', fontWeight: 'bold' }}
					>
						{finalPageContent.bannerTitle2}
					</Typography>
					<Typography component='div' variant='body1' style={{ textAlign: 'center' }}>
						{finalPageContent.bannerSubTitle}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
