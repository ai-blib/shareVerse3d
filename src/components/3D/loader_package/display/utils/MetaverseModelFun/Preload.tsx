// @ts-ignore
import { personLadyModel, personMantModel } from '@/utils/gallery';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LoadModelCache from './index';

const preLadGalleryPaths = [
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/sandy-v1.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/pink-v1.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/gallery.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/red.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/court-transformed.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/base.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/backetball-v1.json',
	// "https://imart-nft.s3.us-east-1.amazonaws.com/template/big.json",
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/circle-v1.json',
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/wedding-green-v1.json',
	// "https://imart-nft.s3.us-east-1.amazonaws.com/template/halloween-v1.json",
	'https://imart-nft.s3.us-east-1.amazonaws.com/template/park-blue-v1.json'
];
let preLoadFirst = true;

export const preLoadPerson = async () => {
	// @ts-ignore
	const val = JSON.parse(sessionStorage.getItem('load'));
	if (val) {
		return;
	}
	const person = [...personLadyModel, ...personMantModel];
	for (const url of person) {
		await LoadModelCache.loaderChunkFile(url);
	}
	sessionStorage.setItem('load', JSON.stringify(true));
	return true;
};

export const preLoadGallery = async () => {
	// @ts-ignore
	const val = JSON.parse(sessionStorage.getItem('gallery_load'));
	if (val) {
		return;
	}
	for (const _url of preLadGalleryPaths) {
		await LoadModelCache.loaderChunkFile(_url);
	}
	sessionStorage.setItem('gallery_load', JSON.stringify(true));

	return true;
};
export const PreloadStart = () => {
	const Location = useLocation();
	useEffect(() => {
		if (!preLoadFirst || Location.pathname.includes('space')) {
			return;
		}
		preLoadFirst = false;
		(async () => {
			await preLoadGallery();
			await preLoadPerson();
		})();
	}, [Location.pathname]);
};
