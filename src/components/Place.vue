<template>
  <li>
      <div class="image"></div>
      <div class="data">
          <h1>Skłaki</h1>
          <div class="stars">
              <i class="icon-star" v-for="n in star" :key="n"></i>
              <i class="icon-star-empty" v-for="n in (5 - star)" :key="n+5"></i>
                <p>&bull;</p> <p>209 opinii</p>
          </div>
          <h2>2 km od ciebie</h2>
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
    name: 'Place',
    data() {
        return {
            star: 4
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
