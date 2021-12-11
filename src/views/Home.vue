<template>
  <div class="home">
    <h1>Proponowane miejsca:</h1>
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

  import { getPlaces } from '@/services/place.js'

  export default {
    name: 'Home',
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
    methods: {
      getPlacesList: function() {
        getPlaces(this.$route.params._id)
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
  div.home {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0 0 0;
  }

  div.home h1 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }

  div.home ul {
    width: 90%;
    margin: 0 0 100px 0;
  }
</style>
