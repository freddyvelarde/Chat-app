export interface IUser {
  id?: string;
  username: string;
  password?: string;
  createdAt: Date;
}

export interface IConversationMembers {
  id?: string;
  conversationId: string;
  userId: string;
}

export interface IConversation {
  id?: string;
  createdAt: Date;
}

export interface IMessage {
  id?: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: Date;
  editedAt: Date | null;
}
