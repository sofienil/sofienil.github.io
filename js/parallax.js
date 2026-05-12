document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('intro');

  document.addEventListener('mousemove', (event) => {
    const smoothMove = 0.005;
    const smoothPos = 0.01;

    const rotateX = (event.clientY - window.innerHeight / 2) * smoothMove;
    const rotateY = (event.clientX - window.innerWidth / 2) * -smoothMove / 2;
    root.style.setProperty('--rotate-x', `${rotateX}deg`);
    root.style.setProperty('--rotate-y', `${rotateY}deg`);

    const posX = (event.clientX - window.innerWidth / 2) * smoothPos;
    const posY = (event.clientY - window.innerHeight / 2) * smoothPos;
    root.style.setProperty('--pos-x', `${posX}px`);
    root.style.setProperty('--pos-y', `${posY}px`);
  });
});