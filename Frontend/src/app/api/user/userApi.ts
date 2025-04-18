import http from '@/lib/http_old';
import { GetMeResType, UserSchemaType } from '@/schemaValidations/user.schema';

export const getMe = async (): Promise<GetMeResType> => {
    const response = await http.get<{
        statusCode: number;
        message: string;
        data: UserSchemaType;
    }>('api/user/get-me');

    if (response.statusCode !== 200) {
        throw new Error(response.message || 'Failed to fetch user profile');
    }

    return response;
};
