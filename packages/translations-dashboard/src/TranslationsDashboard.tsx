import type {TranslationsConfig} from '@starter/l10n'

import {Route, Routes} from 'react-router-dom'
import type {SanityClient} from 'sanity'

import ErrorBoundary from './components/ErrorBoundary'
import {DOCUMENT_INTERNATIONALIZATION_TYPES} from './consts/documentInternationalization'
import {AppContextProvider} from './contexts/AppContext'
import {StudioUrlProvider} from './contexts/StudioUrlContext'
import {getLocales} from './helpers/getLocales'
import DashboardRoute from './routes/DashboardRoute'
import TranslationsRoute from './routes/TranslationsRoute'

/**
 * Translations configuration using the shared TranslationsConfig type.
 * This is the single source of truth for what document types are translatable,
 * what the base language is, and what field stores the language.
 */
const TRANSLATIONS_CONFIG: TranslationsConfig = {
  defaultLanguage: 'en-US',
  internationalizedTypes: DOCUMENT_INTERNATIONALIZATION_TYPES,
  languageField: 'language',
}

const APP_CONFIG = {
  defaultLanguage: TRANSLATIONS_CONFIG.defaultLanguage ?? 'en-US',
  schemaTypes: [...TRANSLATIONS_CONFIG.internationalizedTypes],
  supportedLanguages: (client: SanityClient) => getLocales(client),
}

interface TranslationsDashboardProps {
  /** Base URL of the Studio for "Open in Studio" links, without a trailing slash. */
  studioBaseUrl: string
}

/**
 * The translations dashboard, shared by the standalone SDK app and the Studio tool.
 * Must be rendered inside an SDK provider, a router and a Sanity UI theme; the host
 * supplies those because each one wires them up differently.
 */
export function TranslationsDashboard({studioBaseUrl}: TranslationsDashboardProps) {
  return (
    <StudioUrlProvider studioBaseUrl={studioBaseUrl}>
      <AppContextProvider config={APP_CONFIG} translationsConfig={TRANSLATIONS_CONFIG}>
        <ErrorBoundary featureName="Translations Dashboard">
          <Routes>
            <Route element={<DashboardRoute />} path="/" />
            <Route element={<TranslationsRoute />} path="/translations" />
          </Routes>
        </ErrorBoundary>
      </AppContextProvider>
    </StudioUrlProvider>
  )
}
