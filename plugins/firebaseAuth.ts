import {initializeApp} from 'firebase/app'


export default defineNuxtPlugin(nuxtApp => {

	const config = useRuntimeConfig();

	const firebaseConfig = {
		apiKey: config.public.FIREBASE_API_KEY,
		authDomain: "vue-auth-d709a.firebaseapp.com",
		projectId: "vue-auth-d709a",
		storageBucket: "vue-auth-d709a.appspot.com",
		messagingSenderId: "180147982515",
		appId: "1:180147982515:web:408de96bd17a4f5c15e0c6",
	}

	initializeApp(firebaseConfig)

})