export const FetchOnePicture = (getData) =>{
    const getImage = JSON.parse(getData);
    return getImage[0];
}