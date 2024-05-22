export default function IsCPF(field){
    const cpf = field.value.replace(/\.|-/g, "");

    if (verifyFirstDigit(cpf) || verifySecondaryDigit(cpf) || verifyRepeatedCPFNumbers(cpf)){
      field.setCustomValidity('Esse CPF não é válido!')
    }
}

function verifyRepeatedCPFNumbers(cpf){
    const numbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];
    return numbers.includes(cpf);
}

function verifyFirstDigit(cpf){
    let sum = 0;
    let multiplication = 10;

    for(let size = 0; size < 9; size++){
        sum += cpf[size] * multiplication;
        multiplication--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10  || sum == 11){
        sum = 0;
    }
    return sum != cpf[9];
}

function verifySecondaryDigit(cpf){
    let sum = 0;
    let multiplication = 11;

    for(let size = 0; size < 10; size++){
        sum += cpf[size] * multiplication;
        multiplication--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10  || sum == 11){
        sum = 0;
    }
    return sum != cpf[10];
}