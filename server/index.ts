import { exec } from 'child_process';

const viteProcess = exec('npx vite --host 0.0.0.0 --port 5000', {
  cwd: process.cwd(),
});

viteProcess.stdout?.pipe(process.stdout);
viteProcess.stderr?.pipe(process.stderr);

viteProcess.on('error', (error) => {
  console.error('Error running Vite:', error);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGTERM', () => {
  viteProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  viteProcess.kill('SIGINT');
});
