<template>
  <RouterLink to="/">Naar home</RouterLink><br />
  <button v-if="user" @click="handleSignout">Sign out</button>
  <div v-if="!user">
    <h2>Sign in</h2>
    <button @click="handleSingin">Sign in with Google</button>
  </div>
  <div v-else>
    <h2>Favorites</h2>
    <FavoritesList />
  </div>
</template>

<script setup>
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth'
import FavoritesList from '../components/FavoritesList.vue'

const auth = useFirebaseAuth() // only exists on client side
const provider = new GoogleAuthProvider()

const user = useCurrentUser()

function handleSingin() {
  console.log('sigin handler')
  signInWithRedirect(auth, provider)
    .then(() => {
      console.log('Gelukt')
    })
    .catch((error) => {
      console.log(error)
    })
}

function handleSignout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
<style></style>
