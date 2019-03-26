const couchbase = require('couchbase')
class Database {
  constructor() {
    this.N1ql = couchbase.N1qlQuery;
    this.bucket = null;
    try {
      console.log('Initialize couchbase connection');
      const cluster = new couchbase.Cluster(`couchbase://${global.CB_HOSTNAME}/`);
      const manager = cluster.manager(global.CB_ADMIN, global.CB_PASS);
      const bucketName = global.CB_BUCKETNAME;
      var $this = this;
      manager.listBuckets(function(err, res) {
        if (err) {
          console.log(err)
          process.exit(1);
        }
        if (!res.filter(function (bucket) { return bucket.name === bucketName; }).length) {
          console.log('App bucket does not exist, creating');
          manager.createBucket(bucketName, {
            ramQuotaMB: global.CB_RAMSIZE,
            replicaNumber: 0,
            replicaIndex: 0,
          }, function(err) {
            if (err && global.NODE_ENV === "development") {
              console.log(err)
            }
          });
        }
        cluster.authenticate(global.CB_ADMIN, global.CB_PASS);
        $this.bucket = cluster.openBucket(bucketName);
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    return this;
  }

  query(sql, done) {
    if (global.NODE_ENV === "development") {
      console.log("CB QUERY: ",sql);
    }
    var query = this.N1ql.fromString(sql);
    this.bucket.query(query, function(err, result){
      if (err) {
        if (global.NODE_ENV === "development") {
          console.log("CB ERR: ", err);
        }
        return done(err, null);
      }
      done(null, result);
    });
  }

  get(key, done) {
    if (!this.bucket.get) {
      return done({message: 'db connection not initialized'}, null);
    }
    if (global.NODE_ENV === "development") {
      console.log("CB GET: ", key);
    }
    this.bucket.get(key, function (err, result) {
      if (err) {
        console.log(err);
        if (global.NODE_ENV === "development") {
          console.log("CB ERR: ", err);
        }
        return done(err, null);
      }
      done(null, result);
    });
  }
}
module.exports = new Database();
