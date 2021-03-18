const url = '../docs/pdf.pdf';

let pdfDoc = null, //set to null for default
    pageNum = 1, //initial page, ofc page strart form 1 =_=
    pageIsRendering = false; //when running renderPage() method, this will be set to true, once fetch pdf, set back to false (this is state of page's render)
    pageNumIsPending = null; // when fetch-ing other page, this is null

const scale = 1,
      canvas = document.querySelector('#pdf-render'),
      ctx = canvas.getContext('2d'); //fetching the pdf then put it in canvas

// Render the page (after got the doc, render the page)
function renderPage(num) {
    pageIsRendering = true; //let the program know what the current render state, which is rendering so we set it to true

    //Get the page
    pdfDoc.getPage(num).then(page => {
        // console.log(page);
        // Set Scale
        const viewport = page.getViewport({scale}); //check this method in console log above (_proto_)
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        };
        page.render(renderCtx).promise.then(() => { //check this method in console log above (_proto_)
            pageIsRendering = false //done rendering

            if(pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });
        
        // Outpur current page
        document.querySelector('#page-num').textContent = num
        
    });
};  

// Show Prev Page
function showPrevPage() {
    if(pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum)
}

// Show Next Page
function showNextPage() {
    if(pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum)
}

// Check for pages rendering
function queueRenderPage(num) {
    if(pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

// Get the Document
// pdfjsLib.getDocument(), from scrip cdn, return promise. disini pakai .promise.then , ngak langsung .the karena akan return error
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_; //set the global pdfDoc with the pdfDoc get from promise
    // console.log(pdfDoc);

    document.querySelector('#page-count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
}).catch(err => {
    // Display error
    const div = document.createElement('div');
    div.className = 'error';
    div.appendChild(document.createTextNode(err.message));
    document.body.insertBefore(div, canvas);
    document.querySelector('.top-bar').style.display = 'none';
})


// Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);