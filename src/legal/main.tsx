import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/motion/button/base'
import { LegalLinks, SiteHeader } from '@/components/site-header'
import { useLocale } from '@/lib/i18n'
import { CONTACT_URL, LAST_UPDATED, LEGAL, type LegalPage } from './content'
import '../index.css'

function LegalApp({ page }: { page: LegalPage }) {
  const { locale, setLocale, t } = useLocale({ title: () => (page === 'terms' ? 'Terms' : 'Policy') })
  const doc = LEGAL[page][locale]
  const updated = new Date(`${LAST_UPDATED}T12:00:00Z`).toLocaleDateString(t.htmlLang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[760px] flex-col gap-6 px-4 py-6 lg:py-8">
      <SiteHeader locale={locale} setLocale={setLocale} t={t} titleHref="/" />

      <main className="rounded-3xl border bg-card/60 px-5 py-8 sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {t.lastUpdated}: <time dateTime={LAST_UPDATED}>{updated}</time>
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{doc.title}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">{doc.intro}</p>

        <div className="mt-8 flex flex-col gap-8">
          {doc.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold tracking-tight">{section.heading}</h3>
              {section.paragraphs?.map((p) => (
                <p key={p} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {section.items ? (
                <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-primary">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 border-t pt-6">
          <ButtonLink href="/" variant="secondary" size="sm">
            <ArrowLeft className="size-3.5" />
            {t.backHome}
          </ButtonLink>
          <ButtonLink href={CONTACT_URL} target="_blank" rel="noopener" variant="ghost" size="sm">
            GitHub Issues
            <ArrowUpRight className="size-3.5" />
          </ButtonLink>
        </div>
      </main>

      <LegalLinks t={t} />
    </div>
  )
}

const root = document.getElementById('root')!
const page = (root.dataset.page === 'privacy' ? 'privacy' : 'terms') satisfies LegalPage

createRoot(root).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LegalApp page={page} />
    </ThemeProvider>
  </StrictMode>,
)
