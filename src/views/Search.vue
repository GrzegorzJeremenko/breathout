<template>
  <div class="search">
      <div class="filterContainer">
          <div class="filters">
              <div class="filter">
                  <label>Odległość:</label>
                  <select ref="range">
                      <option :value="5 * Math.pow(2, n - 1)" v-for="n in 6" :key="n">{{ 5 * Math.pow(2, n - 1) }} km</option>
                  </select>
              </div>
              <div class="filter">
                  <label>Oceny:</label>
                  <select ref="rank">
                      <option :value="n" v-for="n in 5" :key="n">{{ n }}</option>
                  </select>
              </div>
              <div class="filter">
                  <label class="multi">Udogodnienia:</label>
                  <select class="multi" multiple>
                      <option value="icon-wheelchair">Osoby niepełnosprawne</option>
                      <option value="icon-paw">Przyjazne dla zwierząt</option>
                      <option value="icon-child">Do spacerownia</option>
                      <option value="icon-bicycle">Dojazd rowerem</option>
                      <option value="icon-motorcycle">Dojazd motocyklem</option>
                      <option value="icon-food">Miejsce na piknik</option>
                      <option value="icon-fire">Miejsce na ognisko</option>
                  </select>
              </div>
          </div>
      </div>
      <ul>
        <PlaceElement
        v-for="place in places"
        :key="place._id"
        :place="place" />
    </ul>
  </div>
</template>

<script>
  import PlaceElement from '@/components/PlaceElement.vue'

  import { getPlacesWithFilter } from '@/services/place.js'

  export default {
    name: 'Search',
    components: {
      PlaceElement
    },
    data() {
      return {
        places: Object
      }
    },
    mounted: function() {
        this.getPlacesList()

        this.$root.$on('searchRefresh', () => {
            this.getPlacesList()
        })
    },
    methods: {
      getPlacesList: function() {
          localStorage.setItem("range", this.$refs.range.value)
          localStorage.setItem("rank", this.$refs.rank.value)

        let params = {
            city: localStorage.getItem("city") != undefined ? localStorage.getItem("city") : '',
            range: localStorage.getItem("range") != undefined ? localStorage.getItem("range") : '30',
            'rank[lte]': localStorage.getItem("rank") != undefined ? localStorage.getItem("rank") : '5',
        }

        getPlacesWithFilter(params)
        .then((res) => {
            this.places = res.data.data
        })
        .catch(() => {
            setTimeout(this.getPlacesList, 5000)
        })
      }
    }
  }
</script>

<style scoped>
    div.search {
        margin: 110px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.search ul {
        width: 90%;
    }

    div.search div.filterContainer {
        width: 100%;
        overflow-x: scroll;
        margin: 0 0 10px 0;
    }

    div.search div.filterContainer div.filters {
        width: 700px;
        height: 50px;
        display: flex;
        flex-direction: row;
    }

    div.search div.filterContainer div.filters div.filter {
        margin: 0 10px 0 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    div.search div.filterContainer div.filters div.filter label {
        margin: 0 5px 0 0;
    }

    div.search div.filterContainer div.filters div.filter select {
        color: #333;
        box-sizing: border-box;
        font-size: 14px;
        padding: 20px;
        height: 40px;
        font-family: 'Comfortaa', cursive;
        border-bottom: 2px solid #ccc;
        border: none !important;
        border-radius: 5px;
        background: none;
        background-color: #fff;
        outline: none;
    }

    div.search div.filterContainer div.filters div.filter select.multi {
        margin: 0;
        height: 20px;
    }
</style>