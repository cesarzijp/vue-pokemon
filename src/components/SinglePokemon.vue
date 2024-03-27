<template>
  <RouterLink to="/">Back</RouterLink>

  <div v-if="pokeData">
    <h1>{{ pokeData.name }}</h1>
    <div v-if="user">
      <MakeFavorite :pokeData="pokeData" />
    </div>

    <img :src="pokeData.sprites.front_default" class="pokemon-image" :alt="pokeData.name" />
    <div>
      <h2>Types</h2>
      <div class="pills">
        <div v-for="(pokeType, index) in pokeData.types" :key="index">
          {{ pokeType.type.name }}
        </div>
      </div>
    </div>
    <div>
      <h2>Moves</h2>
      <div class="pills">
        <div v-for="move in pokeData.moves" :key="move.move.url">
          {{ move.move.name }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
<script setup>
import MakeFavorite from '../components/MakeFavorite.vue'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()

const route = useRoute()

async function fetchPokemon(id) {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
  const data = await res.json()
  console.log('data', data)
  return data
}

const pokeData = ref(null)

onMounted(async () => {
  const singlePokemonData = await fetchPokemon(route.params.id)
  console.log('single', singlePokemonData)
  pokeData.value = singlePokemonData
})
</script>

<style scoped>
h1 {
  text-transform: capitalize;
}
.pills {
  display: flex;
  flex-wrap: wrap;
}

.pokemon-image {
  image-rendering: pixelated;
}

.pills div {
  border: 1px solid #80808042;
  margin: 0 10px 7px 0;
  padding: 1px 9px;
  border-radius: 100px;
  text-transform: capitalize;
}
</style>
