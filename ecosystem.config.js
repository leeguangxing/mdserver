module.exports = {
  apps: [{
    name: 'mdserver',
    script: '/var/web/bin/www',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    exec_mode: 'cluster',
    listen_timeout: 3000, // wait ready timeout
    kill_timeout: 5000, // send SIGKILL timeout
  }]
};
