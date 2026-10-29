import {getDraftId, getPublishedId, isDraftId} from 'sanity'
import {ref, weakRef} from './helpers.ts'

// ─── Persons ────────────────────────────────────────────────────────────────
// Fictional authors for demo content.

export const personBriefs = [
  {
    _id: 'person-alex-morgan',
    name: 'Alex Morgan',
    prompt: {
      role: 'Director of Product Marketing at a quantum computing company. Writes about bringing quantum optimization applications from pilot to production, and about launching products in global markets.',
    },
  },
  {
    _id: 'person-kenji-sato',
    name: 'Kenji Sato',
    prompt: {
      role: 'Solutions Architect based in Tokyo who helps Japanese manufacturers and logistics companies apply quantum annealing and hybrid solvers to scheduling and routing problems.',
    },
  },
  {
    _id: 'person-priya-raman',
    name: 'Priya Raman',
    prompt: {
      role: 'Developer Advocate focused on the Ocean SDK and the Leap quantum cloud service. Writes tutorials and explainers for Python developers new to quantum computing.',
    },
  },
  {
    _id: 'person-yuki-nakamura',
    name: 'Yuki Nakamura',
    prompt: {
      role: 'Localization Lead responsible for Japanese-language technical and marketing content at a quantum computing company. Background in technical translation and terminology management.',
    },
  },
]

// ─── Editorial topics ───────────────────────────────────────────────────────

export const topicBriefs = [
  {
    _id: 'topic-optimization',
    title: 'Optimization',
    slug: 'optimization',
    description: 'Solving real-world scheduling, routing, and allocation problems.',
  },
  {
    _id: 'topic-quantum-technology',
    title: 'Quantum Technology',
    slug: 'quantum-technology',
    description: 'How quantum annealing and gate-model systems work.',
  },
  {
    _id: 'topic-developers',
    title: 'Developers',
    slug: 'developers',
    description: 'Building quantum applications with Ocean and Leap.',
  },
  {
    _id: 'topic-japan-market',
    title: 'Japan Market',
    slug: 'japan-market',
    description: 'Quantum computing adoption across Japanese industry.',
  },
]

// ─── Tags ───────────────────────────────────────────────────────────────────

export const tagBriefs = [
  {_id: 'tag-quantum-annealing', title: 'Quantum Annealing', slug: 'quantum-annealing'},
  {_id: 'tag-hybrid-solvers', title: 'Hybrid Solvers', slug: 'hybrid-solvers'},
  {_id: 'tag-manufacturing', title: 'Manufacturing', slug: 'manufacturing'},
  {_id: 'tag-logistics', title: 'Logistics', slug: 'logistics'},
  {_id: 'tag-ai', title: 'AI', slug: 'ai'},
  {_id: 'tag-product', title: 'Product', slug: 'product'},
]

// ─── Articles (en-US source) ────────────────────────────────────────────────
// Each article may include a `translations` map specifying which locales to
// generate translations for. Locale codes are validated against the dataset
// at generation time. If a locale doesn't exist, that translation is skipped.
// Set `isDraft: true` to generate as an in-progress draft.

const ACCURACY_GUIDANCE = `Do not invent named customers, partner companies, or specific performance numbers. Use illustrative, clearly hypothetical examples instead. Do not use the phrase "quantum supremacy".`

export const articleBriefs = [
  {
    _id: 'article-advantage2-launch',
    author: ref('person-alex-morgan'),
    topics: [ref('topic-quantum-technology'), ref('topic-optimization')],
    tags: [ref('tag-quantum-annealing'), ref('tag-product')],
    language: 'en-US',
    translations: {
      'ja-JP': {},
    },
    prompt: {
      topic: 'What the Advantage2 system means for production optimization workloads',
      contentGuidance: `Write a product-focused article about D-Wave's Advantage2 annealing quantum computer, available through the Leap quantum cloud service. Explain in accessible terms what improved qubit connectivity (the Zephyr topology) and coherence mean for the size and quality of optimization problems customers can solve. Cover who should care (operations, logistics, and R&D leaders) and how teams can start: try problems in Leap, prototype with the Ocean SDK, then scale with hybrid solvers. ${ACCURACY_GUIDANCE} Eight to ten paragraphs with section headings.`,
    },
  },
  {
    _id: 'article-quantum-annealing-explained',
    author: ref('person-priya-raman'),
    topics: [ref('topic-quantum-technology'), ref('topic-developers')],
    tags: [ref('tag-quantum-annealing'), ref('tag-hybrid-solvers')],
    language: 'en-US',
    translations: {
      'ja-JP': {},
    },
    prompt: {
      topic: 'Quantum annealing explained for business and technical leaders',
      contentGuidance: `Write a clear explainer of quantum annealing: how it differs from gate-model quantum computing, why it is well suited to optimization problems, what qubits and energy landscapes mean at an intuitive level, and how hybrid solvers combine classical and quantum resources so teams can tackle problems with many variables. Use one running example such as scheduling shifts at a factory. ${ACCURACY_GUIDANCE} Six to eight paragraphs with section headings.`,
    },
  },
  {
    _id: 'article-manufacturing-scheduling-japan',
    author: ref('person-kenji-sato'),
    topics: [ref('topic-optimization'), ref('topic-japan-market')],
    tags: [ref('tag-manufacturing'), ref('tag-hybrid-solvers')],
    language: 'en-US',
    translations: {
      'ja-JP': {isDraft: true},
    },
    prompt: {
      topic: 'Quantum optimization for production scheduling in Japanese manufacturing',
      contentGuidance: `Write about how manufacturers in Japan can use quantum annealing and hybrid solvers to improve production line scheduling, changeover planning, and workforce assignment. Ground it in realities of Japanese manufacturing such as kaizen culture, high-mix low-volume production, and labor shortages. Describe a realistic path from proof of concept to production using Leap and the Ocean SDK. ${ACCURACY_GUIDANCE} Six to eight paragraphs.`,
    },
  },
  {
    _id: 'article-logistics-routing',
    author: ref('person-kenji-sato'),
    topics: [ref('topic-optimization')],
    tags: [ref('tag-logistics'), ref('tag-hybrid-solvers')],
    language: 'en-US',
    translations: {
      'ja-JP': {},
    },
    prompt: {
      topic: 'Solving last-mile delivery routing with hybrid quantum solvers',
      contentGuidance: `Write about vehicle routing and last-mile delivery as an optimization problem, why it gets hard as fleets and constraints grow, and how hybrid solvers in Leap can find high-quality routes. Cover how to formulate the problem, what constraints look like (time windows, vehicle capacity, driver hours), and how to measure results against existing classical tools. ${ACCURACY_GUIDANCE} Six to eight paragraphs.`,
    },
  },
  {
    _id: 'article-ocean-sdk-first-app',
    author: ref('person-priya-raman'),
    topics: [ref('topic-developers')],
    tags: [ref('tag-hybrid-solvers'), ref('tag-product')],
    language: 'en-US',
    translations: {
      'ja-JP': {isDraft: true},
    },
    prompt: {
      topic: 'Build your first quantum application with the Ocean SDK',
      contentGuidance: `Write a developer-friendly walkthrough of building a first quantum application in Python with the Ocean SDK and the Leap quantum cloud service: setting up an account and API token, formulating a small constrained quadratic model, submitting it to a hybrid solver, and reading the results. Describe the steps in prose rather than long code listings. ${ACCURACY_GUIDANCE} Six to eight paragraphs with section headings.`,
    },
  },
  {
    _id: 'article-quantum-ai',
    author: ref('person-alex-morgan'),
    topics: [ref('topic-quantum-technology'), ref('topic-optimization')],
    tags: [ref('tag-ai'), ref('tag-quantum-annealing')],
    language: 'en-US',
    prompt: {
      topic: 'Where quantum computing and AI work together',
      contentGuidance: `Write about practical intersections between quantum computing and AI: using quantum optimization for feature selection, hyperparameter tuning, and training data selection, and using AI to help formulate optimization problems. Be measured and practical, separating what teams can do today from longer-term research. ${ACCURACY_GUIDANCE} Six to eight paragraphs.`,
    },
  },
  {
    _id: 'article-localizing-technical-content',
    author: ref('person-yuki-nakamura'),
    topics: [ref('topic-japan-market')],
    tags: [ref('tag-ai'), ref('tag-product')],
    language: 'en-US',
    translations: {
      'ja-JP': {},
    },
    prompt: {
      topic: 'Localizing quantum computing content for Japanese audiences',
      contentGuidance: `Write about the challenges of localizing deeply technical quantum computing content into Japanese: keeping product names like D-Wave, Leap, Advantage2, and Ocean in Latin script, choosing established terms like 量子アニーリング and 量子ビット over katakana transliterations, using desu/masu form for enterprise readers, and avoiding overstated claims. Explain how structured glossaries and style guides let AI translation follow these rules consistently. Six to eight paragraphs.`,
    },
  },
  {
    _id: getDraftId('article-quantum-roadmap'),
    author: ref('person-alex-morgan'),
    topics: [ref('topic-quantum-technology')],
    tags: [ref('tag-product'), ref('tag-quantum-annealing')],
    language: 'en-US',
    prompt: {
      topic: 'Annealing and gate-model: a two-track approach to quantum computing',
      contentGuidance: `Write about why a company might pursue both annealing quantum computing (for optimization applications in production today) and gate-model quantum computing (for longer-term applications such as simulation). Explain the strengths of each in accessible terms and how customers can benefit from annealing now while gate-model systems mature. ${ACCURACY_GUIDANCE} Six to eight paragraphs.`,
    },
  },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

/** ISO string for `n` days before `base`. */
function daysAgo(base: Date, n: number): string {
  return new Date(base.getTime() - n * 86_400_000).toISOString()
}

/** Lookup map for article briefs by published ID. */
const source_briefs_by_id = new Map(articleBriefs.map((b) => [getPublishedId(b._id), b] as const))

// ─── Translation brief builders ─────────────────────────────────────────────
// Called by the generate script after fetching locales from the dataset.

/**
 * Build translated article briefs from source articles and dataset locales.
 * Only generates translations for locales that exist in the dataset.
 */
export function buildTranslationBriefs(locales: {code: string; title: string}[]) {
  const localesByCode = Object.fromEntries(locales.map((l) => [l.code, l]))

  const translatedBriefs: Array<Record<string, unknown>> = []
  const metadataBySource = new Map<
    string,
    {localeCode: string; baseId: string; documentId: string}[]
  >()

  for (const source of articleBriefs) {
    if (!source.translations) continue

    const sourcePublishedId = getPublishedId(source._id)
    const translationsForMeta: {localeCode: string; baseId: string; documentId: string}[] = []

    for (const [localeCode, opts] of Object.entries(source.translations)) {
      const locale = localesByCode[localeCode]
      if (!locale) {
        process.stderr.write(
          `  ⚠ skipping ${localeCode} for ${source._id} (locale not in dataset)\n`,
        )
        continue
      }

      const baseId = `${sourcePublishedId}-${localeCode.toLowerCase()}`
      const isDraft = opts.isDraft ?? false
      const documentId = isDraft ? getDraftId(baseId) : baseId

      translatedBriefs.push({
        _id: documentId,
        author: source.author,
        topics: source.topics,
        tags: source.tags,
        language: localeCode,
        prompt: {
          topic: `[${locale.title} translation] ${source.prompt.topic}`,
          contentGuidance: `Write this article entirely in ${locale.title}. The topic is the same as the English source:\n\n${source.prompt.topic}\n\n${source.prompt.contentGuidance}\n\nWrite naturally in ${locale.title}. Do not produce a word-for-word translation. Adapt idioms, examples, and cultural references for a ${locale.title}-speaking audience. Keep D-Wave product names (D-Wave, Leap, Advantage2, Advantage, Ocean, Zephyr, Pegasus) in Latin script as they are brand names.`,
        },
      })

      translationsForMeta.push({localeCode, baseId, documentId})
    }

    if (translationsForMeta.length > 0) {
      metadataBySource.set(sourcePublishedId, translationsForMeta)
    }
  }

  // Build translation metadata documents with realistic workflow states
  const seedDate = new Date('2026-02-25T10:00:00Z')

  const translationMetadata = []
  for (const [sourceId, translations] of metadataBySource) {
    const workflowStates: Array<Record<string, unknown>> = []

    for (const t of translations) {
      const brief = source_briefs_by_id.get(sourceId)
      const translationOpts = brief?.translations?.[t.localeCode]
      const isDraft = translationOpts?.isDraft ?? false

      // Special case: article-advantage2-launch ja-JP → stale demo
      if (sourceId === 'article-advantage2-launch' && t.localeCode === 'ja-JP') {
        workflowStates.push({
          language: t.localeCode,
          status: 'stale',
          source: 'ai',
          updatedAt: daysAgo(seedDate, 1),
          staleSourceRev: 'seed-stale-rev-001',
        })
      } else if (isDraft) {
        workflowStates.push({
          language: t.localeCode,
          status: 'needsReview',
          source: 'ai',
          updatedAt: daysAgo(seedDate, 1 + Math.random()),
        })
      } else {
        workflowStates.push({
          language: t.localeCode,
          status: 'approved',
          source: 'ai',
          updatedAt: daysAgo(seedDate, 3 + Math.random() * 4),
          reviewedBy: 'person-yuki-nakamura',
        })
      }
    }

    // Build staleAnalysis cache for the stale demo article
    const staleAnalysis =
      sourceId === 'article-advantage2-launch'
        ? {
            sourceRevision: 'seed-stale-rev-001',
            analyzedAt: daysAgo(seedDate, 0.5),
            result: {
              explanation:
                'The introduction paragraph was reworded for clarity and a sentence was added about getting started in Leap. These are cosmetic changes that do not alter the core message.',
              materiality: 'cosmetic' as const,
              suggestions: [
                {
                  fieldName: 'body',
                  explanation:
                    'Introduction reworded for flow; no factual changes. A sentence about getting started in Leap was added.',
                  recommendation: 'dismiss' as const,
                  changeSummary: 'Introduction reworded, Leap sentence added',
                  reasonCode: 'tone_only' as const,
                  impactTags: ['Wording improved'],
                },
                {
                  fieldName: 'excerpt',
                  explanation: 'Minor punctuation change — an em-dash was replaced with a comma.',
                  recommendation: 'dismiss' as const,
                  changeSummary: 'Punctuation fix in excerpt',
                  reasonCode: 'formatting_only' as const,
                  impactTags: ['Formatting only'],
                },
              ],
            },
            // preTranslations are populated at runtime by analyze-stale-translations.
            // Omitted from seed data because suggestedValue is polymorphic (string | PT blocks)
            // and not representable in the Sanity schema.
            preTranslations: [],
          }
        : undefined

    translationMetadata.push({
      _id: `translation.metadata.${sourceId}`,
      _type: 'translation.metadata',
      translations: [
        {language: 'en-US', value: ref(sourceId)},
        ...translations.map((t) => ({
          language: t.localeCode,
          value: isDraftId(t.documentId) ? weakRef(t.baseId, 'article') : ref(t.baseId),
        })),
      ],
      schemaTypes: ['article'],
      workflowStates,
      ...(staleAnalysis && {staleAnalysis}),
    })
  }

  return {translatedBriefs, translationMetadata}
}

// ─── Field-level translation metadata ────────────────────────────────────────
// Creates `fieldTranslation.metadata` documents for person bios.
// These track workflow state for internationalizedArray field translations.

/**
 * Specify which persons should have translated bios, and their workflow states.
 * Matches the field translation workflow: needsReview (AI just translated),
 * approved (human reviewed), stale (source changed).
 */
const personFieldTranslations: Record<
  string,
  Record<string, {status: 'needsReview' | 'approved' | 'stale'}>
> = {
  'person-alex-morgan': {
    'ja-JP': {status: 'approved'},
  },
  'person-kenji-sato': {
    'ja-JP': {status: 'approved'},
  },
  'person-priya-raman': {
    'ja-JP': {status: 'needsReview'},
  },
  'person-yuki-nakamura': {
    'ja-JP': {status: 'stale'},
  },
}

/**
 * Build field-level translation briefs for person bios.
 * Returns generation briefs (for AI bio generation) and metadata documents.
 */
export function buildFieldTranslationBriefs(locales: {code: string; title: string}[]) {
  const localesByCode = Object.fromEntries(locales.map((l) => [l.code, l]))
  const seedDate = new Date('2026-02-25T10:00:00Z')

  const bioGenerationBriefs: Array<{
    personId: string
    personName: string
    role: string
    locale: {code: string; title: string}
  }> = []

  const fieldTranslationMetadata: Array<Record<string, unknown>> = []

  for (const person of personBriefs) {
    const translations = personFieldTranslations[person._id]
    if (!translations) continue

    const workflowStates: Array<Record<string, unknown>> = []

    for (const [localeCode, opts] of Object.entries(translations)) {
      const locale = localesByCode[localeCode]
      if (!locale) continue

      bioGenerationBriefs.push({
        personId: person._id,
        personName: person.name,
        role: person.prompt.role,
        locale,
      })

      workflowStates.push({
        _key: `bio--${localeCode}`,
        field: 'bio',
        language: localeCode,
        status: opts.status,
        source: 'ai',
        updatedAt:
          opts.status === 'stale'
            ? daysAgo(seedDate, 8)
            : opts.status === 'approved'
              ? daysAgo(seedDate, 3 + Math.random() * 4)
              : daysAgo(seedDate, 1 + Math.random()),
        ...(opts.status === 'approved' && {reviewedBy: 'person-yuki-nakamura'}),
        // sourceSnapshot will be set during generation when we know the actual en-US bio value
      })
    }

    if (workflowStates.length > 0) {
      fieldTranslationMetadata.push({
        _id: `fieldTranslation.metadata.${person._id}`,
        _type: 'fieldTranslation.metadata',
        documentRef: ref(person._id),
        documentType: 'person',
        workflowStates,
      })
    }
  }

  return {bioGenerationBriefs, fieldTranslationMetadata}
}
