<template>
    <div>
        <h1 class="text-xl font-bold mb-6">Panel</h1>
        <LoadingSpinner v-if="loading" />
        <template v-else>
            <div class="grid gap-6 mb-8 md:grid-cols-3">
                <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600">Total de Cuentos</p>
                        <p class="text-lg font-semibold text-gray-700">{{ totalStories }}</p>
                    </div>
                </div>
                <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600">Total de Votos</p>
                        <p class="text-lg font-semibold text-gray-700">{{ totalVotes }}</p>
                    </div>
                </div>
                <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                    <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600">Calificación Promedio</p>
                        <p class="text-lg font-semibold text-gray-700">{{ averageRating.toFixed(2) }}</p>
                    </div>
                </div>
            </div>
            <div class="grid gap-8 mb-8 md:grid-cols-1">
                <div class="bg-white rounded-lg shadow-xs p-6">
                    <h4 class="text-xl font-semibold text-gray-800 mb-4">Distribución de Votos</h4>
                    <div class="h-80">
                        <canvas ref="votesChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-xs overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full whitespace-nowrap">
                        <thead>
                            <tr
                                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                                <th class="px-4 py-3">Cuento</th>
                                <th class="px-4 py-3">Calificación Promedio</th>
                                <th class="px-4 py-3">Total de Votos</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="story in topRatedStories" :key="story.id" class="text-gray-700">
                                <td class="px-4 py-3">
                                    <div class="flex items-center text-sm">
                                        <p class="font-semibold">{{ story.title }}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ story.statistics.averageRating.toFixed(2) }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ story.statistics.totalVotes }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
import storiesApi from '../api/stories'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
    components: {
        LoadingSpinner
    },
    setup() {
        const stories = ref([])
        const loading = ref(true)
        const ratingChart = ref(null)
        const votesChart = ref(null)

        const loadStories = async () => {
            try {
                stories.value = await storiesApi.getAllStories()
            } catch (error) {
                console.error('Error loading stories:', error)
            } finally {
                loading.value = false
            }
        }

        const totalStories = computed(() => stories.value.length)

        const totalVotes = computed(() =>
            stories.value.reduce((sum, story) => sum + story.statistics.totalVotes, 0)
        )

        const averageRating = computed(() => {
            const totalRating = stories.value.reduce((sum, story) =>
                sum + (story.statistics.averageRating * story.statistics.totalVotes), 0
            )
            return totalRating / totalVotes.value || 0
        })

        const topRatedStories = computed(() =>
            [...stories.value]
                .sort((a, b) => b.statistics.averageRating - a.statistics.averageRating)
                .slice(0, 5)
        )


        const createCharts = () => {
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'white',
                        borderWidth: 1,
                        cornerRadius: 4,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }

            if (ratingChart.value) {
                new Chart(ratingChart.value, {
                    type: 'bar',
                    data: {
                        labels: topRatedStories.value.map(story => story.title),
                        datasets: [{
                            label: 'Calificación Promedio',
                            data: topRatedStories.value.map(story => story.statistics.averageRating),
                            backgroundColor: 'rgba(75, 192, 192, 0.8)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        ...chartOptions,
                        plugins: {
                            ...chartOptions.plugins,
                            title: {
                                display: false
                            }
                        }
                    }
                })
            }

            if (votesChart.value) {
                const votesDistribution = stories.value.reduce((acc, story) => {
                    const votes = story.statistics.totalVotes
                    acc[votes] = (acc[votes] || 0) + 1
                    return acc
                }, {})

                new Chart(votesChart.value, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(votesDistribution),
                        datasets: [{
                            label: 'Número de Cuentos',
                            data: Object.values(votesDistribution),
                            backgroundColor: 'rgba(153, 102, 255, 0.8)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        ...chartOptions,
                        plugins: {
                            ...chartOptions.plugins,
                            title: {
                                display: false
                            }
                        }
                    }
                })
            }
        }

        onMounted(async () => {
            await loadStories()
            createCharts()
        })

        return {
            loading,
            totalStories,
            totalVotes,
            averageRating,
            topRatedStories,
            ratingChart,
            votesChart
        }
    }
}
</script>