<template>
  <!-- This extra div element is included to help with consistency in the 
       tests.  Without it the BFormGroup can sometimes be optimized away 
       making tests that use it in cy.get statements fail. 
  -->
  <div>
    <BFormGroup
      id="component-group"
      data-cy="component-group"
    >
      <!-- Add FarmData2 components here to build this component. 
          Other components in the `components/` directory provide useful examples.

          Every element that might be used in a test should have an `id` and a 
          `data-cy` attribute.  The value of these attributes should be the same.
      -->
      <p 
        id="placeholder" 
        data-cy="placeholder">
          Replace this `p` element with your component content.
      </p>
    </BFormGroup>
  </div>
</template>

<script>
/*
 * Import any libraries or FarmData2 components being used in this component here.
 */

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
    /*
     * List the FarmData2 base component being used here.
     */
  },
  /*
   * This component will relay all of the events from the FarmData2 base component that it uses.
   * All of the FarmData2 components have `ready` event and `valid` events. The `ready` event
   * indicates when the component is fully initialized and ready for use. The `valid` 
   * events. Other events emitted by the base component will need to be relayed as well. See the
   * event handler methods below for examples of how to relay events from the base component.
   */
  emits: ['ready', 'valid', ],
  props: {
    /*
     * Every component will have props for `required` and `showValidityStyling`. These props
     * will need to be passed on to the base component using `v-bind` in the template. 
     */

    /**
     * Whether a value for the input element is required or not.
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether validity styling should appear on input elements.
     */
    showValidityStyling: {
      type: Boolean,
      default: false,
    },
    /*
     * Other props specific to the FarmDat2 base component need to be added here as necessary.  
     * Each prop must have a doc comment (see above for examples) with a one line description
     * of what the prop does. The doc comment is used when the documentation for the component 
     * is generated.  Props should be added in alphabetical order.
     */
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    /*
     * This method relays the `valid` event from the base component. It will need to be setup
     * as the event handler for the `valid` event emitted by the base component in the template. 
     * The comment and @property tag below should be edited to reflect the purpose of this component.
     */
    handleValid(event) {
      /**
       * The validity of the base component has changed.
       * @property {boolean} event whether the base component is valid or not.
       */
      this.$emit('valid', event);
    },
  },
  watch: {},
  created() {
    /*
     * Emit a false valid event when the component is created. This should be removed 
     * when the handleEvent method is connected to the base component's `valid` event 
     * in the template.
     */ 
    this.$emit('valid', false);

    /*
     * Add any initialization code here. This is typically calls to functions in the
     * `farmosUtil` library to retrieve data needed by the component from farmOS. For
     * example, a list of crops, locations or active plant assets.
     * 
     * The component must emit a `ready` event when it is fully initialized and ready for use. 
     * This event indicates that the component is ready to receive user input and can be used.
     *
     * Other components in the `components/` directory provide useful examples of
     * how to implement these calls.
     */



    /**
     * The component is ready for use.
     */
    this.$emit('ready');
  },
};
</script>
