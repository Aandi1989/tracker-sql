export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/issues/new',
        // не получилось написать выражение чтобы ограничить доступ неавторизованому пользователю к роуту issue/[id]/edit
        '/issue/[id]/edit'
    ]
}