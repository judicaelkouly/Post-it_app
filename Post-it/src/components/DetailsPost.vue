<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-yellow-50/80 border-b border-yellow-200/50">
    <nav class="max-w-5xl mx-auto py-3 px-4 flex justify-between items-center">
      <div>
        <RouterLink to="/">
          <button class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-white/80 hover:bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">

            Retour
          </button>
        </RouterLink>
      </div>

      <h2 class="font-bold text-gray-800 tracking-tight">
        Détails de la note
      </h2>

      <div>
        <RouterLink :to="`/edit/${note?._id}`">
          <button class="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-amber-500/20 transition-all transform active:scale-95" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Modifier
          </button>
        </RouterLink>
      </div>
    </nav>
  </header>

  <main class="max-w-3xl mx-auto px-4 py-12">

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-3">
      <div class="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-gray-400 text-sm font-medium">Chargement de la note...</p>
    </div>

    <article v-else-if="note" class="bg-white rounded-2xl shadow-xl shadow-gray-100/70 border border-gray-100 overflow-hidden transition-all duration-300">

      <div class="bg-gradient-to-r from-yellow-50 to-amber-50/60 px-6 py-6 border-b border-yellow-100">
        <div class="flex flex-col gap-3">

          <div class="flex flex-wrap gap-2">

            <span v-if="note.createdAt" class="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-md">
              Créée le : {{ formatDate(note.createdAt) }}
            </span>
          </div>

          <h1 class="text-2xl text-center md:text-3xl font-extrabold text-gray-900 leading-tight">
            {{ note.title }}
          </h1>
        </div>
      </div>

      <div class="px-6 py-8 md:px-10">
        <div class="prose max-w-none text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line font-light">
          {{ note.content[0] }}
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex flex-wrap justify-between items-center gap-2 text-xs text-gray-400">
        <span>Application Post-it __Judicael-Kouli</span>
        <span class="font-mono text-[10px]">ID : {{ note._id }}</span>
      </div>
    </article>

    <div v-else class="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
      <p class="text-gray-500 font-medium">Impossible de charger ou de trouver cette note.</p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  content: string[];
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  data() {
    return {
      note: null as Note | null,
      id: this.$route.params._id as string,
      isLoading: true
    }
  },

  mounted() {
    this.fetch();
  },

  methods: {
    fetch() {
      this.isLoading = true;
      axios.get('https://postit.zoul.dev/notes/' + this.id)
        .then((response) => {
          this.note = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération :", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    formatDate(dateString: string): string {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
})
</script>

