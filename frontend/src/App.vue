<template>
  <v-app id="inspire">
    <drawer :items="items" :visible="showDrawer"></drawer>
    <toolbar @toggleDrawerState="toggleDrawerState"></toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="blue"
      dark
      fixed
      @click="showDialog = !showDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <dialog :visible="showDialog"></dialog>
  </v-app>
</template>

<script>
import Dialog from './components/Dialog'
import Drawer from './components/Drawer'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar, Drawer, Dialog
  },
  methods: {
    toggleDrawerState() {
      this.showDrawer = !this.showDrawer;
    }
  },
  data: () => ({
    showDialog: true,
    showDrawer: false,
    items: [
      { icon: 'contacts', text: 'Contacts' },
      { icon: 'history', text: 'Frequently contacted' },
      { icon: 'content_copy', text: 'Duplicates' },
      {
        icon: 'contacts',
        text: 'Labels',
        model: true,
        children: [
          { icon: 'add', text: 'Create label' }
        ]
      },
      {
        icon: 'settings',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Go to the old version' }
    ]
  })
}


</script>
