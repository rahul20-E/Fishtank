import { getRequest } from './auth';
import { configs } from '../config';

export const getSkuFullDetails = (data) => {
	return getRequest(`${configs.baseURL}(${[...data]})?${configs.secret}`, data);
};
