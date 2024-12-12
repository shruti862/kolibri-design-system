import { testAfterResize } from '../../../jest.conf/testUtils';
import KGridItem from '../KGridItem';
import { makeWrapperSmall, makeWrapperMedium, makeWrapperLarge } from './wrapper';

describe('KGridItem component', () => {
  it('should mount', () => {
    const wrapper = makeWrapperSmall(KGridItem, {});
    expect(wrapper.exists()).toEqual(true);
  });

  describe('responsive alignment', () => {
    const props = {
      layout: { span: 2 },
      layout4: { alignment: 'right' },
      layout8: { alignment: 'left' },
      layout12: { alignment: 'center' },
    };
    it('small screen', async () => {
      const wrapper = makeWrapperSmall(KGridItem, props);
      await wrapper.vm.$nextTick();
      const assertion = () => {
        expect(wrapper.element).toHaveStyle({ textAlign: 'right' });
      };
      testAfterResize(assertion);
    });
    it('medium screen', async () => {
      const wrapper = makeWrapperMedium(KGridItem, props);
      await wrapper.vm.$nextTick();
      const assertion = () => {
        expect(wrapper.element).toHaveStyle({ textAlign: 'left' });
      };
      testAfterResize(assertion);
    });
    it('large screen', async () => {
      const wrapper = makeWrapperLarge(KGridItem, props);
      await wrapper.vm.$nextTick();
      const assertion = () => {
        expect(wrapper.element).toHaveStyle({ textAlign: 'center' });
      };
      testAfterResize(assertion);
    });
  });

  it('should handle text and number-based responsive sizes - small', async () => {
    const props = {
      layout4: { span: '1' },
      layout8: { span: 2 },
      layout12: { span: '3' },
    };
    const wrapper = makeWrapperSmall(KGridItem, props);
    await wrapper.vm.$nextTick();
    const assertion = () => {
      expect(wrapper.classes()[1]).toEqual('pure-u-6-24');
    };
    testAfterResize(assertion);
  });

  it('should handle responsive sizes - medium', async () => {
    const props = {
      layout4: { span: 1 },
      layout8: { span: 2 },
      layout12: { span: 3 },
    };
    const wrapper = makeWrapperMedium(KGridItem, props);
    await wrapper.vm.$nextTick();
    const assertion = () => {
      expect(wrapper.classes()[1]).toEqual('pure-u-6-24');
    };
    testAfterResize(assertion);
  });

  it('should handle responsive sizes - large', async () => {
    const props = {
      layout4: { span: 1 },
      layout8: { span: 2 },
      layout12: { span: 3 },
    };
    const wrapper = makeWrapperLarge(KGridItem, props);
    await wrapper.vm.$nextTick();
    const assertion = () => {
      expect(wrapper.classes()[1]).toEqual('pure-u-6-24');
    };
    testAfterResize(assertion);
  });

  describe('default behaviors', () => {
    const props = {
      layout: { alignment: 'right' },
      layout4: { alignment: 'center' },
      layout8: { span: 2 },
      layout12: { span: 6, alignment: 'left' },
    };

    it('should be full-width, center-aligned on small screens', async () => {
      const wrapper = makeWrapperSmall(KGridItem, props);
      await wrapper.vm.$nextTick();
      const assertion = () => {
        expect(wrapper.element).toHaveStyle({ textAlign: 'center' });
        expect(wrapper.classes()[1]).toEqual('pure-u-24-24');
      };
      testAfterResize(assertion);
    });

    it('should be 25% width, right-aligned on medium screens', async () => {
      const wrapper = makeWrapperMedium(KGridItem, props);
      await wrapper.vm.$nextTick();
      const assertion = () => {
        expect(wrapper.element).toHaveStyle({ textAlign: 'right' });
        expect(wrapper.classes()[1]).toEqual('pure-u-6-24');
      };
      testAfterResize(assertion);
    });

    it('should be 50% width, left-aligned on large screens', async () => {
      const wrapper = makeWrapperLarge(KGridItem, props);
      await wrapper.vm.$nextTick();
      const assertion = () => {
        expect(wrapper.element).toHaveStyle({ textAlign: 'left' });
        expect(wrapper.classes()[1]).toEqual('pure-u-12-24');
      };
      testAfterResize(assertion);
    });
  });
});
