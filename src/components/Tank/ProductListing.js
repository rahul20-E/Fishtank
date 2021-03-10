import React, { Fragment, useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@material-ui/core';
import { useStyles } from './styles';
import { ProductDetailsModal } from './ProductDetailsModal';
import { CommonButton } from '../Common/CommonButton';
import { TankFilter } from './TankFilters';
import { FishDetails } from './FishDetails';
import { TankDetails } from './TankDetails';
import { AccessoriesDetails } from './AccessoriesDetails';
import { GravelDecorDetails } from './GravelDecorDetails';
import { CareDetails } from './CareDetails';
import {
	configs,
	SmallSKUList,
	MediumSKUList,
	LargeSKUList,
	SKUList,
	CustomFilter,
	getFishCareOption,
	finalPageContent,
} from '../../config';

export const ProductListing = (props) => {
	const {
		selectionBasedProductList,
		handleProductSelection,
		selectedProduct,
		type,
		handleProductSelectionClick,
		handleGoBackClick,
		title,
		subTitle,
		selectedFishData,
		selectedTankData,
		selectedAccessoriesData,
		selectedGravelDecorData,
		selectedCareData,
	} = props;
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);
	const [selectedProductDetails, setSelectedProductDetails] = useState(selectedProduct);
	const [selectedProductIds, setSelectedProductIds] = useState([selectedProduct?.id]);
	const [productDetails, setProductDetails] = useState([]);
	const [splitButtonClickType, setSplitButtonClickType] = useState(null);
	const [productType, setProductType] = useState(type);
	const [showMore, setshowMore] = useState("");
	useEffect(() => {
		setSelectedProductDetails(selectedProduct);
		const data = selectedProductIds.filter((element) => element !== undefined);
		const finalData = [...new Set(data && data.length ? data : [])];
		setSelectedProductIds([...finalData, selectedProduct?.id]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProduct]);
	useEffect(() => {
		const data = selectedProductIds.filter((element) => element !== undefined);
		const finalData = [...new Set(data && data.length ? data : [])];
		if (type === 'Fish') {
			setSelectedProductDetails(selectedFishData);
			setSelectedProductIds([selectedProduct?.id]);
		} else if (type === 'Tank') {
			setSelectedProductDetails(selectedTankData);
			setSelectedProductIds([...finalData, selectedTankData?.id]);
		} else if (type === 'Accessories') {
			setSelectedProductDetails(selectedAccessoriesData);
			setSelectedProductIds([...finalData, selectedAccessoriesData?.id]);
		} else if (type === 'Gravel & Decor') {
			setSelectedProductDetails(selectedGravelDecorData);
			setSelectedProductIds([...finalData, selectedGravelDecorData?.id]);
		} else if (type === 'Care') {
			setSelectedProductDetails(selectedCareData);
			setSelectedProductIds([...finalData, selectedCareData?.id]);
		}
		type && setProductType(type);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, selectedFishData, selectedTankData, selectedAccessoriesData, selectedGravelDecorData, selectedCareData]);
	useEffect(() => {
		if (type === 'Tank') {
			let skuList = SKUList;
			if (splitButtonClickType === 'small') {
				skuList = SmallSKUList;
			} else if (splitButtonClickType === 'medium') {
				skuList = MediumSKUList;
			} else if (splitButtonClickType === 'large') {
				skuList = LargeSKUList;
			} else if (splitButtonClickType === 'custom') {
				skuList = CustomFilter;
			}
			const filterData = selectionBasedProductList.filter((item) =>
				skuList.find((skuId) => skuId === parseInt(item.id))
			);
			setProductDetails(filterData);
		} else {
			setProductDetails(selectionBasedProductList);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectionBasedProductList]);

	const handleOpenModal = (event, product) => {
		const data = selectedProductIds.filter((element) => element !== undefined);
		const finalData = [...new Set(data && data.length ? data : [])];
		const matchedId = finalData.findIndex((item) => item === product?.id);
		if (matchedId && matchedId > 0) {
			finalData.splice(matchedId, 1);
			setSelectedProductIds([...finalData]);
		} else {
			setSelectedProductDetails(product);
			setOpenModal(true);
			handleProductSelection(event, product);
		}
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};
	const filterTankList = (event, filterType) => {
		let skuList = SKUList;
		if (filterType === 'small') {
			skuList = SmallSKUList;
		} else if (filterType === 'medium') {
			skuList = MediumSKUList;
		} else if (filterType === 'large') {
			skuList = LargeSKUList;
		} else if (filterType === 'custom') {
			skuList = CustomFilter;
		}
		setSplitButtonClickType(filterType);
		const filterData = selectionBasedProductList.filter((item) => skuList.find((skuId) => skuId === parseInt(item.id)));
		setProductDetails(filterData);
	};
	const convertPrice = (price) => {
		return price ? price.toFixed(2) : 0;
	};

	return (
		<Fragment>
			<Box>
				<Box className='tank-filters-main'>
					<Box className='tank-filters'>
						<Typography className={classes.rightPanelHeading} style={{ paddingLeft: 0 }}>
							{title}
						</Typography>
						<Typography variant='body2'>{subTitle}</Typography>
					</Box>
					{title === 'Select a tank' ? (
						<Box pr={3}>
							<TankFilter filterTankList={filterTankList} splitButtonClickType={splitButtonClickType} />
						</Box>
					) : (
						<></>
					)}
				</Box>
				{/* Selected Product List */}
				<Box
					className='product-listing-main'
					style={{
						display: 'flex',
						justifyContent: productType === 'Fish' ? 'space-between' : 'flex-start',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					{productType === 'Fish' ? (
						<FishDetails
							productDetails={productDetails}
							selectedProductDetails={selectedProductDetails}
							handleProductSelection={handleProductSelection}
							classes={classes}
						/>
					) : (
						<></>
					)}
					{productType === 'Tank' ? (
<>
						<TankDetails
								productDetails={showMore === "Tank" ? productDetails : productDetails.slice(0, 4)}
							// productDetails={productDetails}
						
							selectedProductDetails={selectedProductIds.filter((element) => element !== undefined)}
							classes={classes}
							handleOpenModal={handleOpenModal}
								setshowMore={setshowMore}
							/>
							{showMore !== "Tank" &&
								<p className={classes.showMoreButton}>
									<CommonButton
										style={{ color: '#007DB4', marginRight: 20, textTransform: 'none' }}
										handleClick={() => setshowMore("Tank")}
										text={"Show more"}
									/>
								</p>}
						</>
					) : (
						<></>
					)}
					{productType === 'Accessories' ? (
<>
						<AccessoriesDetails
								productDetails={showMore === "Accessories" ? productDetails : productDetails.slice(0, 4)}
							// productDetails={productDetails}
							selectedProductDetails={selectedProductIds.filter((element) => element !== undefined)}
							handleOpenModal={handleOpenModal}
							classes={classes}
							convertPrice={convertPrice}
						/>
							{showMore !== "Accessories" &&
								<p className={classes.showMoreButton}>
									<CommonButton
										style={{ color: '#007DB4', marginRight: 20, textTransform: 'none' }}
										handleClick={() => setshowMore("Accessories")}
										text={"Show more"}
									/>
								</p>}
						</>
					) : (
						<></>
					)}
					{productType === 'Gravel & Decor' ? (
					<>
						<GravelDecorDetails
								productDetails={showMore === "Gravel & Decor" ? productDetails : productDetails.slice(0, 4)}
							// productDetails={productDetails}
							selectedProductDetails={selectedProductIds.filter((element) => element !== undefined)}
							handleOpenModal={handleOpenModal}
							classes={classes}
							convertPrice={convertPrice}
						/>
							{showMore !== "Gravel & Decor" &&
								<p className={classes.showMoreButton}>
									<CommonButton
										style={{ color: '#007DB4', marginRight: 20, textTransform: 'none' }}
										handleClick={() => setshowMore("Gravel & Decor")}
										text={"Show more"}
									/>
								</p>}
						</>
					) : (
						<></>
					)}
					{productType === 'Care' ? (
					<>
						<CareDetails
								productDetails={showMore === "Care" ? productDetails : productDetails.slice(0, 4)}
							// productDetails={productDetails}
							selectedProductDetails={selectedProductIds.filter((element) => element !== undefined)}
							handleOpenModal={handleOpenModal}
							classes={classes}
							convertPrice={convertPrice}
						/>
							{showMore !== "Care" &&
								<p className={classes.showMoreButton}>
									<CommonButton
										style={{ color: '#007DB4', marginRight: 20, textTransform: 'none' }}
										handleClick={() => setshowMore("Care")}
										text={"Show more"}
									/>
								</p>}
						</>
					) : (
						<></>
					)}
				</Box>
				{Boolean(selectedProductDetails) && productType === 'Fish' && selectedProductDetails.name !== 'Not Sure' ? (
					<Box
						mt={2}
						mr={2.25}
						style={{
							background: '#ECF6FA 0% 0% no-repeat padding-box',
							border: '1px solid #007DB4',
							borderRadius: 4,
							padding: 16,
						}}
					>
						<Typography variant='body1' component='div' style={{ fontWeight: 'bold' }}>
							{selectedProductDetails.name}
						</Typography>
						<Typography variant='body2' component='div'>
							{selectedProductDetails.description}
						</Typography>
					</Box>
				) : (
					<></>
				)}
				{Boolean(selectedProductDetails) && productType !== 'Fish' ? (
					<ProductDetailsModal
						openModal={openModal}
						type={productType}
						selectedProductDetails={selectedProductDetails}
						handleCloseModal={handleCloseModal}
					/>
				) : (
					<></>
				)}
				{productType !== 'Final' ? (
					<Box display='flex' justifyContent='flex-end' pr={2.25} pt={2}>
						{productType !== 'Fish' ? (
							<CommonButton
								style={{ color: '#007DB4', marginRight: 20, textTransform: 'none' }}
								handleClick={handleGoBackClick}
								text={configs.goBack}
							/>
						) : (
							<></>
						)}
						{Boolean(selectedProductDetails) || (type !== 'Fish' && type !=='Tank') ? (
							<CommonButton
								style={{ backgroundColor: '#007DB4', color: '#ffffff', textTransform: 'none' }}
								handleClick={handleProductSelectionClick}
								text={configs.continue}
							/>
						) : (
							<CommonButton style={{ textTransform: 'none' }} disabled={true} text={'Continue'} />
						)}
					</Box>
				) : (
					<Box className='fish-care-main'>
						<Box style={{ marginRight: 20 }}>
							<Box className={classes.fishCare}>
								<Avatar
									className={classes.fishCareIcon}
									variant='circle'
									src={getFishCareOption('WEB-730007-FEB-21_BYT_test-your-water-regularly_1x')}
								/>
							</Box>
							<Typography style={{ color: 'red', textAlign: 'center', width: '100%' }}>
								{finalPageContent.fishCare1}
							</Typography>
						</Box>
						<Box style={{ marginRight: 20 }}>
							<Box className={classes.fishCare}>
								<Avatar
									className={classes.fishCareIcon}
									variant='circle'
									src={getFishCareOption('WEB-730007-FEB-21_BYT_remember-to-cycle-your-aquarium_1x')}
								/>
							</Box>
							<Typography style={{ color: 'red', textAlign: 'center', width: '100%' }}>
								{finalPageContent.fishCare2}
							</Typography>
						</Box>
						<Box style={{ marginRight: 20 }}>
							<Box className={classes.fishCare}>
								<Avatar
									className={classes.fishCareIcon}
									variant='circle'
									src={getFishCareOption('WEB-730007-FEB-21_BYT_rinse-off-decor-before-placing-in-tank_1x')}
								/>
							</Box>
							<Typography style={{ color: 'red', textAlign: 'center', width: '100%' }}>
								{finalPageContent.fishCare3}
							</Typography>
						</Box>
						<Box>
							<Box className={classes.fishCare}>
								<Avatar
									className={classes.fishCareIcon}
									variant='circle'
									src={getFishCareOption(
										'WEB-730007-FEB-21_BYT_do-not-add-bacteria-starter-until-you-start-adding-fish_1x'
									)}
								/>
							</Box>
							<Typography style={{ color: 'red', textAlign: 'center', width: '65%' }}>
								{finalPageContent.fishCare4}
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</Fragment>
	);
};
