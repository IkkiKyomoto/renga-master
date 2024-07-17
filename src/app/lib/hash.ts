import crypto from "crypto";

const salt = process.env.PASSWORD_SALT;

export function passWordHash(password: string) {
  if (!salt) {
    throw new Error("password salt not found");
  }
  const saltedPassword = password + salt;
  const hash = crypto.createHash("sha256");
  hash.update(saltedPassword);
  return hash.copy().digest("hex");

  // const salt = bcrypt.genSaltSync(saltRounds);
  // const passHash = bcrypt.hashSync(password, salt);
  // return passHash;
}

export function passwordMatch(
  password: string,
  hashedCorrectPassword: string,
): boolean {
  let res: boolean;
  const saltedPassword = password + salt;
  const hash = crypto.createHash("sha256");
  hash.update(saltedPassword);
  const hashedPassword = hash.copy().digest("hex");

  if (hashedPassword === hashedCorrectPassword) {
    res = true;
  } else {
    res = false;
  }
  console.log(hashedPassword, hashedCorrectPassword, res);
  return res;
}
