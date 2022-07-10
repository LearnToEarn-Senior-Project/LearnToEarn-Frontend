<template>
  <Field
    v-if="!as && type != 'textarea'"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    class="text-sm w-full border-[3px] border-neutral-500 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 focus:text-primary-500 focus:ring-2 focus:ring-primary-400 focus:text-primary-400 focus:border-[3px] focus:placeholder:text-primary-400 active:outline-primary-400 active:border-primary-400 active:outline-2 active:text-primary-400 active:border-[3px] disabled:bg-neutral-100 disabled:text-500 active:placeholder:text-primary-400"
  />
  <Field
    v-else-if="type == 'textarea'"
    :name="name"
    :placeholder="placeholder"
    as="textarea"
    class="text-sm h-40 w-full border-[3px] border-neutral-500 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 focus:text-primary-500 focus:ring-2 focus:ring-primary-400 focus:text-primary-400 focus:border-[3px] focus:placeholder:text-primary-400 active:outline-primary-400 active:border-primary-400 active:outline-2 active:text-primary-400 active:border-[3px] disabled:bg-neutral-100 disabled:text-500 active:placeholder:text-primary-400"
  />
  <Field
    v-else
    :name="name"
    :as="as"
    class="text-sm w-full border-[3px] border-neutral-500 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 focus:text-primary-500 focus:ring-2 focus:ring-primary-400 focus:text-primary-400 focus:border-[3px] focus:placeholder:text-primary-400 active:outline-primary-400 active:border-primary-400 active:outline-2 active:text-primary-400 active:border-[3px] disabled:bg-neutral-100 disabled:text-500 active:placeholder:text-primary-400"
  >
    <slot></slot>
  </Field>
</template>
<script>
import { Field } from "vee-validate";
export default {
  components: {
    Field,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    as: {
      type: String,
    },
  },
};
</script>
