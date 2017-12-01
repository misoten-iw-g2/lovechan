import * as myself from './postWAV';

export const postWAV = async (apiUrl, promisedBlob) => {
  const form: any = new FormData();
  const blob = await promisedBlob;
  form.append('uploadfile', blob, 'out.wav');
  const postData = await fetch(apiUrl, {
    method: 'POST',
    headers: {},
    body: form,
  });
  return postData;
};

export default Object.assign(postWAV, myself);
