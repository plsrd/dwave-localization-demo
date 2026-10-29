import {createClient} from '@sanity/client'
import {defineConfig} from 'sanity'
import {defineLocations, presentationTool} from 'sanity/presentation'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {assist} from '@sanity/assist'
import {visionTool} from '@sanity/vision'
import {EarthGlobeIcon} from '@sanity/icons'
import {
  createL10n,
  createFieldTranslationPublishGate,
  useTranslateFieldAction,
  withLocaleFilter,
} from '@starter/l10n'
import {translationsDashboardTool} from './lib/translationsDashboardTool'
import {schemaTypes} from './schemaTypes'

const l10nTypes = [
  'l10n.locale',
  'l10n.glossary',
  'l10n.styleGuide',
  'translation.metadata',
  'fieldTranslation.metadata',
]

// Metadata documents have no `title` field, so the title sort used for the other lists would error.
const metadataTypesWithoutTitle = ['translation.metadata', 'fieldTranslation.metadata']

const projectId = import.meta.env?.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = import.meta.env?.SANITY_STUDIO_DATASET ?? process.env.SANITY_STUDIO_DATASET!

const previewOrigin =
  import.meta.env?.SANITY_STUDIO_PREVIEW_URL ??
  process.env.SANITY_STUDIO_PREVIEW_URL ??
  'http://localhost:3000'

const l10n = createL10n({localizedSchemaTypes: ['article'], defaultLanguage: 'en-US'})

const titleAsc = [{field: 'title', direction: 'asc'} as const]
const nameAsc = [{field: 'name', direction: 'asc'} as const]

const structure = ((S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('article').child(() =>
        withLocaleFilter(S.documentTypeList('article').defaultOrdering(titleAsc)),
      ),
      S.divider(),
      S.documentTypeListItem('person').child(S.documentTypeList('person').defaultOrdering(nameAsc)),
      S.documentTypeListItem('editorialTopic').child(
        S.documentTypeList('editorialTopic').defaultOrdering(titleAsc),
      ),
      S.documentTypeListItem('tag').child(S.documentTypeList('tag').defaultOrdering(titleAsc)),
      S.divider(),
      S.listItem()
        .title('Localization')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Localization')
            .items(
              l10nTypes.map((type) =>
                S.documentTypeListItem(type).child(
                  metadataTypesWithoutTitle.includes(type)
                    ? S.documentTypeList(type)
                    : S.documentTypeList(type).defaultOrdering(titleAsc),
                ),
              ),
            ),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !['article', 'person', 'editorialTopic', 'tag', ...l10nTypes].includes(
            item.getId() ?? '',
          ),
      ),
    ])) satisfies StructureResolver

export default defineConfig({
  name: 'default',
  title: 'D-Wave: Agentic Localization',

  projectId,
  dataset,

  unstable_clientFactory: (options) =>
    createClient({...options, requestTagPrefix: `${options.requestTagPrefix}.l10n`}),

  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (option) =>
          option.templateId !== 'translation.metadata' &&
          option.templateId !== 'fieldTranslation.metadata',
      ),
    actions: (prev, context) => {
      // Gate the SchedulePublishAction for non-localized types that have
      // field-level translations (e.g. person). The core injects this action
      // after plugins run, so it must be wrapped here at the config root.
      if (['article'].includes(context.schemaType)) return prev
      return prev.map((action) =>
        action.displayName === 'SchedulePublishAction'
          ? createFieldTranslationPublishGate(action)
          : action,
      )
    },
  },

  tools: (prev) => [...prev, translationsDashboardTool()],

  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: {enable: '/api/draft-mode/enable', disable: '/api/draft-mode/disable'},
      },
      resolve: {
        locations: {
          article: defineLocations({
            select: {title: 'title', slug: 'slug.current', language: 'language'},
            resolve: (doc) => ({
              locations: doc?.slug
                ? [{title: doc.title || 'Untitled', href: `/${doc.language ?? 'en-US'}/${doc.slug}`}]
                : [],
            }),
          }),
        },
      },
    }),
    visionTool(),
    l10n.plugin,
    assist({
      fieldActions: {
        title: 'Translate',
        useFieldActions: useTranslateFieldAction,
      },
    }),
  ],

  schema: {
    types: l10n.injectLanguageField(schemaTypes),
  },
})
