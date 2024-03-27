<template>
  <h1>Pokemon</h1>
  <p>Please select a Pokemon</p>
  <FilterPokemon @text-updated="handleInputChange" />
  <div class="pokemon-grid" v-if="pokemonData">
    <PokemonGridItem
      v-for="(pokemon, index) in pokemonData"
      :key="index"
      :data="pokemon"
      :id="pokemon.id"
    ></PokemonGridItem>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
<script setup>
import PokemonGridItem from '../components/PokemonGridItem.vue'
import FilterPokemon from '../components/FilterPokemon.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'

async function fetchPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  const data = await res.json()

  console.log('data', data)

  return data
}

const pokemonData = ref([])
const loadedData = ref([])

onMounted(async () => {
  const data = await fetchPokemon()
  const rawData = data.results.slice(0, 1025)
  let updatedData = []
  rawData.forEach((item, index) => {
    let originalData = item
    originalData.id = index + 1
    updatedData.push(originalData)
  })
  pokemonData.value = updatedData
  loadedData.value = updatedData

  //console.log(this.pokemonData)
})

function handleInputChange(data) {
  const filteredPokemon = loadedData.value.filter((pokemon) => {
    return pokemon.name.includes(data.toLowerCase().trim())
  })

  pokemonData.value = filteredPokemon
}
</script>
<style scoped>
.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pokemon-grid > div {
  width: calc(100% / 5 - 50px);
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 10px;
  align-content: center;
  border: 1px solid rgb(56, 56, 56);
}

@media screen and (max-width: 1000px) {
  .pokemon-grid > div {
    width: calc(33% - 15px);
  }
}

@media screen and (max-width: 700px) {
  .pokemon-grid > div {
    width: calc(50% - 5px);
  }
}
</style>
