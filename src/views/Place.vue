<template>
    <div class="place">
        <div class="gallery-container">
            <div class="gallery">
                <div class="image"></div>
                <div class="image"></div>
                <div class="image"></div>
            </div>
            <div class="top">
                <h1>Skałki</h1>
                <i class="icon-star-empty"></i>
            </div>
        </div>
        <div class="inside">
            <label>Co to za miejsce?</label>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut accumsan massa, non dapibus odio. Morbi in elit est. Vivamus aliquam, mi non tristique consequat, elit dolor mattis turpis, non pellentesque justo dui sit amet est. Morbi sagittis libero elit, in placerat elit vestibulum sit amet.
            </p>

            <div id="mapContainer"></div>

            <label>Jak dotrzeć?</label>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut accumsan massa, non dapibus odio. Morbi in elit est. Vivamus aliquam, mi non tristique consequat, elit dolor mattis turpis, non pellentesque justo dui sit amet est. Morbi sagittis libero elit, in placerat elit vestibulum sit amet.
            </p>
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
            place: Object
        }
    },
    created: function() {
        getPlace(this.$route.params._id)
        .then((res) => {
            this.place = res.data
            console.log(res)
        })
        .catch(() => {
            this.navigateTo('/')
        })
    },
    methods: {
        navigateTo: function(subpage) {
            if(this.$route.path != subpage) 
            this.$router.push(subpage)
        },
    },
    mounted: function() {
        let map = new Map({
            target: 'mapContainer',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([19.1949126, 50.3216897]),
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

        marker.setPosition(fromLonLat([19.1949126, 50.3216897]))

        map.addOverlay(marker)
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
</style>