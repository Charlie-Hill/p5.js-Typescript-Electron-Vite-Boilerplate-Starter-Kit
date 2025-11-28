export {}; // Make this a module to avoid global scope pollution

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void;
      receive: (channel: string, func: (...args: any[]) => void) => void;
      quitApp: () => Promise<void>;
      getVersion: () => Promise<string>;
    };
  }
}
