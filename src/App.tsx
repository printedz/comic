import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const baseUrl = import.meta.env.BASE_URL;
const usePanels = () =>
  useMemo(
    () => [
      {
        id: 1,
        src: `${baseUrl}viñetas/vn1.webp`,
        chapter: "Capítulo 1 – Pantallas Encendidas, Corazón Apagado",
        title: "Viñeta 1",
        subtitle: "Plano general: Leo en su habitación.",
        lines: [
          "Varias pantallas encendidas: móvil, tablet, computadora.",
          "Texto de apoyo: “Miles de mensajes… y nadie con quien hablar de verdad.”",
        ],
      },
      {
        id: 2,
        src: `${baseUrl}viñetas/vn2.webp`,
        chapter: "Capítulo 1 – Pantallas Encendidas, Corazón Apagado",
        title: "Viñeta 2",
        subtitle: "Primer plano del rostro de Leo.",
        lines: [
          "Mira la pantalla con expresión cansada.",
          "Leo (pensamiento): “Estoy conectado a todos… pero me siento solo.”",
        ],
      },
      {
        id: 3,
        src: `${baseUrl}viñetas/vn3.webp`,
        chapter: "Capítulo 2 – Un Mensaje Diferente",
        title: "Viñeta 3",
        subtitle: "Pantalla del móvil.",
        lines: ["Notificación de un chat comunitario: “¿Te sumas al taller?”"],
      },
      {
        id: 4,
        src: `${baseUrl}viñetas/vn4.webp`,
        chapter: "Capítulo 2 – Un Mensaje Diferente",
        title: "Viñeta 4",
        subtitle: "Leo duda. Baja el móvil.",
        lines: ["Leo: “Seguro es otra charla aburrida…”"],
      },
      {
        id: 5,
        src: `${baseUrl}viñetas/vn5.webp`,
        chapter: "Capítulo 2 – Un Mensaje Diferente",
        title: "Viñeta 5",
        subtitle: "Nuevo mensaje, tono cercano.",
        lines: [
          "“No tienes que hablar si no quieres. Solo ven.”",
          "Leo suspira y acepta.",
        ],
      },
      {
        id: 6,
        src: `${baseUrl}viñetas/vn6.webp`,
        chapter: "Capítulo 3 – El Encuentro",
        title: "Viñeta 6",
        subtitle: "Centro juvenil con laptops, 3D y pizarras.",
        lines: [
          "Don Bosco conversa con jóvenes.",
          "Don Bosco (sonriendo): “Aquí nadie sobra. Cada uno importa.”",
        ],
      },
      {
        id: 7,
        src: `${baseUrl}viñetas/vn7.webp`,
        chapter: "Capítulo 3 – El Encuentro",
        title: "Viñeta 7",
        subtitle: "Leo se queda al fondo, mirando su móvil.",
        lines: [
          "Don Bosco: “Veo que sabes usar muy bien eso. ¿Qué te gusta crear?”",
          "Leo (sorprendido): “Videojuegos… pero solo juego. No soy bueno en nada más.”",
        ],
      },
      {
        id: 8,
        src: `${baseUrl}viñetas/vn8.webp`,
        chapter: "Capítulo 4 – Acompañar, No Imponer",
        title: "Viñeta 8",
        subtitle: "Don Bosco se sienta junto a Leo.",
        lines: ["Don Bosco: “Nadie aprende solo. Yo tampoco lo hice.”"],
      },
      {
        id: 9,
        src: `${baseUrl}viñetas/vn9.webp`,
        chapter: "Capítulo 4 – Acompañar, No Imponer",
        title: "Viñeta 9",
        subtitle: "Leo muestra un boceto digital.",
        lines: [
          "Leo: “Nunca se lo mostré a nadie.”",
          "Don Bosco: “Gracias por confiar. Eso ya es un gran esfuerzo.”",
        ],
      },
      {
        id: 10,
        src: `${baseUrl}viñetas/vn10.webp`,
        chapter: "Capítulo 5 – Aprender Juntos",
        title: "Viñeta 10",
        subtitle: "Montaje de escenas en equipo.",
        lines: [
          "Leo trabajando con otros, risas, errores y correcciones.",
          "Texto de apoyo: “Educar es creer en el bien que ya existe.”",
          "Don Bosco: “Equivocarse no es fallar, es avanzar con responsabilidad.”",
        ],
      },
      {
        id: 11,
        src: `${baseUrl}viñetas/vn11.webp`,
        chapter: "Capítulo 6 – La Alegría que Conecta",
        title: "Viñeta 11",
        subtitle: "Presentación del proyecto.",
        lines: [
          "Videojuego sobre convivencia digital y respeto.",
          "Leo (sonriendo): “Lo hicimos juntos.”",
          "Don Bosco: “Y ahora tú puedes acompañar a otros.”",
        ],
      },
      {
        id: 12,
        src: `${baseUrl}viñetas/vn12.webp`,
        chapter: "Capítulo 7 – Conectados de Verdad",
        title: "Viñeta 12",
        subtitle: "Leo deja el móvil y conversa con otros.",
        lines: [
          "Texto final: “La tecnología conecta pantallas.”",
          "“El acompañamiento conecta corazones.”",
        ],
      },
    ],
    [baseUrl]
  );

export default function App() {
  const panels = usePanels();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showIntro, setShowIntro] = useState(true);
  const [showCartel, setShowCartel] = useState(false);
  const [cartelClosing, setCartelClosing] = useState(false);
  const [cartelVisible, setCartelVisible] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const total = panels.length;
  const progress = ((index + 1) / total) * 100;
  const storyPrompt =
    "Leo tiene 16 años, vive con auriculares y el móvil en la mano. " +
    "Domina la tecnología y es creativo, pero su corazón se siente lejos. " +
    "La soledad digital lo acompaña: hay notificaciones por todas partes, " +
    "pero conversaciones reales muy pocas. Este cómic cuenta cómo un encuentro " +
    "cercano abre un camino para reconectar y acompañar a otros.";

  const goTo = useCallback(
    (next: number) => {
      const nextIndex = (next + total) % total;
      setDirection(nextIndex >= index ? 1 : -1);
      setIndex(nextIndex);
    },
    [index, total]
  );

  const nextPanel = useCallback(() => goTo(index + 1), [goTo, index]);
  const prevPanel = useCallback(() => goTo(index - 1), [goTo, index]);
  const closeCartel = useCallback(() => {
    if (!showCartel || cartelClosing) {
      return;
    }
    setCartelClosing(true);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setShowCartel(false);
      setCartelClosing(false);
      closeTimeoutRef.current = null;
    }, 500);
  }, [cartelClosing, showCartel]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (showIntro) {
        return;
      }
      if (showCartel) {
        if (["ArrowRight", " ", "Enter"].includes(event.key)) {
          event.preventDefault();
          closeCartel();
        }
        return;
      }
      if (["ArrowRight", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        nextPanel();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevPanel();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeCartel, nextPanel, prevPanel, showCartel, showIntro]);

  useEffect(() => {
    if (!showCartel) {
      setCartelVisible(false);
      return;
    }
    const rafId = window.requestAnimationFrame(() => {
      setCartelVisible(true);
    });
    const timeoutId = window.setTimeout(() => {
      closeCartel();
    }, 20000);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [closeCartel, showCartel]);

  useEffect(() => {
    if (!showCartel && closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, [showCartel]);

  const panel = panels[index];
  const animationClass =
    direction === 1 ? "animate-panelInRight" : "animate-panelInLeft";

  return (
    <div className="min-h-screen bg-atmosphere text-stone-900">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-200/70 blur-3xl animate-floatSlow" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-200/70 blur-3xl animate-floatSlow" />
        {showIntro ? (
          <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
            <div className="glass-panel w-full max-w-3xl rounded-[32px] p-8 shadow-2xl md:p-12">
              <p className="text-xs uppercase tracking-[0.6em] text-stone-500">
                Preámbulo
              </p>
              <h1 className="mt-3 font-display text-4xl uppercase tracking-[0.12em] text-stone-900 md:text-5xl">
                Conectados de Verdad
              </h1>
              <p className="mt-4 text-base text-stone-700">
                Antes de comenzar, este es el prompt que describe la historia de
                Leo y su soledad digital.
              </p>
              <div className="mt-6 rounded-2xl border border-white/70 bg-white/60 p-4 shadow-inner">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
                  Prompt
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">
                  {storyPrompt}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
                <span>
                  Leo: 16 años, creativo, hábil con la tecnología, pero aislado.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowIntro(false);
                    setShowCartel(true);
                    setCartelClosing(false);
                  }}
                  className="rounded-full bg-stone-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-stone-100 transition hover:-translate-y-0.5 hover:bg-stone-800"
                >
                  Entrar al comic
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex min-h-screen flex-col px-6 py-8 md:px-12">
            {showCartel ? (
              <div
                className={`absolute inset-0 z-20 flex items-center justify-center bg-stone-950/90 px-6 py-10 text-stone-100 transition-opacity duration-500 ${
                  cartelClosing || !cartelVisible
                    ? "pointer-events-none opacity-0"
                    : "opacity-100"
                }`}
                onClick={closeCartel}
              >
                <div className="pointer-events-none absolute inset-4 overflow-hidden rounded-[36px]">
                  <img
                    src={`${baseUrl}viñetas/cartel.webp`}
                    alt=""
                    className="h-full w-full scale-125 object-cover blur-3xl"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-stone-950/60" />
                  <div className="absolute inset-x-6 top-6 text-center">
                    <p className="font-display text-base uppercase tracking-[0.4em] text-stone-100/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] md:text-lg">
                      Conectados de Verdad: La Historia de Leo
                    </p>
                  </div>
                </div>
                <div
                  className={`relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/20 shadow-2xl transition-transform duration-700 ${
                    cartelClosing || !cartelVisible ? "scale-[1.03]" : "scale-100"
                  }`}
                  role="dialog"
                  aria-modal="true"
                  onClick={(event) => event.stopPropagation()}
                >
                  <img
                    src={`${baseUrl}viñetas/cartel.webp`}
                    alt="Cartel de la historia"
                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-80"
                  />
                  <img
                    src={`${baseUrl}viñetas/cartel.webp`}
                    alt="Cartel de la historia"
                    className="relative h-[70vh] w-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-10">
                    <p className="px-6 text-center font-display text-3xl uppercase tracking-[0.18em] text-stone-100 drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)] md:text-4xl" />
                  </div>
                  <button
                    type="button"
                    onClick={closeCartel}
                    className="absolute right-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-stone-800 transition hover:bg-white"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            ) : null}
            <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-stone-600">
                  1ºSMR - Alejandro RN
                </p>
                <h1 className="font-display text-4xl uppercase tracking-[0.12em] md:text-6xl">
                  Conectados de Verdad
                </h1>
              </div>
              <div className="glass-panel flex items-center gap-4 rounded-full px-5 py-3 text-sm text-stone-700 shadow-lg">
                <span className="font-semibold">
                  Viñeta {index + 1} / {total}
                </span>
                <span className="h-2 w-24 overflow-hidden rounded-full bg-stone-200">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </span>
              </div>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center py-10">
              <div className="relative w-full max-w-5xl">
                <div className="glass-panel absolute -inset-4 rounded-[32px] shadow-2xl" />
                <div className="relative overflow-hidden rounded-[28px] bg-stone-900/10 p-4 shadow-xl md:p-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-950/10">
                    {panel.src ? (
                      <img
                        key={panel.id}
                        src={panel.src}
                        alt={`Viñeta ${panel.id}`}
                        className={`h-full w-full object-contain ${animationClass}`}
                        onClick={nextPanel}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-stone-500">
                        <p className="text-xs uppercase tracking-[0.4em]">
                          Imagen pendiente
                        </p>
                        <p className="text-sm">
                          Esta viñeta está lista en guion y dialogo.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
                    <div className="max-w-xl">
                      <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                        {panel.chapter}
                      </p>
                      <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-stone-800">
                        {panel.title}
                      </h2>
                      <p className="mt-1 text-sm text-stone-600">
                        {panel.subtitle}
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-stone-600">
                        {panel.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={prevPanel}
                        className="rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        onClick={nextPanel}
                        className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-100 transition hover:-translate-y-0.5 hover:bg-stone-800"
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={prevPanel}
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-stone-700 shadow-md transition hover:-translate-x-1 hover:bg-white md:block"
                  aria-label="Viñeta anterior"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  onClick={nextPanel}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-stone-700 shadow-md transition hover:translate-x-1 hover:bg-white md:block"
                  aria-label="Siguiente viñeta"
                >
                  &gt;
                </button>
              </div>
            </main>

            <footer className="flex flex-col gap-4 border-t border-white/50 pt-6 text-xs uppercase tracking-[0.3em] text-stone-500 md:flex-row md:items-center md:justify-between">
              <span>Usa flechas o clic para avanzar</span>
              <div className="flex items-center gap-3">
                {panels.map((item, panelIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(panelIndex)}
                    className={`h-12 w-16 overflow-hidden rounded-lg border transition ${
                      panelIndex === index
                        ? "border-stone-800 shadow-lg"
                        : "border-white/70 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {item.src ? (
                      <img
                        src={item.src}
                        alt={`Miniatura ${item.id}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-stone-100 text-[10px] text-stone-500">
                        {item.id}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
