<template>
  <li>
      <div class="image" v-on:click="navigateTo('/place/' + place._id)" :style="{backgroundImage: image}"></div>
      <div class="data">
          <h1>{{ name }}</h1>
          <div class="stars">
              <i class="icon-star" v-for="n in Math.floor(place.rank)" :key="n"></i>
              <i class="icon-star-empty" v-for="n in (5 - Math.floor(place.rank) )" :key="n+5"></i>
                <p>&bull;</p> <p>{{ rank }}</p>
          </div>
          <h2>{{ distance }}</h2>
          <div class="amenitiesList">
              <i v-for="tag in place.tags" :key="tag" :class="tag"></i>
          </div>
          <div class="fav">
            <i v-if="fav" v-on:click="delFromFav" class="icon-star"></i>
            <i v-else v-on:click="addToFav" class="icon-star-empty"></i>
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
            distance: 'Liczę...',
            fav: false
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
            if(this.place.name.length > 11)
					return this.place.name.substr(0, 13) + '...'
				else
					return this.place.name
        },
    },
    methods: {
        navigateTo: function(subpage) {
            if(this.$route.path != subpage) 
            this.$router.push(subpage)
        },
        countDist: function() {
            let lat1 = localStorage.getItem("lat")
            let lon1 = localStorage.getItem("lon")

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
        },
        addToFav: function() {
            if(localStorage.getItem("fav") != undefined) {
                let json = JSON.parse(localStorage.getItem("fav"))

                json.push(new Object({ id: this.place._id }))

                localStorage.setItem("fav", JSON.stringify(json))

                json.forEach(jso => {
                    if(jso.id == this.place._id)
                        this.fav = true
                });
            } else {
                let json = [];
                json.push(new Object({ id: this.place._id }))

                localStorage.setItem("fav", JSON.stringify(json))

                this.fav = false

                json.forEach(jso => {
                    if(jso.id == this.place._id)
                        this.fav = true
                });
            }
        },
        delFromFav: function() {
            if(localStorage.getItem("fav") != undefined) {
                let json = JSON.parse(localStorage.getItem("fav"))

                json = json.filter((el) => {
                    return el.id !== this.place._id
                })

                localStorage.setItem("fav", JSON.stringify(json))

                this.fav = false

                json.forEach(jso => {
                    if(jso.id == this.place._id)
                        this.fav = true
                });
            } 
        }
    },
    mounted: function() {
        if(localStorage.getItem("lon") != undefined) 
            this.countDist()

        this.$root.$on('coord', () => {
            this.countDist()
        })

        if(localStorage.getItem("fav") != undefined) {
            let json = JSON.parse(localStorage.getItem("fav"))

            json.forEach(jso => {
                if(jso.id == this.place._id)
                    this.fav = true
            });
        }
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
    margin: 0 0 20px 0;
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
      font-size: 6vw;
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
