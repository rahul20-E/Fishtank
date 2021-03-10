import React, { Fragment } from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { configs } from '../../config';

export const CartProducts = (props) => {
	const { type, productData, handleEdit } = props;
	const classes = useStyles();

	return (
		<Fragment key={`productType_${productData.ProductName}_${productData.id}`}>
			<Box className={classes.productCart}>
				<Typography variant='body2' style={{ fontWeight: 'bold' }}>
					{type}
				</Typography>
				{productData.ProductName && productData.ProductPrice ? (
					<Typography variant='body1' className={classes.linkColor} onClick={() => handleEdit(productData)}>
						{configs.edit}
					</Typography>
				) : (
					<></>
				)}
			</Box>
			<Box className={classes.productCart} style={{ paddingBottom: 10 }}>
				{productData.ProductName ? (
					<></>
				) : (
					<Typography style={{ paddingBottom: 20 }} variant='body2'>
						{configs.noProductText}
					</Typography>
				)}
				{productData.productImage ? (
					<Avatar style={{ width: 50, height: 50 }} variant='square' src={productData.productImage} />
				) : (
					<Box style={{ width: 50, height: 50, background: '#F2F2F2 0% 0% no-repeat padding-box' }}></Box>
				)}
				{productData.ProductName ? (
					<Typography variant='body1' component='div' style={{ paddingLeft: 8 }}>
						{productData.ProductName}
					</Typography>
				) : (
					<></>
				)}
				{productData.ProductPrice ? (
					<Typography
						variant='body2'
						style={{
							fontWeight: 'bold',
							width: '30%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						component='div'
					>
						{`$ ${productData.ProductPrice}`}
					</Typography>
				) : (
					<> </>
				)}
			</Box>
		</Fragment>
	);
};
