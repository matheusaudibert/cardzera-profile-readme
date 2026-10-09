export const API = 'https://cardzera.audibert.dev/api'

export const BOT_INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=1368283106276147200&permissions=525312&integration_type=0&scope=bot'

export const REPO_URL = 'https://github.com/matheusaudibert/cardzera-profile-readme'

export const BUTTON_TEXT_MAX = 28

export const COLOR_FIELDS = [
  'backgroundColor',
  'nameColor',
  'infoColor',
  'buttonColor',
  'buttonTextColor',
] as const

export type ColorField = (typeof COLOR_FIELDS)[number]

export type CardConfig = Record<ColorField, string> & {
  buttonText: string
  buttonBorderRadius: number
  borderRadius: number
  titleLen: number
  elipsis: boolean
}

export const DEFAULTS: CardConfig = {
  backgroundColor: '1a1c1f',
  buttonColor: '00863a',
  buttonText: 'Join',
  buttonTextColor: 'ffffff',
  buttonBorderRadius: 10,
  infoColor: 'b5bac1',
  nameColor: 'ffffff',
  borderRadius: 10,
  titleLen: 25,
  elipsis: true,
}

export const isHex = (v: string) => /^[0-9a-fA-F]{6}$/.test(v)

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function normalizeInvite(raw: string) {
  return raw
    .trim()
    .replace(/^https?:\/\/(www\.)?discord\.gg\//i, '')
    .replace(/^discord\.gg\//i, '')
}

export function buildUrl(serverId: string, params: Record<string, string | number | boolean>) {
  const qs = new URLSearchParams({ t: String(Date.now()) })
  for (const [k, v] of Object.entries(params)) qs.set(k, String(v))
  return `${API}/${serverId}?${qs.toString()}`
}

/** Only parameters that differ from the API defaults end up in the URL. */
export function getNonDefaults(config: CardConfig) {
  const out: Record<string, string | number | boolean> = {}
  for (const f of COLOR_FIELDS) {
    const v = config[f].trim().toLowerCase()
    if (isHex(v) && v !== DEFAULTS[f].toLowerCase()) out[f] = v
  }
  const bt = config.buttonText
  if (bt !== DEFAULTS.buttonText && bt.length > 0 && bt.length <= BUTTON_TEXT_MAX) out.buttonText = bt

  if (config.buttonBorderRadius !== DEFAULTS.buttonBorderRadius)
    out.buttonBorderRadius = clamp(config.buttonBorderRadius, 0, 30)
  if (config.borderRadius !== DEFAULTS.borderRadius) out.borderRadius = clamp(config.borderRadius, 0, 30)
  if (config.titleLen !== DEFAULTS.titleLen) out.titleLen = config.titleLen
  if (config.elipsis !== DEFAULTS.elipsis) out.elipsis = config.elipsis
  return out
}
