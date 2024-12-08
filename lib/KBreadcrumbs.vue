<template>

  <KListWithOverflow
    overflowDirection="start"
    :items="preparedCrumbs"
  >
    <!-- Render individual breadcrumb items -->
    <template #item="{ item }">
      <li>
        <KRouterLink
          v-if="item.link"
          :text="item.text"
          :to="item.link"
        >

          <template #text="{ text }">
            <span class="breadcrumbs-crumb-text">{{ text }}</span>
          </template>
        </KRouterLink>
        <span v-else>{{ item.text }}</span>
      </li>
    </template>

    <!-- Render the separator between items -->
    <template #divider>
      <span class="breadcrumbs-divider">›</span>
    </template>

    <!-- Render the "more" overflow dropdown and its separator -->
    <template #more="{ overflowItems }">
      <KIconButton
        size="small"
        icon="chevronDown"
        appearance="raised-button"
      >
        <template #menu>
          <KDropdownMenu
            :options="overflowItems
              .filter(item => item.type !== 'separator') // Filter out separators
              .map(item => ({
                label: item.text, // Display 'text' in the menu
                link: item.link ? item.link.path : null // Use 'path' for the actual hyperlink
              }))"
          />
        </template>
      </KIconButton>
      <span class="breadcrumbs-divider">›</span>
    </template>
  </KListWithOverflow>

</template>

<script>

  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      showSingleItem: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      preparedCrumbs() {
        const crumbs = [...this.items];
        if (!this.showSingleItem && crumbs.length <= 1) {
          return [];
        }
        // Add separators between items
        return crumbs.flatMap((item, index) =>
          index > 0 ? [{ type: 'separator' }, item] : [item]
        );
      },
    },
  };

</script>

<style scoped>
  .breadcrumbs-divider {
    margin: 0 10px;
    color: black; /* Adjust color for the ">" separator */
  }

  .breadcrumbs-crumb-text {
    color: #007aff; /* Link color */
    text-decoration: none;
    font-weight: bold;
  }

  li {
    display: inline;
  }
</style>
