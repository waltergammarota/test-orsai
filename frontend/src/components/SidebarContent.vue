<template>
    <div class="flex flex-col h-full bg-gray-800">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <span class="text-white text-xl font-semibold">Menú</span>
        </div>
        <nav class="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
            <router-link to="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                active-class="bg-gray-900 text-white">
                <svg class="text-gray-300 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Cuentos
            </router-link>
            <router-link to="/dashboard"
                class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                active-class="bg-gray-900 text-white">
                <svg class="text-gray-300 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Panel
            </router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'SidebarContent'
}
</script>