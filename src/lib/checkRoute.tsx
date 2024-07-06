export const checkActiveRoute = (path: string) => {
    let pathArray = path.split("/");
    pathArray = pathArray.filter((path: string) => path !== "");

    return pathArray[pathArray.length - 1];
}