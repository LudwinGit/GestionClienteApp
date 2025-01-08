import { GeoPoint, Timestamp } from "@angular/fire/firestore";

export interface Customer {
    email: string;
    name: string;
    uid: string;
    devices: Device[];
    sessions: Session[];
}

export interface Device {
    model: string;
    name: string;
    platform: string;
}

export interface Session {
    date: Timestamp;
    coordinates: GeoPoint;
    device: string;
    json: string;
}