<template>
  <v-navigation-drawer v-model="showDrawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app :mini-variant="mini">
    <v-list dense>
      <v-list-tile @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon v-html="mini?'chevron_right' : 'chevron_left'"></v-icon>
        </v-list-tile-action>
      </v-list-tile>
            <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>

        <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.icon" append-icon="keyboard_arrow_up">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click="" >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :key="item.text" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'drawer',
    props: {
      visible: Boolean,
      items: Array
    },
    data: () => ({
      mini: false
    }),
    computed: {
      showDrawer: {
        get() {
          return this.$vuetify.breakpoint.lgAndUp || this.visible;
        },
        set(val) {
          this.visible = val;
        }
      }
    }
  }
</script>

<style>
  v-navigation-drawer {
    width: auto;
    padding: 0 6px;
  }
</style>
