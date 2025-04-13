// src/validation/custom-joi.ts
import * as baseJoi from 'joi';

const customJoi = baseJoi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    allowUnknown: false,
    // Add other defaults here
  }),
);

export default customJoi;
