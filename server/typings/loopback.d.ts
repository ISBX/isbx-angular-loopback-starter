declare module "loopback" {
  import * as express from "express-serve-static-core";

  interface LoopbackServer extends express.Express {
    models: any;

    start(): void;
    emit(event: string): void;

  }

  function l(): LoopbackServer;

  export = l;
}

declare module "loopback-boot" {
  function boot(app: any, directory: string): void;

  export = boot;
}

declare module "loopback-explorer" {
  function explorer(app: any, options: any);

  export = explorer;
}
