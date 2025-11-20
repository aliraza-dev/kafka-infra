export class CreateProfileEvent {
  constructor(
    public readonly username: string,
    private readonly email: string,
  ) {}

  toString() {
    return JSON.stringify({
      username: this.username,
      email: this.email,
    });
  }
}
