function arrayBufferToBase64String(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = "";
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  return btoa(byteString);
}

function base64StringToArrayBuffer(base64) {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function getMessageWithIv(message, iv) {
  return arrayBufferToBase64String(message) + arrayBufferToBase64String(iv);
}

function importPublicKey(key) {
  return new Promise((resolve, rej) => {
    window.crypto.subtle
      .importKey(
        "raw",
        base64StringToArrayBuffer(key),
        {
          name: "AES-CBC"
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"]
      )
      .then(function(cryptKey) {
        resolve(cryptKey);
      });
  });
}

function str2abUtf8(myString) {
  return new TextEncoder().encode(myString);
}

function encryptMessage(key, message) {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  return new Promise((resolve, rej) => {
    importPublicKey(key).then(key => {
      window.crypto.subtle
        .encrypt(
          {
            name: "AES-CBC",
            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encrypt!
            iv: iv
          },
          key, //from generateKey or importKey above
          str2abUtf8(message) //ArrayBuffer of data you want to encrypt
        )
        .then(encrypted => {
          encrypted = getMessageWithIv(encrypted, iv);
          resolve(encrypted);
        });
    });
  });
}

// to use it in browser you can:
encryptMessage(
  "doIPlFDFMfwsnJgIchmDxNUyl4pdq1z3IeLflKRtVu8=",
  JSON.stringify({
    first_name: "Дмитро",
    last_name: "Гусєв",
    middle_name: "Сергійович",
    inn: "1234567890",
    zip: "12345",
    district: "м. Київ",
    city: "Київ",
    street_name: "Хрещатик",
    street_number: "1а",
    appartment_number: "12",
    phone_number: "380987552855",
    email: "info@povertay.com.ua",
    insurance: [
      {
        inn: "1234567890",
        payment_sum: 10000.0,
        contract_issue_date: "15.12.2016"
      },
      {
        inn: "5555555555",
        payment_sum: 5000.0,
        contract_issue_date: "05.02.2016"
      }
    ]
  })
).then(res => console.log(res));
