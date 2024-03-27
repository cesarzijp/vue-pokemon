<script setup>
import PokemonOverview from '@/components/PokemonOverview.vue'
import { useCurrentUser } from 'vuefire'
const user = useCurrentUser()
</script>

<template>
  <div v-if="user">
    <p>Hello {{ user.email }}</p>
    <RouterLink to="/signin">Je account</RouterLink>
  </div>
  <div v-else>
    <RouterLink to="/signin">Inloggen</RouterLink>
  </div>
  <PokemonOverview />
</template>
