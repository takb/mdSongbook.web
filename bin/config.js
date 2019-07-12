// todo: put ENVs in docker-compose

// process.env.NODE_ENV = 'production';
global.NODE_ENV = process.env.NODE_ENV || 'development';

global.CB_HOSTNAME = process.env.CB_HOSTNAME || 'localhost';
global.CB_ADMIN = process.env.CB_ADMIN_USER || 'Administrator';
global.CB_PASS = process.env.CB_ADMIN_PASS || 'default password';
global.CB_RAMSIZE = process.env.CB_RAMSIZE || 512;
global.CB_BUCKETNAME = process.env.CB_BUCKETNAME || "markflat.web"; 


// JWT session
global.SESSION_TTL = process.env.SESSION_TTL || 3600;
global.JWT_KEY = process.env.JWT_KEY || "a secret for jwt signing";

// security
global.PASSHASH_SALT = process.env.PASSHASH_SALT || "a secret for password hashing";
