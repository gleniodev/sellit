import { db } from '@/db';
import { products } from '@/db/schema';
import { ulid } from 'ulid';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { InferInsertModel } from 'drizzle-orm';
import { ilike, or } from 'drizzle-orm';

// type do insert
type NewProduct = InferInsertModel<typeof products>;

// schema de validação com zod
const productSchema = z.object({
  category_id: z.string().length(26), // ULID tem 26 caracteres
  name: z.string().min(1),
  description: z.string().min(1),
  producer_name: z.string().min(1),
  producer_email: z.string().email(),
  cover: z.string().url(),
  thumbnail: z.string().url(),
  price: z.number().positive(),
});

// POST ---------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // valida com zod
    const result = productSchema.safeParse(body);

    if (!result.success) {
      // se não passou na validação retorna 400 com os erros
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    // se passou pega os dados validados
    const validData = result.data;
    const now = new Date();
    const id = ulid();

    // monta o objeto de insert tipado
    const newProduct: NewProduct = {
      id,
      categoryId: validData.category_id,
      name: validData.name,
      description: validData.description,
      producerName: validData.producer_name,
      producerEmail: validData.producer_email,
      cover: validData.cover,
      thumbnail: validData.thumbnail,
      price: validData.price.toString(),
      updatedAt: now,
      createdAt: now,
    };

    // faz o insert no banco
    await db.insert(products).values(newProduct);

    // monta a resposta no formato do desafio (snake_case)
    const response = {
      id,
      category_id: validData.category_id,
      name: validData.name,
      description: validData.description,
      producer_name: validData.producer_name,
      producer_email: validData.producer_email,
      cover: validData.cover,
      thumbnail: validData.thumbnail,
      price: validData.price,
      updated_at: now.toISOString(),
      created_at: now.toISOString(),
    };

    // retorna 201 Created com o produto criado
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
// END POST ---------------------------------------


// GET --------------------------------------------
export async function GET(req: Request) {
  try {
    // pega o term da query string
    const { searchParams } = new URL(req.url);
    const term = searchParams.get('term');

    if (!term) {
      return NextResponse.json(
        { error: 'Missing search term' },
        { status: 400 }
      );
    }

    // faz a busca com ILIKE nos campos name e producer_name
    const result = await db
      .select()
      .from(products)
      .where(
        or(
          ilike(products.name, `%${term}%`),
          ilike(products.producerName, `%${term}%`)
        )
      )
      .limit(1); // pega o mais próximo

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: 'No products found' },
        { status: 404 }
      );
    }

    const p = result[0];

    // monta a resposta 
    const response = {
      id: p.id,
      category_id: p.categoryId,
      name: p.name,
      description: p.description,
      producer_name: p.producerName,
      producer_email: p.producerEmail,
      cover: p.cover,
      thumbnail: p.thumbnail,
      price: parseFloat(p.price), // converte para number
      updated_at: p.updatedAt.toISOString(),
      created_at: p.createdAt.toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

