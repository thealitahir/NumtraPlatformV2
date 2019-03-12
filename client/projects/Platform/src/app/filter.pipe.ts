import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'projectFilter'
})

export class ProjectFilterPipe implements PipeTransform {
  transform(projects: any, projectSearchQuery: string): any {
    // check if search term in undefined
    if (projectSearchQuery === undefined) {
      return projects;
    }

    return projects.filter(project =>
      project.name.toLowerCase().indexOf(projectSearchQuery.toLowerCase()) !== -1);
  }
}



@Pipe({
  name: 'applicationFilter'
})

export class ApplicationFilterPipe implements PipeTransform {
  transform(applications: any, applicationSearchQuery: string): any {
    // check if search term in undefined
    if (applicationSearchQuery === undefined) {
      return applications;
    }

    return applications.filter(application =>
      application.name.toLowerCase().indexOf(applicationSearchQuery.toLowerCase()) !== -1);
  }
}



@Pipe({
  name: 'modelCategoryFilter'
})

export class ModelCategoryFilterPipe implements PipeTransform {
  // transform(category: any[], searchTerm: any[]): any[] {

  //   if (!searchTerm || searchTerm.length === 0) {
  //     return category;
  //   }
  //   return category.filter(cat => searchTerm.includes(cat.name));

  transform(models: any[], modelcategorySearchQuery: string[]): any[] {
    // check if search term in undefined
  // modelcategorySearchQuery = ['cat2'];

  console.log(modelcategorySearchQuery);

    if (!modelcategorySearchQuery || modelcategorySearchQuery.length === 0) {
      return models;
    }

    return models.filter(model => modelcategorySearchQuery.includes(model.category));
  }

  }
