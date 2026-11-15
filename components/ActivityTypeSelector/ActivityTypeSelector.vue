<template>
  <div>
    <SelectorBase
      id="activity-type-selector"
      data-cy="activity-type-selector"
      label="Type"
      invalidFeedbackText="An activity type is required."
      v-bind:options="activityTypes"
      v-bind:required="required"
      v-bind:selected="selected"
      v-bind:showValidityStyling="showValidityStyling"
      v-on:update:selected="$emit('update:selected', $event)"
      v-on:valid="$emit('valid', $event)"
    />
  </div>
</template>

<script>
  import SelectorBase from '@comps/SelectorBase/SelectorBase.vue';
  import * as farmosUtil from '@libs/farmosUtil/farmosUtil.js';

  /**
   * The ActivityTypeSelector allows the user to select a log category.
   *
   * It fetches the available log categories from farmOS and displays them in a
   * SelectorBase dropdown.
   *
   * ## Live Example
   *
   * <a href="https://%HOST_NAME%/fd2_examples/activity_type_selector">The ActivityTypeSelector Example</a>
   *   - Example Source: <a href="./ActivityTypeSelector.ex.src.md">modules/farm_fd2_examples/src/entrypoints/activity_type_selector/App.vue</a>
   *   - Component Source: <a href="./ActivityTypeSelector.comp.src.md">components/ActivityTypeSelector/ActivityTypeSelector.vue</a>
   *
   * ## Usage Example
   *
   * ```html
   * <ActivityTypeSelector
   *   id="activity-observation-type"
   *   data-cy="activity-observation-type"
   *   required
   *   v-model:selected="form.type"
   *   v-bind:showValidityStyling="validity.show"
   *   v-on:valid="validity.type = $event"
   *   v-on:ready="createdCount++"
   * />
   * ```
   *
   * ## `data-cy` Attributes
   *
   * Attribute Name             | Description
   * ---------------------------| -----------
   * `activity-type-selector`   | The SelectorBase dropdown for activity types.
   */
  export default {
    name: 'ActivityTypeSelector',
    components: { SelectorBase },
    emits: ['error', 'ready', 'update:selected', 'valid'],
    props: {
      /**
       * Whether an activity type selection is required or not.
       */
      required: {
        type: Boolean,
        default: false,
      },
      /**
       * The selected activity type. Changes are relayed through the
       * `update:selected` event.
       */
      selected: {
        type: String,
        default: null,
      },
      /**
       * Whether validity styling should appear on the dropdown.
       */
      showValidityStyling: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        activityTypes: [],
      };
    },
    methods: {
      handleError(error) {
        console.error('ActivityTypeSelector: Error fetching activity types.');
        console.error(error);
        this.$emit('error', 'Unable to fetch activity types.');
      },
    },
    async created() {
      try {
        const categories = await farmosUtil.getLogCategories();
        this.activityTypes = categories.map(
          (category) => category.attributes.name
        );
        this.$emit('ready', true);
      } catch (error) {
        this.handleError(error);
      }
    },
  };
</script>
