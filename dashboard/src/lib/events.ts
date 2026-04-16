import { EventEmitter } from 'events';

// Garantir que o EventEmitter seja um singleton em desenvolvimento (Hot Reloading)
const globalForEvents = global as unknown as { eventEmitter: EventEmitter };

export const eventEmitter = globalForEvents.eventEmitter || new EventEmitter();

if (process.env.NODE_ENV !== 'production') globalForEvents.eventEmitter = eventEmitter;
