<script lang="ts" setup>
import Clipboard from 'clipboard'

const feedback = ref(false)

function success() {
  feedback.value = true
}

function handleSave() {
  // eslint-disable-next-line no-console
  console.log('Save')
}

onMounted(() => {
  const signatureClipboard = new Clipboard('.js-copy')
  const signatureHTMLClipboard = new Clipboard('.js-copy-src', {
    text: () => {
      return document.querySelector('.signature-source')?.innerHTML || ''
    },
  })

  signatureClipboard.on('success', success)
  signatureHTMLClipboard.on('success', success)
})
</script>

<template>
  <v-card-actions>
    <v-btn data-clipboard-target=".signature-source" class="js-copy" color="primary" @click.prevent>
      COPY
    </v-btn>
    <v-btn color="secondary" class="js-copy-src">
      COPY HTML
    </v-btn>
    <v-btn color="primary" class="ml-auto" @click="handleSave">
      SAVE
    </v-btn>
    <v-snackbar v-model="feedback" color="success">
      Copied!
    </v-snackbar>
  </v-card-actions>
</template>
