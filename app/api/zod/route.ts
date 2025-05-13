import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  try {
    // Get the JSON data from the request
    const data = await request.json();

    console.log(data);
    
    return NextResponse.json(
      { 
        message: 'Data received successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form data:', error)
    return NextResponse.json(
      { error: 'Failed to process form data' },
      { status: 500 }
    )
  }
}
