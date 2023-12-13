<template>
  <div class="flex justify-center items-center">
    <div :class="width" class="relative inline-block text-left" ref="dropdown">
      <!-- Dropdown Button -->
      <div>
        <button
          @click="toggleDropdown"
          class="flex justify-between items-center w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <span>{{ selectedItemsDisplay }}</span>
          <!-- Toggle Chevron Icon -->
          <span>
            <svg
              v-if="isOpen"
              class="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 14.707a1 1 0 01-1.414 0L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>

      <!-- Dropdown Items -->
      <transition
        name="dropdown"
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full"
        >
          <ul>
            <li
              v-for="item in items"
              :key="item.value"
              @click="selectItem(item)"
              class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              :class="{ 'bg-blue-100': isSelected(item) }"
            >
              <!-- Check Icon -->
              <svg
                v-if="isSelected(item)"
                class="w-4 h-4 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.293 8.879A1 1 0 102.879 10.293l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span :class="{ 'font-semibold': isSelected(item) }">{{
                item.title
              }}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import useClickAway from "../useClickAway";

export default {
  name: "DropDown",
  props: {
    items: Array,
    multiple: Boolean,
    placeHolder: {
      type: String,
      default: "Select an option",
    },
    width: {
      type: String,
      default: "w-full", // Default to full width
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const dropdown = ref(null);
    const selectedItems = ref([]);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const closeDropdown = () => {
      isOpen.value = false;
    };

    // Use the composable
    const { target } = useClickAway(closeDropdown);

    onMounted(() => {
      target.value = dropdown.value;
    });

    const selectItem = (item) => {
      if (props.multiple) {
        const index = selectedItems.value.findIndex(
          (i) => i.value === item.value
        );
        if (index > -1) {
          selectedItems.value.splice(index, 1); // Deselect
        } else {
          selectedItems.value.push(item); // Select
        }
      } else {
        selectedItems.value = [item];
        isOpen.value = false;
      }
    };

    const isSelected = (item) => {
      return selectedItems.value.some((i) => i.value === item.value);
    };

    const selectedItemsDisplay = computed(() => {
      if (selectedItems.value.length === 0) return props.placeHolder;
      if (props.multiple)
        return selectedItems.value.map((i) => i.title).join(", ");
      return selectedItems.value[0].title;
    });

    return {
      isOpen,
      dropdown,
      toggleDropdown,
      selectItem,
      isSelected,
      selectedItemsDisplay,
    };
  },
};
</script>

<style scoped>
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
