import {createContext, type ReactNode, useContext} from 'react'

const StudioUrlContext = createContext('')

interface StudioUrlProviderProps {
  children: ReactNode
  /** Base URL of the Studio, without a trailing slash. Empty resolves links against the current origin. */
  studioBaseUrl: string
}

/**
 * Lets the host (standalone app or Studio tool) say where documents open in the Studio,
 * so the dashboard doesn't read host-specific env vars.
 */
export function StudioUrlProvider({children, studioBaseUrl}: StudioUrlProviderProps) {
  return <StudioUrlContext.Provider value={studioBaseUrl}>{children}</StudioUrlContext.Provider>
}

/** Base URL of the Studio that "Open in Studio" links point at. */
export function useStudioBaseUrl() {
  return useContext(StudioUrlContext)
}
