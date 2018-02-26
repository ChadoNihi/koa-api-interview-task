export const getWidthHeightFromResolutionStr = resol => {
	const [w, h] = resol
		.toLowerCase()
		.split("x")
		.map(s => parseInt(s));

	if (w > 0 && h > 0) {
		return [w, h];
	} else {
		throw Error("Malformed resolution string. The expected format is \"<pos_int W>x<pos_int H>\" (e.g. \"50x50\").");
	}
};