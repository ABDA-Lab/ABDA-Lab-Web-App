import z from 'zod';

// ✅ Define Request Body Schema for GetMe

export const GetMeRes = z.object({
    value: z
        .object({
            userid: z.string(),
            username: z.string(),
            fullname: z.string().nullable(),
            nickname: z.string().nullable(),
            birthday: z.string().nullable(),
            country: z.string().nullable(),
            description: z.string().nullable(),
            profilemd: z.string().nullable(),
            avatar: z.string().nullable(),
            status: z.string().nullable(),
            createdat: z.string(),
        })
        .optional(),
    isSuccess: z.boolean(),
    isFailure: z.boolean(),
    error: z
        .object({
            code: z.string().nullable(),
            description: z.string().nullable(),
        })
        .nullable(),
});

export type GetMeResType = z.infer<typeof GetMeRes>;