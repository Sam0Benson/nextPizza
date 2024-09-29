import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Получаем параметр 'code' из URL
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    // Ищем verificationCode в базе данных по коду
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    // Обновляем статус пользователя как верифицированный
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: true, // Устанавливаем флаг верификации
      },
    });

    // Удаляем использованный verificationCode
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    // Редиректим на главную с параметром ?verified
    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.error(error);
    console.log('[VERIFY_GET] Server error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
