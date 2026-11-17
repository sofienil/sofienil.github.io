// popup open and close
function close_popup() {
	const popup_wrapper = document.getElementById("project-popup-wrapper");
	popup_wrapper.classList.add('hide'); 
}

export function show_popup(project_item) {
	const popup_wrapper = document.getElementById("project-popup-wrapper");
	popup_wrapper.classList.remove('hide');
	generate_popup_content(project_item)

	popup_wrapper.addEventListener("click", (e) => {
		if (!e.target.closest("#project-popup")) close_popup();
	});
}


// slideshow
let SLIDE_INDEX = 0;
let CURRENT_PROJECT = null;
const json_filepath = "components/global/"
document.getElementById("slide-prev").addEventListener("click", () => change_slide(-1));
document.getElementById("slide-next").addEventListener("click", () => change_slide(1));

export function generate_popup_content(project_item) {
	SLIDE_INDEX = 0;
	CURRENT_PROJECT = project_item
	const popup_content = document.getElementById("project-popup-content");
	popup_content.innerHTML = `
		<div>${CURRENT_PROJECT.date}</div>
        <div class="project-title">${CURRENT_PROJECT.title}</div>
        <div>${CURRENT_PROJECT.description}</div>
	`;

	// categories
	const categories_list = document.createElement("div");
	categories_list.className = "project-categories";
    CURRENT_PROJECT.tags.forEach((tag) => {
        const li = document.createElement("li");
        li.textContent = tag; 
        categories_list.appendChild(li);
    });
	popup_content.appendChild(categories_list);

	// links
	const link_list = document.createElement("div");
	link_list.className = "project-popup-links";

    CURRENT_PROJECT.links.forEach((link, index) => {
        const a_element = document.createElement("a");
        a_element.href = link; 
        a_element.textContent = CURRENT_PROJECT.link_text[index];
        link_list.appendChild(a_element);
    });
	popup_content.appendChild(link_list);

	// dots
	const dots_container = document.getElementById("slideshow-dots-container");
	dots_container.replaceChildren()
	CURRENT_PROJECT.img_path.forEach((_, i) => { // create dot for each image
		const dot = document.createElement("span");
		dot.className = "slideshow-dot";
		dot.addEventListener("click", () => go_to_slide(i));
		dots_container.appendChild(dot);
		
	});
	go_to_slide(SLIDE_INDEX)
}

function change_slide(n) { 
	SLIDE_INDEX += n; 
	go_to_slide()
}

function go_to_slide(n = SLIDE_INDEX) {
    let dots = document.querySelectorAll(".slideshow-dot");
	SLIDE_INDEX = (n + dots.length) % dots.length;

	const image_item = document.getElementById("image-container");
	image_item.innerHTML = `
        <img class="project-popup-img" src="${json_filepath+CURRENT_PROJECT.img_path[SLIDE_INDEX]}" alt="${CURRENT_PROJECT.img_alt[SLIDE_INDEX]}">
    `;

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === SLIDE_INDEX);
	});
}