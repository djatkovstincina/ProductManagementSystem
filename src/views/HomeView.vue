<template>
    <v-layout>
        <v-app-bar :elevation="2">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer">
                    <v-icon icon="fas fa-bars" size="medium"></v-icon>
                </v-app-bar-nav-icon>
            </template>
            <v-app-bar-title>Product Management System</v-app-bar-title>
            <template v-slot:append>
                <v-btn @click="toggleTheme">
                    <v-icon :icon="themeIcon" size="medium" start></v-icon>
                    {{ themeText }}
                </v-btn>
            </template>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer">
            <LeftNavigation :categories="categories" :products="allProducts" @product-selected="loadProductItems" />
        </v-navigation-drawer>
        <v-main class="d-flex align-center justify-center">
            <ProductTable :items="items" :attributes="productAttributes" :selectedProductName="selectedProductName"
                :currentTheme="currentTheme" />
        </v-main>
    </v-layout>
</template>
  
<script>
import { ref, computed, onMounted } from 'vue';
import LeftNavigation from '@/components/LeftNavigation.vue';
import ProductTable from '@/components/ProductTable.vue';
import api from '../services/api';
import { useTheme } from 'vuetify';

export default {
    components: {
        LeftNavigation,
        ProductTable,
    },
    setup() {
        const theme = useTheme();
        const drawer = ref(true);
        const items = ref([]);
        const productAttributes = ref([]);
        const categories = ref([]);
        const allProducts = ref([]);
        const allAttributes = ref([]);
        const selectedProductName = ref('Select a Product');
        const currentTheme = ref('');

        const isDarkTheme = computed(() => theme.global.current.value.dark);

        const themeText = computed(() => (isDarkTheme.value ? 'Light' : 'Dark'));
        const themeIcon = computed(() => (isDarkTheme.value ? 'fas fa-sun' : 'fas fa-moon'));

        const toggleTheme = () => {
            theme.global.name.value =
                theme.global.name.value === 'customTheme' ? 'dark' : 'customTheme';
            currentTheme.value =
                theme.global.name.value === 'dark' ? 'nocturnal' : '';
        };

        const preloadData = async () => {
            const categoriesResponse = await api.getCategories();
            const productsResponse = await api.getProducts();
            const attributesResponse = await api.getAttributes();

            categories.value = categoriesResponse;
            allProducts.value = productsResponse;
            allAttributes.value = attributesResponse;
        };

        const loadProductItems = (product) => {
            selectedProductName.value = product.name;
            productAttributes.value = allAttributes.value.filter(
                (attr) => attr.productId === product.id
            );
            items.value = [{ ...product }];
        };

        onMounted(() => {
            preloadData();
        });

        return {
            drawer,
            items,
            categories,
            allProducts,
            productAttributes,
            selectedProductName,
            themeText,
            themeIcon,
            currentTheme,
            toggleTheme,
            loadProductItems,
        };
    },
};
</script>
  