<template>
  <div id="app"> 
    <audio ref="audio" id="audio" src="@/assets/audio/bg-music.mp3" loop autoplay muted></audio>
    <Cover v-if="!open" @buka="playNote()"/>
    <!-- <transition name="bounce">
      <Main v-show="open"/>
    </transition> -->
    <Transition name="bounce" mode="out-in">
      <!-- <component @buka="playNote" :is="activeComponent"></component> -->
      <Main v-show="open"/>
    </Transition>
  </div>
</template>

<script>
import Main from './components/Main.vue' 
import Cover from './components/Cover.vue' 

export default {
  name: 'App',
  components: { 
    Main,
    Cover
  },
  data() {
    return {
      open: false, 
      activeComponent: Cover
    }
  },
  methods: { 
    playNote() { 
      const sound = this.$refs.audio;
      this.activeComponent = Main;
      this.open = true;
      sound.play();
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
