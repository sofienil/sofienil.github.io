
document.addEventListener('DOMContentLoaded', () => {
  const imgContainer = document.getElementById('image-container');
  const modal = document.getElementById('image-modal');
  let modalImage = document.getElementById('modal-image');

  imgContainer.addEventListener('click', () => {
    modal.classList.remove('hide');
    const img = document.querySelector('#image-container .slide.show img');
    modalImage.src = img.src;
    console.log(img.src)
  });

  const modalContainer = document.querySelector('.modal-container');

  modal.addEventListener('click', (event) => {
  if (event.target != modalContainer && !modal.classList.contains('hide')) {
      modal.classList.add('hide');
  }
});
});