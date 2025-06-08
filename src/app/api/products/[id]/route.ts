import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// GET /api/products/:id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Busca no banco
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    // Se não achou → 404
    if (!product || product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Pega o primeiro (deveria ter só 1)
    const p = product[0];

    // Monta a resposta no formato do desafio
    const response = {
      id: p.id,
      category_id: p.categoryId,
      name: p.name,
      description: p.description,
      producer_name: p.producerName,
      producer_email: p.producerEmail,
      cover: p.cover,
      thumbnail: p.thumbnail,
      price: parseFloat(p.price),
      updated_at: p.updatedAt.toISOString(),
      created_at: p.createdAt.toISOString(),
    };

    // Retorna 200 com o produto
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
