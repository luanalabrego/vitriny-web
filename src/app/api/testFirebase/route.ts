// src/app/api/testFirebase/route.ts
import { NextResponse } from 'next/server'
import { adminDb, adminBucket } from '../../../../lib/firebaseAdmin'

export async function GET() {
  try {
    // pega o nome do bucket
    const bucketName = adminBucket.name
    // conta quantos docs tem em 'produtos' (pode ser zero)
    const snapshot = await adminDb.collection('produtos').limit(1).get()
    const count = snapshot.size

    return NextResponse.json({
      success: true,
      bucket: bucketName,
      produtosCount: count,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}
