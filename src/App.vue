<template>
<n-notification-provider placement="bottom-right" >
  <div class="app-wrapper">
    <div class="app-router-view">
      <router-view/>
    </div>
  </div>
</n-notification-provider>
</template>

<script setup>
// imports
import { NNotificationProvider } from 'naive-ui'
///////////
</script>

<style scoped>
  .app-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
