<template>
    <div class="heading">
        <div class="heading-left">
            <slot name="left-side"/>
        </div>
        <div class="header-right">
            <slot name="right-side"/>
        </div>
    </div>
</template>

<style scoped>
    .heading {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 15px 0px;
    }
</style>
