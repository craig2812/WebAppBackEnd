// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Contact {
    constructor(public name: string, public number: number, public email: string, public timestamp: Date, public message: string , public id?: ObjectId) {}
}