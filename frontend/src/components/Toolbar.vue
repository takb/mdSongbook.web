<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue-grey darken-3"
    dark
    app
    fixed
  >
    <v-toolbar-title class="mr-3" @click.stop="emitToggleDrawerState">
      <v-btn icon large class="hidden-lg-and-up">
        <v-icon>menu</v-icon>
      </v-btn>
      <span class="hidden-md-and-down">mdSongbook</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Search"
    ></v-text-field>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn icon class="hidden-sm-and-down">
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon class="hidden-sm-and-down">
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        >
      </v-avatar>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'toolbar',
    methods: {
      emitToggleDrawerState() {
        this.$emit('toggleDrawerState');
      }
    }
  }
</script>

<style>

</style>
