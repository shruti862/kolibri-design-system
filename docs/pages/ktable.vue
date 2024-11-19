<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KTable</code> component is an accessible and customizable table component designed to handle a variety of data presentation needs. The component is suitable for both simple and complex data tables. It offers:
        <ul>
          <li>Offers built-in sorting by default</li>
          <li>Integrates with already sorted data</li>
          <li>Keyboard navigation</li>
          <li>Dynamic column resizing</li>
          <li>Sticky headers</li>
        </ul>
      </p>
    </DocsPageSection>
  
    <DocsPageSection title="Usage" anchor="#usage">
      <!--Non-Sortable Table-->
      <h3>Table without sorting functionality</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used without any sorting functionality, as a simple table. 
      </p>
  
      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non Sortable Table"
        />

      </DocsShowCode>

      <!-- eslint-disable-->
      <DocsShowCode language="javascript">
        data() {
          return {
            headers: [
              { label: 'Name', dataType: 'string', columnId: 'name' },
              { label: 'Age', dataType: 'number', columnId: 'age' },
              { label: 'City', dataType: 'string', columnId: 'city' },
            ],
          rows: [
              ['John Doe', 28, 'New York'],
              ['Jane Smith', 34, 'Los Angeles'],
              ['Samuel Green', 22, 'Chicago'],
              ['Alice Johnson', 30, 'Houston'],
              ['Michael Brown', 45, 'Phoenix'],
              ['Emily Davis', 27, 'Philadelphia'],
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Non-sortable table"
        />
      </DocsShow>

      <!-- Frontend Sorting Example-->
      <h3>Table with Sorting</h3>
      <p>
        The <code>KTable</code> can be used with sorting functionality, allowing you to sort data on the client side without the need for server requests. There are 4 permissible data types - <code>string</code>,<code>number</code>,<code>date</code> and <code>undefined</code>. Columns declared with <code>undefined</code> data type are not sortable. This example demonstrates a table with sorting enabled. To allow client side sorting, set the <code>sortable</code> attribute to <code>true</code>.
      </p>
      <p>
        You can also notice that clicking the same header multiple times toggles the sort direction cyclically in the order of <code>asc</code>, <code>desc</code> and <code>none</code>. The <code>none</code> state is the default state when the table is loaded by default.
      </p>

      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Table with built-in sorting"
          sortable
        />

      </DocsShowCode>

      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        data() {
          return {
            headers: [
              { label: 'Name', dataType: 'string', columnId: 'name' },
              { label: 'Age', dataType: 'number', columnId: 'age' },
              { label: 'City', dataType: 'string', columnId: 'city' },
            ],
            rows: [
              ['John Doe', 28, 'New York'],
              ['Jane Smith', 34, 'Los Angeles'],
              ['Samuel Green', 22, 'Chicago'],
              ['Alice Johnson', 30, 'Houston'],
              ['Michael Brown', 45, 'Phoenix'],
              ['Emily Davis', 27, 'Philadelphia'],
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="In-Built Sorting Table"
          sortable
        />
      </DocsShow>

      <!--Table showing use of slots-->
      <h3>Table showing use of slots</h3>
      <p>
        This is an example to show how slots can be used in <code>KTable</code>. The table currently provides slots for <code>header</code> and <code>cell</code> which can be used to customize the table header and cell content respectively.
      </p>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="slotHeaders"
          :rows="slotRows"
          caption="Table showing use of slots"
          sortable
        >
          <template #header="{ header, colindex }">
            <span>{ header.label } (Local)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 1">{ content } years old</span>
            <span v-else-if="colIndex === 4"><KButton>Test</KButton></span>
            <span v-else>{ content }</span>
          </template>
        </KTable>
      </DocsShowCode>

      <DocsShowCode language="javascript">
        data() {
          return {
            slotHeaders: [
              { label: 'Name', dataType: 'string', columnId: 'name' },
              { label: 'Age', dataType: 'number', columnId: 'age' },
              { label: 'City', dataType: 'string', columnId: 'city' },
              { label: 'Joined', dataType: 'date', columnId: 'joined' },
              { label: 'Misc', dataType: 'undefined', columnId: 'misc' },
            ],
            slotRows: [
              ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
              ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
              ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
              ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
            ],
          };
        },
      </DocsShowCode>
  
      <DocsShow block>
        <KTable
          :headers="slotHeaders"
          :rows="slotRows"
          caption="Table showing use of slots"
          sortable
        >
          <template #header="{ header, colindex }">
            <span>{{ header.label }} (Local)</span>
          </template>
          <template #cell="{ content, rowIndex, colIndex }">
            <span v-if="colIndex === 1">{{ content }} years old</span>
            <span v-else-if="colIndex === 4"><KButton>Test</KButton></span>
            <span v-else>{{ content }}</span>
          </template>
        </KTable>
      </DocsShow>
      <!-- eslint-enable -->

      <!--Table with custom column widths-->
      <h3>Table with custom column widths</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used with custom column widths. The column widths are defined in the <code>headers</code> prop. The <code>width</code> property is used to define the overall width of the column. The <code>minWidth</code> defines the minimum width of column, below which the column will not shrink.
      </p>

      <!-- eslint-disable -->
      <DocsShowCode language="html">
        <KTable
          :headers="headersWithCustomWidths"
          :rows="customRows"
          caption="Table showing columns with custom widths"
          sortable
        />
      </DocsShowCode>

      <DocsShowCode language="javascript">
        data() {
          return {
            headersWithCustomWidths: [
              { label: 'Name', dataType: 'string', minWidth: '20px', width: '2%', columnId: 'name' },
              { label: 'Age', dataType: 'number', minWidth: '100px', width: '33%', columnId: 'age' },
              { label: 'City', dataType: 'string', minWidth: '200px', width: '25%', columnId: 'city' },
              {
                label: 'Joined',
                dataType: 'date',
                minWidth: '150px',
                width: '20%',
                columnId: 'joined',
              },
              {
                label: 'Misc',
                dataType: 'undefined',
                minWidth: '100px',
                width: '20%',
                columnId: 'misc',
              },
            ],
            customRows: [
              ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
              ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
              ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
              ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
            ],
          };
        },
      </DocsShowCode>

      <DocsShow block>
        <KTable
          :headers="headersWithCustomWidths"
          :rows="customRows"
          caption="Table showing columns with custom widths"
          sortable
        />
      </DocsShow>
      <!-- eslint-enable -->

      <!--Table with Default Sort-->
      <h3>Table with Default Sort</h3>
      <p>
        This is an example to show how <code>KTable</code> can be used with the <code>defaultSort</code> attribute to sort the table based on a particular column. This is useful if you are getting unsorted data from the backend and want to display it in a sorted manner on load. The <code>defaultSort</code> attribute can be used irrespective of the <code>sortable</code> attribute (as <code>sortable</code> is used to configure whether the client has sorting capabilities or not). 
      </p>

      <p>
        The <code>defaultSort</code> attribute takes an object with two properties - <code>columnId</code> and <code>direction</code>. The <code>columnId</code> is the unique identifier of the column based on which the table should be sorted. The <code>direction</code> can be either <code>asc</code> or <code>desc</code>.
      </p>

      <p>
        To make use of <code>defaultSort</code>, please ensure that the <code>disableBuiltinSorting</code> attribute is not set to <code>true</code> as it will disable all sorting functionality.
      </p>

      <DocsShowCode language="html">
        <h4>Sortable Table with Rows Sorted by 'Age' Column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Sortable Table with Rows Sorted by 'Age' Column"
          sortable
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />

        <h4>Unsortable Table with Rows Sorted by 'Age' Column</h4>
        <KTable 
          :headers="headers"
          :rows="rows"
          caption="Unsortable Table with Rows Sorted by 'Age' Column"
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />

      </DocsShowCode>

      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        data() {
          return {
            headers: [
              { label: 'Name', dataType: 'string', columnId: 'name' },
              { label: 'Age', dataType: 'number', columnId: 'age' },
              { label: 'City', dataType: 'string', columnId: 'city' },
            ],
            rows: [
              ['John Doe', 28, 'New York'],
              ['Jane Smith', 34, 'Los Angeles'],
              ['Samuel Green', 22, 'Chicago'],
              ['Alice Johnson', 30, 'Houston'],
              ['Michael Brown', 45, 'Phoenix'],
              ['Emily Davis', 27, 'Philadelphia'],
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <h4>Sortable Table with Rows Sorted by 'Age' Column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Sortable Table with Rows Sorted by 'Age' Column"
          sortable
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />

        <h4>Unsortable Table with Rows Sorted by 'Age' Column</h4>
        <KTable
          :headers="headers"
          :rows="rows"
          caption="Unsortable Table with Rows Sorted by 'Age' Column"
          :defaultSort="{ columnId: 'age', direction: 'asc' }"
        />
      </DocsShow>

      <!-- Disable Builtin Sorting -->
      <h3>Disable Builtin Sorting & Custom Sorting Logic</h3>
      <p>
        You can make use of the <code>disableBuiltinSorting</code> attribute to disable all sorting functionality in the table. This is useful when you want to display the data in a particular order or want to define a custom sorting mechanism. 
      </p>

      <p>
        You should not use this attribute if the <code>sortable</code> attribute is set to <code>false</code>, as in that case the table headers for sorting will not be displayed at all. If the same is set to <code>true</code>, then table emits a <code>changeSort</code> event (whose implementation can be defined by the user) which needs to return a <code>sortOrder</code> value for the UI headers to toggle.
      </p>

      <DocsShowCode language="html">
        <KTable
          :headers="headers"
          :rows="changeSortRows"
          caption="Disable Builtin Sorting Example"
          sortable
          disableDefaultSorting
          @changeSort="changeSortHandler"
        />
      </DocsShowCode>

      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        data() {
          return {
            headers: [
              { label: 'Name', dataType: 'string', columnId: 'name' },
              { label: 'Age', dataType: 'number', columnId: 'age' },
              { label: 'City', dataType: 'string', columnId: 'city' },
            ],
            changeSortRows: [
              ['John Doe', 28, 'New York'],
              ['Jane Smith', 34, 'Los Angeles'],
              ['Samuel Green', 22, 'Chicago'],
              ['Alice Johnson', 30, 'Houston'],
              ['Michael Brown', 45, 'Phoenix'],
              ['Emily Davis', 27, 'Philadelphia'],
            ]
          };
        },
        methods: {
          changeSortHandler(index, sortOrder) {
            // Demo Implementation: Reverse the order of the rows and return the opposite sort order
            console.log('Index:', index, 'Sort Order:', sortOrder);
            this.changeSortRows = [...this.changeSortRows.reverse()];
            return sortOrder === 'asc' ? 'desc' : 'asc';
          }
        }
      </DocsShowCode>
      <!-- eslint-enable -->

      <DocsShow block>
        <KTable
          :headers="headers"
          :rows="changeSortRows"
          caption="Disable Builtin Sorting Example"
          sortable
          disableBuiltinSorting
          @changeSort="changeSortHandler"
        />
      </DocsShow>

    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'DocsKTable',
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string', columnId: 'name' },
          { label: 'Age', dataType: 'number', columnId: 'age' },
          { label: 'City', dataType: 'string', columnId: 'city' },
        ],
        rows: [
          ['John Doe', 28, 'New York'],
          ['Jane Smith', 34, 'Los Angeles'],
          ['Samuel Green', 22, 'Chicago'],
          ['Alice Johnson', 30, 'Houston'],
          ['Michael Brown', 45, 'Phoenix'],
          ['Emily Davis', 27, 'Philadelphia'],
        ],
        slotHeaders: [
          { label: 'Name', dataType: 'string', columnId: 'name' },
          { label: 'Age', dataType: 'number', columnId: 'age' },
          { label: 'City', dataType: 'string', columnId: 'city' },
          { label: 'Joined', dataType: 'date', columnId: 'joined' },
          { label: 'Misc', dataType: 'undefined', columnId: 'misc' },
        ],
        slotRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
        headersWithCustomWidths: [
          { label: 'Name', dataType: 'string', minWidth: '20px', width: '2%', columnId: 'name' },
          { label: 'Age', dataType: 'number', minWidth: '100px', width: '33%', columnId: 'age' },
          { label: 'City', dataType: 'string', minWidth: '200px', width: '25%', columnId: 'city' },
          {
            label: 'Joined',
            dataType: 'date',
            minWidth: '150px',
            width: '20%',
            columnId: 'joined',
          },
          {
            label: 'Misc',
            dataType: 'undefined',
            minWidth: '100px',
            width: '20%',
            columnId: 'misc',
          },
        ],
        customRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
        changeSortRows: [
          ['John Doe', 28, 'New York'],
          ['Jane Smith', 34, 'Los Angeles'],
          ['Samuel Green', 22, 'Chicago'],
          ['Alice Johnson', 30, 'Houston'],
          ['Michael Brown', 45, 'Phoenix'],
        ],
      };
    },
    methods: {
      changeSortHandler(index, sortOrder) {
        // Demo Implementation: Reverse the order of the rows and return the opposite sort order
        console.log('Index:', index, 'Sort Order:', sortOrder);
        this.changeSortRows = [...this.changeSortRows.reverse()];
        return sortOrder === 'asc' ? 'desc' : 'asc';
      },
    },
  };

</script>
