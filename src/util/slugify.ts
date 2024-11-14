const slugify = (str: string) =>
  str
    .toLowerCase()
    .replaceAll(/[']/g, "")
    .replaceAll(/[^a-z]/g, "-");

export default slugify;
