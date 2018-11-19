<template>
    <v-hover>
        <div width="100%" slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 1}`">
            <slot></slot>
        </div>
    </v-hover>
</template>
<script>
export default {
    
}
</script>
