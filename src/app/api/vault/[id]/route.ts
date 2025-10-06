import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import VaultItem from '@/models/VaultItem';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { encryptedData } = await request.json();
    
    if (!encryptedData) {
      return NextResponse.json({ error: 'Encrypted data is required' }, { status: 400 });
    }

    await dbConnect();
    
    const vaultItem = await VaultItem.findOneAndUpdate(
      { _id: resolvedParams.id, userId: session.user.id },
      { encryptedData },
      { new: true }
    );
    
    if (!vaultItem) {
      return NextResponse.json({ error: 'Vault item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ item: vaultItem });
  } catch (error) {
    console.error('Error updating vault item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const vaultItem = await VaultItem.findOneAndDelete({
      _id: resolvedParams.id,
      userId: session.user.id,
    });
    
    if (!vaultItem) {
      return NextResponse.json({ error: 'Vault item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Vault item deleted successfully' });
  } catch (error) {
    console.error('Error deleting vault item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}