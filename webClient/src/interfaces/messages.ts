export interface IMessage {
  id?: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: Date;
  editedAt: Date | null;
}
