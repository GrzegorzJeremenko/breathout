<template>
  <div class="home">
    <ul>
      <Place />
    </ul>
  </div>
</template>

<script>
  import Place from '@/components/Place.vue'

  export default {
    name: 'Home',
    components: {
      Place
    },
    data() {
      return {
        places: [
          {
            name: 'Skałki',
            
          }
        ]
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

  div.home ul {
    width: 90%;
  }
</style>
