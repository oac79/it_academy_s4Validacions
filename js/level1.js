// const json_provinces = 'https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json';
const json_provinces = './provinces.json';

const getProvinces = () => {
    fetch(json_provinces).then(function (response) {
        return response.json();
    }).then(function (obj) {
        for (x in obj) {
            let pro = obj[x];
            addOption(pro.nm);
        }
    }).catch(function (error) {
        console.log('error ---> ' + error);
    })
}

function validateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
        // alert("Valid email address!");
        return true;
    }
    else {
        // alert("You have entered an invalid email address!");
        return false;
    }
}

function validatePass(pass) {
    var passformat = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (pass.match(passformat)) {
        // alert('format pass correct');
        return true
    } else {
        // alert('format pass incorrect');
        return false;
    }
}

function addOption(optData) {
    var sel = document.getElementById('select-province');
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(optData));
    opt.value = optData;
    sel.appendChild(opt);

}

const validateLogin = () => {
    const form_login = document.getElementById('form-login');
    //FORM LOGIN
    form_login.addEventListener('submit', function (e) {
        e.preventDefault();
        let email_login = document.getElementById('in-email-login');
        let email_help_login = document.getElementById('emailHelp');
        let pass_login = document.getElementById('in-pass-login');
        let pass_help_login = document.getElementById('passHelp');
        if (email_login.value == '') {
            email_login.classList.add('is-invalid');
            email_help_login.style.display = 'inline';
        } else if (validateEmail(email_login.value)) {
            email_login.classList.remove('is-invalid');
            email_login.classList.add('is-valid');
            email_help_login.style.display = 'none';
        }
        if (pass_login.value == '') {
            pass_login.classList.add('is-invalid');
            pass_help_login.style.display = 'inline';
        } else if (pass_login.value != '') {
            if (validatePass(pass_login.value)) {
                pass_login.classList.remove('is-invalid');
                pass_login.classList.add('is-valid');
                pass_help_login.style.display = 'none';
            } else {
                pass_login.classList.add('is-invalid');
                pass_login.classList.remove('is-valid');
                pass_help_login.textContent = '*min 8 caracteres 1 mayúscula 1 dígito';
                pass_help_login.style.display = 'inline';
            }

        }
    });
}

const validateRegister = () => {
    const form_register = document.getElementById('form-register');

    form_register.addEventListener('submit', function (e) {
        e.preventDefault();

        //names id
        let name_reg = document.getElementById('in-name-reg');
        let email_reg = document.getElementById('in-email-reg');
        let pass_reg = document.getElementById('in-pass-reg');
        let confirm_pass_reg = document.getElementById('in-pass-reg-repeat');
        let sel_province = document.getElementById('select-province');
        let title_province = document.getElementById('title-province');
        let check_reg = document.getElementById('check-accept');

        //helps text
        let name_help_reg = document.getElementById('nameHelpReg');
        let email_help_reg = document.getElementById('emailHelpReg');
        let pass_help_reg = document.getElementById('passHelpReg');
        let pass_help_reg_repeat = document.getElementById('passHelpRegRepeat');
        let check_help_reg = document.getElementById('chekHelpReg');

        //Verifying name
        if (name_reg.value === '') {
            name_reg.classList.add('is-invalid');
            name_help_reg.textContent = '*campo requerido';
            name_help_reg.style.display = 'inline';
        } else if (name_reg.value.length < 2) {
            name_reg.classList.add('is-invalid');
            name_help_reg.textContent = '*el nombre tiene que tener un mínimo de 2 caracteres';
            name_help_reg.style.display = 'inline';
        } else {
            name_reg.classList.remove('is-invalid');
            name_help_reg.style.display = 'none';
            name_reg.classList.add('is-valid');
        }

        //Verifying email
        if (email_reg.value === '') {
            email_reg.classList.add('is-invalid');
            email_help_reg.textContent = '*campo requerido';
            email_help_reg.style.display = 'inline';
        } else if (validateEmail(email_reg.value)) {
            email_reg.classList.remove('is-invalid');
            email_reg.classList.add('is-valid');
            email_help_reg.style.display = 'none';
        }

        //Verifying password
        if (pass_reg.value == '') {
            pass_reg.classList.add('is-invalid');
            pass_help_reg.style.display = 'inline';
        } else {
            pass_reg.classList.remove('is-invalid');
            pass_reg.classList.add('is-valid');
            pass_help_reg.style.display = 'none';
        }

        if (confirm_pass_reg.value == '') {
            confirm_pass_reg.classList.add('is-invalid');
            pass_help_reg_repeat.style.display = 'inline';
            pass_help_reg.textContent = '*campo requerido';
        }

        if (pass_reg.value != '' && confirm_pass_reg != '') {
            if (!validatePass(pass_reg.value)) {
                confirm_pass_reg.value = '';
                pass_reg.classList.remove('is-valid');
                pass_reg.classList.add('is-invalid');
                pass_help_reg.textContent = '*min 8 caracteres 1 mayúscula 1 dígito';
                pass_help_reg.style.display = 'inline';

            } else if (pass_reg.value == confirm_pass_reg.value) {
                pass_reg.classList.remove('is-invalid');
                pass_reg.classList.add('is-valid');
                pass_help_reg.style.display = 'none';
                confirm_pass_reg.classList.remove('is-invalid');
                confirm_pass_reg.classList.add('is-valid');
                pass_help_reg_repeat.style.display = 'none';
            } else {
                confirm_pass_reg.classList.remove('is-valid');
                confirm_pass_reg.classList.add('is-invalid');
                pass_help_reg_repeat.textContent = '*contraseña incorrecta';
                pass_help_reg_repeat.style.display = 'inline';
            }
        }

        //Verifying select province
        let optProvince = sel_province.options[sel_province.selectedIndex];
        if (optProvince.value == '') {
            sel_province.classList.add('is-invalid');
            title_province.classList.remove('text-white');
            title_province.style.color = 'red';
            // let opt_empty = document.getElementById('first-opt');
            // opt_empty.value = '1';
            // opt_empty.textContent = '*campo requerido';
        } else {
            sel_province.classList.remove('is-invalid');
            sel_province.classList.add('is-valid');
            title_province.classList.add('text-white');
        }

        //Verifying check accept
        if (check_reg.checked !== true) {
            check_help_reg.style.display = 'inline';
        } else {
            check_help_reg.style.display = 'none';
        }
    })
}

const validateSearch = () => {
    const form_search = document.getElementById('form-search');
    //FORM BUSCADOR
    form_search.addEventListener('submit', function (e) {
        e.preventDefault();
        let in_search = document.getElementById('in-search');
        in_search.classList.remove("is-invalid")
        let str_search = in_search.value.replace(/\s+/g, '');
        let spinner = document.querySelector("#loading-search");

        if (str_search.length < 4) {
            in_search.classList.add("is-invalid");
            in_search.value = "";
            in_search.placeholder = "min 4 caracteres...";
        } else {
            in_search.classList.remove("is-invalid");
            spinner.style.display = 'inline';
        }

    });
}

getProvinces();
validateSearch();
validateLogin();
validateRegister();

