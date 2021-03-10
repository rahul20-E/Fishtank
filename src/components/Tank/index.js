import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useStyles } from './styles';
import { ProductListing } from './ProductListing';
import { TipsCarousel } from './TipsCarousel';
import {
	configs,
	SKUList,
	defaultProductSelection,
	mockProductData,
	getRecommendedTankTitle,
	getSkuList,
	TankAccessoriesSKUs,
	WaterCareSKUs,
	DecorSKUs,
	getTankImage,
	defaultProductMultiSelection,
} from '../../config';
import { getSkuFullDetails } from '../../services/generator';
import { ProductStepper } from './ProductStepper';
import { CartView } from './CartView';
import '../../styles/global.scss';
import { Congrats } from './Congrats';

export const Tank = (props) => {
	const classes = useStyles();
	const {
		fishList,
		accessories,
		gravelDecor,
		care,
		steps,
		fishTipsSteps,
		tankTipsSteps,
		accessoriesTipsSteps,
		gravelDecorTipsSteps,
		careTipsSteps,
	} = mockProductData;
	const [activeStep, setActiveStep] = useState(0);
	const [activeSliderStep, setActiveSliderStep] = useState(0);
	const [activeSliderMainStep, setActiveSliderMainStep] = useState(0);
	const [selectedFishData, setSelectedFishData] = useState(0);
	const [selectedTankData, setSelectedTankData] = useState(0);
	const [selectedAccessoriesData, setSelectedAccessoriesData] = useState(0);
	const [selectedGravelDecorData, setSelectedGravelDecorData] = useState(0);
	const [selectedCareData, setSelectedCareData] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [selectedProducts, setSelectedProducts] = useState(defaultProductSelection);
	const [selectedMultiProducts, setSelectedMultiProducts] = useState(defaultProductMultiSelection);
	const [selectionType, setSelectionType] = useState('Fish');
	const [selectionBasedProductList, setSelectionBasedProductList] = useState(fishList);
	// eslint-disable-next-line no-unused-vars
	const [productDetailsWithSKU, setProductDetailsWithSKU] = useState([]); // skuMockData.data
	const [currentTips, setCurrentTips] = useState(fishTipsSteps);
	const [maxSteps, setMaxSteps] = useState(fishTipsSteps.length);
	const [titleDetails, setTitleDetails] = useState(configs.fishTitles);

	const getAllSkuDetails = async (skuIds) => {
		const bigList = skuIds;
		let organizedList = {};
		let n = 0;

		for (let i = 0; i < bigList.length; i += configs.batchSize) {
			organizedList[`group${n}`] = bigList.slice(i, i + configs.batchSize);
			n += 1;
		}
		const listKeys = Object.keys(organizedList);
		let skuDetails = [];
		for (let i = 0; i < listKeys.length; i++) {
			const skuIds = organizedList[listKeys[i]];
			const response = await getSkuFullDetails(skuIds);
			const { data } = response.data;
			skuDetails.push(...data);
		}
		setProductDetailsWithSKU([...skuDetails]);
		return skuDetails;
	};
	const getNewState = (type) => {
		switch (type) {
			case 'Fish':
				return 1;
			case 'Tank':
				return 2;
			case 'Accessories':
				return 3;
			case 'Gravel & Decor':
				return 4;
			case 'Care':
				return 5;
			default:
				return 1;
		}
	};
	const handleNext = (event, callType) => {
		let newState = activeSliderMainStep + 1;
		if (callType === 1) {
			newState = getNewState(selectionType);
		}
		setActiveSliderStep(newState);
		setActiveSliderMainStep(newState);
		if (callType === 1) {
			setActiveStep(newState === 0 || newState === 1 ? 0 : activeStep + 1);
			setProductDisplayType(newState);
		}
	};
	const handleBack = (event, callType) => {
		let newState = activeSliderMainStep ? activeSliderMainStep - 1 : 0;
		// if (callType === 1) {
		// 	newState = getNewState(selectionType);
		// }
		setActiveSliderStep(newState);
		setActiveSliderMainStep(newState);
		if (callType === 1) {
			setActiveStep(newState === 0 || newState === 1 ? 0 : activeStep ? activeStep - 1 : 0);
			setProductDisplayType(newState);
		}
	};
	const handleStepChange = (step) => {
		setActiveSliderStep(step);
	};
	const handleProductSelection = (event, product) => {
		if (selectedProduct === product) {
			setSelectedProduct(0);
			if (selectionType === 'Fish') {
				setSelectedFishData(0);
			} else if (selectionType === 'Tank') {
				setSelectedTankData(0);
			} else if (selectionType === 'Accessories') {
				setSelectedAccessoriesData(0);
			} else if (selectionType === 'Gravel & Decor') {
				setSelectedGravelDecorData(0);
			} else if (selectionType === 'Care') {
				setSelectedCareData(0);
			}
		} else {
			setSelectedProduct(product);
			if (selectionType === 'Fish') {
				setSelectedFishData(product);
			} else if (selectionType === 'Tank') {
				setSelectedTankData(product);
			} else if (selectionType === 'Accessories') {
				setSelectedAccessoriesData(product);
			} else if (selectionType === 'Gravel & Decor') {
				setSelectedGravelDecorData(product);
			} else if (selectionType === 'Care') {
				setSelectedCareData(product);
			}
		}
	};
	const addToCart = (newState, selectedProductData, type, multiSelect) => {
		const cartIndex = newState === 0 ? 1 : newState; // === 1 || newState === 2 ? 1 : newState - 1;
		const detailsIndex = selectedProducts.findIndex((item) => item.id === cartIndex);
		let details = detailsIndex > -1 ? selectedProducts[detailsIndex] : [];
		if (multiSelect === 0) {
			const { tankDetails } = selectedMultiProducts && selectedMultiProducts.length ? selectedMultiProducts[0] : {};
			tankDetails[0].fishSelection = selectedProductData;
		} else if (multiSelect === 1) {
			const { tankDetails } = selectedMultiProducts && selectedMultiProducts.length ? selectedMultiProducts[0] : {};
			const { data } = tankDetails && tankDetails[0];
			const detail = data && data.length ? data.find((item) => item.id === selectedProductData?.id) : null;
			if (!detail) {
				data.push({
					...selectedProductData,
					productImage: getTankImage(selectedProductData?.id),
					ProductName: selectedProductData.name,
					ProductPrice: selectedProductData?.c_pricing?.sale,
				});
			}
		} else if (multiSelect === 2) {
			const { accessoriesDetails } =
				selectedMultiProducts && selectedMultiProducts.length ? selectedMultiProducts[0] : {};
			const { data } = accessoriesDetails && accessoriesDetails[0];
			const detail = data && data.length ? data.find((item) => item.id === selectedProductData?.id) : null;
			if (!detail) {
				data.push({
					...selectedProductData,
					productImage: getTankImage(selectedProductData?.id),
					ProductName: selectedProductData.name,
					ProductPrice: selectedProductData?.c_pricing?.sale,
				});
			}
		} else if (multiSelect === 3) {
			const { gravelDecorDetails } =
				selectedMultiProducts && selectedMultiProducts.length ? selectedMultiProducts[0] : {};
			const { data } = gravelDecorDetails && gravelDecorDetails[0];
			const detail = data && data.length ? data.find((item) => item.id === selectedProductData?.id) : null;
			if (!detail) {
				data.push({
					...selectedProductData,
					productImage: getTankImage(selectedProductData?.id),
					ProductName: selectedProductData.name,
					ProductPrice: selectedProductData?.c_pricing?.sale,
				});
			}
		} else if (multiSelect === 4) {
			const { careDetails } = selectedMultiProducts && selectedMultiProducts.length ? selectedMultiProducts[0] : {};
			const { data } = careDetails && careDetails[0];
			const detail = data && data.length ? data.find((item) => item.id === selectedProductData?.id) : null;
			if (!detail) {
				data.push({
					...selectedProductData,
					productImage: getTankImage(selectedProductData?.id),
					ProductName: selectedProductData.name,
					ProductPrice: selectedProductData?.c_pricing?.sale,
				});
			}
		}
		// =====================================================================
		// =====================================================================
		if (type === 'Tank') {
			details = {
				...details,
				productImage: newState !== 0 ? getTankImage(selectedProductData?.id) : '',
				ProductName: newState !== 0 ? selectedProductData.name : '',
				ProductPrice: newState !== 0 ? selectedProductData?.c_pricing?.sale : '',
				fishSelection: selectedProductData,
			};
		} else if (type === 'Accessories') {
			details = {
				...details,
				productImage: getTankImage(selectedProductData?.id),
				ProductName: selectedProductData.name,
				ProductPrice: selectedProductData?.c_pricing?.sale,
			};
		} else if (type === 'Gravel & Decor') {
			details = {
				...details,
				productImage: getTankImage(selectedProductData?.id),
				ProductName: selectedProductData.name,
				ProductPrice: selectedProductData?.c_pricing?.sale,
			};
		} else if (type === 'Care') {
			details = {
				...details,
				productImage: getTankImage(selectedProductData?.id),
				ProductName: selectedProductData.name,
				ProductPrice: selectedProductData?.c_pricing?.sale,
			};
		}
		const finalData = selectedProducts.map((item, index) => {
			if (index === detailsIndex) return details;
			else return item;
		});
		// console.log(selectedMultiProducts);
		setSelectedProducts(finalData);
	};
	const setProductDisplayType = async (newState) => {
		setSelectionBasedProductList([]);
		if (newState === 0) {
			//--------- For Fish
			const selectedProductData = selectedFishData;
			setCurrentTips(fishTipsSteps);
			setMaxSteps(fishTipsSteps.length);
			setActiveSliderStep(0);
			setSelectionType('Fish');
			setTitleDetails(configs.fishTitles);
			setSelectedProducts(defaultProductSelection);
			setSelectedMultiProducts(defaultProductMultiSelection);
			setSelectedTankData(0);
			setSelectedAccessoriesData(0);
			setSelectedGravelDecorData(0);
			setSelectedCareData(0);
			setSelectionBasedProductList(fishList);
			addToCart(0, selectedProductData, 'Tank', 0); // Add to Cart
		} else if (newState === 1) {
			setCurrentTips(tankTipsSteps);
			setMaxSteps(tankTipsSteps.length);
			setActiveSliderStep(0);
			setSelectionBasedProductList([]);
			const selectedProductData = selectedFishData;
			//--------- For Tank
			addToCart(0, selectedProductData, 'Tank', 0); // Add to Cart
			setSelectionType('Tank');
			if (selectedProductData.name === 'Not Sure') {
				setTitleDetails(configs.allTankTitle);
				const response = await getAllSkuDetails(SKUList);
				setSelectionBasedProductList(response);
			} else {
				setTitleDetails(getRecommendedTankTitle(selectedProductData.name));
				const response = await getAllSkuDetails(getSkuList(selectedProductData.name));
				setSelectionBasedProductList(response);
			}
			setSelectedAccessoriesData(0);
			setSelectedGravelDecorData(0);
			setSelectedCareData(0);
		} else if (newState === 2) {
			//--------- For Accessories
			setCurrentTips(accessoriesTipsSteps);
			setMaxSteps(accessoriesTipsSteps.length);
			setActiveSliderStep(0);
			setSelectionBasedProductList([]);
			const selectedProductData = selectedTankData;
			addToCart(1, selectedProductData, 'Accessories', 1); // Add to Cart
			setSelectionType('Accessories');
			setTitleDetails(configs.accessoriesTitles);
			const tankId = selectedTankData.id;
			const response = TankAccessoriesSKUs[tankId] ? await getAllSkuDetails(TankAccessoriesSKUs[tankId]) : accessories;
			setSelectionBasedProductList(response);

			setSelectedGravelDecorData(0);
			setSelectedCareData(0);
		} else if (newState === 3) {
			setCurrentTips(gravelDecorTipsSteps);
			setMaxSteps(gravelDecorTipsSteps.length);
			setActiveSliderStep(0);
			setSelectionBasedProductList([]);
			//--------- For Gravel & Decor
			const selectedProductData = selectedAccessoriesData;
			addToCart(2, selectedProductData, 'Gravel & Decor', 2); // Add to Cart
			setSelectionType('Gravel & Decor');
			setTitleDetails(configs.gravelDecorTitles);
			const tankId = selectedTankData.id; //selectedAccessoriesData.id;
			const response = DecorSKUs[tankId] ? await getAllSkuDetails(DecorSKUs[tankId]) : gravelDecor;
			setSelectionBasedProductList(response);

			setSelectedCareData(0);
		} else if (newState === 4) {
			setCurrentTips(careTipsSteps);
			setMaxSteps(careTipsSteps.length);
			setActiveSliderStep(0);
			setSelectionBasedProductList([]);
			//--------- For Care
			const selectedProductData = selectedGravelDecorData;
			addToCart(3, selectedProductData, 'Care', 3); // Add to Cart
			setSelectionType('Care');
			setTitleDetails(configs.careTitles);
			const tankId = selectedTankData.id; //selectedGravelDecorData.id;
			const response = WaterCareSKUs[tankId] ? await getAllSkuDetails(WaterCareSKUs[tankId]) : care;
			setSelectionBasedProductList(response);
		} else if (newState === 5) {
			setCurrentTips([]);
			setMaxSteps(0);
			setActiveSliderStep(0);
			const selectedProductData = selectedCareData;
			addToCart(4, selectedProductData, 'Care', 4); // Add to Cart
			setSelectionType('Final');
			setTitleDetails(configs.dosDontsTitles);
			setSelectionBasedProductList([]);
		}
	};
	const handleProductSelectionClick = (event) => {
		setSelectionBasedProductList([]);
		handleNext(event, 1);
	};
	const resetTankData = (type) => {
		if (type === 'Tank') {
			const updatedData = selectedProducts.map((item) => {
				item.productImage = '';
				item.ProductName = '';
				item.ProductPrice = '';
				return item;
			});
			setSelectedProducts(updatedData);
		} else if (type === 'Accessories') {
			const updatedData = selectedProducts.map((item) => {
				if (item.type !== 'Tank') {
					item.productImage = '';
					item.ProductName = '';
					item.ProductPrice = '';
				}
				return item;
			});
			setSelectedProducts(updatedData);
		} else if (type === 'Gravel & Decor') {
			const updatedData = selectedProducts.map((item) => {
				if (item.type === 'Care' || item.type === 'Gravel & Decor') {
					item.productImage = '';
					item.ProductName = '';
					item.ProductPrice = '';
				}
				return item;
			});
			setSelectedProducts(updatedData);
		} else if (type === 'Care') {
			const updatedData = selectedProducts.map((item) => {
				if (item.type === 'Care') {
					item.productImage = '';
					item.ProductName = '';
					item.ProductPrice = '';
				}
				return item;
			});
			setSelectedProducts(updatedData);
		}
	};
	const gotToSelectedPage = (item, pageStateVal, selectedProductDetails) => {
		const pageState = pageStateVal === 0 || pageStateVal === 1 ? 0 : pageStateVal - 1;
		setSelectionType(item.type);

		setActiveSliderStep(pageState);
		setActiveSliderMainStep(pageState);
		setActiveStep(pageState);
		setProductDisplayType(pageState);

		setSelectedProduct(selectedProductDetails);
		if (item.type === 'Fish') {
			setSelectedFishData(selectedProductDetails?.fishSelection);
		} else if (item.type === 'Tank') {
			setSelectedTankData(selectedProductDetails);
			setSelectedAccessoriesData(0);
			setSelectedGravelDecorData(0);
			setSelectedCareData(0);
			resetTankData(item.type);
		} else if (item.type === 'Accessories') {
			setSelectedAccessoriesData(selectedProductDetails);
			setSelectedGravelDecorData(0);
			setSelectedCareData(0);
			resetTankData(item.type);
		} else if (item.type === 'Gravel & Decor') {
			setSelectedGravelDecorData(selectedProductDetails);
			setSelectedCareData(0);
			resetTankData(item.type);
		} else if (item.type === 'Care') {
			setSelectedCareData(selectedProductDetails);
			resetTankData(item.type);
		}
	};
	const handleGoBackClick = (event) => {
		handleBack(event, 1);
	};
	const getSubTotal = () => {
		let sum = 0;
		Boolean(selectedProducts) &&
			selectedProducts.length &&
			selectedProducts.forEach((item) => {
				sum = sum + item.ProductPrice;
			});
		return sum;
	};
	const handleChangeTips = (event, index) => {
		setActiveSliderStep(index);
	};

	return (
		<main>
			<Grid container spacing={0}>
				<Grid item xs={12} md={8} lg={8}>
					<Box className='tips-carousel-main'>
						<Box className={classes.main}>
							<ProductStepper activeStep={activeStep} steps={steps} />
						</Box>
						{selectionType !== 'Final' ? (
							<TipsCarousel
								activeSliderStep={activeSliderStep}
								handleStepChange={handleStepChange}
								tutorialSteps={currentTips}
								maxSteps={maxSteps}
								handleBack={handleBack}
								handleNext={handleNext}
								handleChangeTips={handleChangeTips}
							/>
						) : (
							<Congrats classes={classes} />
						)}
						<ProductListing
							selectionBasedProductList={selectionBasedProductList}
							handleProductSelection={handleProductSelection}
							selectedProduct={selectedProduct}
							handleProductSelectionClick={handleProductSelectionClick}
							handleGoBackClick={handleGoBackClick}
							type={selectionType}
							title={titleDetails.title}
							subTitle={titleDetails.subTitle}
							selectedFishData={selectedFishData}
							selectedTankData={selectedTankData}
							selectedAccessoriesData={selectedAccessoriesData}
							selectedGravelDecorData={selectedGravelDecorData}
							selectedCareData={selectedCareData}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} md={4} lg={4} className='cart-main'>
					<CartView
						classes={classes}
						selectedProducts={selectedProducts}
						selectedMultiProducts={selectedMultiProducts}
						selectionType={selectionType}
						getSubTotal={getSubTotal}
						getNewState={getNewState}
						gotToSelectedPage={gotToSelectedPage}
						selectedTankData={selectedTankData}
						selectedAccessoriesData={selectedAccessoriesData}
						selectedGravelDecorData={selectedGravelDecorData}
						selectedCareData={selectedCareData}
					/>
				</Grid>
			</Grid>
		</main>
	);
};
