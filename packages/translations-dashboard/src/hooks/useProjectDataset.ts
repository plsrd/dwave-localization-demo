import {useSanityInstance} from '@sanity/sdk-react'

/**
 * Project and dataset of the active SDK instance, so components don't depend on
 * host-specific env vars (the app and the Studio tool inject config differently).
 */
export function useProjectDataset() {
  const {config} = useSanityInstance()
  return {dataset: config.dataset ?? '', projectId: config.projectId ?? ''}
}
