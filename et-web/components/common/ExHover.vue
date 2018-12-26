<template>
    <v-hover>
        <div width="100%" slot-scope="{ hover }" :class="`elevation-${hover ? 0: 0}`">
            <slot></slot>
        </div>
    </v-hover>
</template>
<script>
export default {
    
}
</script>
