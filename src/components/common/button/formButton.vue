<template>
    <el-button :type="type" :class="getClass()" :icon="icon" @click="$emit('click')">
        <slot></slot>
    </el-button>
</template>
<script>
    export default {
        props: {
            type: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'normal'
            },
            icon: {
                type: String,
                default: ''
            }
        },
        methods: {
            getClass() {
                let classes = []
                if (this.size === 'big') {
                    classes.push('size_big')
                }
                if (this.size === 'normal') {
                    classes.push('size_normal')
                }
                if (this.size === 'mini') {
                    classes.push('size_mini')
                }

                return classes.join(' ')
            }
        }

    }

</script>
