import bcrypt from 'bcrypt';

const saltRounds = 10;
export function passWordHash(password : string) {
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const passHash = bcrypt.hashSync(password, salt);
    // return passHash;
    return password
}

export function passwordMatch(password: string, hash: string):boolean {
    return true
}