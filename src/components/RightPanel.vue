<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  folders: any[]
  files: any[]
  searchResults: any[]
}>()

const emit = defineEmits<{
  (e: "open-folder", folder: any): void
}>()

const items = computed(() => {
  if (props.searchResults.length) {
    return props.searchResults
  }

  return [
    ...props.folders.map(f => ({
      id: f.id,
      name: f.name,
      type: "folder"
    })),
    ...props.files.map(f => ({
      id: f.id,
      name: f.name,
      type: "file"
    }))
  ]
})
</script>

<template>
  <div class="header">
    <span>Name</span>
  </div>

  <div class="panel">
    <div v-if="!items.length" class="empty">
      No items
    </div>

    <ul class="list">
      <li
        v-for="item in items"
        :key="item.type + item.id"
        class="row"
        @dblclick="item.type === 'folder' && emit('open-folder', item)"
      >
        <span class="name">
          <span class="icon">
            {{ item.type === "folder" ? "📁" : "📄" }}
          </span>
          {{ item.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style>
.header {
  padding: 6px 8px;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
}

.row {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: default;
}

.row:hover {
  background: #e5f3ff;
}

.name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  width: 20px;
}

.empty {
  padding: 8px;
  color: #888;
  font-style: italic;
}
</style>
