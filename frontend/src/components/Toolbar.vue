<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue-grey lighten-1" dark app>
    <v-toolbar-title class="mr-3">
      <v-btn icon large class="hidden-lg-and-up" @click.stop="toggleDrawerState"><v-icon>menu</v-icon></v-btn>
      <span class="hidden-md-and-down">mdSongbook</span>
    </v-toolbar-title>
    <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search"></v-text-field>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn icon class="hidden-sm-and-down"><v-icon :html="userLoggedIn ? 'user' : 'login'"></v-icon></v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn flat large class="logo" style="padding: 0" v-on="on">
          <v-avatar size="46px" tile>
            <v-img :src="require('../assets/logo.svg')" contain></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" @click="processClick">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      items: Array
    },
    computed: {
      ...mapGetters(['userLoggedIn'])
    },
    methods: {
      toggleDrawerState() {
        this.$store.dispatch('toggleDrawer');
      },
      processClick(item) {
        if (item.action) {
          this.$store.dispatch('menuAction', item.action);
        }
      }
    }
  }
</script>

<style>

</style>
