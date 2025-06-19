"use client";

import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState, ReactNode } from "react";
import { loadAll } from "@tsparticles/all";
import Particles, { initParticlesEngine } from "@tsparticles/react";

type BackgroundParticlesProps = {
  children: ReactNode;
};

export default function BackgroundParticles({ children }: BackgroundParticlesProps) {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  const { backgroundColor, linksColor, particlesColor } = useMemo(() => {
    const themeColors = {
      light: {
        backgroundColor: "#F8F8F8FF",
        linksColor: "#111111FF",
        particlesColor: "#111111FF",
      },
      dark: {
        backgroundColor: "#111111FF",
        linksColor: "#F8F8F8FF",
        particlesColor: "#F8F8F8FF",
      },
    };
    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  }, [theme]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: backgroundColor,
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: particlesColor },
        links: {
          color: linksColor,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 4,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          speed: 4,
        },
        number: {
          density: { enable: true },
          value: 50,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [backgroundColor, linksColor, particlesColor]
  );

  return (
    <div className="relative min-h-screen bg-transparent">
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 -z-10"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
