import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import VaultItem from '@/models/VaultItem';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const vaultItems = await VaultItem.find({ userId: session.user.id });
    
    return NextResponse.json({ items: vaultItems });
  } catch (error) {
    console.error('Error fetching vault items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { encryptedData } = await request.json();
    
    if (!encryptedData) {
      return NextResponse.json({ error: 'Encrypted data is required' }, { status: 400 });
    }

    await dbConnect();
    
    const vaultItem = await VaultItem.create({
      userId: session.user.id,
      encryptedData,
    });
    
    return NextResponse.json({ item: vaultItem }, { status: 201 });
  } catch (error) {
    console.error('Error creating vault item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}