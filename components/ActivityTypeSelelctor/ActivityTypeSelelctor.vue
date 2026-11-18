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
      <DateSelector
        id="activity-observation-date"
        data-cy="activity-observation-date"
        v-bind:date="date"
        v-bind:required="required"
        v-bind:showValidityStyling="showValidityStyling"
        v-on:update:date="handleUpdateDate($event)"
        v-on:valid="handleDateValid($event)"
        v-on:ready="handleChildReady"
      />
      <SelectorBase
        id="activity-observation-type"
        data-cy="activity-observation-type"
        v-bind:label="label"
        invalidFeedbackText="An activity type is required."
        v-bind:options="options"
        v-bind:required="required"
        v-bind:selected="selected"
        v-bind:showValidityStyling="showValidityStyling"
        v-on:update:selected="handleUpdateSelected($event)"
        v-on:valid="handleTypeValid($event)"
        v-on:ready="handleChildReady"
      />
      <CommentBox
        id="activity-observation-comment"
        data-cy="activity-observation-comment"
        v-bind:comment="comment"
        v-on:update:comment="handleUpdateComment($event)"
        v-on:ready="handleChildReady"
      />
    </BFormGroup>
  </div>
</template>

<script>
  /*
   * Import any libraries or FarmData2 components being used in this component here.
   */
  import DateSelector from '@comps/DateSelector/DateSelector.vue';
  import SelectorBase from '@comps/SelectorBase/SelectorBase.vue';
  import CommentBox from '@comps/CommentBox/CommentBox.vue';

  export default {
    name: 'ActivityTypeSelelctor',
    components: { DateSelector, SelectorBase, CommentBox },
    emits: [
      'ready',
      'update:date',
      'update:selected',
      'update:comment',
      'valid',
    ],
    props: {
      comment: {
        type: String,
        default: null,
      },

      date: {
        type: String,
        default: undefined,
      },
      label: {
        type: String,
        default: 'Type',
      },
      options: {
        type: Array,
        default() {
          return ['seeding', 'transplanting', 'tillage'];
        },
      },
      required: {
        type: Boolean,
        default: false,
      },

      selected: {
        type: String,
        default: null,
      },

      showValidityStyling: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        dateValid: null,
        typeValid: null,
        childReadyCount: 0,
        readyEmitted: false,
      };
    },
    computed: {
      isValid() {
        if (this.dateValid === null || this.typeValid === null) {
          return null;
        }

        return this.dateValid && this.typeValid;
      },
    },
    methods: {
      handleUpdateDate(date) {
        this.$emit('update:date', date);
      },
      handleUpdateSelected(selected) {
        this.$emit('update:selected', selected);
      },
      handleUpdateComment(comment) {
        this.$emit('update:comment', comment);
      },
      handleDateValid(valid) {
        this.dateValid = valid;
      },
      handleTypeValid(valid) {
        this.typeValid = valid;
      },
      handleChildReady() {
        this.childReadyCount++;

        if (this.childReadyCount === 3 && !this.readyEmitted) {
          this.readyEmitted = true;
          this.$emit('ready');
        }
      },
    },
    watch: {
      isValid(valid) {
        if (valid !== null) {
          this.$emit('valid', valid);
        }
      },
    },
  };
</script>
