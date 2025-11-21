document.getElementById("init").onclick = () => {
  const apiId = document.getElementById("apiId").value;
  const apiHash = document.getElementById("apiHash").value;

  chrome.runtime.sendMessage({
    type: "INIT_CLIENT",
    apiId,
    apiHash
  });
};

document.getElementById("send").onclick = () => {
  const file = document.getElementById("fileInput").files[0];
  const ttl = parseInt(document.getElementById("ttl").value);

  const blobUrl = URL.createObjectURL(file);

  chrome.runtime.sendMessage({
    type: "SEND_TTL_PHOTO",
    blobUrl,
    ttl
  });
};
