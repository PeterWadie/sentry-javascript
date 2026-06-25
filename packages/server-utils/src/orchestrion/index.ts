import { anthropicChannelIntegration } from '../integrations/tracing-channel/anthropic';
import { hapiChannelIntegration } from '../integrations/tracing-channel/hapi';
import { ioredisChannelIntegration } from '../integrations/tracing-channel/ioredis';
import { lruMemoizerChannelIntegration } from '../integrations/tracing-channel/lru-memoizer';
import { mysqlChannelIntegration } from '../integrations/tracing-channel/mysql';
import { openaiChannelIntegration } from '../integrations/tracing-channel/openai';
import { nestjsChannelIntegration } from '../integrations/tracing-channel/nestjs';
import { postgresChannelIntegration } from '../integrations/tracing-channel/postgres';
import { vercelAiChannelIntegration } from '../integrations/tracing-channel/vercel-ai';

export { detectOrchestrionSetup, isOrchestrionInjected } from './detect';
export {
  anthropicChannelIntegration,
  hapiChannelIntegration,
  ioredisChannelIntegration,
  lruMemoizerChannelIntegration,
  mysqlChannelIntegration,
  openaiChannelIntegration,
  postgresChannelIntegration,
  vercelAiChannelIntegration,
  nestjsChannelIntegration,
};
export type { IORedisChannelIntegrationOptions, IORedisResponseHook } from '../integrations/tracing-channel/ioredis';

/**
 * The canonical set of orchestrion diagnostics-channel integrations, keyed by their public
 * (OTel-parity) factory name.
 *
 * Single source of truth: add a new channel integration here and every consumer — the `@sentry/node`
 * opt-in helper (`experimentalUseDiagnosticsChannelInjection`) and its public
 * `diagnosticsChannelInjectionIntegrations()` map — picks it up automatically, so there's no separate
 * list to keep in sync.
 *
 * NOTE: `ioredisChannelIntegration` is intentionally NOT here. It only partially replaces the
 * composite OTel `Redis` integration and needs the node SDK's redis cache `responseHook` (which
 * can't live in `server-utils`), so `@sentry/node` wires it up separately.
 *
 * `Nest` is included even though it isn't a `@sentry/node` default integration: the swap runs in the Node
 * SDK's `_init` over the *final* `defaultIntegrations`, so it also replaces the OTel `Nest` that
 * `@sentry/nestjs` prepends to its own defaults.
 */
export const channelIntegrations = {
  postgresIntegration: postgresChannelIntegration,
  mysqlIntegration: mysqlChannelIntegration,
  lruMemoizerIntegration: lruMemoizerChannelIntegration,
  openaiIntegration: openaiChannelIntegration,
  anthropicIntegration: anthropicChannelIntegration,
  vercelAiIntegration: vercelAiChannelIntegration,
  hapiIntegration: hapiChannelIntegration,
  nestIntegration: nestjsChannelIntegration,
} as const;
