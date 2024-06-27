<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { menuList } from '@/config/menu.js'
import './index.less'

const msg = ref('Hello world2')
</script>
