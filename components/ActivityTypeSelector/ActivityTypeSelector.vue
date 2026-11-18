<template>
  <div>
    <BFormGroup
      id="component-group"
      v-bind:data-cy="dataCy"
    >
      <SelectorBase
        v-bind:id="id"
        v-bind:data-cy="'selector'"
        v-bind:label="label"
        v-bind:invalidFeedbackText="invalidFeedbackText"
        v-bind:options="computedOptions"
        v-bind:required="required"
        v-bind:selected="selected"
        v-bind:showValidityStyling="showValidityStyling"
        v-bind:popupUrl="popupUrl"
        v-on:valid="handleValid"
        v-on:update:selected="handleUpdateSelected"
        v-on:add-clicked="handleAddClicked"
        v-on:ready="handleSelectorReady"
      />
    </BFormGroup>
  </div>
</template>

<script>
  import SelectorBase from '@comps/SelectorBase/SelectorBase.vue';
  import * as farmosUtil from '@libs/farmosUtil/farmosUtil';

  /**
   * The ActivityTypeSelector is ... give a one line description of the component here.
   *
   * Longer description of the component can go here...
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
   * Include an example of how to add this component to a template.
   * This can often be pulled from the example page for the component.
   * See the other components in the `components` directory for samples.
   * ```
   *
   * ## `data-cy` Attributes
   *
   * Attribute Name        | Description
   * ----------------------| -----------
   * `component-group`     | The `BFormGroup` component containing this component.
   * `attr-value`          | Describe the purpose of all elements with `data-cy` attributes.
   */
  export default {
    name: 'ActivityTypeSelector',
    components: {
      SelectorBase,
    },

    emits: ['ready', 'valid', 'update:selected', 'add-clicked'],
    props: {
      dataCy: {
        type: String,
        required: true,
      },

      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        default: 'Type',
      },
      invalidFeedbackText: {
        type: String,
        default: 'An activity type is required.',
      },
      options: {
        type: Array,
        default: null,
      },
      /**
       * Whether a value for the input element is required or not.
       */
      required: {
        type: Boolean,
        default: false,
      },

      selected: {
        type: String,
        default: null,
      },

      /**
       * Whether validity styling should appear on input elements.
       */
      showValidityStyling: {
        type: Boolean,
        default: false,
      },

      popupUrl: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        fetchedOptions: [],
      };
    },
    computed: {
      computedOptions() {
        return this.options !== null ? this.options : this.fetchedOptions;
      },
    },
    methods: {
      handleSelectorReady() {
       if (this.options !== null) {
          this.$emit('ready');
        }
      },
      handleValid(event) {
        /**
         * The validity of the base component has changed.
         * @property {boolean} event whether the base component is valid or not.
         */
        this.$emit('valid', event);
      },

      handleUpdateSelected(event) {
        this.$emit('update:selected', event);
      },
      handleAddClicked() {
        this.$emit('add-clicked');
      },
    },
    
    async created() {
      if (this.options === null) {
        let logCategoryObjects = await farmosUtil.getLogCategories();
        this.fetchedOptions = logCategoryObjects.map(
          (category) => category.attributes.name
        );
        this.$emit('ready');
      }
    },
  };
</script>
