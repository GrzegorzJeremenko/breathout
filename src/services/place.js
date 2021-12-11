const config = require('@/services/config.js')
const axios = require('axios')

const getPlaces = () => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'GET',
			url: `${ config.serverAdress }/api/v1/places`,
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

const getPlace = (id) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'GET',
			url: `${ config.serverAdress }/api/v1/places/${id}`,
		})
		.then((res) => {
			switch(res.status) {
				case 200:
					resolve(res)
					break

				default:
					reject()
					break
			}
		})
		.catch((err) => reject(err))
	})
}

export { getPlace, getPlaces }