self.onmessage = async (event) => {
  const { url } = event.data;

  try {
    const offset = 4;
    const data = await fetch(url);
    const text = await data.text();

    self.postMessage({ success: true, text });
  } catch (error) {
    self.postMessage({ success: false, error: error });
  }
};
