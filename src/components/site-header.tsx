import type { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/motion/tabs'
import { ThemeToggle } from '@/components/motion/theme-toggle'
import { Tooltip } from '@/components/motion/tooltip'
import type { Locale, Messages } from '@/lib/i18n'

export function SiteHeader({
  locale,
  setLocale,
  t,
  title = 'Cardzera',
  titleHref,
  children,
}: {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
  title?: string
  /** Turns the title into a link (used by the legal pages to go home). */
  titleHref?: string
  /** Extra content next to the title, e.g. the "more info" link. */
  children?: ReactNode
}) {
  return (
    <header className="flex items-center justify-between gap-3 px-1">
      <div className="flex min-w-0 items-baseline gap-3">
        <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
          {titleHref ? (
            <a href={titleHref} className="transition-opacity hover:opacity-70">
              {title}
            </a>
          ) : (
            title
          )}
        </h1>
        {children}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Tabs value={locale} onValueChange={(v) => setLocale(v as Locale)} variant="segment">
          <TabsList aria-label={t.language} className="border bg-card">
            <TabsTrigger value="en" className="px-2.5 py-1 text-xs">EN</TabsTrigger>
            <TabsTrigger value="pt" className="px-2.5 py-1 text-xs">PT</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tooltip content={t.toggleTheme} side="bottom">
          <ThemeToggle
            variant="circle-blur"
            start="top-right"
            className="size-9 shrink-0 rounded-full border bg-card text-foreground transition-colors hover:bg-muted"
            iconClassName="size-4"
          />
        </Tooltip>
      </div>
    </header>
  )
}

export function LegalLinks({ t, className }: { t: Messages; className?: string }) {
  return (
    <nav className={className}>
      <ul className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <li>
          <a href="/terms/" className="transition-colors hover:text-foreground">
            {t.termsLink}
          </a>
        </li>
        <li aria-hidden="true">·</li>
        <li>
          <a href="/privacy/" className="transition-colors hover:text-foreground">
            {t.privacyLink}
          </a>
        </li>
      </ul>
    </nav>
  )
}
