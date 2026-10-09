import type { Locale } from '@/lib/i18n'

export type LegalPage = 'terms' | 'privacy'

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export type LegalDocument = {
  title: string
  intro: string
  sections: LegalSection[]
}

/** ISO date shown as "last updated"; bump it whenever a document changes. */
export const LAST_UPDATED = '2026-10-09'

export const CONTACT_URL = 'https://github.com/matheusaudibert/cardzera/issues'

const terms: Record<Locale, LegalDocument> = {
  en: {
    title: 'Terms of Service',
    intro:
      'These Terms of Service govern your use of Cardzera, which includes the Cardzera Discord bot, the image API at cardzera.audibert.dev and this website. By adding the bot to a Discord server or using the API or website, you agree to these terms.',
    sections: [
      {
        heading: '1. The service',
        paragraphs: [
          'Cardzera generates an image ("card") that shows public information about a Discord server: its name, icon, total member count and number of online members. The card can be embedded in a GitHub README or any web page. This website only helps you build the embed code.',
          'Cardzera is a free, independent project. It is not affiliated with, endorsed by or sponsored by Discord Inc. or GitHub Inc.',
        ],
      },
      {
        heading: '2. Discord terms',
        paragraphs: [
          "You must follow Discord's Terms of Service and Community Guidelines when using Cardzera. You may only add the bot to servers where you have permission to do so.",
        ],
      },
      {
        heading: '3. Acceptable use',
        paragraphs: ['You agree not to:'],
        items: [
          'send automated or excessive requests to the API, or try to overload, disrupt or bypass the limits of the service;',
          'use Cardzera to collect data about servers or users beyond what the card shows;',
          'use customization options (such as the button text) to display illegal, hateful, harassing or misleading content;',
          'use a card to impersonate another server, person or brand;',
          'attempt to reverse engineer, exploit or gain unauthorized access to the bot or its infrastructure.',
        ],
      },
      {
        heading: '4. Your content',
        paragraphs: [
          "Server names and icons belong to their respective owners. You are responsible for the server you display and for any text or styling you choose for your card. You must have the right to display that server's information and invite link.",
        ],
      },
      {
        heading: '5. Availability',
        paragraphs: [
          'Cardzera is provided free of charge, "as is" and "as available". Information shown on a card may be cached for up to 5 minutes, and the online member count may be inaccurate for large servers due to Discord API limitations. We may change, suspend or discontinue any part of the service at any time, without notice.',
        ],
      },
      {
        heading: '6. Removing the bot',
        paragraphs: [
          'You can stop using Cardzera at any time by removing the bot from your server. Cards for that server will stop working once the bot is removed.',
        ],
      },
      {
        heading: '7. Suspension',
        paragraphs: [
          'We may block requests or stop serving cards for any server or user that violates these terms or puts the service at risk.',
        ],
      },
      {
        heading: '8. Disclaimer and limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by law, Cardzera is provided without warranties of any kind, express or implied. The maintainer is not liable for any indirect, incidental or consequential damages, or for any loss of data, reputation or revenue arising from your use of, or inability to use, the service.',
        ],
      },
      {
        heading: '9. Open source',
        paragraphs: [
          'The source code of Cardzera is publicly available on GitHub and is licensed under the terms in its repository. These Terms of Service apply to the hosted service, not to your own copies of the code.',
        ],
      },
      {
        heading: '10. Changes to these terms',
        paragraphs: [
          'We may update these terms from time to time. The date at the top of this page shows when they last changed. Continuing to use Cardzera after an update means you accept the new terms.',
        ],
      },
      {
        heading: '11. Contact',
        paragraphs: ['Questions about these terms can be sent by opening an issue in the Cardzera GitHub repository.'],
      },
    ],
  },
  pt: {
    title: 'Termos de Serviço',
    intro:
      'Estes Termos de Serviço regem o uso do Cardzera, que inclui o bot do Discord Cardzera, a API de imagens em cardzera.audibert.dev e este site. Ao adicionar o bot a um servidor do Discord ou usar a API ou o site, você concorda com estes termos.',
    sections: [
      {
        heading: '1. O serviço',
        paragraphs: [
          'O Cardzera gera uma imagem ("card") que mostra informações públicas de um servidor do Discord: nome, ícone, total de membros e número de membros online. O card pode ser incorporado em um README do GitHub ou em qualquer página da web. Este site serve apenas para ajudar você a montar o código de incorporação.',
          'O Cardzera é um projeto gratuito e independente. Ele não é afiliado, endossado ou patrocinado pela Discord Inc. ou pela GitHub Inc.',
        ],
      },
      {
        heading: '2. Termos do Discord',
        paragraphs: [
          'Você deve seguir os Termos de Serviço e as Diretrizes da Comunidade do Discord ao usar o Cardzera. Você só pode adicionar o bot a servidores nos quais tenha permissão para isso.',
        ],
      },
      {
        heading: '3. Uso aceitável',
        paragraphs: ['Você concorda em não:'],
        items: [
          'enviar requisições automatizadas ou excessivas à API, nem tentar sobrecarregar, interromper ou contornar os limites do serviço;',
          'usar o Cardzera para coletar dados de servidores ou usuários além do que o card exibe;',
          'usar as opções de personalização (como o texto do botão) para exibir conteúdo ilegal, de ódio, de assédio ou enganoso;',
          'usar um card para se passar por outro servidor, pessoa ou marca;',
          'tentar fazer engenharia reversa, explorar falhas ou obter acesso não autorizado ao bot ou à sua infraestrutura.',
        ],
      },
      {
        heading: '4. Seu conteúdo',
        paragraphs: [
          'Os nomes e ícones de servidores pertencem aos seus respectivos donos. Você é responsável pelo servidor exibido e por qualquer texto ou estilo escolhido para o seu card. Você precisa ter o direito de exibir as informações e o link de convite desse servidor.',
        ],
      },
      {
        heading: '5. Disponibilidade',
        paragraphs: [
          'O Cardzera é oferecido gratuitamente, "no estado em que se encontra" e "conforme disponível". As informações de um card podem ficar em cache por até 5 minutos, e a contagem de membros online pode ser imprecisa em servidores grandes por limitações da API do Discord. Podemos alterar, suspender ou encerrar qualquer parte do serviço a qualquer momento, sem aviso prévio.',
        ],
      },
      {
        heading: '6. Remoção do bot',
        paragraphs: [
          'Você pode parar de usar o Cardzera a qualquer momento removendo o bot do seu servidor. Os cards desse servidor deixam de funcionar assim que o bot é removido.',
        ],
      },
      {
        heading: '7. Suspensão',
        paragraphs: [
          'Podemos bloquear requisições ou deixar de gerar cards para qualquer servidor ou usuário que viole estes termos ou coloque o serviço em risco.',
        ],
      },
      {
        heading: '8. Isenção de garantias e limitação de responsabilidade',
        paragraphs: [
          'Na máxima extensão permitida por lei, o Cardzera é fornecido sem garantias de qualquer tipo, expressas ou implícitas. O mantenedor não se responsabiliza por danos indiretos, incidentais ou consequentes, nem por perda de dados, reputação ou receita decorrentes do uso, ou da impossibilidade de uso, do serviço.',
        ],
      },
      {
        heading: '9. Código aberto',
        paragraphs: [
          'O código-fonte do Cardzera está disponível publicamente no GitHub e é licenciado nos termos do seu repositório. Estes Termos de Serviço se aplicam ao serviço hospedado, não às suas próprias cópias do código.',
        ],
      },
      {
        heading: '10. Alterações nestes termos',
        paragraphs: [
          'Podemos atualizar estes termos periodicamente. A data no topo desta página indica a última alteração. Continuar usando o Cardzera após uma atualização significa que você aceita os novos termos.',
        ],
      },
      {
        heading: '11. Contato',
        paragraphs: ['Dúvidas sobre estes termos podem ser enviadas abrindo uma issue no repositório do Cardzera no GitHub.'],
      },
    ],
  },
}

const privacy: Record<Locale, LegalDocument> = {
  en: {
    title: 'Privacy Policy',
    intro:
      'This Privacy Policy explains what information Cardzera (the Discord bot, the image API at cardzera.audibert.dev and this website) accesses, how it is used and how long it is kept. Cardzera is built to use as little data as possible: there are no accounts, no ads, no analytics and no database.',
    sections: [
      {
        heading: '1. Information the bot accesses',
        paragraphs: [
          'When a card is requested for a server where the Cardzera bot is installed, the bot uses the Discord API to read:',
        ],
        items: [
          'the server ID, name and icon;',
          'the total number of members;',
          "each member's presence status (online, idle, do not disturb or offline), used only to calculate how many members are online.",
        ],
      },
      {
        heading: '2. Information the bot does not collect',
        paragraphs: [
          'Cardzera does not use, log or store messages or message content, and it does not store any information about individual members, such as usernames, avatars, roles or activities. Presence data is reduced to a single aggregate number and is never kept per member.',
        ],
      },
      {
        heading: '3. How the information is used',
        paragraphs: [
          'The information above is used exclusively to render the card image. It is not used for advertising, profiling or any other purpose, and it is never sold.',
        ],
      },
      {
        heading: '4. Retention',
        paragraphs: [
          "The generated server data (name, icon and counts) is kept in the bot's memory for up to 5 minutes so cards load faster, and is discarded after that or whenever the bot restarts. Cardzera does not have a database. Card images may also be cached for a short time by browsers, CDNs and GitHub's image proxy.",
        ],
      },
      {
        heading: '5. Website and API requests',
        paragraphs: [
          'Like any website, the servers that host Cardzera may record standard technical logs (such as IP address, browser user agent and requested URL) for security and operation. This website stores your theme and language preferences in your browser\'s local storage; it does not use tracking cookies. Fonts are loaded from Google Fonts, which receives your IP address when the page loads.',
          'The Server ID and customization options you enter on this website are sent to the Cardzera API only to render the preview. Nothing else you type leaves your browser.',
        ],
      },
      {
        heading: '6. Sharing',
        paragraphs: [
          'Information is only exchanged with Discord (to fetch server data) and with the infrastructure providers needed to run the service. We may disclose information if required by law.',
        ],
      },
      {
        heading: '7. Your choices and rights',
        paragraphs: [
          'Server administrators can stop all data access at any time by removing the bot from the server. Depending on where you live (for example, under the LGPD in Brazil or the GDPR in the European Union), you may have the right to access, correct or delete personal data. To make a request, open an issue in the Cardzera GitHub repository.',
        ],
      },
      {
        heading: '8. Children',
        paragraphs: [
          "Cardzera is meant to be used within Discord, which requires users to meet its minimum age. We do not knowingly collect personal information from children.",
        ],
      },
      {
        heading: '9. Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The date at the top of this page shows when it last changed.',
        ],
      },
      {
        heading: '10. Contact',
        paragraphs: ['Questions about privacy can be sent by opening an issue in the Cardzera GitHub repository.'],
      },
    ],
  },
  pt: {
    title: 'Política de Privacidade',
    intro:
      'Esta Política de Privacidade explica quais informações o Cardzera (o bot do Discord, a API de imagens em cardzera.audibert.dev e este site) acessa, como elas são usadas e por quanto tempo são mantidas. O Cardzera foi feito para usar o mínimo possível de dados: não há contas, anúncios, ferramentas de análise nem banco de dados.',
    sections: [
      {
        heading: '1. Informações que o bot acessa',
        paragraphs: [
          'Quando um card é solicitado para um servidor onde o bot Cardzera está instalado, o bot usa a API do Discord para ler:',
        ],
        items: [
          'o ID, o nome e o ícone do servidor;',
          'o número total de membros;',
          'o status de presença de cada membro (online, ausente, não perturbe ou offline), usado apenas para calcular quantos membros estão online.',
        ],
      },
      {
        heading: '2. Informações que o bot não coleta',
        paragraphs: [
          'O Cardzera não usa, registra nem armazena mensagens ou o conteúdo delas, e não armazena nenhuma informação sobre membros individuais, como nomes de usuário, avatares, cargos ou atividades. Os dados de presença são reduzidos a um único número agregado e nunca são guardados por membro.',
        ],
      },
      {
        heading: '3. Como as informações são usadas',
        paragraphs: [
          'As informações acima são usadas exclusivamente para gerar a imagem do card. Elas não são usadas para publicidade, criação de perfis ou qualquer outra finalidade, e nunca são vendidas.',
        ],
      },
      {
        heading: '4. Retenção',
        paragraphs: [
          'Os dados gerados do servidor (nome, ícone e contagens) ficam na memória do bot por até 5 minutos para que os cards carreguem mais rápido, e são descartados depois disso ou sempre que o bot reinicia. O Cardzera não possui banco de dados. As imagens dos cards também podem ficar em cache por pouco tempo em navegadores, CDNs e no proxy de imagens do GitHub.',
        ],
      },
      {
        heading: '5. Requisições ao site e à API',
        paragraphs: [
          'Como qualquer site, os servidores que hospedam o Cardzera podem registrar logs técnicos padrão (como endereço IP, user agent do navegador e URL acessada) para segurança e operação. Este site guarda suas preferências de tema e idioma no armazenamento local do seu navegador; ele não usa cookies de rastreamento. As fontes são carregadas do Google Fonts, que recebe seu endereço IP quando a página carrega.',
          'O ID do servidor e as opções de personalização que você informa neste site são enviados à API do Cardzera apenas para gerar a prévia. Nada mais do que você digita sai do seu navegador.',
        ],
      },
      {
        heading: '6. Compartilhamento',
        paragraphs: [
          'As informações só são trocadas com o Discord (para buscar os dados do servidor) e com os provedores de infraestrutura necessários para manter o serviço. Podemos divulgar informações se exigido por lei.',
        ],
      },
      {
        heading: '7. Suas escolhas e direitos',
        paragraphs: [
          'Administradores podem interromper todo o acesso a dados a qualquer momento removendo o bot do servidor. Dependendo de onde você mora (por exemplo, pela LGPD no Brasil ou pelo GDPR na União Europeia), você pode ter o direito de acessar, corrigir ou excluir dados pessoais. Para fazer uma solicitação, abra uma issue no repositório do Cardzera no GitHub.',
        ],
      },
      {
        heading: '8. Crianças',
        paragraphs: [
          'O Cardzera é feito para ser usado dentro do Discord, que exige que os usuários tenham a idade mínima definida por ele. Não coletamos intencionalmente informações pessoais de crianças.',
        ],
      },
      {
        heading: '9. Alterações nesta política',
        paragraphs: [
          'Podemos atualizar esta política periodicamente. A data no topo desta página indica a última alteração.',
        ],
      },
      {
        heading: '10. Contato',
        paragraphs: ['Dúvidas sobre privacidade podem ser enviadas abrindo uma issue no repositório do Cardzera no GitHub.'],
      },
    ],
  },
}

export const LEGAL: Record<LegalPage, Record<Locale, LegalDocument>> = { terms, privacy }
