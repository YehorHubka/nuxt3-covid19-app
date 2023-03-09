import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'data-store',
  state: () => {
    return {
      data: [],
	  loader: false,
	  dataLength: 5
    }
  },
  actions: {
	async fetchData() {
		this.loader = true
		
		// let promises = [];

		// for(let i = 1; i <= this.dataLength; i++) {
		// 	let oneDay = 86400000 * i;
		// 	let time = new Date().getTime() - oneDay;
		// 	let date = new Date(time).toLocaleDateString("zh-Hans-CN").split("/");
		// 	if (date[1].length == 1) date[1] = "0" + date[1];
		// 	if (date[2].length == 1) date[2] = "0" + date[2];
			
		// 	promises.push(await fetch(`https://covid-api.com/api/reports/total?iso=UKR&date=${date.join('-')}`));
		// }

		// try {
		// 	Promise.all(promises)
		// 		.then(responses => Promise.all(responses.map(r => r.json())))
		// 		.then(result => result.map(( { data } ) => {
		// 			data.id = Date.now()
		// 			this.data.push(data)
		// 		}));
		// } catch(error) {
		// 	console.log(error);
		// } finally {
		// 	this.loader = false
		// }

		try {
			for(let i = 1; i <= this.dataLength; i++) {

				let oneDay = 86400000 * i;
				let time = new Date().getTime() - oneDay;
				let date = new Date(time).toLocaleDateString("zh-Hans-CN").split("/");
				if (date[1].length == 1) date[1] = "0" + date[1];
				if (date[2].length == 1) date[2] = "0" + date[2];
				
				const api =
				`https://covid-api.com/api/reports/total?iso=UKR&date=${date.join('-')}`;

				await fetch(api)
					.then((response) => response.json())
					.then(({ data }) => {
						data.id = Date.now()
						//console.log('data', data);
						this.data.push(data)
					})
					.catch((error) => console.log(error));

			}
			this.loader = false
		} catch(error) {
			console.log(error)
		}
		
	}
  }
})