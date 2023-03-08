// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		},
		private: {
			FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		},
	},
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
})
