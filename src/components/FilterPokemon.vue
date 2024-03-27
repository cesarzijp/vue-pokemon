<template>
  <div class="filter-container">
    <label>Filter</label>
    <input v-model="inputText" type="text" placeholder="Filter Pokemon..." @input="emitText" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const inputText = ref('')

const emit = defineEmits(['text-updated'])

function emitText() {
  emit('text-updated', inputText.value)
}
</script>
<style scoped>
label {
  display: block;
  font-weight: bold;
}
.filter-container {
  margin-bottom: 30px;
  margin-top: 15px;
}
</style>
