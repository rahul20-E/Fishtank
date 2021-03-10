import { configs, SKUList } from '../config';
import { getSkuFullDetails } from './generator';

export const getSkuDetails = () => {
	const bigList = SKUList;
	let organizedList = {};
	let n = 0;

	for (let i = 0; i < bigList.length; i += configs.batchSize) {
		organizedList[`group${n}`] = bigList.slice(i, i + configs.batchSize);
		n += 1;
	}

	const listKeys = Object.keys(organizedList);
	for (let i = 0; i < listKeys.length; i++) {
		getSkuFullDetails(organizedList[listKeys[i]]);
	}
};
