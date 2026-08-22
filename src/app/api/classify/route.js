import { NextResponse } from 'next/server';
import { classifyRequest } from '@/lib/gemini';

export async function POST(request) {
  try {
    const body = await request.json();
    const { rawMessage, userName, userEmail } = body;

    if (!rawMessage) {
      return NextResponse.json(
        { success: false, error: 'rawMessage is required' },
        { status: 400 }
      );
    }

    const classification = await classifyRequest({
      rawMessage,
      userName,
      userEmail,
    });

    return NextResponse.json({
      success: true,
      data: classification,
    });
  } catch (error) {
    console.error('Classification Route Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Classification failed' },
      { status: 500 }
    );
  }
}
