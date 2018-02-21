const config = Object.freeze({
	environment: process.env.NODE_ENV || "development",
	server: {
		host: "0.0.0.0",
		port: process.env.NODE_PORT || process.env.PORT || 3000
	}
});

export default config;