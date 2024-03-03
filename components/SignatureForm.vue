<script lang="ts" setup>
const props = defineProps<{
  modelValue: SignatureFields
}>()

const emit = defineEmits(['update:modelValue'])

function updateProperty(key: keyof SignatureFields, value: string | boolean | SocialItem | SocialItem[] | undefined) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function updateSocial(index: number, key: keyof SocialItem, value: string) {
  const social = props.modelValue.social

  if (social)
    social[index][key] = value

  updateProperty('social', social)
}

function addSocialMedia() {
  const social = props.modelValue.social
  social?.push({ label: '', href: '' })
  updateProperty('social', social)
}

function removeSocialMedia(index: number) {
  const social = props.modelValue.social
  social?.splice(index, 1)
  updateProperty('social', social)
}
</script>

<template>
  <v-form>
    <div grid grid-cols-12 gap-4>
      <div col-span-8>
        <v-text-field
          :model-value="modelValue.logoUrl"
          density="compact"
          label="Logo (URL)"
          autocomplete="new-logo"
          type="text"
          @update:model-value="updateProperty('logoUrl', $event)"
        />
      </div>
      <div col-span-4>
        <v-switch
          color="purple"
          :model-value="modelValue.showLogo"
          density="compact"
          :false-value="false"
          :true-value="true"
          @update:model-value="updateProperty('showLogo', $event as boolean)"
        >
          <template #label>
            <span text-sm>Show?</span>
          </template>
        </v-switch>
      </div>
    </div>
    <div grid grid-cols-2 gap-2>
      <v-text-field
        :model-value="modelValue.name"
        density="compact"
        label="Name"
        autocomplete="new-name"
        type="text"
        @update:model-value="updateProperty('name', $event)"
      />
      <v-text-field
        :model-value="modelValue.title"
        density="compact"
        label="Job Title"
        autocomplete="new-title"
        type="text"
        @update:model-value="updateProperty('title', $event)"
      />
    </div>

    <div grid grid-cols-12 gap-4>
      <div col-span-8>
        <v-text-field
          :model-value="modelValue.email"
          label="Email"
          autocomplete="email"
          type="email"
          density="compact"
          @update:model-value="updateProperty('email', $event)"
        />
      </div>
      <div col-span-4>
        <v-switch
          color="purple"
          :model-value="modelValue.showEmail"
          density="compact"
          :false-value="false"
          :true-value="true"
          @update:model-value="updateProperty('showEmail', $event as boolean)"
        >
          <template #label>
            <span text-sm>Explicit?</span>
          </template>
        </v-switch>
      </div>
    </div>

    <v-textarea
      :model-value="modelValue.address"
      density="compact"
      label="Address"
      rows="2"
      autocomplete="new-address"
      @update:model-value="updateProperty('address', $event)"
    />

    <v-text-field
      :model-value="modelValue.website"
      density="compact"
      label="Website (URL)"
      autocomplete="new-site"
      type="text"
      @update:model-value="updateProperty('website', $event)"
    />

    <div grid grid-cols-2 gap-2>
      <v-text-field
        :model-value="modelValue.phone"
        density="compact"
        label="Phone #1"
        autocomplete="new-phone1"
        type="text"
        @update:model-value="updateProperty('phone', $event)"
      />

      <v-text-field
        :model-value="modelValue.phoneAlt"
        density="compact"
        label="Phone #2"
        autocomplete="new-phone2"
        type="text"
        @update:model-value="updateProperty('phoneAlt', $event)"
      />
    </div>

    <div grid grid-cols-12 gap-4>
      <div col-span-8>
        <v-text-field
          :model-value="modelValue.socialText"
          :disabled="!modelValue.showSocial"
          density="compact"
          label="Social media text"
          autocomplete="new-social-media-text"
          type="text"
          @update:model-value="updateProperty('socialText', $event)"
        />
      </div>

      <div col-span-4>
        <v-switch
          color="purple"
          :model-value="modelValue.showSocial"
          density="compact"
          :false-value="false"
          :true-value="true"
          @update:model-value="updateProperty('showSocial', $event as boolean)"
        >
          <template #label>
            <span text-sm>Show?</span>
          </template>
        </v-switch>
      </div>
    </div>

    <template v-if="modelValue.showSocial">
      <div
        v-for="(_, index) in modelValue.social"
        :key="index"
        class="flex flex-row flex-wrap"
      >
        <div style="flex: 1;" class="lg-flex">
          <v-text-field
            :model-value="modelValue.social?.[index].label"
            class="lg-flex-1"
            label="Label"
            type="text"
            density="compact"
            @update:model-value="updateSocial(index, 'label', $event)"
          />
          <v-text-field
            :model-value="modelValue.social?.[index].href"
            class="lg-ml-2 lg-flex-1"
            density="compact"
            label="Link (URL)"
            type="text"
            @update:model-value="updateSocial(index, 'href', $event)"
          />
        </div>

        <div ml-2 flex flex-col justify-center pb-4 lg-pb-5>
          <v-btn
            v-if="index < (modelValue.social?.length || 0) - 1"
            dark
            icon
            size="x-small"
            color="error"
            @click="removeSocialMedia(index)"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
          <v-btn
            v-else
            dark
            icon
            size="x-small"
            color="primary"
            @click="addSocialMedia"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </div>
    </template>

    <v-textarea
      :model-value="modelValue.disclaimer"
      density="compact"
      label="Disclaimer (HTML)"
      rows="2"
      autocomplete="new-disclaimer"
      @update:model-value="updateProperty('disclaimer', $event)"
    />
  </v-form>
</template>
