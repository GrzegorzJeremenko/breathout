<template>
  <div class="search" :style="{ padding: type ? '0 0 40px 0' : '40px 0 10px 0', position: type ? 'fixed' : 'static'}">
    <div class="inside">
      <h1 :style="{ display: type ? 'none' : 'block'}">
        Dziki dech<br/>w twojej okolicy
      </h1>
      <form :style="{ flexDirection: type ? 'row' : 'column', width: type ? '100%' : '80%', margin: type ? '40px 0 -20px 0' : '40px 0 20px 0'}">
        <input
          type="text"
          ref="city"
          placeholder="Miasto, np. Katowice">

        <button :style="{ margin: type ? '0 0 0 10px' : '20px 0 0 0'}"><i class="icon-search"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
  const axios = require('axios')
  const convert = require('xml-js');

  export default {
    name: 'Search',
    data() {
      return {
        lastScrollY: 0,
        type: false,
      }
    },
    methods: {
      success: function(position) {
        let latitude  = position.coords.latitude
        let longitude = position.coords.longitude

        console.log(latitude + " " + longitude)

        this.getLocationData(position)
      },
      getLocationData: function(position) {
        let latitude  = position.coords.latitude
        let longitude = position.coords.longitude

        axios({
          method: 'GET',
          url: `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${ latitude }&lon=${ longitude }&zoom=18&addressdetails=1`,
        }).then((res) => {
          if(res.status === 200) {
            this.parseLocation(res.data)
          }
        })
      },
      parseLocation: function(xml) {
        let json = JSON.parse(convert.xml2json(xml, {
          compact: true,
          spaces: 4
        })).reversegeocode.addressparts

        let city = '';

        if(json.city === undefined)
          city = json.town._text
        else
          city = json.city._text
        
        
        let country = json.country._text

        this.$refs.city.value = city + ", " + country
      }
    },
    created: function() {
      navigator.geolocation.getCurrentPosition(this.success, function() {
        console.log("Unable to retrieve your location.")
      })

      window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  div.search {
    position: fixed;
    top: 0;
    margin: -20px 0 0 0;
    z-index: 10000;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2ecc71;
    padding: 40px 0 10px 0;
    border-radius: 20px;
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
    transition: opacity .3s ease-in-out;
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

  div.search form button {
    border: none;
    background: none;
    text-decoration: none;
    font-size: 8vw;
    background-color: #e67e22;
    border-bottom: 2px solid #d35400;
    text-align: center;
    width: 32vw;
    height: 14vw;
    padding: 0px;
    color: #fff;
    border-radius: 80px;
    margin: 20px 0 0 0;
    transition: all .3s ease;
  }

  div.search form button:hover {
    background-color: #d35400;
    border-bottom: 2px solid #e67e22;
  }
</style>
