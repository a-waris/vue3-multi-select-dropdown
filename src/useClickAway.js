// useClickAway.js
import { onMounted, onUnmounted, ref } from 'vue';

export default function useClickAway(handler) {
  const target = ref(null);

  const listener = (event) => {
    if (!target.value || (target.value && !target.value.contains(event.target))) {
      handler(event);
    }
  };

  onMounted(() => document.addEventListener('click', listener));
  onUnmounted(() => document.removeEventListener('click', listener));

  return { target };
}
