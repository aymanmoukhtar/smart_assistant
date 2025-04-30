
export enum Role {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export type Message = {
  id: string;
  content: string;
  role: Role;
  createdAt: string;
}

export type Conversation = {
  id: string;
  title: string;
  createdAt: string;
};