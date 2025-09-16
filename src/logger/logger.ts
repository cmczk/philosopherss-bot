export const logger = {
  info: (...args: any[]) =>
    console.info("[INFO]", new Date().toISOString(), ...args),
  warn: (...args: any[]) =>
    console.warn("[WARN]", new Date().toISOString(), ...args),
  error: (...args: any[]) =>
    console.error("[ERROR]", new Date().toISOString, ...args),
  debug: (...args: any[]) => {
    if (process.env.DEBUG === "true") {
      console.debug("[DEBUG]", new Date().toISOString(), ...args)
    }
  },
}
