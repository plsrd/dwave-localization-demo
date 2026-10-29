import {defineLive} from 'next-sanity/live'
import {client} from './client'

const token = process.env.SANITY_API_READ_TOKEN

/**
 * Live-aware fetch plus the <SanityLive /> subscriber. In draft mode (enabled by the Studio's
 * Presentation tool) queries run against the `drafts` perspective with stega encoding so the
 * overlays can map rendered text back to fields. Outside draft mode they return published content.
 */
export const {sanityFetch, SanityLive} = defineLive({
  client: client.withConfig({
    useCdn: false,
    stega: {studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'http://localhost:3333'},
  }),
  serverToken: token,
})
