self.onmessage = async (event) => {
  const { url } = event.data;
  try {
    const data = await fetch(url);
    const ArrayBuffer = await data.arrayBuffer();

    self.postMessage({ success: true, ArrayBuffer: ArrayBuffer });
  } catch (error) {
    self.postMessage({ success: false, error: error });
  }
};
