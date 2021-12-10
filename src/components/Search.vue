<template>
  <div class="search">
    <div class="inside">
      <h1>
        Dziki dech<br/>w twojej okolicy
      </h1>
      <form>
        <input
          type="text"
          ref="city"
          placeholder="Miasto, np. Katowice">
      </form>
    </div>
  </div>
</template>

<script>
  const axios = require('axios')
  const convert = require('xml-js');

  export default {
    name: 'Search', 
    methods: {
      success: function(position) {
        let latitude  = position.coords.latitude
        let longitude = position.coords.longitude

        console.log(latitude + " " + longitude)

        this.getCityName(position)
      },
      getCityName: function(position) {
        let latitude  = position.coords.latitude
        let longitude = position.coords.longitude

        axios({
          method: 'GET',
          url: `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${ latitude }&lon=${ longitude }&zoom=18&addressdetails=1`,
        }).then((res) => {
          if(res.status === 200) {
            let location = JSON.parse(convert.xml2json(res.data, {compact: true, spaces: 4})).reversegeocode.addressparts

            let city = location.city._text
            let country = location.country._text

            this.$refs.city.value = city + ", " + country
          }
        })
      }
    },
    created: function() {
      navigator.geolocation.getCurrentPosition(this.success, function() {
          console.log("Unable to retrieve your location")
        });
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  div.search {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2ecc71;
    padding: 40px 0 40px 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
  }

  div.search div.inside {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.search h1 {
    width: 100%;
    font-family: 'Comfortaa', cursive;
    text-align: center;
    font-size: 10vw;
    color: #fff;
    line-height: 11vw;
  }

  div.search form {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0 20px 0;
  }

  div.search form input[type=text] {
    width: 100%;
    font-family: 'Comfortaa', cursive;
    border: none;
    padding: 15px 10px 15px 45px;
    background-color: #fff;
    display: block;
    outline: none;
    box-sizing: border-box;
    border-bottom: 2px solid #ccc;
    font-size: 1rem;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: 10px 15px;
    transition: border .3s ease;
    background-image: url("~@/assets/Search/location.svg");
  }
</style>
