<template>
    <div class="place">
        <div class="gallery-container">
            <div class="gallery" ref="galler">
                <div class="image" v-for="image in place.images" :key="image" :style="{ backgroundImage: 'url(data:image/png;base64,' + image + ')' }"></div>
            </div>
            <div class="top">
                <h1>{{ place.name }}</h1>
                <i v-if="fav" v-on:click="delFromFav" class="icon-star"></i>
                <i v-else v-on:click="addToFav" class="icon-star-empty"></i>
            </div>
        </div>
        <div class="inside">
            <label>Co to za miejsce?</label>

            <p>
               {{ place.description }}
            </p>

            <div id="mapContainer"></div>

            <label>Jak dotrzeć?</label>

            <p>
                {{ place.instructions }}
            </p>

            <a :href="'http://www.google.com/maps/place/' + place.lat + ',' + place.lon" target="_blank"><button>Nawiguj</button></a>
        </div>
    </div>
</template>

<script>
    import OSM from 'ol/source/OSM'
    import TileLayer from 'ol/layer/Tile'
    import { Map, View, Overlay } from 'ol'
    import { fromLonLat } from 'ol/proj'

    import { getPlace } from '@/services/place.js'

  export default {
    name: 'Place',
    data() {
        return {
            place: Object,
            fav: false
        }
    },
    created: function() {
        getPlace(this.$route.params._id)
        .then((res) => {
            this.place = res.data
            console.log(res)

            this.$refs.galler.style.width = 100 * this.place.images.length + "%"
            this.genMap()
        })
        .catch(() => {
            this.navigateTo('/')
        })
    },
    mounted: function() {
        if(localStorage.getItem("fav") != undefined) {
            let json = JSON.parse(localStorage.getItem("fav"))

            json.forEach(jso => {
                if(jso.id == this.place._id)
                    this.fav = true
            });
        }
    },
    methods: {
        navigateTo: function(subpage) {
            if(this.$route.path != subpage) 
            this.$router.push(subpage)
        },
        genMap: function() {
            let map = new Map({
            target: 'mapContainer',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([this.place.lon, this.place.lat]),
                zoom: 16,
                constrainResolution: true
            }),
        });

        let point = document.createElement("i")
        point.className = "icon-location";
        point.style.color = "#e67e22"
        point.style.fontSize = "40px"
                        
        let marker = new Overlay({
            position: [0, 0],
            positioning: 'center-center',
            element: point,
            stopEvent: false
        })

        marker.setPosition(fromLonLat([this.place.lon, this.place.lat]))

        map.addOverlay(marker)
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
    }
  }
</script>

<style scoped>
    div.place {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.place div.inside {
        width: 90%;
        display: flex;
        flex-direction: column;
        margin: 0 0 100px 0;
    }

    div.place div.gallery-container {
        height: 75vh;
        width: 100vw;
        padding: 0;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
    }

    div.place div.gallery-container div.gallery {
        width: calc(100% * 3);
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    div.place div.gallery-container div.gallery div.image {
        width: 100%;
        height: 100%;
        background-color: #000;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('~@/assets/test.jpg');
        object-fit: cover;
        scroll-snap-align: start;
    }

    div.place div.gallery-container div.top {
        position: absolute;
        width: 100vw;
        height: 80px;
        background-color: #eee;
        margin: -60px 0 0 0;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    div.place div.gallery-container div.top h1 {
        font-size: 30px;
        margin: -15px 0 0 20px;
    }

    div.place div.gallery-container div.top i {
        font-size: 30px;
        margin: -15px 20px 0 0;
        color: #f1c40f;
    }

    div.place div.inside label {
        margin: 0 0 5px -2px;
        color: #333;
    }

    div.place div.inside p {
        font-size: 16px;
        line-height: 20px;
    }

    div.place div.inside div#mapContainer {
        height: 300px;
        margin: 20px 0 20px 0;
    }

    div.place div.inside a button {
        width: 100%;
        font-family: 'Comfortaa', cursive;
        background-color: #2ecc71;
        box-sizing: border-box;
        color: #fff;
        border: none;
        height: 49px;
        cursor: pointer;
        border-radius: 30px;
        font-size: 16px;
        margin: 30px 0 0 0;
        letter-spacing: 2px;
        font-weight: bold;
    }
</style>