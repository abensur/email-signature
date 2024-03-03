<script setup lang="ts">
const props = defineProps<{
  data: SignatureFields
}>()

const emit = defineEmits(['save'])

const source = ref()

const tel1 = computed(() => `tel:${props.data.phone?.replace(/ /g, '').replace(/\D/g, '')}`)
const tel2 = computed(() => `tel:${props.data.phoneAlt?.replace(/ /g, '').replace(/\D/g, '')}`)
const mail = computed(() => `mailto:${props.data.email}`)
const site = computed(() => props.data.website?.replace(/https?:\/\//, ''))
</script>

<template>
  <div>
    <div class="signature-source">
      <div ref="source">
        <table
          cellpadding="0"
          cellspacing="0"
          style="
            font-family: 'Open Sans', Helvetica, Arial, sans-serif;
            font-size: 14px;
            font-weight: normal;
            color: #37474f;
            text-align: left;
            line-height: 20px;
            width: 100%;
          "
        >
          <tbody>
            <tr>
              <td
                v-if="data.showLogo"
                style="
                  font-size: 0px;
                  vertical-align: top;
                  padding: 10px;
                  width: 100px;
                "
              >
                <img
                  alt="Company Logo"
                  :src="data.logoUrl"
                  width="100"
                  height="50"
                  style="width: 100px; height: 50px; display: block;"
                >

                <a
                  v-if="data.website?.trim().length"
                  tabindex="-1"
                  :href="data.website"
                  target="_blank"
                  style="color: #1929c2; font-size: 11px; text-align: center; display: block;"
                >
                  {{ site }}
                </a>
              </td>
              <td
                style="
                  vertical-align: top;
                  padding: 10px;
                  padding-bottom: 0px;
                  padding-left: 10px;
                  border-left: 1px solid #c7c4f8;
                "
              >
                <a
                  v-if="data.name && !data.showEmail"
                  tabindex="-1"
                  :href="mail"
                  style="
                    text-decoration: none;
                    font-weight: 700;
                    color: #1929c2;
                  "
                >
                  {{ data.name || "" }}
                </a>

                <span
                  v-else-if="data.name"
                  style="font-weight: 700; color: #5b5b5f"
                >
                  {{ data.name || "" }}
                </span>

                <template v-if="data.name && data.title">
                  -
                </template>

                <span
                  v-if="data.title"
                  style="font-weight: 400; color: #5b5b5f"
                >
                  {{ data.title || "" }}
                </span>

                <br v-if="data.address?.trim().length">

                <span v-if="data.address?.trim().length" style="color: #5b5b5f; white-space: pre;">
                  {{ data.address }}
                </span>

                <template v-if="data.phone?.length">
                  <br>

                  <a
                    tabindex="-1"
                    :href="tel1"
                    style="color: #1929c2"
                  >
                    {{ data.phone || "" }}

                  </a>&nbsp;
                </template>

                <span v-if="data.phoneAlt" style="color: #5b5b5f">|&nbsp;</span>

                <a
                  tabindex="-1"
                  :href="tel2"
                  style="color: #1929c2"
                >
                  {{ data.phoneAlt }}
                </a>

                <template v-if="!data.showLogo && data.website?.trim().length">
                  <br>

                  <a
                    tabindex="-1"
                    :href="data.website"
                    target="_blank"
                    style="color: #1929c2;"
                  >
                    {{ site }}
                  </a>
                </template>

                <div>
                  <a
                    v-if="data.showEmail"
                    tabindex="-1"
                    :href="mail"
                    style="color: #1929c2"
                    target="_blank"
                  >
                    {{ data.email }}
                  </a>
                </div>

                <template v-if="data.showSocial">
                  <br>
                  <br>
                  <span
                    v-if="data.socialText?.trim().length"
                    style="
                    color: #5b5b5f;
                    white-space: pre;
                    font-size: 10px;
                    font-weight: bold;
                  "
                  >
                    {{ data.socialText }}
                  </span>

                  <a
                    v-for="(item, index) in data.social"
                    :key="index + item.href"
                    :href="item.href"
                    target="_blank"
                    style="color: #1929c2; margin-right: 10px"
                  >
                    {{ item.label }}
                  </a>
                </template>
              </td>
            </tr>
            <tr v-if="data.disclaimer?.trim().length">
              <td
                colspan="2"
                style="
                  vertical-align: top;
                  padding-left: 10px;
                  padding-top: 10px;
                "
              >
                <div
                  style="
                    color: #5b5b5f;
                    font-size: 10px;
                    line-height: 1.45;
                    max-width: 320px;
                  "
                  v-html="data.disclaimer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Suspense>
      <ClientOnly>
        <RendererActions
          :source="source"
          @save="() => emit('save')"
        />

        <template #fallback>
          <div italic op50>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </ClientOnly>
    </Suspense>
  </div>
</template>

<style>
.signature-source {
  overflow: hidden;
  border: 2px dashed #c7c4f8;
  display: flex;
  position: relative;
}

.signature-source > div {
  min-width: 400px;
}

.signature-source > div * {
  all: revert;
}
</style>
