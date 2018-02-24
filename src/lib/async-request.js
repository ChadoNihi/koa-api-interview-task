import request from "request";

// credits to https://stackoverflow.com/a/40552394/4579279
export default async (val) =>
	new Promise((resolve, reject) => {
		request(val, (err, _res, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});