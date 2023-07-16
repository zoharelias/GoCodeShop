export const getNumOfProductsInCart=(cartArr)=>{
    let i = 0;
    cartArr.forEach(element => {
        i += element.amount;
    });
    console.log('i',i);
    return i;
}