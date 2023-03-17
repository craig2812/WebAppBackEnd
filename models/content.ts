// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Content {
    constructor(public header: string, public sub_header: string, public content: string, public publish_date: Date, public id?: ObjectId) {}
}