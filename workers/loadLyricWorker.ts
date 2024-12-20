self.onmessage = async (event) => {
  const { url } = event.data;

  try {
    const data = await fetch(url);
    const text = await data.text();

    self.postMessage({ success: true, text });
  } catch (error) {
    self.postMessage({ success: false, error: error });
  }
};
