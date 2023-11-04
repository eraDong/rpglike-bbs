<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { postRenderPlateService } from '@/api/post'

const postArr = ref([])
const route = useRoute()
const postRender = async () => {
  postArr.value = await postRenderPlateService(route.query.name)
}
postRender()
</script>

<template>
  <div><User-Post :postArr="postArr"></User-Post></div>
</template>
