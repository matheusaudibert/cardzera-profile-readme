import { useEffect, useState } from 'react'

export type Locale = 'en' | 'pt'

const STORAGE_KEY = 'cardzera-locale'

const en = {
  htmlLang: 'en',
  pageTitle: 'Cardzera',
  pageDescription: 'Generate a customizable Discord server invite card for your GitHub README or any webpage.',
  moreInfo: 'more info',
  toggleTheme: 'Toggle theme',
  language: 'Language',
  preview: 'Preview',
  output: 'Output',
  configuration: 'Configuration',
  previewHintBefore: 'Enter your',
  previewHintAfter: 'to preview',
  rendering: 'Rendering card…',
  loadingCard: 'Loading card',
  loadError: 'Could not load card.',
  loadErrorHint: 'Check your Server ID.',
  emptyOutput: '<!-- Enter your Server ID to generate -->',
  imageUrl: 'image url',
  serverInfo: 'Server Info',
  serverId: 'Server ID',
  serverIdPlaceholder: 'e.g. 1234567890123456789',
  inviteCode: 'Invite Code',
  inviteHint: '(code or full URL)',
  invitePlaceholder: 'e.g. abc123 or discord.gg/abc123',
  colors: 'Colors',
  background: 'Background',
  serverName: 'Server Name',
  info: 'Info',
  infoHint: '(members / online)',
  joinButton: 'Join Button',
  color: 'Color',
  textColor: 'Text Color',
  text: 'Text',
  maxChars: (n: number) => `(max ${n} chars)`,
  buttonText: 'Button text',
  borderRadius: 'Border Radius',
  cardShape: 'Card Shape',
  titleMaxLength: 'Title Max Length',
  showEllipsis: 'Show ellipsis',
  botTitle: 'The bot must be in your server to display the card.',
  botDescription: 'Invite Cardzera once and every card for that server starts working.',
  addToServer: 'Add to server',
  termsLink: 'Terms of Service',
  privacyLink: 'Privacy Policy',
  backHome: 'Back to Cardzera',
  lastUpdated: 'Last updated',
}

export type Messages = typeof en

const pt: Messages = {
  htmlLang: 'pt-BR',
  pageTitle: 'Cardzera',
  pageDescription: 'Gere um card de convite personalizável do seu servidor do Discord para o README do GitHub ou qualquer página.',
  moreInfo: 'mais info',
  toggleTheme: 'Alternar tema',
  language: 'Idioma',
  preview: 'Prévia',
  output: 'Código',
  configuration: 'Configuração',
  previewHintBefore: 'Digite o',
  previewHintAfter: 'para visualizar',
  rendering: 'Gerando card…',
  loadingCard: 'Carregando card',
  loadError: 'Não foi possível carregar o card.',
  loadErrorHint: 'Verifique o ID do servidor.',
  emptyOutput: '<!-- Digite o ID do servidor para gerar -->',
  imageUrl: 'url da imagem',
  serverInfo: 'Servidor',
  serverId: 'ID do Servidor',
  serverIdPlaceholder: 'ex.: 1234567890123456789',
  inviteCode: 'Código do Convite',
  inviteHint: '(código ou URL completa)',
  invitePlaceholder: 'ex.: abc123 ou discord.gg/abc123',
  colors: 'Cores',
  background: 'Fundo',
  serverName: 'Nome do Servidor',
  info: 'Informações',
  infoHint: '(membros / online)',
  joinButton: 'Botão de Entrar',
  color: 'Cor',
  textColor: 'Cor do Texto',
  text: 'Texto',
  maxChars: (n: number) => `(máx. ${n} caracteres)`,
  buttonText: 'Texto do botão',
  borderRadius: 'Arredondamento',
  cardShape: 'Formato do Card',
  titleMaxLength: 'Tamanho Máx. do Título',
  showEllipsis: 'Mostrar reticências',
  botTitle: 'O bot precisa estar no seu servidor para exibir o card.',
  botDescription: 'Convide o Cardzera uma vez e todos os cards desse servidor passam a funcionar.',
  addToServer: 'Adicionar ao servidor',
  termsLink: 'Termos de Serviço',
  privacyLink: 'Política de Privacidade',
  backHome: 'Voltar ao Cardzera',
  lastUpdated: 'Última atualização',
}

export const MESSAGES: Record<Locale, Messages> = { en, pt }

// Time zones of Portuguese-speaking regions (Brazil, Portugal, PALOP, Timor-Leste, Macau).
const PT_TIME_ZONES = new Set([
  'America/Araguaina', 'America/Bahia', 'America/Belem', 'America/Boa_Vista', 'America/Campo_Grande',
  'America/Cuiaba', 'America/Eirunepe', 'America/Fortaleza', 'America/Maceio', 'America/Manaus',
  'America/Noronha', 'America/Porto_Velho', 'America/Recife', 'America/Rio_Branco', 'America/Santarem',
  'America/Sao_Paulo', 'Brazil/Acre', 'Brazil/DeNoronha', 'Brazil/East', 'Brazil/West',
  'Europe/Lisbon', 'Portugal', 'Atlantic/Azores', 'Atlantic/Madeira',
  'Africa/Luanda', 'Africa/Maputo', 'Africa/Bissau', 'Atlantic/Cape_Verde', 'Africa/Sao_Tome',
  'Asia/Dili', 'Asia/Macau',
])

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt') return saved
  } catch {
    // Storage can be blocked; fall back to language and region.
  }
  // 1. Browser language: anything Portuguese (pt, pt-BR, pt-PT…).
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  if (languages[0]?.toLowerCase().startsWith('pt')) return 'pt'
  // 2. Region: the device time zone tells where the visitor is, even when the
  //    browser itself is set to English.
  try {
    if (PT_TIME_ZONES.has(Intl.DateTimeFormat().resolvedOptions().timeZone)) return 'pt'
  } catch {
    // Intl unavailable: keep English.
  }
  return 'en'
}

/** Language/region by default; an explicit choice is remembered per viewer.
 * `title` lets secondary pages (terms, privacy) set their own document title. */
export function useLocale({ title }: { title?: (t: Messages) => string } = {}) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)
  const t = MESSAGES[locale]

  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    document.title = title ? title(t) : t.pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescription)
  }, [t])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore: the choice just won't persist.
    }
  }

  return { locale, setLocale, t }
}
