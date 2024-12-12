import { shallowMount } from '@vue/test-utils';
import { resizeWindow, testAfterResize } from '../../../jest.conf/testUtils';
import KFixedGridItem from '../KFixedGridItem';
import allowableUnits from './units';
import { makeWrapperSmall, makeWrapperMedium, makeWrapperLarge } from './wrapper';

function isAllowed(cls) {
  return allowableUnits.includes(cls);
}

function makeWrapper(propsData, gridMetrics) {
  return shallowMount(KFixedGridItem, {
    propsData,
    provide: { gridMetrics },
  });
}

describe('KFixedGridItem component', () => {
  it('should mount', () => {
    const wrapper = makeWrapperSmall(KFixedGridItem, { span: 2 });
    expect(wrapper.exists()).toEqual(true);
  });

  it('should always have an allowable grid unit', () => {
    for (let numCols = 1; numCols <= 12; numCols++) {
      for (let span = 1; span <= numCols; span++) {
        const wrapper = makeWrapper({ span }, { numCols, gutterWidth: 16 });
        expect(isAllowed(wrapper.classes()[1])).toEqual(true);
      }
    }
  });

  it('should have 8px padding for 16px gutters', () => {
    const wrapper = makeWrapperSmall(KFixedGridItem, { span: 2 });
    expect(wrapper.element).toHaveStyle({ paddingLeft: '8px' });
    expect(wrapper.element).toHaveStyle({ paddingRight: '8px' });
  });

  it('should have 12px padding for 24px gutters', () => {
    const wrapper = makeWrapperLarge(KFixedGridItem, { span: 2 });
    expect(wrapper.element).toHaveStyle({ paddingLeft: '12px' });
    expect(wrapper.element).toHaveStyle({ paddingRight: '12px' });
  });

  it('should handle non-responsive alignment', () => {
    const wrapper = makeWrapperSmall(KFixedGridItem, { span: 2, alignment: 'center' });
    expect(wrapper.element).toHaveStyle({ textAlign: 'center' });
  });

  it('should handle text-based span', () => {
    const wrapper = makeWrapperMedium(KFixedGridItem, { span: '4' });
    resizeWindow(700, 700);
    const checkSpan = () => {
      expect(wrapper.classes()[1]).toEqual('pure-u-4-24');
    };
    testAfterResize(checkSpan);
  });
});
