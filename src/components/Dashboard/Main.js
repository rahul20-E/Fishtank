import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { useStyles } from './styles';
import { CommonButton } from '../Common/CommonButton';
import { HeroBanner, SmallHeroBanner } from './HeroBanner';
import { configs } from '../../config';
import '../../styles/global.scss';

export const Main = (props) => {
	const { handleBuildTankClick } = props;
	const classes = useStyles();

	return (
		<main className='main-banner'>
			<HeroBanner
				imagePath={configs.dashboardMainHeroBanner}
				classes={classes}
				handleBuildTankClick={handleBuildTankClick}
				isButtonVisible={true}
			/>
			{configs.isSmallBannerVisible ? (
				<Box className={classes.bannerMain} mt={7}>
					<SmallHeroBanner classes={classes} text={configs.banner} isVisible={true} imagePath={''} />
					<SmallHeroBanner classes={classes} text={configs.banner} isVisible={true} imagePath={''} />
				</Box>
			) : (
				<></>
			)}
			<Grid item xs={12}>
				<Grid container justify='center' spacing={2}>
					<Grid item xs={12} md={6} lg={6}>
						<Box className={classes.secondBanner}>
							<Box>
								<Typography
									style={{
										fontSize: 24,
										letterSpacing: 0,
									}}
								>
									{configs.bannerTitle}
								</Typography>
								<Typography
									style={{
										fontSize: 16,
										letterSpacing: 0,
									}}
								>
									{configs.bannerDescription}
								</Typography>
								<CommonButton
									variant='contained'
									className={`${classes.button} ${classes.marginTop}`}
									handleClick={handleBuildTankClick}
									text={configs.buildYourTankMain}
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<Box className={classes.secondBannerVideoPlayer}>
							<ReactPlayer className={classes.videoPlayer} url={configs.videoLink} />
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</main>
	);
};
