import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "app/_models/Employee";
@Pipe({
	name: "filter"
})
export class FilterPipe implements PipeTransform {
	transform(items: Employee[], searchText: string): any[] {
		if (!items) return [];
		if (!searchText) return items;
		searchText = searchText.toLowerCase();
		return items.filter((it) => {
			return (
				it.emp_name.toLowerCase().includes(searchText) ||
				it.email.toLowerCase().includes(searchText) ||
				it.emp_number.toLowerCase().includes(searchText)
			);
		});
	}
}
