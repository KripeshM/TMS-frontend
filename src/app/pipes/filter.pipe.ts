import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTasks: any=[], searchTerm:String,properties:any[]): any[] {
    const result:any=[]
    
    if(!allTasks||searchTerm==''){
      return allTasks
    }
    allTasks.forEach((task:any)=>{
      for(const property of properties){
        if(task[property].trim().toLowerCase().includes(searchTerm.trim().toLocaleLowerCase())){
          result.push(task)
        }
      }
      
    })
    if(result.length==0){
      return ['No matches found'];
      
    }
    return result;
  }

}
