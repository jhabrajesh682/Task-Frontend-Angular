import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listfilter'
})
export class ListfilterPipe implements PipeTransform {

  transform(values, filterObj): any {

    // console.log('filterObj', filterObj);
    if (values == undefined || values == null) return;
    else if (values.length > 0 && typeof values[0] === 'object' && typeof filterObj === 'object') {
      if (!filterObj.list || filterObj.list.length == 0 || !filterObj.listkeys || filterObj.listkeys.length == 0)
        return values
      else {
        // console.log('filterObj1', filterObj,values.length);
        let finallist = []
        let filterList = []
        filterObj.list.forEach(element => {
          let valueOfKey2 = getValue(element, filterObj.searchkeys)
          // console.log('valueOfKey2',valueOfKey2);

          values.forEach(valueObj => {
            let valueOfKey1 = getValue(valueObj, filterObj.listkeys)
            // console.log('filtervalue',getValue(valueObj,filterObj.listkeys));                        
            if ((valueOfKey1 == valueOfKey2)) {
              finallist.push(valueObj)
            }
          });
        });

        // console.log('pipeList',finallist);                
        return finallist

      }
    }
    else
      return values
  }
}


let getValue = (value, keyList) => {
  keyList.forEach(element => {
    value = value[element]
  });
  return value

}