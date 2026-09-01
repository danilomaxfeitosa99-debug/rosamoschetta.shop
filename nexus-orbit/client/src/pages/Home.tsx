/**
 * DIREÇÃO VISUAL: Horizonte Editorial — um site B2B em formato de periódico,
 * com narrativa assimétrica, superfícies marfim, grafite e Azul Órbita.
 * Conteúdo explicitamente demonstrativo: não apresentar dados empresariais fictícios como fatos.
 */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleDot,
  Cpu,
  Globe2,
  Layers3,
  Menu,
  MoveRight,
  Orbit,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const img = {
  hero: "/manus-storage/nexus-orbit-hero_87374ba3.jpg",
  strategy: "/manus-storage/nexus-orbit-strategy_014d8eac.jpg",
  systems: "/manus-storage/nexus-orbit-systems_e3ae3369.jpg",
  collaboration: "/manus-storage/nexus-orbit-collaboration_39d5ac81.jpg",
  mark: "/manus-storage/nexus-orbit-mark_55ea011c.png",
};

const handleDemo = (label: string) => {
  toast("Ação demonstrativa", {
    description: `${label}: conecte um canal de atendimento real antes de publicar este site.`,
  });
};

const navItems = [
  ["Visão", "#visao"],
  ["Soluções", "#solucoes"],
  ["Método", "#metodo"],
  ["Governança", "#governanca"],
];

const operationalAreas = [
  { no: "01", title: "Estratégia e arquitetura", text: "Mapeamento de cenários, prioridades e dependências para transformar ambição operacional em plano de ação.", icon: Orbit },
  { no: "02", title: "Dados e inteligência", text: "Organização de fontes, indicadores e rituais de análise para apoiar conversas de negócio consistentes.", icon: Layers3 },
  { no: "03", title: "Produtos e experiência", text: "Jornadas digitais orientadas à clareza, continuidade e uso responsável de tecnologia.", icon: Cpu },
  { no: "04", title: "Operação e evolução", text: "Ritmos de entrega, documentação e melhoria contínua para que decisões acompanhem a mudança.", icon: Workflow },
];

const principles = [
  ["Direção antes de velocidade", "Toda iniciativa começa pela definição explícita do problema, dos responsáveis e do critério de avanço."],
  ["Dados com contexto", "Indicadores ganham valor quando conectados a perguntas reais, decisões possíveis e rotinas de acompanhamento."],
  ["Tecnologia legível", "Arquiteturas, integrações e processos devem ser compreensíveis para as pessoas que dependem delas."],
  ["Evolução verificável", "O progresso é acompanhado por marcos, evidências e aprendizado, não por promessas genéricas."],
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#182438]">
      <header className="sticky top-0 z-30 border-b border-[#182438]/15 bg-[#f8f7f2]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Nexus Orbit, ir ao início">
            <img src={img.mark} alt="Símbolo Nexus Orbit" className="h-10 w-10 object-contain" />
            <span className="leading-none tracking-[-0.05em]">
              <strong className="block text-[0.98rem] font-extrabold tracking-[-0.07em]">NEXUS</strong>
              <em className="font-display block text-[1.05rem] italic">Orbit</em>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={label} className="eyebrow text-[#182438]/75 transition-colors hover:text-[#2457f5]" href={href}>{label}</a>)}
          </nav>

          <div className="flex items-center gap-3">
            <span className="eyebrow hidden text-[#182438]/55 sm:block">Institucional / Demo</span>
            <Button onClick={() => handleDemo("Solicitar uma conversa")} className="h-10 rounded-none bg-[#2457f5] px-4 text-xs font-bold tracking-wide hover:bg-[#183da9] active:scale-[.97] sm:px-5">
              Falar com a equipe <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
            <Menu className="h-5 w-5 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main>
        <section id="inicio" className="canvas-grid relative border-b border-[#182438]/15">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid min-h-[740px] grid-cols-1 items-stretch lg:grid-cols-12">
              <div className="relative z-10 flex flex-col justify-between py-14 lg:col-span-7 lg:py-20 xl:py-24">
                <div className="reveal flex items-center gap-3">
                  <span className="h-px w-10 bg-[#2457f5]" />
                  <p className="eyebrow text-[#2457f5]">Tecnologia empresarial, em perspectiva</p>
                </div>
                <div className="my-12 max-w-[780px] lg:my-0">
                  <p className="reveal reveal-delay-1 mb-5 font-mono text-[10px] tracking-[.14em] text-[#182438]/55">EDIÇÃO 01 — MODELO INSTITUCIONAL</p>
                  <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.65rem,8.2vw,7.6rem)] leading-[.87] tracking-[-.065em] text-[#182438]">
                    Tecnologia organizada para a <em className="font-display text-[#2457f5]">próxima</em> decisão.
                  </h1>
                  <p className="reveal reveal-delay-2 mt-8 max-w-[570px] text-base leading-8 text-[#182438]/70 sm:text-lg">
                    A Nexus Orbit apresenta uma forma mais clara de conectar estratégia, dados e operação em organizações que se movem todos os dias.
                  </p>
                  <div className="reveal reveal-delay-2 mt-9 flex flex-wrap items-center gap-5">
                    <Button onClick={() => handleDemo("Explorar a estrutura")} className="h-12 rounded-none bg-[#182438] px-6 text-xs font-extrabold tracking-wide hover:bg-[#2457f5] active:scale-[.97]">
                      Explorar a estrutura <MoveRight className="ml-2 h-4 w-4" />
                    </Button>
                    <a href="#visao" className="editorial-link text-xs font-bold uppercase tracking-[.12em]">Ver nossa visão <ArrowDownRight className="h-4 w-4" /></a>
                  </div>
                </div>
                <div className="reveal reveal-delay-2 grid max-w-[630px] grid-cols-3 gap-5 border-t border-[#182438]/20 pt-5 sm:gap-9">
                  <div><p className="font-display text-3xl leading-none">C</p><p className="mt-2 font-mono text-[9px] uppercase leading-4 tracking-[.1em] text-[#182438]/60">Clareza como princípio</p></div>
                  <div><p className="font-display text-3xl leading-none">O</p><p className="mt-2 font-mono text-[9px] uppercase leading-4 tracking-[.1em] text-[#182438]/60">Operação conectada</p></div>
                  <div><p className="font-display text-3xl leading-none">E</p><p className="mt-2 font-mono text-[9px] uppercase leading-4 tracking-[.1em] text-[#182438]/60">Evolução contínua</p></div>
                </div>
              </div>

              <div className="relative min-h-[400px] overflow-hidden border-l border-[#182438]/15 lg:col-span-5 lg:min-h-0">
                <img src={img.hero} alt="Ambiente contemporâneo de trabalho e operação" className="image-breathe absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#182438]/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/25 bg-[#182438]/85 p-5 text-white backdrop-blur-sm sm:p-7">
                  <p className="eyebrow text-white/55">Ponto de vista</p>
                  <p className="mt-2 font-display text-2xl leading-tight">Sistemas não precisam ser opacos para serem complexos.</p>
                </div>
                <div className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-[#2457f5]/85 text-white backdrop-blur sm:right-7 sm:top-7"><Orbit className="h-7 w-7" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#182438]/15 bg-[#182438] text-[#f8f7f2]" aria-label="Aviso de transparência">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-5 px-5 py-6 sm:px-8 lg:grid-cols-12 lg:px-12">
            <p className="eyebrow text-[#96adff] lg:col-span-2">Nota de transparência</p>
            <p className="text-sm leading-6 text-white/80 lg:col-span-8">Esta é uma página institucional demonstrativa. Dados de empresa, contato, carteira, certificações, métricas e depoimentos devem ser adicionados apenas quando forem reais e verificáveis.</p>
            <a className="editorial-link justify-self-start text-xs font-bold uppercase tracking-[.1em] text-white lg:col-span-2 lg:justify-self-end" href="#governanca">Conhecer o padrão <ArrowDownRight className="h-4 w-4" /></a>
          </div>
        </section>

        <section id="visao" className="relative py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
            <aside className="lg:col-span-3">
              <p className="eyebrow text-[#2457f5]">01 / Visão</p>
              <p className="mt-4 max-w-[210px] font-mono text-[10px] uppercase leading-5 tracking-[.12em] text-[#182438]/50">Uma organização pode ter mais tecnologia e menos ruído.</p>
            </aside>
            <div className="lg:col-span-6">
              <h2 className="font-display text-[clamp(3rem,5.5vw,5.4rem)] leading-[.93] tracking-[-.055em]">Um sistema de negócios deve ampliar a visão de quem decide.</h2>
              <p className="mt-8 max-w-[610px] text-base leading-8 text-[#182438]/70 sm:text-lg">Em vez de apresentar ferramentas isoladas, a Nexus Orbit estrutura conversas que conectam contextos, processos e pessoas. O objetivo é tornar o próximo movimento compreensível, discutível e responsável.</p>
            </div>
            <div className="flex items-end lg:col-span-3">
              <div className="w-full border-t border-[#182438]/25 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#182438]/50">Princípio editorial</p>
                <p className="mt-3 text-sm leading-6 text-[#182438]/70">Uma boa página institucional informa o suficiente para orientar sem inventar confiança.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eae8df] py-7">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
            <p className="eyebrow">Três planos de leitura</p>
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-bold"><span>Estratégia</span><span className="text-[#2457f5]">→</span><span>Operação</span><span className="text-[#2457f5]">→</span><span>Evolução</span></div>
            <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#182438]/55">Uma estrutura para adaptar</p>
          </div>
        </section>

        <section id="solucoes" className="py-24 sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-14 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-3"><p className="eyebrow text-[#2457f5]">02 / Campos de atuação</p></div>
              <div className="lg:col-span-7"><h2 className="font-display text-[clamp(2.9rem,5vw,5rem)] leading-[.93] tracking-[-.055em]">De questões críticas a estruturas que suportam trabalho real.</h2></div>
              <p className="text-sm leading-6 text-[#182438]/65 lg:col-span-2">Módulos institucionais que podem ser ajustados à atuação real da organização.</p>
            </div>

            <div className="grid grid-cols-1 border-y border-[#182438]/20 md:grid-cols-2">
              {operationalAreas.map((area, i) => {
                const Icon = area.icon;
                return <article key={area.no} className={`group min-h-[290px] border-[#182438]/20 p-7 transition-colors hover:bg-[#2457f5] hover:text-white sm:p-9 ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                  <div className="flex items-start justify-between"><span className="font-mono text-[11px] text-[#2457f5] group-hover:text-white/70">{area.no}</span><Icon className="h-6 w-6 text-[#182438]/60 transition-transform group-hover:rotate-12 group-hover:text-white" /></div>
                  <div className="mt-16"><h3 className="font-display text-3xl tracking-[-.04em]">{area.title}</h3><p className="mt-4 max-w-[360px] text-sm leading-6 text-[#182438]/65 group-hover:text-white/80">{area.text}</p></div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#182438]/15 bg-[#182438] py-8 text-white">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
            {[["Arquitetura", "A composição dos elementos e seus limites."], ["Cadência", "O ritmo que torna o avanço acompanhável."], ["Evidência", "O registro do que sustenta uma decisão."]].map(([title, text]) => <div key={title} className="data-cell"><p className="eyebrow text-[#96adff]">{title}</p><p className="mt-1 text-sm text-white/70">{text}</p></div>)}
          </div>
        </section>

        <section id="metodo" className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5 lg:pr-8">
              <p className="eyebrow text-[#2457f5]">03 / Método de trabalho</p>
              <h2 className="mt-7 font-display text-[clamp(3rem,5.3vw,5.35rem)] leading-[.92] tracking-[-.055em]">Menos discurso. Mais sequência.</h2>
              <p className="mt-8 max-w-[465px] text-base leading-8 text-[#182438]/70">O método transforma temas amplos em um fluxo de entendimento, definição, implementação e aprendizado. Nesta demonstração, cada etapa representa uma prática adaptável — não um serviço já contratado ou um resultado garantido.</p>
              <div className="mt-10 overflow-hidden border border-[#182438]/15 bg-[#eae8df]">
                <img className="image-breathe aspect-[3/2] w-full object-cover" src={img.systems} alt="Composição abstrata de sistemas conectados" />
                <div className="p-5"><p className="eyebrow text-[#2457f5]">Matéria & sistema</p><p className="mt-2 text-sm leading-6 text-[#182438]/65">Tecnologia também pode ter presença física: documentos, rituais, critérios e interfaces precisam conversar entre si.</p></div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ol className="border-t border-[#182438]/20">
                {[
                  ["01", "Enquadrar", "Delimitar o problema, a decisão em jogo, as pessoas envolvidas e o contexto disponível."],
                  ["02", "Conectar", "Organizar informações, processos e pontos de dependência que influenciam a operação."],
                  ["03", "Compor", "Desenhar a solução em camadas: experiência, dados, rotinas e governança."],
                  ["04", "Acompanhar", "Criar um ritmo de revisão que registre mudanças, aprendizados e próximos passos."],
                ].map(([number, title, desc]) => <li key={number} className="group grid grid-cols-[62px_1fr_auto] gap-4 border-b border-[#182438]/20 py-8 sm:grid-cols-[82px_1fr_auto] sm:py-10"><span className="font-mono text-xs text-[#2457f5]">{number}</span><div><h3 className="font-display text-3xl tracking-[-.04em] sm:text-4xl">{title}</h3><p className="mt-3 max-w-[510px] text-sm leading-6 text-[#182438]/65">{desc}</p></div><ArrowDownRight className="mt-1 h-5 w-5 text-[#182438]/45 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-[#2457f5]" /></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-[#d9e1fd] py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-9 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-3"><p className="eyebrow text-[#2457f5]">A pergunta orientadora</p></div>
            <div className="lg:col-span-8"><blockquote className="font-display text-[clamp(2.65rem,5vw,5rem)] leading-[.98] tracking-[-.055em]">“O que a equipe precisa enxergar agora para tomar uma decisão melhor depois?”</blockquote></div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden border border-[#182438]/15 bg-white">
                <img className="image-breathe aspect-[4/5] w-full object-cover" src={img.strategy} alt="Profissional em espaço de estratégia contemporâneo" />
                <div className="border-t border-[#182438]/15 p-5"><p className="eyebrow text-[#2457f5]">Pensamento em perspectiva</p><p className="mt-2 text-sm leading-6 text-[#182438]/65">Ambientes, ferramentas e linguagem podem tornar discussões técnicas mais acessíveis.</p></div>
              </div>
            </div>
            <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-[#2457f5]">04 / Princípios</p>
              <h2 className="mt-7 font-display text-[clamp(3rem,5vw,5.25rem)] leading-[.92] tracking-[-.055em]">A forma como se constrói muda a qualidade do que se entrega.</h2>
              <div className="mt-9 space-y-0 border-t border-[#182438]/20">
                {principles.map(([title, text], i) => <div key={title} className="grid grid-cols-[24px_1fr] gap-4 border-b border-[#182438]/20 py-5"><span className="font-mono text-[10px] text-[#2457f5]">0{i + 1}</span><div><h3 className="text-sm font-extrabold">{title}</h3><p className="mt-2 max-w-[550px] text-sm leading-6 text-[#182438]/65">{text}</p></div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="governanca" className="relative overflow-hidden bg-[#182438] py-24 text-white sm:py-32">
          <div className="absolute -right-24 -top-24 h-[430px] w-[430px] rounded-full border border-white/10" /><div className="absolute -right-10 -top-10 h-[260px] w-[260px] rounded-full border border-[#96adff]/30" />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-3"><p className="eyebrow text-[#96adff]">05 / Governança</p></div>
            <div className="lg:col-span-6"><h2 className="font-display text-[clamp(3rem,5.3vw,5.3rem)] leading-[.92] tracking-[-.055em]">Confiança começa pela precisão do que se publica.</h2><p className="mt-8 max-w-[620px] text-base leading-8 text-white/70">Antes da publicação de uma página institucional, é essencial validar que todo dado apresentado é atual, autorizado e passível de comprovação. Abaixo está um checklist prático para transformar este modelo em um canal corporativo real.</p></div>
            <div className="lg:col-span-3"><ShieldCheck className="h-12 w-12 text-[#96adff]" /><p className="mt-5 font-mono text-[10px] uppercase leading-5 tracking-[.12em] text-white/50">Sem dados inventados, sem garantias de resultado, sem falsas provas sociais.</p></div>
          </div>
          <div className="relative mx-auto mt-14 max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 border-y border-white/20 md:grid-cols-2">
              {[
                "Razão social, CNPJ e nome fantasia verificados",
                "Endereço, e-mail e telefone próprios e ativos",
                "Descrição fiel de produtos, serviços e atuação",
                "Políticas legais revisadas para o tratamento real de dados",
                "Certificações e parcerias somente com comprovação",
                "Cases e depoimentos apenas com autorização documentada",
              ].map((item, i) => <div key={item} className={`flex gap-4 border-white/20 p-5 text-sm leading-6 text-white/75 ${i % 2 === 0 ? "md:border-r" : ""} ${i < 4 ? "border-b" : ""}`}><Check className="mt-1 h-4 w-4 shrink-0 text-[#96adff]" />{item}</div>)}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <div className="lg:col-span-4"><p className="eyebrow text-[#2457f5]">06 / Perguntas frequentes</p><h2 className="mt-6 font-display text-5xl leading-[.93] tracking-[-.05em]">O que precisa acontecer antes de publicar?</h2></div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion type="single" collapsible className="border-t border-[#182438]/20">
                <AccordionItem value="item-1" className="border-[#182438]/20"><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">Esta página representa uma empresa real?</AccordionTrigger><AccordionContent className="max-w-[620px] pb-6 text-sm leading-7 text-[#182438]/65">Não. Nexus Orbit é uma identidade demonstrativa usada para mostrar uma estrutura editorial de site institucional. O conteúdo deve ser adaptado antes de qualquer uso público.</AccordionContent></AccordionItem>
                <AccordionItem value="item-2" className="border-[#182438]/20"><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">Quais dados devem substituir os exemplos?</AccordionTrigger><AccordionContent className="max-w-[620px] pb-6 text-sm leading-7 text-[#182438]/65">Inclua os dados cadastrais reais, canais de contato, escopo efetivo de atuação, políticas de privacidade, termos de uso e informações comerciais que possam ser verificadas.</AccordionContent></AccordionItem>
                <AccordionItem value="item-3" className="border-[#182438]/20"><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">A página já possui funções de venda ou atendimento?</AccordionTrigger><AccordionContent className="max-w-[620px] pb-6 text-sm leading-7 text-[#182438]/65">Não. Os botões desta demonstração apenas exibem um aviso. Antes de publicar, conecte-os a formulários, canais ou fluxos oficiais da empresa responsável.</AccordionContent></AccordionItem>
                <AccordionItem value="item-4" className="border-[#182438]/20"><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">O layout é responsivo?</AccordionTrigger><AccordionContent className="max-w-[620px] pb-6 text-sm leading-7 text-[#182438]/65">Sim. A composição foi projetada para preservar hierarquia, tipografia e leitura em telas grandes e dispositivos móveis.</AccordionContent></AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="border-t border-[#182438]/15 bg-[#eae8df] py-12">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 sm:px-8 md:grid-cols-12 md:items-center lg:px-12">
            <div className="md:col-span-8"><p className="eyebrow text-[#2457f5]">Próximo passo</p><h2 className="mt-3 font-display text-4xl leading-[.95] tracking-[-.045em] sm:text-5xl">Use esta estrutura como ponto de partida — e preencha-a com fatos.</h2></div>
            <div className="md:col-span-4 md:text-right"><Button onClick={() => handleDemo("Preparar a publicação")} className="h-12 rounded-none bg-[#2457f5] px-6 text-xs font-extrabold uppercase tracking-[.08em] hover:bg-[#183da9] active:scale-[.97]">Preparar a publicação <ArrowUpRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#f8f7f2]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 border-b border-[#182438]/15 py-14 md:grid-cols-12">
            <div className="md:col-span-4"><div className="flex items-center gap-3"><img src={img.mark} alt="Símbolo Nexus Orbit" className="h-12 w-12 object-contain" /><p className="font-display text-3xl tracking-[-.05em]">Nexus Orbit</p></div><p className="mt-5 max-w-[310px] text-sm leading-6 text-[#182438]/65">Demonstração de uma experiência institucional para organizações que trabalham na interseção de estratégia, tecnologia e operação.</p></div>
            <div className="md:col-span-2"><p className="eyebrow text-[#182438]/50">Índice</p><div className="mt-4 space-y-2.5 text-sm font-bold">{navItems.map(([label, href]) => <a className="block transition-colors hover:text-[#2457f5]" href={href} key={label}>{label}</a>)}</div></div>
            <div className="md:col-span-3"><p className="eyebrow text-[#182438]/50">Dados institucionais</p><p className="mt-4 text-sm leading-6 text-[#182438]/65">Demonstração sem dados cadastrais reais. Antes da publicação, inclua somente CNPJ, razão social, endereço e canais oficiais da empresa responsável.</p></div>
            <div className="md:col-span-3"><p className="eyebrow text-[#182438]/50">Responsabilidade</p><p className="mt-4 text-sm leading-6 text-[#182438]/65">O conteúdo apresentado é um modelo visual e editorial. Não constitui proposta comercial, certificação, oferta ou promessa de resultado.</p></div>
          </div>
          <div className="flex flex-col gap-4 py-6 text-[10px] uppercase tracking-[.1em] text-[#182438]/50 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Nexus Orbit — demonstração institucional</p><div className="flex gap-5"><span>Privacidade: adaptar antes de publicar</span><span>Termos: adaptar antes de publicar</span></div></div>
        </div>
      </footer>
    </div>
  );
}

