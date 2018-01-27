export class ServerMessage {
  successful: boolean;
  text: string;

  constructor(successful: boolean, text: string) {
    this.successful = successful;
    this.text = text;
  }
}
