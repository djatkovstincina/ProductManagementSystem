import { mount } from '@vue/test-utils';
import ProductTable from '@/components/ProductTable.vue';

describe('ProductTable.vue', () => {
  let wrapper;

  const items = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' }
  ];

  const attributes = [
    { name: 'name', displayName: 'Name', dataType: 'text' },
    { name: 'price', displayName: 'Price', dataType: 'integer' }
  ];

  beforeEach(() => {
    wrapper = mount(ProductTable, {
      props: {
        items,
        attributes,
        selectedProductName: 'Test Product',
        currentTheme: 'light-theme',
      },
    });
  });

  it('renders the component correctly with the given props', () => {
    expect(wrapper.find('h1').text()).toBe('Test Product');
  });
});
