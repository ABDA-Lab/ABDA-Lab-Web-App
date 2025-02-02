import z from 'zod';

// ✅ Define Request Body Schema for Login
export const LoginBody = z
    .object({
        username: z.string().nonempty('Username is required'), // Username must be provided
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .max(100, 'Password must not exceed 100 characters'), // Password length validation
    })
    .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

// ✅ Define Response Schema for Login (Success & Error handling)
export const LoginRes = z.object({
    value: z
        .object({
            accessToken: z.string(), // JWT Access Token
            refreshToken: z.string(), // JWT Refresh Token
        })
        .optional(), // `value` is present only in success responses
    isSuccess: z.boolean(), // Indicates if login was successful
    isFailure: z.boolean(), // Indicates if login failed
    error: z
        .object({
            code: z.string().nullable(), // Error code (if any)
            description: z.string().nullable(), // Error description (if any)
        })
        .nullable(), // `error` can be null or undefined in success responses
});

export type LoginResType = z.infer<typeof LoginRes>;
