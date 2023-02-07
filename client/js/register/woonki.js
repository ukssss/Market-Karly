
import { 
  getNode,
  insertLast, 
  getNodes, 
  getInputValue, 
  attr,
  removeClass,
  addClass,
} from '../../lib/index.js';


/* -------------------------------------------------------------------------- */
/*                                  register                                  */
/* -------------------------------------------------------------------------- */


// 회원가입 

// function vaildation() {
  let inputCheck = getNodes('.input-box')
  let idCheck = getNode('#user-id');
  let pwCheck = getNode('#user-pw');
  let pwVerify = getNode('#verify-pw');
  let emailCheck = getNode('#user-email');
  let userIdCheck = getNode('.join-error__text-red');
  let userPwCheck = getNode('.join-error__pw--text-red');
  let userPwVerify = getNode('.join-error__verify--text-red');
  let userEmailCheck = getNode('.join-error__email--text-red')
  let joinError = getNode('.join__error');
  let pwMatches = getNode('.join-error__verify--text-red');
  let verifyButton = getNode('.verify-button');
  let joinPwLayout = getNode('.join-pw__error');
  let joinLayout = getNode('#join');
  let pwLayout = getNode('.join-pw');
  let pwVerifyLayout = getNode('.join-pw__required');
  let emailLayout = getNode('.join_email');
  let emailButton = getNode('.email-button');
  let join = getNode('.join-up');
  // input value 값 넣기
  function inputHandler(e) {
    // e.target()
    let test = e.target.closest(".input-box")
    test.setAttribute("value", e.target.value);
  }

  inputCheck.forEach((input) => input.addEventListener("change", inputHandler))
  

  // insertLast로 에러메시지 넣기 
  
  // 아이디 검사
  idCheck.addEventListener('keyup', (event) => {
    idValidation();
  })



  function idValidation() {
    const REGID = (/^[a-zA-Z0-9]{4,16}$/); // id 영문대문자와 소문자 6자리 이상 16자리 이하
    if(idCheck.value.length < 6 || !idCheck.value.match(REGID)){
      addClass(userIdCheck,'active');
      userIdCheck.innerText = '6자리 이상 16자 이하의 영문과 숫자를 조합';
      joinError.style.marginBottom = '0px'; 
      return false
    }
    removeClass(userIdCheck,'active');
    userIdCheck.innerText = '';
    joinError.style.marginBottom = '0px';
  }

  // 아이디 중복검사
  function clickIdHandler(e){
    e.preventDefault();
    let button = e.target.closest(".verify-button")
    const REGID = (/^[a-zA-Z0-9]{4,16}$/); // id 영문대문자와 소문자 6자리 이상 16자리 이하
    if(idCheck.value.length < 6 || !idCheck.value.match(REGID)){
      button.disabled = false;
      return false;
    }     
    alert('아이디를 사용 할 수 있습니다.')  
  }


  verifyButton.addEventListener('click',clickIdHandler)



  // 비밀번호 검사
  pwCheck.addEventListener('keyup', (event) => {
    pwValidation();
  })

  // 비밀번호 확인
  function pwValidation() {
    if(pwCheck.value.length < 8){
      addClass(userPwCheck,'active');
      userPwCheck.innerText = '8자리 이상 입력해주세요.';
      joinError.style.marginBottom = '0px';
      joinPwLayout.style.marginBottom = '0px';
      pwLayout.style.marginBottom = '10px';
      return false
    }
    removeClass(userPwCheck,'is-active');
    userPwCheck.innerText = '';
    joinError.style.marginBottom = '0px';
  }


  // 비밀번호 일치 확인
  pwVerify.addEventListener('keyup', (event) => {
    pwVerifyValidation();
  })


  function pwVerifyValidation() {
    if(pwVerify.value === pwCheck.value){
      addClass(userPwVerify,'is-active');
      userPwVerify.innerText = '비밀번호가 일치 합니다.';
      pwMatches.style.color = 'blue';
      joinError.style.marginBottom = '10px'; 
      return false
    }
    userPwVerify.innerText = '비밀번호가 일치 하지 않습니다.';
    pwMatches.style.color = 'red';
    joinError.style.marginBottom = '0px';
    return false
  }

// 이메일 확인
emailCheck.addEventListener('keyup', (event) => {
  emailValidation();
})

// 이메일 유효성 검사
function emailValidation() {
  const REG = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
  if(!emailCheck.value.match(REG)){
    addClass(userEmailCheck,'is-active');
    userEmailCheck.innerText = '올바른 이메일을 작성해주세요';
    emailLayout.style.marginBottom = '0px'; 
    return false
  }
  removeClass(userEmailCheck,'is-active');
  userEmailCheck.innerText = '';
  emailLayout.style.marginBottom = '12px';
}


function clickEmailHandler(e){
  e.preventDefault();
  const REG = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
  let button = e.target.closest(".email-button")
  if(!emailCheck.value.match(REG)){
    button.disabled = false;
    return false;
  }     

  alert('이메일이 확인되었습니다.')  
}


emailButton.addEventListener('click',clickEmailHandler)




// 가입하기 버튼
function joinHandler(e) {
  const REG = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
  e.preventDefault();
  if(!emailCheck.value.match(REG)|| pwVerify.value !== pwCheck.value){
    join.disabled = false;
    alert('비밀번호 와 이메일을 확인해주세요');
    return
  }
  // 로컬스토리지에 아이디, 비번 값 넣기
  function setData() {
    const idValue = idCheck.value
    const pwValue = pwCheck.value
    const pwVerifyValue = pwVerify.value

    if(pwValue === pwVerifyValue){
    localStorage.setItem('id', JSON.stringify({idValue, pwValue}));
    }
  }
  setData();

  alert('가입하기 완료');
}



join.addEventListener('click',joinHandler)

// data-json
// function json() {
//   fetch("https://localhost:3000/users", {
//     method:'POST',
//     body : JSON.stringify({
//       id: idCheck.value
//     }),
    
//   })
//   .then((response) => console.log("response:", response))
//   .catch((error) => console.log("error:", error));


// }




// json();