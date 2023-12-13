<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-700 mb-2">My Dropdown</h3>
    <DropDown :items="dropdownItems" :multiple="true" :width="'w-1/2'" />
  </div>
</template>

<script>
import DropDown from "./components/DropDown.vue";

export default {
  name: "App",
  components: {
    DropDown,
  },
  data() {
    return {
      dropdownItems: [
        { title: "Item 1", value: "1" },
        { title: "Item 2", value: "2" },
        // ... more items
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
