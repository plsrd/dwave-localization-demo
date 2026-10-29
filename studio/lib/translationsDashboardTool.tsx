import '@starter/translations-dashboard-ui/tool.css'

import {EarthGlobeIcon} from '@sanity/icons'
import {SDKStudioContext, SanityApp, type StudioWorkspaceHandle} from '@sanity/sdk-react'
import {DashboardSkeleton, TranslationsDashboard} from '@starter/translations-dashboard-ui'
import {useMemo} from 'react'
import {MemoryRouter} from 'react-router-dom'
import {type Tool, useWorkspace} from 'sanity'

/**
 * Hosts the translations dashboard (the same UI as the standalone SDK app) inside the Studio.
 * Reuses the Studio's own login via SDKStudioContext, so there is no second sign-in.
 */
function TranslationsDashboardTool() {
  const {auth, basePath, dataset, projectId} = useWorkspace()

  const workspaceHandle = useMemo<StudioWorkspaceHandle>(
    () => ({authenticated: true, auth: {token: auth.token}, dataset, projectId}),
    [auth.token, dataset, projectId],
  )
  const studioBaseUrl = `${window.location.origin}${basePath === '/' ? '' : basePath}`

  return (
    <SDKStudioContext.Provider value={workspaceHandle}>
      <div className="l10n-dashboard h-full overflow-auto pt-4 pb-8">
        <div className="mx-auto w-[900px] max-w-full py-8">
          <SanityApp fallback={<DashboardSkeleton />}>
            <MemoryRouter>
              <TranslationsDashboard studioBaseUrl={studioBaseUrl} />
            </MemoryRouter>
          </SanityApp>
        </div>
      </div>
    </SDKStudioContext.Provider>
  )
}

/** Studio tool that opens the translations dashboard alongside the Structure and Vision tools. */
export const translationsDashboardTool = (): Tool => ({
  name: 'translations',
  title: 'Translations',
  icon: EarthGlobeIcon,
  component: TranslationsDashboardTool,
})
