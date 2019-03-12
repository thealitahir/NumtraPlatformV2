import { Component, OnInit } from "@angular/core";
import { PlatRolesService } from "../services/platroles.service";
import { ResourcesService } from "../services/resources.service";
import { SectionsService } from "../services/sections.service";
import { ComponentsService } from "../services/components.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"]
})
export class RolesComponent {
  allRoles: any;
  role: any;
  roles: any;
  resources: any;
  sections: any;
  components: any;
  title_text: any;

  constructor(
    public platroleService: PlatRolesService,
    public resourceService: ResourcesService,
    public sectionService: SectionsService,
    public componentService: ComponentsService
  ) {
    this.platroleService.getRolesAndPermissions().subscribe(data => {
      console.log(data);
      this.allRoles = data.data;
      for (var i = 0; i < this.allRoles.length; i++) {
        this.allRoles[i].temp_array = [];
        for (var j = 0; j < this.allRoles[i].modules.length; j++) {
          this.allRoles[i].temp_array.push(this.allRoles[i].modules[j].label);
        }
      }
      console.log("all roles");
      console.log(this.allRoles);
    });
  }

  // editRoles() {
  //   this.title_text= 'Edit Role';
  //   this.roleService.getById(localStorage.role.role).subscribe(rolesdata => {
  //     console.log(rolesdata.data);
  //     this.role='';
  //   });

  //   this.resourceService.getResources().subscribe(resourcedata => {
  //     console.log(resourcedata.data);
  //     this.role='';
  //   });

  //   this.roleService.getExistingRoles().subscribe(rolesdata => {
  //     console.log(rolesdata.data);
  //     this.roles='';
  //   });

  //   this.sectionService.getSections().subscribe(sectionsdata => {
  //     console.log(sectionsdata.data);
  //     this.sections='';
  //   });

  //   this.componentService.getComponents().subscribe(componentdata => {
  //     console.log(componentdata.data);
  //     this.components='';
  //   });
  // }
}
