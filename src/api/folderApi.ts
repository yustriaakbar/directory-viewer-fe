const BASE_URL = "http://localhost:3000/api/v1/folders";

export async function fetchTree() {
  return fetch(BASE_URL).then(res => res.json());
}

export async function fetchFolderContent(id: number) {
  return fetch(
    `http://localhost:3000/api/v1/folders/${id}/content`
  ).then(res => res.json())
}

export async function fetchChildren(id: number) {
  return fetch(`${BASE_URL}/${id}/children`).then(res => res.json());
}