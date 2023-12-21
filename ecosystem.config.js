module.exports = {
    apps: [
      {
        name: 'next',
        cwd: '.',
        script: 'yarn dev',
        exec_mode: 'fork_mode',
        time: true,
        instances: 1,
        max_memory_restart: '1G',
        autorestart: true,
        max_restarts: 1,
      },
    ],
  };
  