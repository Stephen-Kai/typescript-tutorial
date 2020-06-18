// 用数组的类型来定义, any表示任意类型
function push(array: any[], ...items: any[]) {
  console.log(items)
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);