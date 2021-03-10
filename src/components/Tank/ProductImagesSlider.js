import React, { Fragment } from 'react';
import { Box, Avatar } from '@material-ui/core';

export const ProductImagesSlider = ({ selectedProductDetails }) => {
	return (
		<Fragment>
			{Boolean(selectedProductDetails) &&
			selectedProductDetails.productImages &&
			selectedProductDetails.productImages.length ? (
				<Fragment>
					<Box
						style={{ cursor: 'pointer', marginRight: 8, color: '#007DB4', fontWeight: 'bold', fontSize: 18 }}
					>{`<`}</Box>
					{selectedProductDetails.productImages.map((item, index) => (
						<Box pr={1} mt={1} key={`product-images-${index}`}>
							{index <= 2 ? (
								item ? (
									<Avatar style={{ width: 80, height: 80 }} variant='square' src={item} />
								) : (
									<Box style={{ width: 80, height: 80, background: '#B2B2B2 0% 0% no-repeat padding-box' }}></Box>
								)
							) : item ? (
								<Avatar style={{ width: 80, height: 80 }} variant='square' src={item} />
							) : (
								<Box style={{ width: 80, height: 80, background: '#B2B2B2 0% 0% no-repeat padding-box' }}></Box>
							)}
						</Box>
					))}
					<Box style={{ cursor: 'pointer', color: '#007DB4', fontWeight: 'bold', fontSize: 18 }}>{`>`}</Box>
				</Fragment>
			) : (
				<> </>
			)}
		</Fragment>
	);
};
