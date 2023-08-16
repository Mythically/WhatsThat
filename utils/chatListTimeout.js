function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject('5s timeout exceeded');
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((reason) => {
        clearTimeout(timer);
        reject(reason);
      });
  });
}

export default timeout;
