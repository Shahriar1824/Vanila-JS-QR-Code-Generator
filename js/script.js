const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const colorlight = document.getElementById('colorlight').value;
    const colordark = document.getElementById('colordark').value;
    
    
    // console.log(colorlight);
    // console.log(colordark);

    if(url === ''){
        alert('Please Enter a URL or Text');
    } else{
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size, colorlight, colordark);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 100);
        }, 2000);
    }
};


const generateQRCode = (url,size,colorlight,colordark) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
        // colorDark : "#000000",
        // colorLight : "#ffffff",
        colorDark : colorlight,
        colorLight : colordark,
    })
};


const showSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
};


// Hide spinner
const hideSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
  };

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if(saveLink)
        saveLink.remove();
};


const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-orange-500 hover:bg-orange-700 text-white uppercase text-xs font-bold py-5 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Download';
    document.getElementById('generated').appendChild(link);
};

// Hiding Spinner
hideSpinner();

form.addEventListener('submit', onGenerateSubmit);