import jwt, { JwtPayload } from 'jsonwebtoken';

let secret: string = '7J2064W467Kg7J207IWY7Lqg7ZSE7IiY6rCV7IOd67aE65Ok7ZmU7J207YyF7ZWY7IS47JqU7KKL7J2A7ZqM7IKs7JeQ66qo65GQ7Leo7JeF7ISx6rO17ZWY7Iuk6rGw652866+/7Iq164uI64uk65287J2067iM7IS47IWY65Ok7Ja07KO87IWU7ISc6rCQ7IKs7ZWp64uI64uk64+E7JuA7J2065CY7JeI7Jy866m07KKL6rKg7Iq164uI64uk';

interface TokenDecodingResult {
    ok: boolean;
    id?: string;
    role?: string;
    message?: string;
}

export default async (token: any): Promise<TokenDecodingResult> => { // access token 검증
    let decoded: JwtPayload | null = null;
    try {
        decoded = <JwtPayload>jwt.verify(token, secret);
        return {
            ok: true,
            id: decoded!.id,
            role: decoded!.role,
        };
    } catch (err : any) {
        return {
            ok: false,
            message: err.message,
        };
    }
}