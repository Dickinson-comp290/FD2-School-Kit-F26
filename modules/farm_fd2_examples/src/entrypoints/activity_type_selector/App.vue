<template>
  <h3>ActivityTypeSelector Example</h3>
  <p data-cy="description">Short description of the component goes here.</p>

  <hr />

  <!-- v-model or v-bind other props and v-on additional event handlers
       here as they are added to the component. 
  -->
  <SelectorBase
    id="activity-observation-type"
    data-cy="activity-observation-type"
    label="Type"
    v-bind:options="activityTypes"
    v-bind:showValidityStyling="validity.showStyling"
    v-on:valid="
      (valid) => {
        validity.type = valid;
      }
    "
    v-model:required="required"
    v-model:selected="form.type"
    v-on:ready="createdCount++"
    invalidFeedbackText="An activity type is required."
  />
  <hr />

  <h5>Component Props:</h5>
  <table class="example-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Control</th>
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
      </tr>
      <tr>
        <td>type</td>
        <td>
          <BButton
            id="select-button"
            data-cy="select-button"
            variant="outline-primary"
            size="sm"
            v-on:click="this.form.type = 'tillage'"
            v-bind:disabled="this.form.type == 'tillage'"
          >
            Select Tillage
          </BButton>
          <BButton
            id="remove-button"
            data-cy="remove-button"
            variant="outline-primary"
            size="sm"
            v-on:click="this.form.type = ''"
            v-bind:disabled="this.form.type == ''"
          >
            Clear
          </BButton>
        </td>
      </tr>
    </tbody>
  </table>

  <h5>Component Event Payloads</h5>
  <table class="example-table">
    <thead>
      <tr>
        <th>Event</th>
        <th>Payload</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>update:selected</td>
        <td>{{ form.type }}</td>
      </tr>
      <tr>
        <td>valid</td>
        <td>{{ validity.type }}</td>
      </tr>
    </tbody>
  </table>

  <div
    data-cy="page-loaded"
    v-show="false"
  >
    {{ pageDoneLoading }}
  </div>
</template>

<script>
  /*
   * Import the components being used in this example here.
   */

  import SelectorBase from '@comps/SelectorBase/SelectorBase.vue';
  import * as farmosUtil from '@libs/farmosUtil/farmosUtil.js';

  export default {
    components: {
      /**
       * List the components being used in this example here.
       */
      SelectorBase,
    },
    data() {
      return {
        required: true,
        activityTypes: [],
        form: {
          type: '',
        },
        /*
         * Add elements here to hold each of the values that this component collects.
         * This models how form data is collected in entry points, where the
         * form element is passed to lib.js, which uses it to submit data to
         * the farmOS server.
         */
        createdCount: 0,
        validity: {
          /*
           * Indicates if the validity styling should be shown. In this example it's
           * value is v-modeled to the toggle switch input above, and to the showValidityStyling prop
           * of the component in the template.  In an entry point this is replaced by the
           * showValidityStyling computed property.
           */
          showStyling: false,
          /*
           * Add a new element here to hold the validity of each of the components in this component.
           * See the other examples and their App.vue files for samples.
           */
          type: false,
        },
      };
    },
    methods: {},
    computed: {
      pageDoneLoading() {
        return this.createdCount == 1;
      },
    },
    async created() {
      let logCategoryObjects = await farmosUtil.getLogCategories();
      this.activityTypes = logCategoryObjects.map(
        (category) => category.attributes.name
      );

      this.createdCount++;
    },
  };
</script>

<style>
  @import url('@css/fd2-examples.css');
  @import url('@css/fd2-mobile.css');

  /**
 * This ensures that the css for this file is picked up by the builder.
 * Not sure why this is necessary, but without it the css imports
 * above are not processed.
 */
  activity_type_selector-hack {
    display: none;
  }
</style>
