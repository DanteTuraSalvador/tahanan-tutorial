import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Dev proxy: forward POST /api/chat → Groq, injecting the key from .env
// server-side. This matches the Cloudflare Pages Function in production, so
// the frontend can call the same path in both environments.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const groqKey = env.GROQ_API_KEY || env.VITE_GROQ_API_KEY || '';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api/chat': {
          target: 'https://api.groq.com',
          changeOrigin: true,
          secure: true,
          rewrite: () => '/openai/v1/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (groqKey) {
                proxyReq.setHeader('Authorization', `Bearer ${groqKey}`);
              }
            });
          }
        }
      }
    }
  };
});
