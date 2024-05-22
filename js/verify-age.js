export default function ofLegalAge(field){
    const dateBirth = new Date(field.value)
    if(!verifyAge(dateBirth)){
        field.setCustomValidity('O usuário não é maior de idade')
    }
}

function verifyAge(date){
    const currentDate = new Date();
    const currentDatePlus18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());

    return currentDate >= currentDatePlus18
}