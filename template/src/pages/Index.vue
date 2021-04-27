<template>
  <q-page class="flex flex-center">
    <div class='column q-gutter-y-lg'>
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-full.svg"
      >
      <TestProto/>
    </div>
  </q-page>
</template>

<script>
import TestProto from '../components/TestProto';
export default {
  name: 'PageIndex',
  components: { TestProto }
}
</script>
