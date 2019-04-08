const getInterval = (timeDiff) => {
  switch (!0) {
    case timeDiff <= 5e3: return '1s';
    case timeDiff <= 7500: return '5s';
    case timeDiff <= 15e3: return '10s';
    case timeDiff <= 45e3: return '30s';
    case timeDiff <= 18e4: return '1m';
    case timeDiff <= 45e4: return '5m';
    case timeDiff <= 12e5: return '10m';
    case timeDiff <= 27e5: return '30m';
    case timeDiff <= 72e5: return '1h';
    case timeDiff <= 216e5: return '3h';
    case timeDiff <= 864e5: return '12h';
    case timeDiff <= 6048e5: return '1d';
    case timeDiff <= 18144e5: return '7d';
    case timeDiff < 36288e5: return '1M';
    default: return '1y';
  }
};

export default { getInterval };
