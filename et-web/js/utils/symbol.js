//将路由格式化为面板标题 将'_'替换为'/',然后转为大写
export const formatSymbol = (data) => {
  if (!data) return "";
  return data.replace(/_/, '/').toUpperCase();
};