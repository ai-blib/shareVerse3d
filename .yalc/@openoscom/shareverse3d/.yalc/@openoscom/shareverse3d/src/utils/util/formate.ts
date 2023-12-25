import axios, {AxiosResponse} from "axios";

const s3httpClient = axios.create();

import {getPresignedUrl} from '../http'


export const toThousands = (num) => {
	const numStr = (num || 0).toString();
	return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};


export const getImageInformation = (img_url: string): Promise<unknown> => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.src = img_url;
		if (img.complete) {
			resolve({width: img.width, height: img.height});
		} else {
			img.onload = function () {
				resolve({width: img.width, height: img.height});
			};
		}
	}).catch(() => {
		return {width: "", height: ""};
	});
	
};


export const AwsUploadModel = (file, nameSpace?: string): any => {
	return new Promise(async (resolve, reject) => {
		
		let {type, name} = file?.file || file;
		type = type || "glb";
		const bucket = "imart-nft";
		let key = `template/${name}`;
		
		if (nameSpace) {
			key = `${nameSpace}/template/${name}`;
		}
		try {
			const response = await getPresignedUrl(bucket, key, type);
			const signedUrl = response["URL"];
			if (!signedUrl) {
				reject("Empty presigned url");
				return;
			}
			const headers = {"Content-Type": "glb", "x-amz-acl": "public-read"};
			await s3httpClient.put(signedUrl, file, {headers});
			const uri = signedUrl.split("?")[0];
			resolve(uri);
		} catch (err) {
			reject(err);
		}
	});
};

