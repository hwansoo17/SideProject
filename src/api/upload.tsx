import {api} from './api';
import {authApi} from './api';

interface IPresignedUrl {
  name: string;
  fileType: string;
}

interface IPresignedOutput {
  uploadPath: string;
  uploadUrl: string;
}

/**
 * [POST] /s3-presigned-url
 * @param payload
 * @returns
 */
export const postPresignedUrl = async (
  payload: IPresignedUrl,
): Promise<IPresignedOutput> => {
  const res = await api.post('/s3-presigned-url', payload);
  return res.data;
};

/**
 * [PUT] /{url}
 * @param payload
 * @returns
 */
export const putS3upload = async (payload: {url: string; file: string}) => {
  return await api.put(payload.url, payload.file);
};
