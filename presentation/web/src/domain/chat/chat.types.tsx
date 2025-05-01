export enum Role {
  USER = "user",
  ASSISTANT = "assistant",
}

export enum EventType {
  CHUNK = "chunk",
  END = "end",
  INIT = "init",
}

export interface MessageEvent {
  event: EventType;
}

export interface InitMessage extends MessageEvent {
  event: EventType;
  conversation_id: string;
  title: string;
}

export interface ChunkMessage extends MessageEvent {
  event: EventType;
  message_id: string;
  chunk: string;
}

export interface EndMessage extends MessageEvent {
  event: EventType;
  full_message: string;
  message_id: string;
}

export type Message = {
  id: string;
  content: string;
  role: Role;
  created_at: string;
};

export type SendMessageRequest = {
  id: string;
  content: string;
  conversation_id: string;
};

export type Conversation = {
  id: string;
  title: string;
  created_at: string;
};
