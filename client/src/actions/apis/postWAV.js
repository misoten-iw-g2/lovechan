/* @flow */
export async function postWAV(apiUrl: string, promisedBlob: any) {
  const form: any = new FormData();
  const blob = await promisedBlob;

  form.append('uploadfile', blob, 'out.wav');

  const postData = await fetch(apiUrl, {
    method: 'POST',
    headers: {},
    body: form,
  });

  return postData;
}

export function dammy() {}
