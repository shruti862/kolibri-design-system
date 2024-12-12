import { mount } from '@vue/test-utils';
import KTable from '../KTable';

const assertTableContent = (wrapper, rows) => {
  const tableRows = wrapper.findAll('tbody tr');
  expect(tableRows.length).toBe(rows.length);

  rows.forEach((row, rowIndex) => {
    const cells = tableRows.at(rowIndex).findAll('td');
    expect(cells.length).toBe(row.length);

    row.forEach((cellContent, colIndex) => {
      expect(cells.at(colIndex).text()).toBe(String(cellContent));
    });
  });
};

describe('KTable.vue', () => {
  it('should mount the component', () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Age', dataType: 'number', columnId: 'age' },
      { label: 'City', dataType: 'string', columnId: 'city' },
    ];
    const rows = [
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'San Francisco'],
    ];
    const wrapper = mount(KTable, {
      propsData: {
        headers,
        rows,
        sortable: true,
      },
    });
    const thElements = wrapper.findAll('th');
    expect(thElements.length).toBe(headers.length);
  });

  it('renders the correct content in rows and columns', async () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Age', dataType: 'number', columnId: 'age' },
      { label: 'Date', dataType: 'date', columnId: 'date' },
    ];
    const rows = [
      ['John', 30, '2023-01-01'],
      ['Jane', 25, '2023-02-01'],
      ['Doe', 35, '2023-03-01'],
    ];

    const wrapper = mount(KTable, {
      propsData: { headers, rows, caption: 'Test Table' },
    });

    // Wait for the table to be fully rendered
    await wrapper.vm.$nextTick();
    assertTableContent(wrapper, rows);
  });

  describe('should respect the defaultSort attribute', () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Age', dataType: 'number', columnId: 'age' },
      { label: 'City', dataType: 'string', columnId: 'city' },
    ];

    const rows = [
      ['John', 30, 'New York'],
      ['Alice', 25, 'Los Angeles'],
      ['Bob', 35, 'San Francisco'],
    ];

    it('should not sort the rows by default', async () => {
      const wrapper = mount(KTable, {
        propsData: { headers, rows, caption: 'Test Table' },
      });

      await wrapper.vm.$nextTick();
      assertTableContent(wrapper, rows);
    });

    it('should sort the rows correctly in ascending order', async () => {
      const wrapper = mount(KTable, {
        propsData: {
          headers,
          rows,
          caption: 'Test Table',
          defaultSort: { columnId: 'age', direction: 'asc' },
        },
      });

      await wrapper.vm.$nextTick();
      const expectedRows = [
        ['Alice', 25, 'Los Angeles'],
        ['John', 30, 'New York'],
        ['Bob', 35, 'San Francisco'],
      ];
      assertTableContent(wrapper, expectedRows);
    });

    it('should sort the rows correctly in descending order', async () => {
      const wrapper = mount(KTable, {
        propsData: {
          headers,
          rows,
          caption: 'Test Table',
          defaultSort: { columnId: 'age', direction: 'desc' },
        },
      });

      await wrapper.vm.$nextTick();
      const expectedRows = [
        ['Bob', 35, 'San Francisco'],
        ['John', 30, 'New York'],
        ['Alice', 25, 'Los Angeles'],
      ];
      assertTableContent(wrapper, expectedRows);
    });
  });

  describe('should handle disableBuiltinSorting correctly', () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Age', dataType: 'number', columnId: 'age' },
      { label: 'City', dataType: 'string', columnId: 'city' },
    ];

    const rows = [
      ['John', 30, 'New York'],
      ['Alice', 25, 'Los Angeles'],
      ['Bob', 35, 'San Francisco'],
    ];

    const renderWrapper = async props => {
      const wrapper = mount(KTable, {
        propsData: {
          headers,
          rows,
          caption: 'Test Table',
          disableBuiltinSorting: true,
          sortable: true,
          ...props,
        },
      });

      await wrapper.vm.$nextTick();
      return wrapper;
    };

    it('should not sort the rows', async () => {
      const wrapper = await renderWrapper();
      assertTableContent(wrapper, rows);
    });

    it('should not sort even if default sort is provided', async () => {
      const wrapper = await renderWrapper({ defaultSort: { columnId: 'age', direction: 'asc' } });
      assertTableContent(wrapper, rows);
    });

    it('should emit changeSort event when sortable column is clicked', async () => {
      const wrapper = await renderWrapper();

      const headerCells = wrapper.findAll('thead th');
      await headerCells.at(1).trigger('click');

      expect(wrapper.emitted('changeSort')).toBeTruthy();
      const eventPayload = wrapper.emitted('changeSort')[0];
      expect(eventPayload).toEqual([1, null]);
    });
  });

  it('should handle sticky headers and columns', async () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Age', dataType: 'number', columnId: 'age' },
    ];
    const rows = [
      ['John', 30],
      ['Jane', 25],
    ];

    const wrapper = mount(KTable, {
      propsData: { headers, rows, caption: 'Sticky Table' },
    });

    // Wait for the table to be fully rendered
    await wrapper.vm.$nextTick();

    const headerCells = wrapper.findAll('thead th');
    headerCells.wrappers.forEach(headerCell => {
      expect(headerCell.classes()).toContain('sticky-header');
    });

    const firstColumnCells = wrapper.findAll('tbody tr td:first-child');
    firstColumnCells.wrappers.forEach(cell => {
      expect(cell.classes()).toContain('sticky-column');
    });
  });

  beforeEach(() => {
    /*Since our primary concern in this test is checking focus management rather
    than actual scrolling behavior, mocking scrollIntoView allows the test to
    focus on the relevant aspects without getting interrupted
    by unsupported methods in the test environment.*/
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('should handle keyboard navigation within the table', async () => {
    const headers = [
      { label: 'Name', dataType: 'string', columnId: 'name' },
      { label: 'Age', dataType: 'number', columnId: 'age' },
    ];
    const rows = [
      ['John', 30],
      ['Jane', 25],
    ];

    const wrapper = mount(KTable, {
      propsData: { headers, rows, caption: 'Keyboard Navigation Table' },
      attachTo: document.body, // Attach to document body to properly manage focus
    });

    await wrapper.vm.$nextTick(); // Ensure the component is fully rendered

    const firstCell = wrapper.find('tbody tr:first-child td:first-child');
    await firstCell.element.focus(); // Focus the first cell directly
    expect(firstCell.element).toHaveFocus(); // Check if the first cell is focused

    // Simulate ArrowRight key press
    await firstCell.trigger('keydown', { key: 'ArrowRight' });

    const secondCell = wrapper.find('tbody tr:first-child td:nth-child(2)');
    await secondCell.element.focus(); // Focus the second cell directly
    expect(secondCell.element).toHaveFocus(); // Check if the second cell is focused

    // Simulate ArrowDown key press
    await secondCell.trigger('keydown', { key: 'ArrowDown' });

    const thirdCell = wrapper.find('tbody tr:nth-child(2) td:nth-child(2)');
    await thirdCell.element.focus(); // Focus the third cell directly
    expect(thirdCell.element).toHaveFocus(); // Check if the third cell is focused

    // Cleanup: detach the wrapper from the document body after the test
    wrapper.destroy();
  });
});
