<script setup lang="ts">
defineProps<{
  folders: any[]
  selectedId: number | null
}>()

const emit = defineEmits<{
  (e: "select", folder: any): void
}>()

function toggle(folder: any) {
  folder.isOpen = !folder.isOpen
}

function select(folder: any) {
  emit("select", folder)
}
</script>

<template>
  <ul class="tree">
    <li v-for="folder in folders" :key="folder.id">
      <div
        class="node"
        :class="{ selected: folder.id === selectedId }"
      >
        <!-- Expand / Collapse -->
        <span class="toggle" @click="toggle(folder)">
          {{ folder.children.length ? (folder.isOpen ? "▼" : "▶") : "•" }}
        </span>

        <!-- Select -->
        <span class="label" @click="select(folder)">
          📁 {{ folder.name }}
        </span>
      </div>

      <FolderTree
        v-if="folder.isOpen && folder.children.length"
        :folders="folder.children"
        :selected-id="selectedId"
        @select="emit('select', $event)"
      />
    </li>
  </ul>
</template>

<style scoped>
.tree {
  list-style: none;
  padding-left: 12px;
  margin: 0;
}

.node {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  border-radius: 4px;
}

.node:hover {
  background: #eef6ff;
}

.node.selected {
  background: #cce7ff;
}

.toggle {
  width: 14px;
  text-align: center;
  font-size: 10px;
  color: #666;
}

</style>
