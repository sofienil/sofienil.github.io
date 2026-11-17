function trail(x, y) {
	const d = document.createElement('div');
	d.className = 'cursor-trail';
	d.style.left = x + 'px';
	d.style.top = y + 'px';
	document.body.appendChild(d);
	setTimeout(() => d.remove(), 1200);
}

document.addEventListener('mousemove', e => trail(e.clientX, e.clientY));
document.addEventListener('touchmove', e => trail(e.touches[0].clientX, e.touches[0].clientY));
