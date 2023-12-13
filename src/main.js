import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/index.css";

const app = createApp(App);

app.directive("click-away", {
  beforeMount(el, binding, vnode) {
    el.clickAwayEvent = function (event) {
      // Check that click was outside the el and its children, and wasn't on a scrollbar
      if (!(el === event.target || el.contains(event.target)) && visible(el)) {
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener("click", el.clickAwayEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickAwayEvent);
  },
});

app.mount("#app");

function visible(elm) {
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
