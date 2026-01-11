<script setup lang="ts">
import { ref, watch } from "vue"

const emit = defineEmits(["search"])
const keyword = ref("")

let timer: any

watch(keyword, (v) => {
  clearTimeout(timer)
  timer = setTimeout(() => emit("search", v), 300)
})
</script>

<template>
  <input
    v-model="keyword"
    class="search"
    placeholder="Search folders or files..."
  />
</template>

<style>
.search {
  width: 240px;
  height: 26px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
}

.search:focus {
  outline: none;
  border-color: #4a90e2;
}
</style>
