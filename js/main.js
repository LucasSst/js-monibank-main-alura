import IsCPF from "./verify-cpf.js"
import ofLegalAge from "./verify-age.js"

const form = document.querySelector("[data-formulario]");
const formFields = document.querySelectorAll("[required]");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const answerList = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["rg"].value,
        "birthday": e.target.elements["aniversario"].value
    }

    localStorage.setItem("register", JSON.stringify(answerList));

    window.location.href= "../pages/abrir-conta-form-2.html"
})


formFields.forEach((field) => {
    field.addEventListener("blur", () => verifyFields(field));
    field.addEventListener('invalid', event => event.defaultPrevented());
})

const typesOfErrors = [
    "valueMissing",
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const messages = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
};

function verifyFields(field){
    let message = "";
    field.setCustomValidity('');
    if(field.name == "cpf" && field.value.length >= 11){
        IsCPF(field);
    }

    if(field.name == "aniversario" && field.value != ""){
        ofLegalAge(field);
    }

    typesOfErrors.forEach(erro => {
        if(field.validity[erro]){
            message = messages[field.name][erro];
            console.log(message);
        }
    })

    const errorMessage = field.parentNode.querySelector('.mensagem-erro');
    const verifyInput = field.checkValidity();
    
    if (!verifyInput){
        errorMessage.textContent = message;

    }else {
        errorMessage.textContent = "";
    }
}