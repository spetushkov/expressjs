import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import util from 'util';
import { FileQuery } from '../../../entity/FileQuery';
import { StatusCode } from '../../../response/StatusCode';
import { SizeUtils } from '../../../utils/SizeUtils';
import { ServerException } from '../exception/ServerException';

const validateFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
  fileType: RegExp,
): boolean => {
  const extName = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimeType = fileType.test(file.mimetype);

  return extName && mimeType;
};

export const FileUploader = (
  payload: FileQuery,
  fileUploadsPath: string,
  fileTypeFilter: RegExp,
): ((req: Request, res: Response) => Promise<void>) => {
  const { field = 'file', limitFileSize = 1 } = payload;
  const fileSize = limitFileSize ? { fileSize: SizeUtils.toMb(limitFileSize) } : {};
  const limits = {
    ...fileSize,
  };

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, fileUploadsPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const uploadFile = multer({
    storage,
    limits,
    fileFilter: function (req, file, cb) {
      const result = validateFileType(file, cb, fileTypeFilter);
      if (result) {
        cb(null, true);
      } else {
        cb(ServerException.create(StatusCode.BAD_REQUEST, 'Invalid file type'));
      }
    },
  }).single(field);

  return util.promisify(uploadFile);
};
