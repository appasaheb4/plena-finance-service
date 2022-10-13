/* eslint-disable */
import { BlobServiceClient } from "@azure/storage-blob";
import Config from "../config";

export class StorageClient {
  static getStorage(): BlobServiceClient {
    return BlobServiceClient.fromConnectionString(
       ""
    );
  }
}
