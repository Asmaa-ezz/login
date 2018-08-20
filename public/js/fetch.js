const fetch = (object, method, url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // console.log(`${response.result} -----\n${response.err}`);
        if (response.result) resolve(response.result);
        else reject(new TypeError(response.err));
      } else reject(new TypeError('Error Server'));
    }
  };
  xhr.open(method, url, true);
  xhr.send(JSON.stringify(object));
});
