<script setup lang="ts">
import { ref, onMounted } from "vue"
import FolderTree from "./components/FolderTree.vue"
import RightPanel from "./components/RightPanel.vue"
import SearchBar from "./components/SearchBar.vue"
import { fetchTree, fetchFolderContent } from "./api/folderApi"

const tree = ref<any[]>([])
const selectedFolderId = ref<number | null>(null)

const rightFolders = ref([])
const rightFiles = ref([])

// 🔥 SEARCH STATE
const searchResults = ref<any[]>([])

onMounted(async () => {
  const data = await fetchTree()

  function inject(node: any) {
    node.isOpen = false
    node.children?.forEach(inject)
  }
  data.forEach(inject)

  tree.value = data
})

async function onSelect(folder: any) {
  selectedFolderId.value = folder.id
  searchResults.value = [] // reset search

  const res = await fetchFolderContent(folder.id)
  rightFolders.value = res.folders
  rightFiles.value = res.files
}

// HANDLE SEARCH
async function onSearch(keyword: string) {
  if (!keyword || !selectedFolderId.value) {
    searchResults.value = []
    return
  }

  searchResults.value = await fetch(
    `http://localhost:3000/api/v1/folders/${selectedFolderId.value}/search?q=${keyword}`
  ).then(r => r.json())
}
</script>

<template>
  <div class="layout">
    <!-- LEFT SIDEBAR -->
    <aside class="sidebar">
      <FolderTree
        :folders="tree"
        :selected-id="selectedFolderId"
        @select="onSelect"
      />
    </aside>

    <!-- RIGHT SIDE -->
    <main class="main">
      <!-- TOP BAR -->
      <div class="toolbar">
        <div class="toolbar-left"></div>

        <div class="toolbar-right">
          <SearchBar @search="onSearch" />
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">
        <RightPanel
          :folders="rightFolders"
          :files="rightFiles"
          :search-results="searchResults"
          @open-folder="onSelect"
        />
      </div>
    </main>
  </div>
</template>

<style>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* LEFT */
.sidebar {
  width: 260px;                 /* explorer-like */
  border-right: 1px solid #ddd;
  background: #fafafa;
  overflow: auto;
}

/* RIGHT */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* TOP BAR */
.toolbar {
  height: 42px;
  padding: 6px 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}

.toolbar-left {
  flex: 1;
}

.toolbar-right {
  width: 260px;
}

.toolbar-right input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* CONTENT */
.content {
  flex: 1;
  overflow: auto;
}

</style>
