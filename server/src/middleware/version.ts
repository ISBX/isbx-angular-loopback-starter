import { exec } from  'child_process';
let npmVersion = require('../../../package.json').version;

let gitVersion = null;

exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
  gitVersion = stdout.trim();
});

export = () => {
  return (req, res, next) => {
    res.header('X-Version', npmVersion + ' (' + gitVersion + ')');
    next();
  };
};
