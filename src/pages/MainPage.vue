<template>
  <q-page class="main-page">
    <div class="row items-center q-px-sm">
      <h5 class="col-2">Recent rooms</h5>
      <div class="col-10 flex row justify-between">
        <div class="col-4">
          <q-input
            v-model="search"
            placeholder="Search for a room..."
            dense
            outlined
            class="q-ma-none q-py-sm q-px-md"
          >
            <template v-slot:prepend>
              <q-icon name="search" class="text-grey" />
            </template>
          </q-input>
        </div>
        <q-spacer />
        <div class="col-auto flex justify-center items-center">
          <q-btn
            label="Create Room"
            icon="add"
            color="primary"
            class="q-ml-md"
          />
        </div>
      </div>
    </div>

    <div class="row q-px-sm">
      <q-table
        class="main-page-table"
        title="Treats"
        :rows="rows"
        :columns="TABLE_COLUMNS"
        row-key="name"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import { TABLE_COLUMNS } from 'src/constants/rooms-table.constants'

  export default defineComponent({
    setup() {
      const search = ref<string>('')
      const rows = ref([
        {
          title: 'name',
          records: 'Fastest: John Doe, Slowest: John Doe',
          time: 'Average: 00:00:05, Total: 00:00:04',
          lastUsed: 'Today',
          lastStory: 'Name of the story, 1 of 1',
          totalPoints: '33',
        },
      ])

      return {
        search,
        rows,

        TABLE_COLUMNS,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .main-page {
    width: 100%;
    max-width: 1200px;
  }

  .main-page-table {
    width: 100%;
  }
</style>
