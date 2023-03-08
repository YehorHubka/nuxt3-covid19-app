import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'data-store',
  state: () => {
    return {
      data: []
    }
  },
  actions: {
	async fetchData() {
		let dataLength = 5
		
		for(let i = 1; i <= dataLength; i++) {

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
					this.data.push(data)
				})
				.catch((error) => console.log(error));

		}
		
		
	}
  }
})