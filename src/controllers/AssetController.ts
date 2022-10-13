/* eslint-disable */
import Jimp from 'jimp';
import { StorageClient } from '../drivers';
import { MtResponse, MtRequest, ImageUpload, StatusCode } from '../types';

class _AssetController {
  public async uploadImage(
    request: MtRequest<ImageUpload>
  ): Promise<MtResponse<any>> {
    try {
      const imageData = request.body;
      const files = request.files as any;
      if (!files || !files.file || !files.file.path) {
        return {
          statusCode: StatusCode.BAD_REQUEST,
          body: {
            status: 'error',
          },
        };
      }
      const storage = StorageClient.getStorage();
      const blobClient = storage.getContainerClient(imageData.folder);
      await blobClient
        .getBlockBlobClient(imageData.fileName)
        .uploadFile(files.file.path);
      return {
        statusCode: StatusCode.SUCCESS,
        body: {
          status: 'success',
        },
      };
    } catch (error:any) {
      return {
        statusCode: StatusCode.SERVER_ERROR,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    }
  }

  public async uploadFile(
    request: MtRequest<ImageUpload>
  ): Promise<MtResponse<any>> {
    try {
      const data = request.body;
      const files = request.files as any;
      //console.log({ data, files });
      if (!files || !files.file || !files.file.path) {
        return {
          statusCode: StatusCode.BAD_REQUEST,
          body: {
            status: 'error',
          },
        };
      }
      const storage = StorageClient.getStorage();
      const blobClient = storage.getContainerClient(data.folder);
      await blobClient
        .getBlockBlobClient(data.fileName)
        .uploadFile(files.file.path);
      return {
        statusCode: StatusCode.SUCCESS,    
        body: {
          data: {
            data: undefined,
            settings: {
              success: 1,
              message: 'File upload successfully.',
            },
          },
          status: 'success',
        },
      };
    } catch (error:any) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          status: 'error',
          message: error.message,
        },
      };
    }
  }
}
export const AssetController = new _AssetController();
