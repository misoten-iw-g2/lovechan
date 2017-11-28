import * as myself from './postWAV';

export const postWAV = async (apiUrl, promisedBlob) => {
  const form: any = new FormData();
  const blob = await promisedBlob;
  console.log(blob);
  form.append('uploadfile', blob, 'out.wav');
  const postSpeech = await fetch(apiUrl, {
    method: 'POST',
    headers: {},
    body: form,
  });
  const responseData = await postSpeech;
  console.log(responseData);
};

export default Object.assign(postWAV, myself);
