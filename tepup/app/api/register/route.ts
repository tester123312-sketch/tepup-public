import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export async function POST(req: NextRequest) {
  try {
    const { password, username, mode } = await req.json();

    // Only allow contributor registration
    if (mode !== 'contributor') {
      return NextResponse.json(
        { error: 'Chỉ hỗ trợ đăng ký bằng tài khoản contributor' },
        { status: 403 }
      );
    }

    // Validate password
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { error: 'Tên tài khoản là bắt buộc' },
        { status: 400 }
      );
    }

    if (!USERNAME_REGEX.test(username)) {
      return NextResponse.json(
        { error: 'Tên tài khoản chỉ chứa chữ cái, số và dấu gạch dưới (3-20 ký tự)' },
        { status: 400 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Tên tài khoản này đã được sử dụng' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        name: username,
        password: hashedPassword,
        role: 'CONTRIBUTOR',
      },
    });

    return NextResponse.json(
      {
        message: 'Tạo tài khoản thành công',
        user: { id: user.id, username: user.username },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo tài khoản' },
      { status: 500 }
    );
  }
}
