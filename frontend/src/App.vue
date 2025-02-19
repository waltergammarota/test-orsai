<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar for desktop -->
    <transition name="slide-fade">
      <div v-if="!isMobile" class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>
    </transition>

    <!-- Main content -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Mobile header -->
      <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button @click="sidebarOpen = true"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span class="sr-only">Abrir sidebar</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile sidebar -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
        <transition name="fade">
          <div v-if="sidebarOpen" class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"
            @click="sidebarOpen = false"></div>
        </transition>
        <transition name="slide-fade">
          <div v-if="sidebarOpen" class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button @click="sidebarOpen = false"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span class="sr-only">Cerrar sidebar</span>
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="flex-1 h-0 overflow-y-auto">
              <SidebarContent />
            </div>
          </div>
        </transition>
        <div class="flex-shrink-0 w-14"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import SidebarContent from './components/SidebarContent.vue'

export default {
  name: 'App',
  components: {
    SidebarContent
  },
  setup() {
    const sidebarOpen = ref(false)
    const isMobile = ref(window.innerWidth < 768)

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      sidebarOpen,
      isMobile
    }
  }
}
</script>