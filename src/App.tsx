import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Eye, Hash, Link2, SlidersHorizontal, SquareCode } from 'lucide-react'
import { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle } from '@/components/motion/alert'
import { ButtonLink } from '@/components/motion/button/base'
import { CodeBlock } from '@/components/agents/code-block'
import { Input } from '@/components/motion/input'
import { Loader } from '@/components/motion/loader'
import { Switch } from '@/components/motion/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/motion/tabs'
import { LegalLinks, SiteHeader } from '@/components/site-header'
import { TextShimmer } from '@/components/motion/text-shimmer'
import { ColorField, FieldLabel, RangeField, Section } from '@/components/fields'
import {
  BOT_INVITE_URL,
  BUTTON_TEXT_MAX,
  type CardConfig,
  type ColorField as ColorKey,
  DEFAULTS,
  DEFAULT_SERVER_ID,
  REPO_URL,
  buildUrl,
  getNonDefaults,
  normalizeInvite,
} from '@/lib/cardzera'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type NumberKey = 'buttonBorderRadius' | 'borderRadius' | 'titleLen'
type PreviewState = 'idle' | 'loading' | 'loaded' | 'error'

type FormState = {
  serverId: string
  invite: string
  colors: Record<ColorKey, string>
  buttonText: string
  numbers: Record<NumberKey, string>
  elipsis: boolean
}

const FORM_STORAGE_KEY = 'cardzera-form'

const DEFAULT_FORM: FormState = {
  serverId: DEFAULT_SERVER_ID,
  invite: '',
  colors: {
    backgroundColor: DEFAULTS.backgroundColor.toUpperCase(),
    nameColor: DEFAULTS.nameColor.toUpperCase(),
    infoColor: DEFAULTS.infoColor.toUpperCase(),
    buttonColor: DEFAULTS.buttonColor.toUpperCase(),
    buttonTextColor: DEFAULTS.buttonTextColor.toUpperCase(),
  },
  buttonText: DEFAULTS.buttonText,
  numbers: {
    buttonBorderRadius: String(DEFAULTS.buttonBorderRadius),
    borderRadius: String(DEFAULTS.borderRadius),
    titleLen: String(DEFAULTS.titleLen),
  },
  elipsis: DEFAULTS.elipsis,
}

/** Saved form merged over the defaults; anything missing or malformed falls back. */
function loadForm(): FormState {
  try {
    const raw = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY) ?? 'null')
    if (!raw || typeof raw !== 'object') return DEFAULT_FORM
    const str = (v: unknown, fallback: string) => (typeof v === 'string' ? v : fallback)
    const pick = <K extends string>(src: unknown, defaults: Record<K, string>) =>
      Object.fromEntries(
        Object.entries(defaults).map(([k, v]) => [k, str((src as Record<string, unknown>)?.[k], v as string)]),
      ) as Record<K, string>
    return {
      serverId: str(raw.serverId, DEFAULT_FORM.serverId),
      invite: str(raw.invite, DEFAULT_FORM.invite),
      colors: pick(raw.colors, DEFAULT_FORM.colors),
      buttonText: str(raw.buttonText, DEFAULT_FORM.buttonText).slice(0, BUTTON_TEXT_MAX),
      numbers: pick(raw.numbers, DEFAULT_FORM.numbers),
      elipsis: typeof raw.elipsis === 'boolean' ? raw.elipsis : DEFAULT_FORM.elipsis,
    }
  } catch {
    return DEFAULT_FORM
  }
}

function saveForm(form: FormState) {
  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form))
  } catch {
    // Storage blocked or full: the form simply won't survive a reload.
  }
}

function Panel({
  icon,
  title,
  className,
  children,
}: {
  icon: React.ReactNode
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex min-h-0 flex-col overflow-hidden rounded-3xl border bg-card/60', className)}>
      <div className="flex items-center gap-2 border-b px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground [&_svg]:size-3.5">
        {icon}
        {title}
      </div>
      {children}
    </div>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const { locale, setLocale, t } = useLocale()
  const [saved] = useState(loadForm)
  const [serverId, setServerId] = useState(saved.serverId)
  const [invite, setInvite] = useState(saved.invite)
  const [colors, setColors] = useState(saved.colors)
  const [buttonText, setButtonText] = useState(saved.buttonText)
  const [numbers, setNumbers] = useState(saved.numbers)
  const [elipsis, setElipsis] = useState(saved.elipsis)

  // Persist every edit so a reload brings the same card back.
  useEffect(() => {
    saveForm({ serverId, invite, colors, buttonText, numbers, elipsis })
  }, [serverId, invite, colors, buttonText, numbers, elipsis])

  const setColor = (key: ColorKey) => (hex: string) => setColors((c) => ({ ...c, [key]: hex }))
  const setNumber = (key: NumberKey) => (text: string) => setNumbers((n) => ({ ...n, [key]: text }))

  const params = useMemo(() => {
    const num = (key: NumberKey) => {
      const v = parseInt(numbers[key])
      return isNaN(v) ? DEFAULTS[key] : v
    }
    const config: CardConfig = {
      ...colors,
      buttonText,
      buttonBorderRadius: num('buttonBorderRadius'),
      borderRadius: num('borderRadius'),
      titleLen: num('titleLen'),
      elipsis,
    }
    return getNonDefaults(config)
  }, [colors, buttonText, numbers, elipsis])

  const id = serverId.trim()
  const paramsKey = JSON.stringify(params)

  const outputs = useMemo(() => {
    if (!id) return { markdown: t.emptyOutput, html: t.emptyOutput, url: t.emptyOutput }
    const imageUrl = buildUrl(id, JSON.parse(paramsKey))
    const code = normalizeInvite(invite)
    const inviteUrl = code ? `https://discord.gg/${code}` : 'https://discord.gg/YOUR_INVITE'
    return {
      markdown: `[![Discord Server Card](${imageUrl})](${inviteUrl})`,
      html: `<a href="${inviteUrl}">\n  <img src="${imageUrl}" alt="Discord Server Card" />\n</a>`,
      url: imageUrl,
    }
  }, [id, paramsKey, invite, t])

  // Debounced preview: preload off-screen so the old card never flashes broken.
  const [preview, setPreview] = useState<{ state: PreviewState; src?: string }>({ state: 'idle' })
  useEffect(() => {
    if (!id) {
      setPreview({ state: 'idle' })
      return
    }
    setPreview({ state: 'loading' })
    let cancelled = false
    const timer = window.setTimeout(() => {
      const url = buildUrl(id, JSON.parse(paramsKey))
      const img = new Image()
      img.onload = () => !cancelled && setPreview({ state: 'loaded', src: url })
      img.onerror = () => !cancelled && setPreview({ state: 'error' })
      img.src = url
    }, 450)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [id, paramsKey])

  const btLen = buttonText.length
  const fade = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 6, filter: 'blur(4px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -6, filter: 'blur(4px)' },
      }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1040px] flex-col gap-4 px-4 py-6 lg:h-dvh lg:py-8">
      {/* Header */}
      <SiteHeader locale={locale} setLocale={setLocale} t={t}>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex shrink-0 items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t.moreInfo}
          <ArrowUpRight className="size-3.5" />
        </a>
      </SiteHeader>

      <main className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Preview + output */}
        <div className="flex min-h-0 flex-col gap-4">
          <Panel icon={<Eye />} title={t.preview} className="min-h-[240px] flex-1">
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center p-6"
              style={{
                backgroundImage:
                  'radial-gradient(color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {preview.state === 'loaded' && preview.src ? (
                  <motion.img
                    key={preview.src}
                    {...fade}
                    transition={{ duration: 0.25 }}
                    src={preview.src}
                    alt="Discord Server Card"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : preview.state === 'loading' ? (
                  <motion.div key="loading" {...fade} className="flex flex-col items-center gap-3 text-primary">
                    <Loader variant="dot-matrix" size={28} label={t.loadingCard} />
                    <TextShimmer className="text-sm">{t.rendering}</TextShimmer>
                  </motion.div>
                ) : (
                  <motion.div key={preview.state} {...fade} className="text-center text-sm text-muted-foreground">
                    {preview.state === 'error' ? (
                      <>
                        <p className="font-medium text-destructive">{t.loadError}</p>
                        <p className="text-xs">{t.loadErrorHint}</p>
                      </>
                    ) : (
                      <p>
                        {t.previewHintBefore}{' '}
                        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">{t.serverId}</code>{' '}
                        {t.previewHintAfter}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Panel>

          <Panel icon={<SquareCode />} title={t.output} className="shrink-0">
            <Tabs defaultValue="markdown" variant="segment" className="p-4">
              <TabsList className="bg-muted">
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
              </TabsList>
              {(
                [
                  ['markdown', 'README.md'],
                  ['html', 'index.html'],
                  ['url', t.imageUrl],
                ] as const
              ).map(([key, filename]) => (
                // Fixed height: every tab occupies the same space, so switching
                // never resizes the panel (which made the active pill jump).
                <TabsContent key={key} value={key} className="mt-3 h-[152px]">
                  <CodeBlock
                    code={outputs[key]}
                    language="text"
                    filename={filename}
                    showLineNumbers={false}
                    showStatus={false}
                    showLanguage={false}
                    wrap
                    maxHeight={112}
                    className="h-full bg-muted [&_code_span]:break-all [&_pre]:min-w-0"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </Panel>
        </div>

        {/* Configuration */}
        <Panel icon={<SlidersHorizontal />} title={t.configuration} className="lg:min-h-0">
          <div className="flex flex-col gap-7 overflow-y-auto p-5 [scrollbar-width:thin]">
            <Section title={t.serverInfo}>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required>{t.serverId}</FieldLabel>
                <Input
                  aria-label={t.serverId}
                  value={serverId}
                  onChange={setServerId}
                  placeholder={t.serverIdPlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  leftIcon={<Hash />}
                  error={preview.state === 'error'}
                  classNames={{ field: 'bg-card h-10', input: 'font-mono text-sm' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <FieldLabel required hint={t.inviteHint}>
                  {t.inviteCode}
                </FieldLabel>
                <Input
                  aria-label={t.inviteCode}
                  value={invite}
                  onChange={setInvite}
                  placeholder={t.invitePlaceholder}
                  autoComplete="off"
                  spellCheck={false}
                  leftIcon={<Link2 />}
                  classNames={{ field: 'bg-card h-10', input: 'font-mono text-sm' }}
                />
              </div>
            </Section>

            <Section title={t.colors}>
              <ColorField label={t.background} value={colors.backgroundColor} onChange={setColor('backgroundColor')} />
              <ColorField label={t.serverName} value={colors.nameColor} onChange={setColor('nameColor')} />
              <ColorField
                label={t.info}
                hint={t.infoHint}
                value={colors.infoColor}
                onChange={setColor('infoColor')}
              />
            </Section>

            <Section title={t.joinButton}>
              <ColorField label={t.color} value={colors.buttonColor} onChange={setColor('buttonColor')} />
              <ColorField label={t.textColor} value={colors.buttonTextColor} onChange={setColor('buttonTextColor')} />
              <div className="flex flex-col gap-1.5">
                <FieldLabel hint={t.maxChars(BUTTON_TEXT_MAX)}>{t.text}</FieldLabel>
                <Input
                  aria-label={t.buttonText}
                  value={buttonText}
                  onChange={setButtonText}
                  maxLength={BUTTON_TEXT_MAX}
                  spellCheck={false}
                  classNames={{ field: 'bg-card h-10', input: 'text-sm' }}
                />
                <span
                  className={cn(
                    'self-end px-1 font-mono text-[11px] tabular-nums transition-colors',
                    btLen >= BUTTON_TEXT_MAX
                      ? 'text-destructive'
                      : btLen >= 24
                        ? 'text-amber-500'
                        : 'text-muted-foreground',
                  )}
                >
                  {btLen} / {BUTTON_TEXT_MAX}
                </span>
              </div>
              <RangeField
                label={t.borderRadius}
                hint="(0 – 30 px)"
                min={0}
                max={30}
                text={numbers.buttonBorderRadius}
                fallback={DEFAULTS.buttonBorderRadius}
                onTextChange={setNumber('buttonBorderRadius')}
              />
            </Section>

            <Section title={t.cardShape}>
              <RangeField
                label={t.borderRadius}
                hint="(0 – 30 px)"
                min={0}
                max={30}
                text={numbers.borderRadius}
                fallback={DEFAULTS.borderRadius}
                onTextChange={setNumber('borderRadius')}
              />
              <RangeField
                label={t.titleMaxLength}
                min={1}
                max={50}
                text={numbers.titleLen}
                fallback={DEFAULTS.titleLen}
                onTextChange={setNumber('titleLen')}
              />
              <div className="flex items-center justify-between gap-3 rounded-full border bg-card py-1.5 pl-4 pr-1.5">
                <span className="text-sm font-medium">{t.showEllipsis}</span>
                <Switch checked={elipsis} onCheckedChange={setElipsis} ariaLabel={t.showEllipsis} />
              </div>
            </Section>
          </div>
        </Panel>
      </main>

      {/* Bot notice */}
      <Alert variant="info" className="shrink-0 border border-primary/15" contentClassName="items-center">
        <AlertContent>
          <AlertTitle>{t.botTitle}</AlertTitle>
          <AlertDescription>{t.botDescription}</AlertDescription>
        </AlertContent>
        <AlertAction className="pt-0">
          <ButtonLink href={BOT_INVITE_URL} target="_blank" rel="noopener" size="sm">
            {t.addToServer}
            <ArrowUpRight className="size-3.5" />
          </ButtonLink>
        </AlertAction>
      </Alert>

      <LegalLinks t={t} className="shrink-0" />
    </div>
  )
}
