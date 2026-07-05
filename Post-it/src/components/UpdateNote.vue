<template>
  <main>
    <RouterLink to="/">
      <button class="m-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors">
        ← Retour Accueil
      </button>
    </RouterLink>

    <section class="min-h-[80vh] flex items-center justify-center">
      <div class="w-full max-w-2xl p-8">
        <h1 class="text-center text-3xl mb-6 font-bold text-gray-800">Modifier une note</h1>

        <div v-if="loadingFetch" class="text-center text-gray-500">
          Chargement de la note...
        </div>

        <form
          v-else
          @submit.prevent="updateNote"
          class="bg-white mx-4 p-6 text-left text-sm rounded-lg border border-gray-300/60 shadow-sm"
        >
          <div class="mb-4">
            <label class="block font-medium text-gray-700">Title</label>
            <input
              v-model="data.title"
              type="text"
              required
              class="w-full border mt-1.5 mb-4 border-gray-300 outline-none focus:border-indigo-500 rounded py-2.5 px-3 transition-colors"
            >
          </div>

          <div class="mb-4">
            <label class="block font-medium text-gray-700">Content</label>
            <textarea
              v-model="data.content"
              rows="5"
              required
              class="w-full border mt-1.5 mb-4 border-gray-300 outline-none focus:border-indigo-500 rounded py-2.5 px-3 transition-colors"
            ></textarea>
          </div>

          <div class="flex items-center justify-end">
            <button
              type="submit"
              :disabled="loadingSubmit"
              class="my-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 py-2 px-5 rounded text-white font-medium transition-all"
            >
              {{ loadingSubmit ? 'Modification en cours...' : 'Modifier' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loadingFetch = ref(false)
const loadingSubmit = ref(false)

const data = ref({
    title: '',
    content: ''
})

const fetchNoteDetails = async () => {
    loadingFetch.value = true
    try {
        const response = await axios.get(`https://postit.zoul.dev/notes/${route.params._id || route.params.id}`)

        console.log("Réponse complète de l'API :", response.data)

        const note = response.data.note || response.data

        data.value.title = note.title
        data.value.content = Array.isArray(note.content) ? note.content[0] : note.content
    } catch (error) {
        console.error('Erreur lors de la récupération de la note:', error)
        alert("Impossible de charger les détails de la note.")
    } finally {
        loadingFetch.value = false
    }
}

onMounted(() => {
    fetchNoteDetails()
})

const updateNote = async () => {
    loadingSubmit.value = true
    try {
        await axios.put(`https://postit.zoul.dev/notes/${route.params._id}`, {
            title: data.value.title,
            content: [data.value.content] 
        })

        alert("Mise à jour effectuée")
        router.push('/')
    } catch (error) {
        console.error('Erreur PUT:', error)
        alert("Modification non effectuée")
    } finally {
        loadingSubmit.value = false
    }
}
</script>
