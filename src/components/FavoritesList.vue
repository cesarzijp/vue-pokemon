<template>
  <div v-for="(favorite, index) in favorites" :key="index">
    <h3>{{ favorite.pokemonId }}</h3>
    <PokemonGridItem
      :data="{ name: favorite.name }"
      :id="favorite.pokemonId"
      :showDelete="true"
      :firestoreID="favorite.id"
    />
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire'
import { useCollection } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import PokemonGridItem from './PokemonGridItem.vue'

const user = useCurrentUser()

let favorites

if (user) {
  const q = query(collection(db, 'favorites'), where('uid', '==', user._rawValue.uid))
  favorites = useCollection(q)
}
</script>
<style></style>
