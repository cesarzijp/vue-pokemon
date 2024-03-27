import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FBKEY,
  authDomain: 'vueapp-b0466.firebaseapp.com',
  projectId: 'vueapp-b0466',
  storageBucket: 'vueapp-b0466.appspot.com',
  messagingSenderId: '295520861490',
  appId: '1:295520861490:web:31fa887dcde47947822b2b'
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')

console.log(import.meta.VUE_APP_FBKEY)
