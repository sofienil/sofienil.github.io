import { fetch_json_project_items } from '../global/global.js';
import { show_popup } from "../home_projects/home_project_popup_view.js";

const current_url = window.location.href.split('#')[0] // fixed issue when anchor # is in the way
const JSON_FILEPATH = 'components/global/project_items.json'

function show_project_showcase() {
	const filter_items = document.querySelectorAll('.filter-item');
	const portfolio_items = document.querySelectorAll('.project-item');
   
	filter_items.forEach((filter) => { 
	  filter.addEventListener('click', () => { // add click listener for each item
		filter_items.forEach((item) => item.classList.remove('filter-active')); // remove active class from all filter items
		filter.classList.add('filter-active'); 
  
		const current_filter = filter.getAttribute('data-filter'); 
		
		portfolio_items.forEach((item) => {
		  const item_category = item.getAttribute('data-category');
		  
		  if (current_filter === 'all' || current_filter === item_category) { 
			item.classList.remove('hide');
		  } 
		  else { 
			item.classList.add('hide'); 
		}
		});
	  });
	});
}

export async function get_project_list() {
	const project_container = document.getElementById("project-list");
	const projects = await fetch_json_project_items(JSON_FILEPATH);

	projects.projectItem.forEach((project, index) => {
		const project_item = document.createElement("div");
		project_item.className = "project-item pop-up-anim";
		project_item.addEventListener("click", () => show_popup(project));
	
		// tags
		project_item.setAttribute('data-category', ''+ project.filter +'');
		const categories_list = document.createElement("div");
		categories_list.className = "project-categories";
		project.tags.forEach((tag) => {
			const li = document.createElement("li");
			li.textContent = tag; 
			categories_list.appendChild(li);
		});
	
		// project item
		project_item.innerHTML = ` 
			<div class="project-date">${project.date}</div>
				<div class="project-showcase">
					<span class="project-title">${project.title}<img class="link-icon" src="components/global/icons/link.svg" alt="link"></span>
				<div>${project.preview_text}</div>
			</div> 
		`;
	
		const showcase = project_item.querySelector('.project-showcase');
		showcase.appendChild(categories_list);
		
		project_container.appendChild(project_item);
	});
	show_project_showcase()
}

