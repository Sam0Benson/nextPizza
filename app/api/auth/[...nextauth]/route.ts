import NextAuth from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';

//настройки выносим в отдельную переменнную

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
