<template>
  <div class="c--product-table">
    <div class="d-flex justify-space-between align-center">
      <h1 class="mb-4">{{ selectedProductName }}</h1>
      <div class="justify-end">
        <v-btn @click="saveChanges" :disabled="!isEditingRow">Save Changes</v-btn>
        <v-btn @click="cancelEditing" class="ml-3" :disabled="!isEditingRow">Cancel</v-btn>
      </div>
    </div>
    <vue-good-table
      :key="tableKey"
      :columns="columns"
      :rows="formattedItems"
      :line-numbers="true"
      compactMode
      :search-options="{ enabled: true }"
      :pagination-options="{ enabled: true, perPage: 5 }"
      :theme="currentTheme"
    >
      <template #table-row="props">
        <tr
          :class="{'c--product-table--editing-row': isEditingRow === props.row}"
          @dblclick="enableRowEditing(props.row)"
        >
          <td v-for="column in columns" :key="column.field">
            <div v-if="isEditingRow === props.row">
              <input
                :type="getInputType(column)"
                v-model="props.row[column.field]"
              />
            </div>
            <div v-else>
              {{ props.row[column.field] }}
            </div>
          </td>
        </tr>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import { fakeData } from '../data/fakeData.js';

export default {
  components: {
    VueGoodTable,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    attributes: {
      type: Array,
      default: () => [],
    },
    selectedProductName: {
      type: String,
      default: '',
    },
    currentTheme: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableKey: 0,
      isEditingRow: null,
      originalRowData: null,
    };
  },
  computed: {
    columns() {
      return this.attributes.map((attr) => ({
        label: attr.displayName,
        field: attr.name,
      }));
    },
    formattedItems() {
      return this.items.flatMap((item) => {
        const productId = item.id;
        const productData = fakeData[productId] || {};

        return Object.values(productData).map((data, index) => {
          const formattedItem = {};
          this.attributes.forEach((attr) => {
            formattedItem[attr.name] =
              data[attr.name] || this.getFakeData(productId, index + 1, attr.name);
          });
          return formattedItem;
        });
      });
    },
  },
  watch: {
    items() {
      this.resetTable();
    },
    attributes() {
      this.resetTable();
    },
  },
  methods: {
    getInputType(col) {
      const attr = this.attributes.find((attr) => attr.name === col.field);
      return attr && attr.dataType === 'integer' ? 'number' : 'text';
    },
    getFakeData(productId, index, field) {
      return fakeData[productId]?.[index]?.[field] || 'N/A';
    },
    resetTable() {
      this.tableKey += 1;
    },
    enableRowEditing(row) {
      this.isEditingRow = row;
      this.originalRowData = { ...row };
    },
    saveChanges() {
      this.isEditingRow = null;
      this.originalRowData = null;
    },
    cancelEditing() {
      Object.assign(this.isEditingRow, this.originalRowData);
      this.isEditingRow = null;
      this.originalRowData = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.c--product-table {
  width: 100%;
  padding: 20px;
  
  &--editing-row {
    background-color: #f0f8ff;
  }
}
</style>
