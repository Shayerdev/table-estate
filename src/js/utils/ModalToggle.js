export const agreeModalPrice = open => {
    const modalAgree = document.querySelector('#agreeRecordPrice');

    if(open){
        modalAgree.classList.add('show');
        modalAgree.style.display = 'block';
        document.body.classList.add('modal-open');
    } else {
        modalAgree.classList.remove('show');
        modalAgree.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}