import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  // Set the target URL to proxy the request
  const target = 'https://replicate.com/explore';

  // Configure the proxy middleware
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    headers: {
      Authorization: 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
    },
  });

  // Proxy the request to the target URL
  proxy(req, res);
}