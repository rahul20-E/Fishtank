import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Typography, Select, MenuItem, Modal } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import { ProductImagesSlider } from './ProductImagesSlider';
import { CommonButton } from '../Common/CommonButton';
import { configs, getTankImage } from '../../config';
import '../../styles/global.scss';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(0, 0, 3, 2),
	},
	ratingMain: {
		'& .MuiRating-root': {
			color: '#007DB4',
		},
	},
	twoLine: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitLineClamp: 2,
		WebkitBoxOrient: 'vertical',
	},
	mainDialog: {
		'& .MuiDialogContent-root': {
			padding: theme.spacing(0),
		},
	},
}));

export const ProductDetailsModal = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { openModal, handleCloseModal, type, selectedProductDetails } = props;
	const [quantity, setQuantity] = React.useState(1);

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};
	const convertPrice = (price) => {
		return price ? price.toFixed(2) : 0;
	};

	return (
		<Fragment>
			<Dialog
				fullScreen={fullScreen}
				className={classes.mainDialog}
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='responsive-dialog-title'
			>
				<DialogTitle>{}</DialogTitle>
				<DialogContent>
					<Box className={`modal-main-class ${classes.paper}`}>
						<Box display='flex' justifyContent='flex-end'>
							<CommonButton handleClick={handleCloseModal} text={'X'} />
						</Box>
						<Box className='modal-main'>
							<Box>
								<Avatar
									style={{ width: 256, height: 256, marginLeft: 16 }}
									variant='square'
									src={getTankImage(selectedProductDetails.id, 'Modal')}
								/>
								<Box display='flex' alignItems='center' justifyContent='center'>
									<ProductImagesSlider selectedProductDetails={selectedProductDetails} />
								</Box>
							</Box>
							<Box pl={3}>
								<Typography variant='h5' className={classes.twoLine} style={{ fontWeight: 'bold' }}>
									{selectedProductDetails.name}
								</Typography>
								<Box mt={1}>
									<Typography component='span'>{configs.by}</Typography>
									<Typography component='span' color='primary' style={{ cursor: 'pointer' }}>{` ${
										type === 'Tank' ? selectedProductDetails.brand : selectedProductDetails.owner
									}`}</Typography>
								</Box>
								<Box mt={1} display='flex' alignItems='center' className={classes.ratingMain}>
									<Typography component='span'>{configs.item}</Typography>
									<Typography
										component='span'
										style={{ marginRight: 8 }}
									>{` #${selectedProductDetails.id}`}</Typography>
									<Rating
										name='product-rating'
										value={
											type === 'Tank' ? selectedProductDetails.c_bvAverageRating : selectedProductDetails.rating || 0
										}
										readOnly
										precision={0.5}
									/>
								</Box>
								<Box mt={1} display='flex' alignItems='center'>
									<Typography variant='h6' color='error' style={{ fontWeight: 'bold', marginRight: 8 }}>
										{type === 'Tank'
											? selectedProductDetails.c_pricing.formattedSale
											: `$${convertPrice(selectedProductDetails.price)}`}
									</Typography>
									<Typography
										variant='h6'
										color='textSecondary'
										style={{ fontWeight: 'bold', textDecoration: 'line-through' }}
									>
										{type === 'Tank'
											? selectedProductDetails.c_pricing.formattedStandard
											: `$${convertPrice(selectedProductDetails.oldPrice)}`}
									</Typography>
								</Box>
								<Box mt={1} display='flex' alignItems='center'>
									<Typography style={{ marginRight: 8 }}>SIze:</Typography>
									<Typography style={{ fontWeight: 'bold' }}>
										{type === 'Tank' ? selectedProductDetails.c_size : selectedProductDetails.size}
									</Typography>
								</Box>
								<Box mt={3}>
									<Select value={quantity} onChange={handleQuantityChange} label='' variant='outlined'>
										<MenuItem value={1}>Qty: 1</MenuItem>
										<MenuItem value={2}>Qty: 2</MenuItem>
										<MenuItem value={3}>Qty: 3</MenuItem>
										<MenuItem value={4}>Qty: 4</MenuItem>
										<MenuItem value={5}>Qty: 5</MenuItem>
									</Select>
								</Box>
								<Box mt={3}>
									<CommonButton
										handleClick={handleCloseModal}
										style={{ backgroundColor: '#007DB4', color: '#ffffff', padding: '6px 22px', textTransform: 'none' }}
										text={'Select'}
									/>
								</Box>
							</Box>
						</Box>
						<Box
							mt={5}
							style={{
								height: 200,
								overflow: 'auto',
							}}
						>
							<div dangerouslySetInnerHTML={{ __html: selectedProductDetails?.long_description }} />
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
			<Modal
				open={openModal}
				className='mobile-view'
				onClose={handleCloseModal}
				aria-labelledby='Product details modal'
				aria-describedby='Product details modal'
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Box className={`modal-main-class ${classes.paper}`}>
					<Box display='flex' justifyContent='flex-end'>
						<CommonButton handleClick={handleCloseModal} text={'X'} />
					</Box>
					<Box className='modal-main'>
						<Box>
							<Avatar
								style={{ width: 256, height: 256, marginLeft: 16 }}
								variant='square'
								src={getTankImage(selectedProductDetails.id, 'Modal')}
							/>
							<Box display='flex' alignItems='center' justifyContent='center'>
								<ProductImagesSlider selectedProductDetails={selectedProductDetails} />
							</Box>
						</Box>
						<Box pl={3}>
							<Typography variant='h5' className={classes.twoLine} style={{ fontWeight: 'bold' }}>
								{selectedProductDetails.name}
							</Typography>
							<Box mt={1}>
								<Typography component='span'>{configs.by}</Typography>
								<Typography component='span' color='primary' style={{ cursor: 'pointer' }}>{` ${
									type === 'Tank' ? selectedProductDetails.brand : selectedProductDetails.owner
								}`}</Typography>
							</Box>
							<Box mt={1} display='flex' alignItems='center' className={classes.ratingMain}>
								<Typography component='span'>{configs.item}</Typography>
								<Typography component='span' style={{ marginRight: 8 }}>{` #${selectedProductDetails.id}`}</Typography>
								<Rating
									name='product-rating'
									value={
										type === 'Tank' ? selectedProductDetails.c_bvAverageRating : selectedProductDetails.rating || 0
									}
									readOnly
									precision={0.5}
								/>
							</Box>
							<Box mt={1} display='flex' alignItems='center'>
								<Typography variant='h6' color='error' style={{ fontWeight: 'bold', marginRight: 8 }}>
									{type === 'Tank'
										? selectedProductDetails.c_pricing.formattedSale
										: `$${convertPrice(selectedProductDetails.price)}`}
								</Typography>
								<Typography
									variant='h6'
									color='textSecondary'
									style={{ fontWeight: 'bold', textDecoration: 'line-through' }}
								>
									{type === 'Tank'
										? selectedProductDetails.c_pricing.formattedStandard
										: `$${convertPrice(selectedProductDetails.oldPrice)}`}
								</Typography>
							</Box>
							<Box mt={1} display='flex' alignItems='center'>
								<Typography style={{ marginRight: 8 }}>SIze:</Typography>
								<Typography style={{ fontWeight: 'bold' }}>
									{type === 'Tank' ? selectedProductDetails.c_size : selectedProductDetails.size}
								</Typography>
							</Box>
							<Box mt={3}>
								<Select value={quantity} onChange={handleQuantityChange} label='' variant='outlined'>
									<MenuItem value={1}>Qty: 1</MenuItem>
									<MenuItem value={2}>Qty: 2</MenuItem>
									<MenuItem value={3}>Qty: 3</MenuItem>
									<MenuItem value={4}>Qty: 4</MenuItem>
									<MenuItem value={5}>Qty: 5</MenuItem>
								</Select>
							</Box>
							<Box mt={3}>
								<CommonButton
									handleClick={handleCloseModal}
									style={{ backgroundColor: '#007DB4', color: '#ffffff', padding: '6px 22px', textTransform: 'none' }}
									text={'Select'}
								/>
							</Box>
						</Box>
					</Box>
					<Box
						mt={5}
						style={{
							height: 200,
							overflow: 'auto',
						}}
					>
						<div dangerouslySetInnerHTML={{ __html: selectedProductDetails?.long_description }} />
					</Box>
				</Box>
			</Modal>
		</Fragment>
	);
};
