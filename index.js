const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');


const validateEmail = (email) => {
    /**
    * Validates a username based on the following criteria:
    * - Starts with a lowercase letter.
    * - Can contain lowercase letters, numbers, and underscores.
    * - Length: 5 to 20 characters.
    */
    const emailPattern =  /^[a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
    return emailPattern.test(email);
};

const validateUsername = (username) => {
    /**
    * Validates a username based on the following criteria:
    * - Starts with a lowercase letter.
    * - Can contain lowercase letters, numbers, and underscores.
    * - Length: 5 to 20 characters.
    */
    const userNamePattern = /^[a-z][a-z0-9_]{4,19}$/i;
    return userNamePattern.test(username);
};

const validatePassword = (password) => {
    // Ensure password is a string
    password = String(password);
	console.log("Validate Password In")
    if (password.length < 8) {
		alert("Password must be at least 8 characters long.")
        return;
    }
    if (!/[0-9]/.test(password)) {
		alert("Password must contain at least one numeric digit.");
        return;
    }
    if (!/[a-z]/.test(password)) {
		alert("Password must contain at least one lowercase letter.");
        return;
    }
    if (!/[A-Z]/.test(password)) {
		alert("Password must contain at least one uppercase letter.");
        return;
    }
    if (!/[`~!@#$%^&*()\-_=+{}[\]:;"'<>,.?\/|\\]/.test(password)) {
		alert("Password must contain at least one special character.")
        return;
    }

    return true;
};

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');

let signUpUserMap = new Map();
	signUpUserMap.set(1, ['Brintha', 'brintha@gmail.com', 'Brintha@1']),
	signUpUserMap.set(2, ['Rithanya','rithanya@gmail.com', 'Music@10']),
	signUpUserMap.set(3, ['Mithran', 'mithranA@gmail.com', 'Hello_@123']);
	console.log(Array.from(signUpUserMap.entries(), ([k, v]) => [k, [...v]]));


function addValueToSignUpMap(key, value) {
    if (signUpUserMap.has(key)) {
        signUpUserMap.get(key).push(value);
    } else {
        signUpUserMap.set(key, [value]);
    }
	console.log(Array.from(signUpUserMap.entries(), ([k, v]) => [k, [...v]]));
}

const toggleSignUpPwd = document.querySelector('#toggleSignUpPwd');
const pwdSignUp = document.querySelector('#signUpPwd');
toggleSignUpPwd.addEventListener('click', () => {
	const type = pwdSignUp.getAttribute('type') === 'password' ?'text' : 'password';
	pwdSignUp.setAttribute('type', type);
	this.classList.toggle('bi-eye');
});

const toggleSignUpConfirmPwd = document.querySelector('#toggleSignUpConfirmPwd');
const pwdSignUpConfirm = document.querySelector('#signUpConfirmPwd');
toggleSignUpConfirmPwd.addEventListener('click', () => {
	const type = pwdSignUpConfirm.getAttribute('type') === 'password' ?'text' : 'password';
	pwdSignUpConfirm.setAttribute('type', type);
	toggleSignUpConfirmPwd.classList.toggle('bi-eye');
});

const toggleSignInPwd = document.querySelector('#toggleSignInPwd');
const pwdSignIn = document.querySelector('#signInPwd');
toggleSignInPwd.addEventListener('click', () => {
	const type = pwdSignIn.getAttribute('type') === 'password' ?'text' : 'password';
	pwdSignIn.setAttribute('type', type);
	toggleSignInPwd.classList.toggle("bi-eye");
});

const toggleResetPwd = document.querySelector('#toggleResetPwd');
const pwdReset = document.querySelector('#resetPwd');
toggleResetPwd.addEventListener('click', () => {
	const type = pwdReset.getAttribute('type') === 'password' ?'text' : 'password';
	pwdReset.setAttribute('type', type);
	toggleResetPwd.classList.toggle('bi-eye');
});

const toggleResetConfirmPwd = document.querySelector('#toggleResetConfirmPwd');
const pwdResetConfirm = document.querySelector('#resetConfirmPwd');
toggleResetConfirmPwd.addEventListener('click', () => {
	const type = pwdResetConfirm.getAttribute('type') === 'password' ?'text' : 'password';
	pwdResetConfirm.setAttribute('type', type);
	toggleResetConfirmPwd.classList.toggle('bi-eye');
});

toggleSignUpPwd.addEventListener("click", () => {
	const pwdSignIn =  document.getElementById('signInPwd');

	const type = pwdSignIn.getAttribute("type") === "password" ? "text" : "password";
  	pwdSignIn.setAttribute("type", type);


	toggleSignUpPwd.classList.toggle("bi-eye");
	toggleSignUpPwd.classList.toggle("bi-eye-slash");
});	

function emailExists(email) {	
  for (const [id, details] of signUpUserMap) {
    if(details[1] === email) {
      return true;
    }
  }
  return false;
}

function pwdExists(pwd) {
  for (const [id, details] of signUpUserMap) {
    if (details[2] === pwd) {
      return true;
    }
  }
  return false;
}

function userSignIn(){
	event.preventDefault();
	let signInEmail = document.getElementById('signInEmail').value.toLowerCase().trim();;
	let signInPwd = document.getElementById('signInPwd').value;
	
	console.log("signInEmail>>"+signInEmail);
	console.log("signInPwd>>"+signInPwd);
	if(signInEmail == ""){
		alert("Please enter your Email");
		return;
	}
	if(!validateEmail(signInEmail)){
		alert("Invalid email address");
		return;
	}
	if(signInPwd == ""){
		alert("Please enter the Password");
		return;
	}

	if(emailExists(signInEmail)){
		if(pwdExists(signInPwd)){
			if(validatePassword(signInPwd)){
				window.location.replace('findAnyAPI.html');
			}
		}else{
			alert("Incorrect Password");
			document.getElementById('signInPwd').value = "";
			return;
		}
	}else{
		alert("You are not Registered. Please Register by Clicking SignUp Button");
		document.getElementById('signInEmail').value="";
		document.getElementById('signInPwd').value = "";
		return;
	}

}

function userSignUp(){
	event.preventDefault();
	let signUpName = document.getElementById('signUpName').value;
	let signUpEmail = document.getElementById('signUpEmail').value;
	let signUpPwd = document.getElementById('signUpPwd').value;
	let signUpConfirmPwd = document.getElementById('signUpConfirmPwd').value;
	if(signUpName == ""){
		alert("Enter the Name for Registration");
		return;
	}
	if(!validateUsername(signUpName)){
		alert('Invalid username. Allowed: a-z, 0-9, _, Length: 5-20');
		return;
	}
	if(signUpEmail == ""){
		alert("Please enter the Email");
		return;
	}
	if(!validateEmail(signUpEmail)){
		alert("Invalid email address");
		return;
	}
	if(signUpPwd == ""){
		alert("Please enter Password");
		return;
	}
	if(signUpConfirmPwd == ""){
		alert("Please Confirm the Password");
		return;
	}
	if(validatePassword(signUpPwd)){
		if(signUpPwd != signUpConfirmPwd)
		{
			alert("Password doesn't match");
			return;
		}
		addValueToSignUpMap(signUpUserMap.size+1, signUpName);
		addValueToSignUpMap(signUpUserMap.size, signUpEmail);
		addValueToSignUpMap(signUpUserMap.size, signUpPwd);
		document.getElementById('signUpName').value = "";
		document.getElementById('signUpEmail').value = "";
		document.getElementById('signUpPwd').value = "";
		document.getElementById('signUpConfirmPwd').value = "";
		alert("You are successfully registered. Please Sign In with your email & Password");
		
	}	
}

document.getElementById("forgotEmailLink").addEventListener("click", function(){
	const email = document.getElementById("signInEmail").value;
	document.getElementById('resetEmail').value = email;
	if(email == ""){
		 alert("Please enter your email Id first.");
		 return;
	}
	if(!validateEmail(email)){
		alert("Invalid email address. Please Enter the valid Email");
		document.getElementById("signInEmail").value = "";
		document.getElementById('resetEmail').value = "";
		return;
	}
	const modal = bootstrap.Modal.getInstance(document.getElementById('reset'));
    modal.hide();
})

function getKeyByEmail(map, email) {
  for (let [key, value] of map.entries()) {
    if (value[1] === email) {
      return key;
    }
  }
  return undefined;
}

document.getElementById("resetPasswordBtn").addEventListener("click", function () {
    let resetEmail = document.getElementById("resetEmail").value;
	let resetPwd = document.getElementById('resetPwd').value;
	let resetConfirmPwd = document.getElementById('resetConfirmPwd').value;
	console.log("email"+resetEmail)
	let keyValue = getKeyByEmail(signUpUserMap, resetEmail);
	console.log("keyValue"+keyValue)
	const modal = bootstrap.Modal.getInstance(document.getElementById('reset'));
	
    if (!resetEmail) {
        alert("Please enter your email.");
		return;
    }

	if(!validateEmail(resetEmail)){
		alert("Invalid email address. Please Enter the valid Email");
		document.getElementById('signInEmail').value = "";
		document.getElementById("resetEmail").value = "";
		document.getElementById('resetPwd').value = "";
		document.getElementById('resetConfirmPwd').value ="";
		return;
	}

	if(!emailExists(resetEmail)){
		alert("You are not Registered User. please Register now");
		document.getElementById('signInEmail').value = "";
		modal.hide();
	}

	if(emailExists(resetEmail)){
		if(resetPwd == ""){
			alert("Please enter the Password");
			return;
		}
		if(resetConfirmPwd == ""){
			alert("Please enter the Password");
			return;
		}
		if(validatePassword(resetPwd)){
			if(resetPwd != resetConfirmPwd)
			{
				alert("ConfirmPassword is not match with Password");
				return;
			}
			if(!(keyValue === "")){
				console.log("Coming In")
				signUpUserMap.get(keyValue)[2] = resetPwd;
				signUpUserMap.forEach((value, key) => {
				console.log(key, value);
				});
			}
			/*document.getElementById("resetEmail").value = "";
			document.getElementById('resetPwd').value = "";
			document.getElementById('resetConfirmPwd').value ="";*/
			alert("Please Verify the link sent to your Email: " + resetEmail);
			
		}
		
	}
	
	document.getElementById("resetEmail").value = "";
	document.getElementById('resetPwd').value = "";
	document.getElementById('resetConfirmPwd').value ="";
    modal.hide();
});