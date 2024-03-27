<template>
  <div v-if="!huidigePokemonIsFav">
    <button @click="addFavorite">Add favorite</button>
    <p>{{ error }}</p>
  </div>
</template>
<script setup>
import { useCurrentUser } from 'vuefire'
import { defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import { useCollection } from 'vuefire'
import { collection, query, where, addDoc } from 'firebase/firestore'

import { db } from '../../firebase'

const props = defineProps(['pokeData'])
const error = ref(null)
const huidigeFavorites = ref([])
const huidigePokemonIsFav = ref(true)

const user = useCurrentUser()
const router = useRouter()

const q = query(collection(db, 'favorites'), where('uid', '==', user._rawValue.uid))
const myCollection = useCollection(q)

watch(myCollection, async (newCollection) => {
  huidigePokemonIsFav.value = false
  newCollection.forEach((item) => {
    if (item.pokemonId == props.pokeData.id) {
      huidigePokemonIsFav.value = true
    }
  })
})

async function addFavorite() {
  if (!huidigePokemonIsFav.value) {
    await addDoc(collection(db, 'favorites'), {
      name: props.pokeData.name,
      pokemonId: props.pokeData.id,
      uid: user._rawValue.uid
    })
      .then((result) => {
        console.log('gelukt', result)
      })
      .then(() => {
        router.push('/signin')
      })
  } else {
    console.log('Favorite was al aanwezig', props.pokeData.id, huidigeFavorites)
    error.value = `${props.pokeData.name} zit al in je favorieten!`
  }
}

console.log('pokedata', props.pokeData)
</script>
<style></style>
