export type EventCallbackT<T = any> = (payload: T) => void;

export default class EventHandler {
    private listeners: Record<string, Array<EventCallbackT>> = {};

    on(event: string, callback: EventCallbackT): void {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    off(event: string, callback: EventCallbackT): void {
        this.listeners[event] = (this.listeners[event] || []).filter(cb => cb !== callback);
    }

    emit(event: string, payload?: any): void {
        (this.listeners[event] || []).forEach(callback => callback(payload));
    }

}