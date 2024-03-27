<template>
  <div>
    <button @click="handleDelete" class="delete-button" v-if="showDelete">Delete</button>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`"
    />
    <h3>{{ data.name }}</h3>
    <RouterLink :to="`/pokemon/${id}`">View</RouterLink>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const props = defineProps(['id', 'data', 'showDelete', 'firestoreID'])

async function handleDelete() {
  await deleteDoc(doc(db, 'favorites', props.firestoreID))
    .catch((error) => {
      console.error(error)
    })
    .then((result) => {
      console.log('gelukt', result)
    })
}
</script>
<style scoped>
h3 {
  text-transform: capitalize;
}

img {
  image-rendering: pixelated;
}
</style>
