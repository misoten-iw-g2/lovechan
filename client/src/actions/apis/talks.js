export const media = async () => {
  const handleSuccess = stream => {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = e => {
      // Do something with the data, i.e Convert this to WAV
      console.log(e.inputBuffer);
    };
  };
  const distMedia = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  distMedia(await handleSuccess);
};

export const dammy = async () => {
  console.log('dammy');
};
