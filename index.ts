import * as CONSTANTS from './constants';
import * as request from 'request-promise';
import * as fs from 'fs';

let access_token;
let refresh_token;

const checkFeedForUpdates = async () => {
	try {
		const feed = await request({
			url: CONSTANTS.FEED_URL,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			json: true,
		});

		if (feed.IsSuccess) {
			const toLike = feed.Value.filter((row) => {
				// ignore if disabled, whatever that means
				if (row.IsDisabled) return false;

				// ignore if we liked this already
				if (
					row.Activities.length === 1 &&
					row.Activities[0].Likes.find(
						(like) =>
							like.User.FirstName === CONSTANTS.FIRST_NAME &&
							like.User.LastName === CONSTANTS.LAST_NAME
					)
				) {
					return false;
				}

				return true;
			});

			console.log(`Liking ${toLike.length} of ${CONSTANTS.FEED_SIZE} items...`);

			// like it.
			toLike.forEach((row, index) =>
				setTimeout(() => likeItem(row.Id), index * 500)
			);
		}
	} catch (ex) {
		try {
			fs.unlink('/mnt/dd_tokenstore/access_token', () => {});
		} catch (ex) {}

		console.log(
			`Refreshing token => ${CONSTANTS.REFRESH_URL_PATH(refresh_token)}`
		);

		try {
			const refresh = await request({
				url: CONSTANTS.REFRESH_URL_PATH(refresh_token),
				json: true,
			});

			refresh_token = refresh.refresh_token;
			access_token = refresh.access_token;
			updateTokens(refresh);

			setTimeout(checkFeedForUpdates, 5000);
		} catch (ex) {
			try {
				fs.unlink('/mnt/dd_tokenstore/refresh_token', () => {});
			} catch (ex) {}
			console.warn('NO VALID TOKENS - EXITING - PLEASE UPDATE ENV');
		}

		return;
	}

	setTimeout(checkFeedForUpdates, CONSTANTS.FEED_REFRESH * 1000);
};

const likeItem = (id) => {
	console.log(`Liking Item #${id}`);
	request({
		url: CONSTANTS.LIKE_URL_PATH(id),
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		json: true,
		method: 'post',
	});
};

const getTokens = () => {
	try {
		access_token = fs
			.readFileSync('/mnt/dd_tokenstore/access_token')
			.toString();
	} catch (ex) {
		access_token = CONSTANTS.TOKEN_PAYLOAD.access_token;
	}
	try {
		refresh_token = fs
			.readFileSync('/mnt/dd_tokenstore/refresh_token')
			.toString();
	} catch (ex) {
		refresh_token = CONSTANTS.TOKEN_PAYLOAD.refresh_token;
	}
};

const updateTokens = (payload) => {
	fs.writeFile(
		'/mnt/dd_tokenstore/access_token',
		payload.access_token,
		() => {}
	);
	fs.writeFile(
		'/mnt/dd_tokenstore/refresh_token',
		payload.refresh_token,
		() => {}
	);
};

getTokens();
checkFeedForUpdates();
