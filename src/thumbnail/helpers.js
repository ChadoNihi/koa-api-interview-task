export const getWidthHeightFromResolutionStr = resol => (
	resol
		.toLowerCase()
		.split("x")
		.map(s => parseInt(s))
);