import { z } from 'zod';
import { insertDemoRequestSchema, demoRequests } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  demoRequests: {
    create: {
      method: 'POST' as const,
      path: '/api/demo-requests' as const,
      input: insertDemoRequestSchema,
      responses: {
        201: z.custom<typeof demoRequests.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
