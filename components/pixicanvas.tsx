"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

interface PixiCanvasProps {
  json: string;
}

export default function PixiCanvas({ json }: PixiCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: PIXI.Application;

    (async () => {
      const config = await fetch(json).then((r) => r.json());
      app = new PIXI.Application();

      await app.init({ resizeTo: window, backgroundAlpha: 0, antialias: true });

      if (!containerRef.current) return;

      containerRef.current.appendChild(app.canvas);

      const texture =
        await PIXI.Assets.load(config.texture);

      const cols = config.spritesheet.cols ?? 1;
      const rows = config.spritesheet.rows ?? 1;
      const frameWidth = Math.floor(texture.width / cols);
      const frameHeight = Math.floor(texture.height / rows);
      const frames: PIXI.Texture[] = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          frames.push(
            new PIXI.Texture({
              source: texture.source,
              frame: new PIXI.Rectangle(
                x * frameWidth,
                y * frameHeight,
                frameWidth,
                frameHeight
              ),
            })
          );
        }
      }

      const tree = new PIXI.AnimatedSprite(frames);

      tree.anchor.set(0.5);
      tree.x = app.screen.width / 2;
      tree.y = app.screen.height / 2;
      tree.animationSpeed = config.animationSpeed ?? 0.03;
      tree.loop = config.loop ?? true;
      tree.scale.set(config.scale ?? 1);

      tree.play();

      app.stage.addChild(tree);
    })();

    return () => { app?.destroy(true); };
  }, [json]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none w-screen h-screen"
    />
  );
}