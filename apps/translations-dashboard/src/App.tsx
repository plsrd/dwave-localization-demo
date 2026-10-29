import './App.css'

import {createClient} from '@sanity/client'
import {type SanityConfig} from '@sanity/sdk'
import {SanityApp} from '@sanity/sdk-react'
import {DashboardSkeleton, TranslationsDashboard} from '@starter/translations-dashboard-ui'
import {BrowserRouter} from 'react-router-dom'

import SanityUI from './SanityUI'

const SANITY_CONFIG: SanityConfig = {
  dataset: import.meta.env.SANITY_APP_DATASET || 'production',
  projectId: import.meta.env.SANITY_APP_PROJECT_ID,
  auth: {
    clientFactory: (config) =>
      createClient({...config, requestTagPrefix: `${config.requestTagPrefix}.agentic-l10n`}),
  },
}

/**
 * Where "Open in Studio" links point: SANITY_APP_STUDIO_URL in production
 * (your deployed studio hostname), localhost:3333 in development.
 */
const STUDIO_BASE_URL = (
  import.meta.env.SANITY_APP_STUDIO_URL || (import.meta.env.DEV ? 'http://localhost:3333' : '')
).replace(/\/$/, '')

function App() {
  return (
    <div className="app-container min-h-dvh h-full flex justify-center pt-18">
      <title>Translations Dashboard</title>
      <div className="w-[900px]">
        <SanityUI>
          <SanityApp config={SANITY_CONFIG} fallback={<DashboardSkeleton />}>
            <BrowserRouter>
              <TranslationsDashboard studioBaseUrl={STUDIO_BASE_URL} />
            </BrowserRouter>
          </SanityApp>
        </SanityUI>
      </div>
    </div>
  )
}

export default App
