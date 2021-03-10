import React, { Fragment, useState, useEffect } from 'react';
import { Avatar, Box, CircularProgress, Tooltip, Typography } from '@material-ui/core';
import { getTankImage } from '../../config';

export const GravelDecorDetails = (props) => {
	const { productDetails, selectedProductDetails, handleOpenModal, classes } = props;
	const [ids, setIds] = useState([
		...new Set(selectedProductDetails && selectedProductDetails.length ? selectedProductDetails : []),
	]);
	useEffect(() => {
		setIds([...new Set(selectedProductDetails && selectedProductDetails.length ? selectedProductDetails : [])]);
	}, [selectedProductDetails]);

	return (
		<Fragment>
			{Boolean(productDetails) && productDetails.length ? (
				productDetails.map((item, index) => (
					<Box
						className='custom-gravel-decor'
						key={`custom-gravel-decor_${index}_${item.id}`}
						style={{
							cursor: 'pointer',
							border: `1px solid ${ids.includes(item.id) ? '#007DB4' : '#DDDDDD'}`,
						}}
						onClick={(e) => handleOpenModal(e, item)}
					>
						<Box
							style={{
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
								border: 'none',
							}}
						>
							<Avatar className='product-icon' variant='square' src={getTankImage(item.id, 'List')} />
						</Box>
						<Tooltip title={<div dangerouslySetInnerHTML={{ __html: item.name }} />}>
							<Typography variant='body2' className={classes.twoLine} style={{ textAlign: 'center', marginTop: 8 }}>
								<div dangerouslySetInnerHTML={{ __html: item.name }} />
							</Typography>
						</Tooltip>
						<Box mt={1} display='flex' alignItems='center' justifyContent='center'>
							<Typography variant='body2' color='error' style={{ fontWeight: 'bold', marginRight: 8 }}>
								{item?.c_pricing?.formattedSale}
							</Typography>
							<Typography
								variant='body2'
								color='textSecondary'
								style={{ fontWeight: 'bold', textDecoration: 'line-through' }}
							>
								{item?.c_pricing?.formattedStandard}
							</Typography>
						</Box>
					</Box>
				))
			) : (
				<Box>
					<CircularProgress />
				</Box>
			)}
		</Fragment>
	);
};
