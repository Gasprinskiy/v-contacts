<template>
<n-notification-provider placement="bottom-right" >
  <div class="nav-bar">
    <n-button @click="router.back()">
      <template #icon>
        <n-icon
          :component="CaretBackSharp"
        />
      </template>
    </n-button>
  </div>
  <div class="app-wrapper">
    <div class="app-router-view">
      <router-view/>
    </div>
  </div>
</n-notification-provider>
</template>

<script setup>

// imports
import { NNotificationProvider, NButton, NIcon } from 'naive-ui'
import { CaretBackSharp } from '@vicons/ionicons5'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
///////////

// data
const router = useRouter()
///////////

</script>

<style scoped>
  .app-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .nav-bar {
    width: 100%;
    background-color: rgba(24, 160, 88, 0.15);
    position: absolute;
    border-radius: 3px;
    left: 0;
    top: 0;
  }
</style>
