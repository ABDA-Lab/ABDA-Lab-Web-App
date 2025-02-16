import z from 'zod';

// ✅ Define Request Body Schema for GetMe

export const GetMeRes = z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.object({
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
});

export const UserSchema = z.object({
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
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type GetMeResType = z.infer<typeof GetMeRes>;