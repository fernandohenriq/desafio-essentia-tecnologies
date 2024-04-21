export function extractQuerySearch<T = unknown>(query?: Record<string, any>): Search<T> {
  const {
    page = 1,
    limit = 10,
    orderBy = 'createdAt',
    sort = 'desc',
    where: whereString,
    ...whereRest
  } = query || {};

  const where: Record<string, any> = {
    ...parseWhere(whereString),
    ...parseWhere(whereRest),
  };

  return {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    orderBy: orderBy || 'createdAt',
    sort: (sort || 'desc').toLowerCase(),
    where,
  };
}

function parseWhere(input: unknown): Record<string, any> {
  let where: Record<string, any> = {};
  try {
    if (input === undefined || input === null) {
      return {};
    }
    if (typeof input === 'string') {
      try {
        input = JSON.parse(input);
      } catch (err) {}
      if (typeof input !== 'object') {
        input = {};
      }
    }
    for (let [key, value] of Object.entries(input as Record<string, any>)) {
      if (typeof value === 'string') {
        if (!isNaN(Number(value))) {
          where[key] = Number(value);
          continue;
        }
        if (!isNaN(Date.parse(value))) {
          where[key] = new Date(value).toISOString();
          continue;
        }
        if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
          where[key] = Boolean(value);
          continue;
        }
        if (value.startsWith('{') && value.endsWith('}')) {
          try {
            where[key] = JSON.parse(value);
          } catch (err) {
            where[key] = {};
          }
          continue;
        }
      }
      where[key] = value;
    }
    return where;
  } catch (error) {
    return where;
  }
}
