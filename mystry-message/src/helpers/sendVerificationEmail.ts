import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log('resend-->', resend)
    console.log('email-->', email)

    const { data, error } = await resend.emails.send({
      // from: '2017pushpakbhoite@gmail.com',
      from:'pushpak@angularminds.in',
      to: [email],
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    console.log('data-->', data, 'error-->', error)
    console.log('Verification email sent successfully.')
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}


