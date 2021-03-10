import { productMockData } from './data';

export const batchSize = 20; // Cannot exceed 24 products per call
export const isSmallBannerVisible = false;

export const getSkuList = (fishName) => {
	switch (fishName) {
		case 'Betta':
			return productMockData.bettaFishSKUList;
		case 'Cichlid':
			return productMockData.cichlidFishSKUList;
		case 'Goldfish':
			return productMockData.goldFishSKUList;
		case 'Glofish':
			return productMockData.gloFishSKUList;
		case 'Tetra':
			return productMockData.tetraFishSKUList;
		case 'Snail':
			return productMockData.snailFishSKUList;
		default:
			return [];
	}
};

export const getTankImage = (skuId, type) => {
	return `https://s7d2.scene7.com/is/image/PetSmart/${skuId}?$sclp-prd-main_large$`;
};

export const getRecommendedTankTitle = (name) => {
	return {
		title: `For ${name}, we recommend these tanks`,
		subTitle: 'Please select a tank.',
	};
};

export const getFishCareOption = (name) => {
	return `https://s7d2.scene7.com/is/image/PetSmart/${name}?fmt=png-alpha`;
};
