export function sort(array_,comp){
    var array=Array.from(array_);
    var temp;
    for (var i=1; i<array.length; i++){
        for (var j=0 ; j<array.length- 1; j++){
            if (comp(array[j],array[j+1])){
                temp = array[j];
                array[j] =array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array
}