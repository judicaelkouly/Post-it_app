<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
 import { useRouter } from 'vue-router'

 const router = useRouter()


const loading = ref(false)



const data = ref({
    title: '',
    content: ''
})

const createNotes = async () => {

    loading.value = true;
    try {

         await axios.post('https://postit.zoul.dev/notes', {
            title: data.value.title,
            content:[ data.value.content]
        });

        alert('Note ajoutée')

         router.push('/');
    } catch (err) {
        console.error('Erreur:', err);
        alert("Erreur lors de l'ajout");
    } finally {
        loading.value = false;
    }
}
</script>

<template>
  <main>
     <RouterLink to="/">
      <button class="m-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors">
        ← Retour Accueil
      </button>
    </RouterLink>

    <section class=" min-h-screen flex items-center justify-center">
      <div class="w-full max-w-2xl p-8">
        <h1 class="text-center text-3xl mb-6">Ajouter une note</h1>

        <form @submit.prevent="createNotes" class="bg-white mx-4 p-6 text-left text-sm rounded-lg border border-gray-300/60">
          <div class="mb-4">
            <label class="font-medium">Title</label>
            <input
              v-model="data.title"
              type="text"
              class="w-full border mt-1.5 mb-4 border-gray-500/30 outline-none rounded py-2.5 px-3"
            >
          </div>

          <div class="mb-4">
            <label class="font-medium">Content</label>
            <textarea
              v-model="data.content"
              rows="3"
              class="w-full resize-none border mt-1.5 border-gray-500/30 outline-none rounded py-2.5 px-3"
            ></textarea>
          </div>
        <div class="flex items-center justify-between">
        <button type="submit" class="my-3 bg-indigo-500 py-2 px-5 rounded text-white font-medium">Post</button>
        </div>

        </form>
      </div>
    </section>
  </main>
</template>
