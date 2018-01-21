export class Message {
  successful: boolean;
  text: string;

  constructor(successful: boolean, text: string) {
    this.successful = successful;
    this.text = text;
  }
}
