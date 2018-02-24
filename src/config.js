const config = Object.freeze({
	environment: process.env.NODE_ENV || "development",
	jwtSecret: process.env.JWT_SECRET || "pa$$word",
	server: {
		host: process.env.HOST || "0.0.0.0",
		port: process.env.NODE_PORT || process.env.PORT || 3000
	},
	thumbnailService: {
		defaultResolution: "50x50"
	},
	test: {
		imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Elephants_at_bath_Sri_Lanka.jpg"
	}
});

export default config;