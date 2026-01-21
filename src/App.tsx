import { useCallback, useEffect, useMemo, useState } from "react";

const usePanels = () =>
  useMemo(
    () => [
      {
        id: 1,
        src: "/viñetas/vn1.png",
        title: "Viñeta 1",
        subtitle: "Leo en su habitación",
      },
      {
        id: 2,
        src: "/viñetas/vn2.png",
        title: "Viñeta 2",
        subtitle: "Soledad digital",
      },
      {
        id: 3,
        src: "/viñetas/vn3.png",
        title: "Viñeta 3",
        subtitle: "El taller de don Bosco",
      },
      {
        id: 4,
        src: "/viñetas/vn4.png",
        title: "Viñeta 4",
        subtitle: "Charla aburrida",
      },
      {
        id: 5,
        src: "/viñetas/vn5.png",
        title: "Viñeta 5",
        subtitle: "Leo acepta ir a la charla de don Bosco",
      },
      {
        id: 6,
        src: "/viñetas/vn6.png",
        title: "Viñeta 6",
        subtitle: "Mensaje inspirador de don Bosco",
      },
    ],
    []
  );

export default function App() {
  const panels = usePanels();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const total = panels.length;
  const progress = ((index + 1) / total) * 100;

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

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
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
  }, [nextPanel, prevPanel]);

  const panel = panels[index];
  const animationClass =
    direction === 1 ? "animate-panelInRight" : "animate-panelInLeft";

  return (
    <div className="min-h-screen bg-atmosphere text-stone-900">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-200/70 blur-3xl animate-floatSlow" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-200/70 blur-3xl animate-floatSlow" />
        <div className="relative z-10 flex min-h-screen flex-col px-6 py-8 md:px-12">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-stone-600">
                1ºSMR - Alejandro RN
              </p>
              <h1 className="font-display text-4xl uppercase tracking-[0.12em] md:text-6xl">
                Comic Digital Don Bosco
              </h1>
            </div>
            <div className="glass-panel flex items-center gap-4 rounded-full px-5 py-3 text-sm text-stone-700 shadow-lg">
              <span className="font-semibold">
                Vineta {index + 1} / {total}
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
                  <img
                    key={panel.id}
                    src={panel.src}
                    alt={`Vineta ${panel.id}`}
                    className={`h-full w-full object-contain ${animationClass}`}
                    onClick={nextPanel}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                      Capitulo
                    </p>
                    <h2 className="font-display text-3xl uppercase tracking-[0.12em] text-stone-800">
                      {panel.title}
                    </h2>
                    <p className="max-w-md text-sm text-stone-600">
                      {panel.subtitle}
                    </p>
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
                aria-label="Vineta anterior"
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={nextPanel}
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-stone-700 shadow-md transition hover:translate-x-1 hover:bg-white md:block"
                aria-label="Siguiente vineta"
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
                  <img
                    src={item.src}
                    alt={`Miniatura ${item.id}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
