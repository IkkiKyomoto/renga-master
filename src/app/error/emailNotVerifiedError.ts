
export class EmailNotVerifiedError extends Error {
  constructor() {
    super('メールアドレスが認証されていません');
    this.name = 'EmailNotVerifiedError';
  }
}