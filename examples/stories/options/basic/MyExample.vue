<template>
  <div>
    <p>modifier: int</p>
    <input
      v-model="input1"
      v-number.int="{ ...options, model: input1, ...options }"
      @focus="onFocus"
    />

    <p>modifier: pos</p>
    <input
      v-model="input2"
      v-number.pos="{ ...options, model: input2, ...options }"
      @focus="onFocus"
    />

    <p>modifier: int.pos</p>
    <input
      v-model="input3"
      v-number.int.pos="{ ...options, model: input3, ...options }"
      @focus="onFocus"
    />

    <p>modifier: integer</p>
    <input
      v-model="input4"
      v-number.integer="{ ...options, model: input4, ...options }"
      @focus="onFocus"
    />

    <p>modifier: positive</p>
    <input
      v-model="input5"
      v-number.positive="{ ...options, model: input5, ...options }"
      @focus="onFocus"
    />
  </div>
</template>

<script>
export default {
  name: 'MyExample',
  props: {
    options: Object
  },
  data() {
    return {
      input1: '123',
      input2: '123',
      input3: '123',
      input4: '123',
      input5: '123',
      input6: '123',
    }
  }
}
</script>
