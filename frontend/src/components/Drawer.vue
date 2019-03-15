<template>
  <v-navigation-drawer :value="showDrawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app :mini-variant="minifyDrawer">
    <v-list dense>
      <v-list-tile @click.stop="toggleMinify">
        <v-list-tile-action>
          <v-icon v-html="minifyDrawer ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <template v-for="item in items">
        <v-list-group v-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.icon" append-icon="keyboard_arrow_down">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click="processClick(item)" >
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
        <v-list-tile v-else :key="item.text" @click="processClick(item)">
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
  import { mapGetters } from 'vuex'
  export default {
    props: {
      visible: Boolean,
      items: Array,
    },
    computed: {
      ...mapGetters(['showDrawer', 'minifyDrawer']),
    },
    methods: {
      toggleMinify() {
        this.$store.dispatch('toggleMinify');
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
  v-navigation-drawer {
    width: auto;
    padding: 0 6px;
  }
</style>
