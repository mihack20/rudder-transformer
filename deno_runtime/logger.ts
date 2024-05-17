const levelDebug = 0; // Most verbose logging level
const levelInfo = 1; // Logs about state of the application
const levelWarn = 2; // Logs about warnings which dont immediately halt the application
const levelError = 3; // Logs about errors which dont immediately halt the application
// any value greater than levelError will work as levelNone

let logLevel = Deno.env.LOG_LEVEL ? parseInt(Deno.env.LOG_LEVEL, 10) : levelInfo;

export const setLogLevel = (level) => {
  logLevel = level || logLevel;
};

export const debug = (...args) => {
  if (levelDebug >= logLevel) {
    console.debug(...args);
  }
};

export const info = (...args) => {
  if (levelInfo >= logLevel) {
    console.info(...args);
  }
};

export const warn = (...args) => {
  if (levelWarn >= logLevel) {
    console.warn(...args);
  }
};

export const error = (...args) => {
  if (levelError >= logLevel) {
    console.error(...args);
  }
};

export default {
  debug,
  info,
  warn,
  error,
  setLogLevel,
};
