<template>
    <v-list>
        <v-list-group v-for="category in categories" :key="category.id" :value="category.name">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="category.name" :prepend-icon="category.fontAwesomeIcon" :append-icon="props.iconClick ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
                    " @click="props.iconClick = !props.iconClick" />
                <v-divider />
            </template>

            <v-list-item v-for="product in getProductsByCategory(category.id)" :key="product.id"
                @click="selectProduct(product)">
                <v-list-item-title>
                    <v-icon :icon="product.fontAwesomeIcon" size="medium" start></v-icon>
                    {{ product.name }}
                </v-list-item-title>
            </v-list-item>
        </v-list-group>
    </v-list>
</template>
  
<script>
import { ref } from 'vue';

export default {
    props: {
        categories: Array,
        products: Array,
    },
    setup(props, { emit }) {
        const iconClick = ref([]);

        const getProductsByCategory = (categoryId) => {
            return props.products.filter((product) => product.categoryId === categoryId);
        };

        const selectProduct = (product) => {
            emit('product-selected', product);
        };

        return {
            iconClick,
            getProductsByCategory,
            selectProduct,
        };
    },
};
</script>
  