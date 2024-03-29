import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
	imports: [CommonModule, RouterModule, MatButtonModule],
	declarations: [FooterComponent, NavbarComponent, SidebarComponent],
	exports: [FooterComponent, NavbarComponent, SidebarComponent]
})
export class ComponentsModule {}
