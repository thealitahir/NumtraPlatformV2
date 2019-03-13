import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'modelNameFilter'
})

export class ModelNameFilterPipe implements PipeTransform {
  transform(models: any, modelNameSearchQuery: string): any {
    // check if search term in undefined
    if (modelNameSearchQuery === undefined) {
      return models;
    }

    return models.filter(model =>
      model.name.toLowerCase().indexOf(modelNameSearchQuery.toLowerCase()) !== -1);
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

  // console.log(modelcategorySearchQuery);

    if (!modelcategorySearchQuery || modelcategorySearchQuery.length === 0) {
      return models;
    }

    return models.filter(model => modelcategorySearchQuery.includes(model.category));
  }

  }
