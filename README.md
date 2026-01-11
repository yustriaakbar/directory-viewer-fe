# Folder Explorer Frontend

## Description
Frontend application that mimics Windows Explorer behavior:

- Folder tree on the left panel
- Folder & file list on the right panel
- Expand / collapse folder tree
- Double-click folder to open
- Scoped search inside selected folder

Built using Vue 3 with Composition API.

---

## Tech Stack
- Framework: Vue 3
- Language: TypeScript
- Build Tool: Vite
- Runtime: Bun v1.3.5+
- UI Pattern: Component-based architecture

---

## Project Structure
```text
src/
├── components/
│   ├── FolderTree.vue
│   ├── RightPanel.vue
│   └── SearchBar.vue
│
├── api/
│   └── folderApi.ts
│
├── assets/
│
├── App.vue
└── main.ts

---

## Requirements
- Bun >= **1.3.5**
- Modern browser (Chrome, Edge, Firefox)

---

## Installation

### Install dependencies

bun install
bun run dev
http://localhost:5173


---

## UI Components

| Component    | Description |
|--------------|------------|
| FolderTree   | Folder hierarchy (expand / collapse) |
| RightPanel   | Displays folders and files |
| SearchBar    | Scoped search with debounce |

---

## Search Behavior
- Search is scoped to selected folder
- Includes:
  - files in current folder
  - files in nested subfolders
- Results replace right panel content
- Displays:
  - 📁 folder icon
  - 📄 file icon