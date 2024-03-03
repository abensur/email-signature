<script setup lang="ts">
const signatureData = ref<SignatureFields>({
  showEmail: false,
  showSocial: true,
  showLogo: false,
  logoUrl: 'https://placehold.co/100x50',
  name: 'Rafael Abensur',
  email: 'rafael@abensur.me',
  title: 'Software Engineer',
  address: '',
  website: 'https://abensur.me',
  phone: '',
  phoneAlt: '',
  socialText: '',
  disclaimer: '',
  social: [{
    href: 'https://github.com/abensur',
    label: 'Github',
  }, {
    href: 'https://www.linkedin.com/in/rafaelabensur/',
    label: 'LinkedIn',
  }],
})

function handleUpdate(data: SignatureFields) {
  // eslint-disable-next-line no-console
  console.log('handleUpdate', data)
}
</script>

<template>
  <div h-full w-full flex flex-col-reverse flex-wrap py-6>
    <div w-full flex-1 px-4 pt-6>
      <SignatureForm v-model="signatureData" @update:model-value="handleUpdate" />
    </div>
    <div position-sticky top-6 w-full bg-white px-4 shadow-lg>
      <Renderer :data="signatureData" />
    </div>
  </div>
</template>
