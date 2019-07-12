<template>
  <v-app>
    <toolbar :items="toolbarMenuItems"></toolbar>
    <drawer :items="drawerItems"></drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-btn fab bottom right color="blue" dark fixed @click="showDialog = !showDialog">
      <v-icon>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
  import Drawer from './components/Drawer'
  import Toolbar from './components/Toolbar'
  export default {
    components: {
      Toolbar, Drawer
    },
    data: () => ({
      drawerItems: [
        { icon: 'contacts', text: 'Contacts'},
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'contacts',
          text: 'Labels',
          model: false,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'info', text: 'About', goto: 'About'  },
        { icon: 'phonelink', text: 'App downloads' },
      ],
      toolbarMenuItems: [
        { icon: 'contacts', text: 'Contacts'},
        { icon: 'content_copy', text: 'Duplicates' },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'info', text: 'About', goto: 'About'  },
        { icon: 'phonelink', text: 'App downloads' },
      ]
    }),
    // created() {
    //   this.$store.dispatch('init');
    // }
  }
</script>

<style>
  .theme--light.application {
    color: #263238;
  }
</style>
