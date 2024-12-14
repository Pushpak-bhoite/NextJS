import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string }; }) {
    // Connect to the database
    await dbConnect();
    // const { username, code } = await request.json();
    try {
        const { id } = await params
        console.log('params.id----->', id);
        const messageId = id;

        const result = await UserModel.updateOne(
            { 'message._id': new mongoose.Types.ObjectId(messageId) },
            { $pull: { message: { _id: new mongoose.Types.ObjectId(messageId) } } }
        )
        console.log('result', result)
        if (result.modifiedCount === 0) {
            return Response.json(
                { success: false, message: 'Message not found or already deleted' },
                { status: 404 }
            );
        }
        return Response.json(
            { success: true, message: 'Message deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting message:', error);
        return Response.json(
            { success: false, message: 'Error deleting message' },
            { status: 500 }
        );
    }
}














// // import dbConnect from '@/lib/dbConnect';
// import UserModel from '@/model/User';

// // src/app/api/delete-message/[id]/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// // import { connectToDatabase } from '@/lib/db'; // Import your database connection utility
// // import MessageModel from '@/model/Message';   // Import your Mongoose model for messages

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         // Connect to the database
//         await dbConnect();

//         const { id } = params;
//         console.log('Deleting message with ID:', id);

//         // Find and delete the message by ID
//         // const deletedMessage = await UserModel.findByIdAndDelete(id);

//         // if (!deletedMessage) {
//         //     return NextResponse.json({ message: 'Message not found' }, { status: 404 });
//         // }

//         return NextResponse.json({ message: 'Message deleted successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting message:', error);
//         return NextResponse.json(
//             { message: 'Failed to delete message', error: error instanceof Error ? error.message : 'Unknown error' },
//             { status: 500 }
//         );
//     }
// }
