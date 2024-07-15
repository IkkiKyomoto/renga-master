import bcrypt from 'bcrypt';

const saltRounds = 10;
export default function passWordHash(password : string) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const passHash = bcrypt.hashSync(password, salt);
    return passHash;
}