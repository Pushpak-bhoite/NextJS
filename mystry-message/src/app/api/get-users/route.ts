import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    await dbConnect();
    console.log('--------------------')
    try {
        const result = await UserModel.find({})
        console.log('result', result)
        if (!result) {
            return Response.json(
                { success: false, message: 'Users not found' },
                { status: 404 }
            );
        }
        return Response.json(
            { success: true, users: result },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error getting users:', error);
        return Response.json(
            { success: false, message: 'Error while getting users' },
            { status: 500 }
        );
    }
}

