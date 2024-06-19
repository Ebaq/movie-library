import axios from 'axios'

export const getInstanceApiV1 = (headersList?: { [key: string]: string }) => {
	return axios.create({
		baseURL: process.env.REACT_APP_API_URL_V1,
		responseType: 'json',
		headers: getHeaders(headersList),
	})
}

export const getInstanceApiV14 = (headersList?: { [key: string]: string }) => {
	return axios.create({
		baseURL: process.env.REACT_APP_API_URL_V14,
		responseType: 'json',
		headers: getHeaders(headersList),
	})
}

export const getHeaders = (headersList?: { [key: string]: string }) => {
	let headers: any = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		...headersList,
	}
	const API_KEY = process.env.REACT_APP_API_KEY
	if (API_KEY) {
		headers['X-API-KEY'] = API_KEY
	}
	return headers
}

export const rejectAxios = (e: any) => {
	if (!!e && !!e.response && !!e.response.status) {
		return {
			result: 'error',
			...e.response.data,
			status: e.response.status,
		}
	} else {
		return {
			result: 'error',
			code: 500,
			data: 'Error',
		}
	}
}

export const makeRequestGetV1 = async <Res>(
	url: string,
	headersList?: { [key: string]: string }
): Promise<Res> => {
	const httpInstance = getInstanceApiV1(headersList)
	try {
		const response = await httpInstance.get(url)
		return response.data
	} catch (e) {
		return rejectAxios(e)
	}
}

export const makeRequestGetV14 = async <Res>(
	url: string,
	headersList?: { [key: string]: string }
): Promise<Res> => {
	const httpInstance = getInstanceApiV14(headersList)
	try {
		const response = await httpInstance.get(url)
		return response.data
	} catch (e) {
		return rejectAxios(e)
	}
}
