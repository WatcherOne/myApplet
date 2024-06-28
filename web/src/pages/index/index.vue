<template>
  <view class="index">
    <text>{{ msg }}</text>
    <text>{{ obj }}</text>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { menuList } from '@/config/menu.js'
import './index.less'
import http from '../../api/index.js'

const msg = ref('Hello world2')
const obj = ref('')
  
http.get('/api/common/info').then(res => {
  console.log(res)
  obj.value = JSON.stringify(res)
}).catch(e => {
  console.log(e)
})
</script>
