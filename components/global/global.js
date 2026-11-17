export async function fetch_json_project_items(filepath) {
	const request = new Request(filepath);
	const response = await fetch(request);
  	const projects = await response.json();
	return projects
}
