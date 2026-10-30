<template>
  <div
    id="activity-observation"
    data-cy="activity-observation"
  >
    <BToaster
      id="activity-observation-toaster"
      data-cy="activity-observation-toaster"
    />

    <BCard
      id="activity-observation-card"
      data-cy="activity-observation-card"
      bg-variant="light"
      header-tag="header"
    >
      <template #header>
        <h2
          id="activity-observation-header"
          data-cy="activity-observation-header"
          class="text-center"
        >
          Activity Observation
        </h2>
      </template>

      <BForm
        id="activity-observation-form"
        data-cy="activity-observation-form"
      >
        <DateSelector
          id="activity-observation-date"
          data-cy="activity-observation-date"
          required
          v-model:date="form.date"
          v-bind:showValidityStyling="validity.show"
          v-on:valid="validity.date = $event"
          v-on:ready="createdCount++"
        />

        <SelectorBase
          id="activity-observation-type"
          data-cy="activity-observation-type"
          label="Type"
          invalidFeedbackText="An activity type is required."
          v-model:selected="form.type"
          v-bind:options="activityTypes"
          v-bind:required="true"
          v-bind:showValidityStyling="validity.show"
          v-on:valid="validity.type = $event"
          v-on:ready="createdCount++"
        />

        <hr />

        <CommentBox
          id="activity-observation-comment"
          data-cy="activity-observation-comment"
          v-model:comment="form.comment"
          v-on:valid="validity.comment = $event"
          v-on:ready="createdCount++"
        />

        <SubmitResetButtons
          id="activity-observation-submit-reset"
          data-cy="activity-observation-submit-reset"
          v-bind:enableSubmit="submitEnabled"
          v-bind:enableReset="resetEnabled"
          v-on:ready="createdCount++"
          v-on:submit="submit()"
          v-on:reset="reset()"
        />
      </BForm>
    </BCard>

    <div
      id="page-loaded"
      data-cy="page-loaded"
      v-show="false"
    >
      {{ pageDoneLoading }}
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import DateSelector from '@comps/DateSelector/DateSelector.vue';
  import SelectorBase from '@comps/SelectorBase/SelectorBase.vue';
  import CommentBox from '@comps/CommentBox/CommentBox.vue';
  import SubmitResetButtons from '@comps/SubmitResetButtons/SubmitResetButtons.vue';
  import * as uiUtil from '@libs/uiUtil/uiUtil.js';
  import { lib } from './lib.js';

  export default {
    components: {
      DateSelector,
      SelectorBase,
      CommentBox,
      SubmitResetButtons,
    },
    data() {
      return {
        activityTypes: ['Seeding', 'Transplanting', 'Tillage'],
        form: {
          date: dayjs().format('YYYY-MM-DD'),
          type: '',
          comment: '',
        },
        validity: {
          show: false,
          date: false,
          type: false,
          comment: false,
        },
        submitting: false,
        errorShowing: false,
        createdCount: 0,
      };
    },
    computed: {
      pageDoneLoading() {
        return this.createdCount === 5;
      },
      submitEnabled() {
        return !this.validity.show || (this.validToSubmit && !this.submitting);
      },
      resetEnabled() {
        return !this.submitting;
      },
      validToSubmit() {
        return Object.entries(this.validity)
          .filter(([key]) => key !== 'show')
          .every((item) => item[1] === true);
      },
    },
    methods: {
      async submit() {
        this.submitting = true;
        this.validity.show = true;

        if (this.validToSubmit) {
          uiUtil.showToast(
            'Submitting Activity Observation...',
            '',
            'top-center',
            'success'
          );

          try {
            await lib.submitForm({ ...this.form });

            uiUtil.hideToast();
            await uiUtil.showToast(
              'Activity Observation created.',
              '',
              'top-center',
              'success',
              2
            );

            this.reset(true);
            this.submitting = false;
          } catch {
            if (!this.errorShowing) {
              uiUtil.hideToast();
              this.errorShowing = true;

              await uiUtil.showToast(
                'Error creating Activity Observation records.',
                'Check your network connection and try again.',
                'top-center',
                'danger',
                5
              );

              this.submitting = false;
              this.errorShowing = false;
            }
          }
        } else {
          this.submitting = false;
        }
      },
      reset(sticky = false) {
        this.validity.show = false;

        if (!sticky) {
          this.form.date = dayjs().format('YYYY-MM-DD');
        }

        this.form.type = '';
        this.form.comment = '';
        this.validity.date = false;
        this.validity.type = false;
        this.validity.comment = false;
      },
    },
    created() {
      this.createdCount++;

      if (window.Cypress) {
        document.defaultView.lib = lib;
      }
    },
  };
</script>

<style>
  @import url('@css/fd2-mobile.css');

  #activity-observation-date {
    margin-top: 2px;
    margin-bottom: 8px;
  }

  #activity-observation-type {
    margin-bottom: 8px;
  }

  #activity-observation-comment {
    margin-bottom: 15px;
  }
</style>
