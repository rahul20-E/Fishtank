import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
	showErrorDialog(error.response);
	return Promise.reject(error);
});

const showErrorDialog = (error) => {
	if (error && error.status === 401) {
		window.location.reload();
	}
};

export const request = async (path, data, method) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	return axios({
		method,
		url: path,
		headers: headers,
		data,
	});
};

export const getRequest = (path, data) => request(path, data, 'GET');
export const postRequest = (path, data) => request(path, data, 'POST');
export const patchRequest = (path, data) => request(path, data, 'PATCH');
export const deleteRequest = (path, data) => request(path, data, 'DELETE');
export const putRequest = (path, data) => request(path, data, 'PUT');
