import Statsd from './statsd.ts';
import { Prometheus } from './prometheus.ts';
import logger from '../logger.ts';

const enableStats = Deno.env.ENABLE_STATS !== 'false';
const statsClientType = Deno.env.STATS_CLIENT || 'statsd';

let statsClient;
function init() {
  if (!enableStats) {
    return;
  }

  switch (statsClientType) {
    case 'statsd':
      logger.info('setting up statsd client');
      statsClient = new Statsd();
      break;

    case 'prometheus':
      logger.info('setting up prometheus client');
      statsClient = new Prometheus();
      break;

    default:
      logger.error(
        `invalid stats client type: ${statsClientType}, supported values are 'statsd' and 'prometheues'`,
      );
  }
}

// Sends the diff between current time and start as the stat
const timing = (name, start, tags = {}) => {
  if (!enableStats || !statsClient) {
    return;
  }

  statsClient.timing(name, start, tags);
};

const increment = (name, tags = {}) => {
  if (!enableStats || !statsClient) {
    return;
  }

  statsClient.increment(name, tags);
};

const counter = (name, delta, tags = {}) => {
  if (!enableStats || !statsClient) {
    return;
  }

  statsClient.counter(name, delta, tags);
};

const gauge = (name, value, tags = {}) => {
  if (!enableStats || !statsClient) {
    return;
  }

  statsClient.gauge(name, value, tags);
};

const histogram = (name, value, tags = {}) => {
  if (!enableStats || !statsClient) {
    return;
  }

  statsClient.histogram(name, value, tags);
};

async function metricsController(ctx) {
  if (!enableStats || !statsClient) {
    ctx.status = 404;
    ctx.body = `Not supported`;
    return;
  }

  if (statsClientType === 'prometheus') {
    await statsClient.metricsController(ctx);
    return;
  }

  ctx.status = 404;
  ctx.body = `Not supported`;
}

init();

export default { init, timing, increment, counter, gauge, histogram, metricsController };
