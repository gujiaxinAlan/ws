export let formatData = function (data, child) {
  let temp;
  temp = data.map(item => {
    item['name'] = item['name'] + '(' + item['count'] + ')';
    if (item.children) {
      item.children = item[child].map(item => {
        item['name'] += '(' + item['count'] + ')';
        return item;
      });
    }
    return item;
  });
  return temp;
};

export let formatData3 = function (data, child) {
  let temp;
  temp = data.map(item => {
    item['text'] = item['text'] + '(' + item['count'] + ')';
    if (item.children) {
      item.children = item[child].map(item => {
        item['text'] += '(' + item['count'] + ')';
        return item;
      });
    }
    return item;
  });
  return temp;
};

export let formatData2 = function (data, child) {
  let temp;
  temp = data.map(item => {
    item['text'] = item['text'] + '(' + item['count'] + ')';
    if (item.children) {
      item.children = item[child].map(item => {
        item['text'] = item['text'] + '(' + item['count'] + ')';
        if (item.children) {
          item.children = item[child].map(item => {
            item['text'] = item['text'] + '(' + item['count'] + ')';
            if (item.children) {
              item.children = item[child].map(item => {
                item['text'] = item['text'] + '(' + item['count'] + ')';
                return item;
              });
            }
            return item;
          });
        }
        return item;
      });
    }
    return item;
  });
  return temp;
};
