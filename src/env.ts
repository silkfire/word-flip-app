import { defineConfig, Schema } from '@julr/vite-plugin-validate-env';

export default defineConfig({
  validator: 'builtin',
  schema: {
    VITE_API_URL: Schema.string({ format: 'url', protocol: true, tld: false }),
    PORT: Schema.number.optional(),
    HOST: Schema.string.optional({ format: 'host' }),
  },
});
