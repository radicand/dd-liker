const APP_ID = process.env.APP_ID;
const AUTH_ID = process.env.AUTH_ID;

export const FEED_SIZE = Number(process.env.FEED_SIZE);
export const FEED_REFRESH = Number(process.env.FEED_REFRESH || 60);
export const TOKEN_PAYLOAD = {
	access_token: process.env.ACCESS_TOKEN,
	token_type: 'bearer',
	expires_in: 3600,
	refresh_token: process.env.REFRESH_TOKEN,
};
export const FIRST_NAME = process.env.FIRST_NAME;
export const LAST_NAME = process.env.LAST_NAME;

const API_URL = 'https://api.doubledutch.me/v2';
export const FEED_URL = `${API_URL}/activitygroups/?sdk=true&binaryVersion=8.1&applicationid=${APP_ID}&count=${FEED_SIZE}`;
export const LIKE_URL_PATH = (postId) =>
	`${API_URL}/activities/${postId}/likes?sdk=true&binaryVersion=8.1&applicationid=${APP_ID}`;
export const REFRESH_URL_PATH = (token) =>
	`https://app.doubledutch.me/auth/${AUTH_ID}/refresh/${token}`;
