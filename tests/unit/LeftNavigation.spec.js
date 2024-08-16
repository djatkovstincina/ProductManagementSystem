// TODO
// Finish test
import { mount } from '@vue/test-utils';
import LeftNavigation from '@/components/LeftNavigation.vue';

describe('LeftNavigation.vue', () => {
  it('renders categories when passed', () => {
    const categories = [{ id: 1, name: 'Category 1' }];
    const wrapper = mount(LeftNavigation, {
      props: { categories },
    });
    expect(wrapper.text()).toMatch('Category 1');
  });
});
