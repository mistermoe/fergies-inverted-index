const level = require('level')
const read = require('./read.js')
const write = require('./write.js')

// _match is nested by default so that AND and OR work correctly under
// the bonnet. Flatten array before presenting to consumer
const flattenMatchArrayInResults = results => results.map(result => {
  result._match = result._match.flat(Infinity)
  return result
})

const initStore = (ops = {}) => new Promise((resolve, reject) => {
  ops = Object.assign({
    name: 'fii',
    // tokenAppend can be used to create 'comment' spaces in
    // tokens. For example using '#' allows tokens like boom#1.00 to
    // be retrieved by using "boom". If tokenAppend wasnt used, then
    // {gte: 'boom', lte: 'boom'} would also return stuff like
    // boomness#1.00 etc
    tokenAppend: '',
    caseSensitive: true,
    stopwords: [],
    doNotIndexField: [],
    storeVectors: true
  }, ops)
  if (ops.db) return resolve(ops)
  // else
  level(
    ops.name, { valueEncoding: 'json' }, (err, db) => err
      ? reject(err)
      : resolve(Object.assign(ops, { db: db }))
  )
})

const makeAFii = ops => {
  const r = read(ops)
  const w = write(ops)
  return ({
    AGGREGATE: r.AGGREGATE,
    AGGREGATION_FILTER: r.AGGREGATION_FILTER,
    AND: (...keys) => r.INTERSECTION(...keys).then(
      flattenMatchArrayInResults
    ),
    BUCKET: r.BUCKET,
    BUCKETS: r.BUCKETS,
    DELETE: w.DELETE,
    DISTINCT: r.DISTINCT,
    EXPORT: r.EXPORT,
    FACETS: r.FACETS,
    FIELDS: r.FIELDS,
    GET: r.GET,
    IMPORT: w.IMPORT,
    MAX: r.MAX,
    MIN: r.MIN,
    NOT: (...keys) => r.SET_SUBTRACTION(...keys).then(
      flattenMatchArrayInResults
    ),
    OBJECT: r.OBJECT,
    OR: (...keys) => r.UNION(...keys)
      .then(result => result.union)
      .then(flattenMatchArrayInResults),
    PUT: w.PUT,
    SET_SUBTRACTION: r.SET_SUBTRACTION,
    STORE: ops.db,
    parseToken: r.parseToken
  })
}

module.exports = ops => initStore(ops).then(makeAFii)
