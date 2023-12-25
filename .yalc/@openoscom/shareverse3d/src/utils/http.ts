import {AxiosResponse} from "axios";
import axios from "@openoscom/network";

export const onFulfilled: (value: any) => any = (
	response: AxiosResponse
) => {
	return response.data;
};
const API_URI = "//test1.imart.io/v1/api";

const https = axios.create({baseURL: API_URI});
https.interceptors.response.use(onFulfilled);
export const getAwsJsonData = async (url: string) => {
	try {
		return await https.get("https://d1ktb2pux2fae3.cloudfront.net/mixverse/" + url);
	} catch (e) {
		return false;
	}
};

export const getPresignedUrl = async (bucket: string, key: string, type: string) => {
	return await https.get(
		`/s3/presigned-url?bucket=${bucket}&key=${key}&type=${type}`
	);
	
}
