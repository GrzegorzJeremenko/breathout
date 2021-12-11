<template>
  <div class="favourite">
      <h1>Zapisane miejsca:</h1>
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

  import { getPlace } from '@/services/place.js'

  export default {
    name: 'Favourite',
    components: {
      PlaceElement
    },
    data() {
      return {
        places: []
      }
    },
    created: function() {
      this.getPlacesList()
    },
    methods: {
        getPlacesList: function() {

        if(localStorage.getItem("fav") != undefined) {
            let favs = JSON.parse(localStorage.getItem("fav"))

            favs.forEach(fav => {
                getPlace(fav.id)
                .then((res) => {
                    this.places.push(res.data)
                })
            });
        }
      }
    }
  }
</script>

<style scoped>
    div.favourite {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.favourite h1 {
        width: 80%;
        font-size: 20px;
        margin: 40px 0 40px 0;
    }

    div.favourite ul {
        width: 90%;
    }
</style>