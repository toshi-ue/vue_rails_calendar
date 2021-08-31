<template>
  <div id="app">
    <HelloWorld />
    <Prop propsMessage="props message"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Prop from "./components/Prop.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Prop,
  },
};
</script>
