import React, { Fragment } from 'react';
import { Box, Grid, Paper, Typography, Link } from '@material-ui/core';
import { configs } from '../../config';

export const ArticlesDetails = (props) => {
	const { articlesData, classes } = props;

	return (
		<Fragment>
			{Boolean(articlesData) && articlesData.length ? (
				articlesData.map((item) => (
					<Grid key={item.id} item>
						<Paper className={classes.paper}>
							<Box className={classes.articlesImage} style={{ backgroundImage: `url(${item.imagePath})` }}></Box>
							<Box className={classes.articlesContent}>
								<Typography className={classes.articlesContentText}>{item.title}</Typography>
								<Link className={classes.articlesReadMore} href={item.url} component='a' target='_blank'>
									{configs.readMore}
								</Link>
							</Box>
						</Paper>
					</Grid>
				))
			) : (
				<></>
			)}
		</Fragment>
	);
};
