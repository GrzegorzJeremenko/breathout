<template>
  <li>
      <div class="image" :style="{backgroundImage: image}"></div>
      <div class="data">
          <h1>{{ name }}</h1>
          <div class="stars">
              <i class="icon-star" v-for="n in Math.floor(place.rank)" :key="n"></i>
              <i class="icon-star-empty" v-for="n in (5 - Math.floor(place.rank) )" :key="n+5"></i>
                <p>&bull;</p> <p>{{ rank }}</p>
          </div>
          <h2>{{ distance }}</h2>
          <div class="amenitiesList">
              <i class="icon-bicycle"></i>
              <i class="icon-fire"></i>
              <i class="icon-child"></i>
              <i class="icon-paw"></i>
          </div>
          <div class="fav">
            <i class="icon-star-empty"></i>
          </div>
      </div>
  </li>
</template>

<script>
  export default {
    name: 'PlaceElement',
    props: {
        place: Object
    },
    data() {
        return {
            distance: 'Liczę...'
        }
    },
    computed: {
        rank: function() {
            let rankCount = this.place.rankList.length

            if(rankCount == 0)
                return rankCount + " opinii"
            else if(rankCount == 1)
                return rankCount + " opinia"
            else if(rankCount > 1 < 5)
                return rankCount + " opinie"
            else
                return rankCount + " opinii"
        },
        image: function() {
            return "url(data:image/png;base64," + this.place.images[0] + ")"
        },
        name: function() {
            if(this.place.name.length > 8)
					return this.place.name.substr(0, 8) + '...'
				else
					return this.place.name
        },
    },
    methods: {
        countDist: function(position) {
            console.log("twat")
            let lat1 = position.coords.latitude
            let lon1 = position.coords.longitude

            let lat2 = this.place.lat
            let lon2 = this.place.lon

            const R = 6371e3;
            const φ1 = lat1 * Math.PI/180;
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lon2-lon1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            this.distance = Math.floor(R * c / 1000) + " km od ciebie"; // in metres
        }
    },
    mounted: function() {
        this.$root.$on('coord', (position) => {
            this.countDist(position)
        })
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    height: 160px;
    border-radius: 10px;
    margin: 0 0 40px 0;
  }

  li div.image {
      width: 40%;
      height: 100%;
      background-color: #000;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url('~@/assets/test.jpg');
      border-radius: 10px;
  }

  li div.data {
      width: calc(60% - 10px);
      display: flex;
      flex-direction: column;
  }

  li div.data h1 {
      font-size: 7vw;
      margin: 10px 0 10px 0;
  }

    li div.data div.stars {
        display: flex;
        flex-direction: row;
        margin: 0 0 10px 0;
    }

    li div.data div.stars i {
        margin: -2px;
        color: #f1c40f;
    }

    li div.data div.stars i:first-child {
        margin: -2px -2px -2px -4px;
    }

    li div.data div.stars p {
        margin: 0 0 0 5px;
        color: #666;
    }

    li div.data h2 {
        margin: 0 0 10px 0;
        color: #666;
    }

    li div.data div.amenitiesList {
        display: flex;
        flex-direction: row;
    }

    li div.data div.amenitiesList i:first-child {
        margin: 2px 2px 2px 0;
    }


    li div.data div.amenitiesList i {
        margin: 2px;
        color: #444;
    }

    li div.data div.fav {
        width: 100%;
    }

    li div.data div.fav i {
        float: right;
        font-size: 25px;
        margin: 5px;
        color: #f1c40f;
    }

</style>
