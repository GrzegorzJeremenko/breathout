<template>
  <div class="search">
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
    created: function() {
      this.getPlacesList()
    },
    mounted: function() {
        this.$root.$on('searchRefresh', () => {
            this.getPlacesList()
        })
    },
    methods: {
      getPlacesList: function() {
          console.log("ref")

        let body = {
            city: localStorage.getItem("city"),
            range: 30
        }

        getPlacesWithFilter(body)
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
        margin: 120px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.search ul {
        width: 90%;
    }
</style>