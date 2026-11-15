<template>
  <h3>ActivityTypeSelector Example</h3>
  <p data-cy="description">
    ActivityTypeSelector allows the user to select a log category.
  </p>

  <hr />
  <ActivityTypeSelector
    id="activity-type-selector"
    data-cy="activity-type-selector"
    v-bind:required="required"
    v-model:selected="form.selected"
    v-bind:showValidityStyling="validity.showStyling"
    v-on:valid="(valid) => (validity.selected = valid)"
    v-on:ready="handleReady"
  />
  <hr />

  <h5>Component Props:</h5>
  <table class="example-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Control</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>required</td>
        <td>
          <BFormCheckbox
            id="required-checkbox"
            data-cy="required-checkbox"
            switch
            v-model="required"
          />
        </td>
        <td>{{ required }}</td>
      </tr>
      <tr>
        <td>selected (v-model)</td>
        <td>
          <BButton
            id="select-seeding-button"
            data-cy="select-seeding-button"
            variant="outline-primary"
            size="sm"
            v-on:click="form.selected = 'seeding'"
          >
            Select seeding
          </BButton>
          <BButton
            id="clear-button"
            data-cy="clear-button"
            variant="outline-primary"
            size="sm"
            v-on:click="form.selected = null"
            v-bind:disabled="form.selected == null"
          >
            Clear
          </BButton>
        </td>
        <td>{{ form.selected }}</td>
      </tr>
      <tr>
        <td>showValidityStyling</td>
        <td>
          <BFormCheckbox
            id="styling-checkbox"
            data-cy="styling-checkbox"
            switch
            v-model="validity.showStyling"
          />
        </td>
        <td>{{ validity.showStyling }}</td>
      </tr>
    </tbody>
  </table>

  <h5>Component Event Payloads:</h5>
  <table class="example-table">
    <thead>
      <tr>
        <th>Event</th>
        <th>Payload</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ready</td>
        <td>{{ ready }}</td>
      </tr>
      <tr>
        <td>update:selected</td>
        <td>{{ form.selected === null ? 'null' : form.selected }}</td>
      </tr>
      <tr>
        <td>valid</td>
        <td>{{ validity.selected }}</td>
      </tr>
    </tbody>
  </table>

  <div
    id="page-loaded"
    data-cy="page-loaded"
    v-show="false"
  >
    {{ pageDoneLoading }}
  </div>
</template>

<script>
  import ActivityTypeSelector from '@comps/ActivityTypeSelector/ActivityTypeSelector.vue';

  export default {
    name: 'ActivityTypeSelectorExamplePage',
    components: {
      ActivityTypeSelector,
    },
    data() {
      return {
        required: true,
        form: {
          selected: null,
        },
        validity: {
          showStyling: false,
          selected: false,
        },
        createdCount: 0,
        ready: false,
      };
    },
    methods: {
      handleReady(payload) {
        this.ready = payload;
        this.createdCount++;
      },
    },
    computed: {
      pageDoneLoading() {
        return this.createdCount >= 2;
      },
    },
    created() {
      this.createdCount++;
    },
  };
</script>

<style>
  @import url('@css/fd2-examples.css');
  @import url('@css/fd2-mobile.css');

  activity-type-selector-example-hack {
    display: none;
  }
</style>
