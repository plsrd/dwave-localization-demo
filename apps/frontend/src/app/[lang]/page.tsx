import {sanityFetch} from '@/sanity/fetch'
import {ARTICLES_BY_LANGUAGE_QUERY} from '@/sanity/queries'
import type {ArticleCard as ArticleCardType} from '@/sanity/types'
import {ArticleCard} from '@/components/ArticleCard'

export default async function HomePage({params}: {params: Promise<{lang: string}>}) {
  const {lang} = await params

  const {data} = await sanityFetch({
    query: ARTICLES_BY_LANGUAGE_QUERY,
    params: {language: lang},
  })
  const articles = data as ArticleCardType[]

  return (
    <main>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">D-Wave Insights</h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Quantum computing articles in English and Japanese, translated with D-Wave&apos;s glossary
          and style guide. Switch languages above to compare.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-5">Articles</h2>

      {articles.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No articles available in this language.</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} lang={lang} />
          ))}
        </div>
      )}
    </main>
  )
}
