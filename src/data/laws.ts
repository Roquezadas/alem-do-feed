import type { Law } from "./types";

export const laws: Law[] = [
  {
    id: "cf-5-x",
    category: "Constituição Federal",
    name: "Constituição Federal de 1988",
    article: "Art. 5º, X",
    title: "Intimidade, vida privada, honra e imagem",
    summary:
      "Torna invioláveis a intimidade, a vida privada, a honra e a imagem das pessoas, com direito a indenização pelo dano decorrente de sua violação.",
    text: "São invioláveis a intimidade, a vida privada, a honra e a imagem das pessoas, assegurado o direito a indenização pelo dano material ou moral decorrente de sua violação.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
  },
  {
    id: "cf-5-iv-ix",
    category: "Constituição Federal",
    name: "Constituição Federal de 1988",
    article: "Art. 5º, IV e IX",
    title: "Liberdade de expressão e de comunicação",
    summary:
      "Garante a livre manifestação do pensamento (vedado o anonimato) e a liberdade de expressão intelectual, artística, científica e de comunicação.",
    text: "IV - é livre a manifestação do pensamento, sendo vedado o anonimato; IX - é livre a expressão da atividade intelectual, artística, científica e de comunicação, independentemente de censura ou licença.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
  },
  {
    id: "cc-20",
    category: "Código Civil",
    name: "Código Civil (Lei 10.406/2002)",
    article: "Art. 20",
    title: "Uso da imagem sem autorização",
    summary:
      "A divulgação de imagem pode ser proibida a requerimento da pessoa quando atingir a honra, a boa fama ou a respeitabilidade, ou tiver fins comerciais.",
    text: "Salvo se autorizadas, ou se necessárias à administração da justiça ou à manutenção da ordem pública, a divulgação de escritos, a transmissão da palavra, ou a publicação, a exposição ou a utilização da imagem de uma pessoa poderão ser proibidas, a seu requerimento e sem prejuízo da indenização que couber, se lhe atingirem a honra, a boa fama ou a respeitabilidade, ou se se destinarem a fins comerciais.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
  },
  {
    id: "cc-21",
    category: "Código Civil",
    name: "Código Civil (Lei 10.406/2002)",
    article: "Art. 21",
    title: "Inviolabilidade da vida privada",
    summary:
      "A vida privada da pessoa natural é inviolável e o juiz pode determinar medidas para impedir ou fazer cessar ato contrário a essa norma.",
    text: "A vida privada da pessoa natural é inviolável, e o juiz, a requerimento do interessado, adotará as providências necessárias para impedir ou fazer cessar ato contrário a esta norma.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
  },
  {
    id: "cc-186-927",
    category: "Código Civil",
    name: "Código Civil (Lei 10.406/2002)",
    article: "Arts. 186 e 927",
    title: "Ato ilícito e dever de indenizar",
    summary:
      "Quem, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem comete ato ilícito e fica obrigado a repará-lo.",
    text: "Art. 186. Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito. Art. 927. Aquele que, por ato ilícito, causar dano a outrem, fica obrigado a repará-lo.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm",
  },
  {
    id: "cp-138-140",
    category: "Código Penal",
    name: "Código Penal (Decreto-Lei 2.848/1940)",
    article: "Arts. 138, 139 e 140",
    title: "Calúnia, difamação e injúria",
    summary:
      "Os crimes contra a honra alcançam publicações em redes sociais, com aumento de pena quando cometidos em meio que facilite a divulgação.",
    text: "Art. 138. Caluniar alguém, imputando-lhe falsamente fato definido como crime. Art. 139. Difamar alguém, imputando-lhe fato ofensivo à sua reputação. Art. 140. Injuriar alguém, ofendendo-lhe a dignidade ou o decoro.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
  },
  {
    id: "cp-216b",
    category: "Código Penal",
    name: "Código Penal (Decreto-Lei 2.848/1940)",
    article: "Art. 216-B",
    title: "Registro não autorizado da intimidade sexual",
    summary:
      "Criminaliza produzir, fotografar, filmar ou registrar conteúdo com nudez ou ato sexual sem autorização dos participantes.",
    text: "Produzir, fotografar, filmar ou registrar, por qualquer meio, conteúdo com cena de nudez ou ato sexual ou libidinoso de caráter íntimo e privado sem autorização dos participantes.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
  },
  {
    id: "lgpd-7",
    category: "LGPD",
    name: "Lei Geral de Proteção de Dados (Lei 13.709/2018)",
    article: "Arts. 5º e 7º",
    title: "Dado pessoal e bases legais de tratamento",
    summary:
      "Imagem e voz que identifiquem uma pessoa são dados pessoais. Todo tratamento precisa de uma base legal, como o consentimento.",
    text: "Art. 5º I - dado pessoal: informação relacionada a pessoa natural identificada ou identificável. Art. 7º O tratamento de dados pessoais somente poderá ser realizado nas seguintes hipóteses: I - mediante o fornecimento de consentimento pelo titular; (...)",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  },
  {
    id: "lgpd-4",
    category: "LGPD",
    name: "Lei Geral de Proteção de Dados (Lei 13.709/2018)",
    article: "Art. 4º, II",
    title: "Uso pessoal e não econômico",
    summary:
      "A LGPD não se aplica ao tratamento feito por pessoa natural para fins exclusivamente particulares e não econômicos — o que muda quando há monetização.",
    text: "Esta Lei não se aplica ao tratamento de dados pessoais: II - realizado por pessoa natural para fins exclusivamente particulares e não econômicos.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
  },
  {
    id: "mci-19-21",
    category: "Marco Civil da Internet",
    name: "Marco Civil da Internet (Lei 12.965/2014)",
    article: "Arts. 19 e 21",
    title: "Responsabilidade dos provedores e remoção de conteúdo",
    summary:
      "Define quando plataformas respondem por conteúdo de terceiros e prevê remoção mediante notificação em casos de nudez ou atos sexuais privados.",
    text: "Art. 19. Com o intuito de assegurar a liberdade de expressão e impedir a censura, o provedor de aplicações de internet somente poderá ser responsabilizado civilmente por danos decorrentes de conteúdo gerado por terceiros se, após ordem judicial específica, não tomar as providências para tornar indisponível o conteúdo. Art. 21. (...) responsabilidade subsidiária após notificação, em caso de cenas de nudez ou de atos sexuais de caráter privado.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
  },
  {
    id: "eca-17-247",
    category: "ECA",
    name: "Estatuto da Criança e do Adolescente (Lei 8.069/1990)",
    article: "Arts. 17 e 247",
    title: "Imagem de crianças e adolescentes",
    summary:
      "A imagem, a identidade e a privacidade de crianças e adolescentes recebem proteção reforçada, com sanção para divulgação indevida.",
    text: "Art. 17. O direito ao respeito consiste na inviolabilidade da integridade física, psíquica e moral da criança e do adolescente, abrangendo a preservação da imagem, da identidade, da autonomia, dos valores, ideias e crenças, dos espaços e objetos pessoais.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
  },
  {
    id: "lda-46",
    category: "Lei de Direitos Autorais",
    name: "Lei de Direitos Autorais (Lei 9.610/1998)",
    article: "Arts. 29 e 46",
    title: "Uso de obra alheia e limitações",
    summary:
      "Usar obra de terceiro depende de autorização prévia. Dar crédito não substitui autorização; há apenas hipóteses limitadas de uso livre.",
    text: "Art. 29. Depende de autorização prévia e expressa do autor a utilização da obra, por quaisquer modalidades. Art. 46. Não constitui ofensa aos direitos autorais: (...) a citação em livros, jornais, revistas ou qualquer outro meio de comunicação, de passagens de qualquer obra, para fins de estudo, crítica ou polêmica, na medida justificada.",
    sourceUrl: "https://www.planalto.gov.br/ccivil_03/leis/l9610.htm",
  },
];

export const lawCategories = [
  "Constituição Federal",
  "Código Civil",
  "Código Penal",
  "LGPD",
  "Marco Civil da Internet",
  "ECA",
  "Lei de Direitos Autorais",
] as const;

export const getLaw = (id: string) => laws.find((l) => l.id === id);
