/**
 * Static translation metadata — glossary and style guides.
 *
 * These are sample documents using D-Wave product terminology.
 * Replace with your own terminology and style guides for production use.
 */

import {markdownToPortableText} from '@portabletext/markdown'
import {ref} from './helpers.ts'

function localeRef(code: string) {
  return ref(`locale-${code}`)
}

function translation(locale: string, text: string, gender?: string) {
  return {
    _type: 'l10n.glossary.entry.translation',
    locale: localeRef(locale),
    translation: text,
    ...(gender && {gender}),
  }
}

// ─── Glossary entries ───────────────────────────────────────────────────────

function doNotTranslate(term: string, partOfSpeech: string, definition: string, context: string) {
  return {
    _type: 'l10n.glossary.entry',
    term,
    status: 'approved',
    doNotTranslate: true,
    partOfSpeech,
    definition,
    context,
  }
}

function approved(term: string, definition: string, context: string, japanese: string) {
  return {
    _type: 'l10n.glossary.entry',
    term,
    status: 'approved',
    partOfSpeech: 'noun',
    definition,
    context,
    translations: [translation('ja-JP', japanese)],
  }
}

function forbidden(term: string, partOfSpeech: string, definition: string) {
  return {_type: 'l10n.glossary.entry', term, status: 'forbidden', partOfSpeech, definition}
}

const dntEntries = [
  doNotTranslate(
    'D-Wave',
    'noun',
    'Company name. Always written "D-Wave" in Latin script, never transliterated.',
    'D-Wave builds quantum computing systems, software, and services.',
  ),
  doNotTranslate(
    'Leap',
    'noun',
    "D-Wave's real-time quantum cloud service",
    'Developers access quantum and hybrid solvers through the Leap quantum cloud service.',
  ),
  doNotTranslate(
    'Advantage2',
    'noun',
    "D-Wave's latest-generation annealing quantum computer",
    'The Advantage2 system improves connectivity and coherence over earlier generations.',
  ),
  doNotTranslate(
    'Advantage',
    'noun',
    "D-Wave's previous-generation annealing quantum computer",
    'Many production applications were first built on the Advantage system.',
  ),
  doNotTranslate(
    'Ocean',
    'noun',
    "D-Wave's open-source Python SDK for building quantum applications (Ocean SDK)",
    'Install the Ocean SDK to formulate and submit problems from Python.',
  ),
  doNotTranslate(
    'Zephyr',
    'noun',
    'Qubit connectivity topology used by Advantage2',
    'The Zephyr topology gives each qubit more couplers than Pegasus.',
  ),
  doNotTranslate(
    'Pegasus',
    'noun',
    'Qubit connectivity topology used by Advantage',
    'Problems embedded on Pegasus can be ported to Zephyr.',
  ),
]

const approvedEntries = [
  approved(
    'quantum annealing',
    'A quantum computing approach that finds low-energy solutions to optimization problems',
    'Quantum annealing is well suited to scheduling and routing problems.',
    '量子アニーリング',
  ),
  approved(
    'qubit',
    'The basic unit of quantum information',
    'Advantage2 has thousands of qubits.',
    '量子ビット',
  ),
  approved(
    'hybrid solver',
    'A solver that combines classical and quantum resources to handle large problems',
    'Hybrid solvers in Leap accept problems with up to millions of variables.',
    'ハイブリッドソルバー',
  ),
  approved(
    'optimization',
    'Finding the best solution among many possible options under constraints',
    'Optimization is the most common commercial use case for quantum annealing.',
    '最適化',
  ),
  approved(
    'quantum computing',
    'Computation that uses quantum-mechanical phenomena such as superposition and entanglement',
    'Quantum computing is moving from research into production applications.',
    '量子コンピューティング',
  ),
  approved(
    'gate-model',
    'Quantum computing approach based on sequences of quantum logic gates',
    'D-Wave is also developing gate-model quantum computing.',
    'ゲート型',
  ),
]

const forbiddenEntries = [
  forbidden(
    'quantum supremacy',
    'noun',
    'Use "beyond-classical computation" or "quantum advantage" instead.',
  ),
  forbidden(
    'magic',
    'noun',
    'Do not describe quantum computing as magic. Explain what the technology actually does.',
  ),
  forbidden('click here', 'phrase', 'Use descriptive link text instead.'),
  forbidden('webpage', 'noun', 'Use "page" instead.'),
]

// ─── Documents ──────────────────────────────────────────────────────────────

export const glossaryDocument = {
  _id: 'glossary-dwave-product-terminology',
  _type: 'l10n.glossary',
  title: 'D-Wave Product Terminology',
  sourceLocale: localeRef('en-US'),
  entries: [...dntEntries, ...approvedEntries, ...forbiddenEntries],
}

const STYLE_GUIDES = [
  {
    code: 'ja-JP',
    title: 'Japanese (Japan) Style Guide',
    formality: 'formal',
    tone: ['professional', 'respectful', 'clear', 'confident'],
    additionalInstructions:
      'Target audience: Enterprise technology leaders, operations and R&D teams, and developers in Japan evaluating quantum computing for optimization problems in manufacturing, logistics, telecommunications, and finance.\n\n' +
      'Use desu/masu (です/ます) form throughout. Keep D-Wave product names (D-Wave, Leap, Advantage2, Ocean) in Latin script. Use established Japanese terms for technical concepts (量子アニーリング, 量子ビット, 最適化). Use full-width punctuation (。、) consistently.\n\n' +
      'Be precise about capabilities. Do not overstate what quantum computing can do today.\n\n' +
      'Do:\n' +
      '- "Leapで量子アニーリングを利用できます" (product name in Latin script, desu/masu form)\n' +
      '- "Advantage2システムは最適化問題を解きます"\n' +
      '- "量子ビット" for qubit, "ハイブリッドソルバー" for hybrid solver\n\n' +
      'Do not:\n' +
      '- "ディーウェーブ" (do not transliterate "D-Wave" to katakana)\n' +
      '- "リープ" (do not transliterate "Leap")\n' +
      '- "キュービット" as the primary term for qubit (use 量子ビット)',
  },
]

export const styleGuideDocuments = STYLE_GUIDES.map((sg) => ({
  _id: `style-guide-${sg.code}`,
  _type: 'l10n.styleGuide',
  title: sg.title,
  locale: localeRef(sg.code),
  formality: sg.formality,
  tone: sg.tone,
  additionalInstructions: markdownToPortableText(sg.additionalInstructions),
}))
